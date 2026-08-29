export type SearchRegion = "br" | "intl"
export type SearchWindowDays = 7 | 15 | 30

export interface ExpandedSearchItem {
  title: string
  url: string
  snippet: string
  source: string
  publishedAt: string | null
}

interface CseMetatags {
  [key: string]: string | undefined
}

interface CseApiItem {
  title?: string
  link?: string
  snippet?: string
  displayLink?: string
  pagemap?: {
    metatags?: CseMetatags[]
    newsarticle?: Array<{ datepublished?: string }>
  }
}

interface CseApiResponse {
  items?: CseApiItem[]
  error?: { message?: string; code?: number }
}

const DATE_META_KEYS = [
  "article:published_time",
  "og:published_time",
  "og:updated_time",
  "datepublished",
  "datePublished",
  "pubdate",
  "publishdate",
  "dc.date",
  "dc.date.issued",
]

const MAX_CSE_QUERY_LENGTH = 380

export class CseApiError extends Error {
  statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.name = "CseApiError"
    this.statusCode = statusCode
  }
}

export function toGoogleQuery(linkedinQuery: string): string {
  return linkedinQuery
    .replace(/^\s*\d+[.)]\s*/g, "")
    .replace(/\bNOT\s+/gi, "-")
    .replace(/\bAND\b/gi, " ")
    .replace(/\s+/g, " ")
    .trim()
}

export function getPrimaryBooleanQuery(generatedQuery: string): string {
  const cleaned = generatedQuery
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/^["'`]+|["'`]+$/g, "")
    .trim()

  const withoutLeadingIndex = cleaned.replace(/^\s*1[.)]\s*/i, "")
  const primary = withoutLeadingIndex.split(/\s*2[.)]\s*/)[0]?.trim()

  if (primary) return primary

  const firstLine = cleaned.split(/\n+/).find((line) => line.trim().length > 0)
  return firstLine?.trim() ?? cleaned
}

function trimQuery(query: string): string {
  if (query.length <= MAX_CSE_QUERY_LENGTH) return query
  return query.slice(0, MAX_CSE_QUERY_LENGTH).replace(/\s+\S*$/, "").trim()
}

function simplifyBooleanForCse(booleanQuery: string): string {
  let query = toGoogleQuery(booleanQuery)
  query = query.replace(/[()]/g, " ")
  query = query.replace(/\s+-/g, " -")
  query = query.replace(/\s+/g, " ").trim()
  return trimQuery(query)
}

function buildKeywordFallback(booleanQuery: string, region: SearchRegion): string {
  const raw = toGoogleQuery(getPrimaryBooleanQuery(booleanQuery))
  const tokens = raw
    .replace(/[()]/g, " ")
    .split(/\s+/)
    .filter((token) => token && token.toUpperCase() !== "OR" && token !== "-")
    .filter((token) => !token.startsWith("-"))
    .slice(0, 10)

  const negatives = (raw.match(/-\S+/g) ?? []).slice(0, 3)
  const location = region === "br" ? "vaga Brasil" : "remote job -Brasil"

  return trimQuery([...tokens, ...negatives, location].join(" "))
}

export function buildCseQuery(linkedinQuery: string, region: SearchRegion): string {
  const core = simplifyBooleanForCse(getPrimaryBooleanQuery(linkedinQuery))
  const location = region === "br" ? "vaga Brasil" : "remote job -Brasil"
  return trimQuery(`${core} ${location}`.trim())
}

export function mapCseClientError(statusCode: number, message: string): { httpStatus: number; message: string } {
  const normalized = message.toLowerCase()

  if (statusCode === 403) {
    if (normalized.includes("referer")) {
      return {
        httpStatus: 502,
        message:
          "A chave da API bloqueia chamadas do servidor. No Google Cloud, use restrição por API (Custom Search), não por referrer.",
      }
    }

    if (normalized.includes("disabled") || normalized.includes("has not been used")) {
      return {
        httpStatus: 502,
        message: "Ative a Custom Search API no projeto do Google Cloud.",
      }
    }

    return {
      httpStatus: 502,
      message: "Chave da API ou Search Engine ID inválidos.",
    }
  }

  if (statusCode === 429) {
    return {
      httpStatus: 429,
      message: "Cota diária da busca esgotada (100/dia no plano gratuito).",
    }
  }

  if (statusCode === 400) {
    return {
      httpStatus: 400,
      message: "Não foi possível interpretar essa consulta. Tente gerar a query de novo.",
    }
  }

  return {
    httpStatus: 502,
    message: message || "Não foi possível ampliar a busca agora.",
  }
}

function parseIsoDate(value?: string): string | null {
  if (!value) return null
  const timestamp = Date.parse(value)
  if (Number.isNaN(timestamp)) return null
  return new Date(timestamp).toISOString()
}

function extractPublishedAt(item: CseApiItem): string | null {
  const metatags = item.pagemap?.metatags?.[0]
  if (metatags) {
    for (const key of DATE_META_KEYS) {
      const parsed = parseIsoDate(metatags[key])
      if (parsed) return parsed
    }
  }

  return parseIsoDate(item.pagemap?.newsarticle?.[0]?.datepublished)
}

function hostnameFromUrl(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return ""
  }
}

export function mapAndSortCseItems(payload: CseApiResponse): ExpandedSearchItem[] {
  const items = (payload.items ?? [])
    .filter((item): item is CseApiItem & { title: string; link: string } =>
      Boolean(item.title && item.link)
    )
    .map((item) => ({
      title: item.title,
      url: item.link,
      snippet: item.snippet ?? "",
      source: item.displayLink?.replace(/^www\./, "") || hostnameFromUrl(item.link),
      publishedAt: extractPublishedAt(item),
    }))

  return items.sort((left, right) => {
    if (left.publishedAt && right.publishedAt) {
      return Date.parse(right.publishedAt) - Date.parse(left.publishedAt)
    }
    if (left.publishedAt) return -1
    if (right.publishedAt) return 1
    return 0
  })
}

export function isSearchWindowDays(value: unknown): value is SearchWindowDays {
  const numeric = typeof value === "string" ? Number(value) : value
  return numeric === 7 || numeric === 15 || numeric === 30
}

export function isSearchRegion(value: unknown): value is SearchRegion {
  return value === "br" || value === "intl"
}

export function coerceSearchWindowDays(value: unknown): SearchWindowDays | null {
  if (!isSearchWindowDays(value)) return null
  return typeof value === "string" ? (Number(value) as SearchWindowDays) : value
}

async function fetchCseResults(params: {
  q: string
  days: SearchWindowDays
  region: SearchRegion
  apiKey: string
  cx: string
}): Promise<ExpandedSearchItem[]> {
  const url = new URL("https://www.googleapis.com/customsearch/v1")
  url.searchParams.set("key", params.apiKey)
  url.searchParams.set("cx", params.cx)
  url.searchParams.set("q", params.q)
  url.searchParams.set("num", "10")
  url.searchParams.set("dateRestrict", `d${params.days}`)
  url.searchParams.set("safe", "active")

  if (params.region === "br") {
    url.searchParams.set("gl", "br")
    url.searchParams.set("hl", "pt")
  } else {
    url.searchParams.set("gl", "us")
    url.searchParams.set("hl", "en")
  }

  const response = await fetch(url.toString())
  const payload = (await response.json()) as CseApiResponse

  if (!response.ok) {
    const message = payload.error?.message || "Falha na Custom Search API"
    throw new CseApiError(message, payload.error?.code ?? response.status)
  }

  return mapAndSortCseItems(payload)
}

export async function searchCustomSearch(params: {
  query: string
  days: SearchWindowDays
  region: SearchRegion
  apiKey: string
  cx: string
}): Promise<ExpandedSearchItem[]> {
  const queries = [
    buildCseQuery(params.query, params.region),
    buildKeywordFallback(params.query, params.region),
  ]

  let lastError: CseApiError | null = null

  for (const q of queries) {
    if (!q) continue

    try {
      return await fetchCseResults({ ...params, q })
    } catch (error) {
      if (!(error instanceof CseApiError)) throw error
      lastError = error
      if (error.statusCode !== 400) throw error
    }
  }

  throw lastError ?? new CseApiError("Falha na Custom Search API", 502)
}
