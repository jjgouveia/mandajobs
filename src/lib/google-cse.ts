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

const JOB_INTENT = '(vaga OR vagas OR job OR hiring OR "job opening")'
const BRAZIL_TERMS = '(Brasil OR Brazil OR "remoto Brasil" OR "remote Brazil")'
const INTL_TERMS =
  '(remote OR internacional OR worldwide OR "United States" OR Europe) -Brasil -Brazil'

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

export function toGoogleQuery(linkedinQuery: string): string {
  return linkedinQuery
    .replace(/^\s*\d+[.)]\s*/g, "")
    .replace(/\bNOT\s+/gi, "-")
    .replace(/\bAND\b/gi, " ")
    .replace(/\s+/g, " ")
    .trim()
}

export function getPrimaryBooleanQuery(generatedQuery: string): string {
  const withoutLeadingIndex = generatedQuery.replace(/^\s*1[.)]\s*/i, "")
  return withoutLeadingIndex.split(/\s*2[.)]\s*/)[0]?.trim() ?? generatedQuery.trim()
}

export function buildCseQuery(linkedinQuery: string, region: SearchRegion): string {
  const base = toGoogleQuery(getPrimaryBooleanQuery(linkedinQuery))
  const location = region === "br" ? BRAZIL_TERMS : INTL_TERMS
  return `${base} ${JOB_INTENT} ${location}`.trim()
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
  return value === 7 || value === 15 || value === 30
}

export function isSearchRegion(value: unknown): value is SearchRegion {
  return value === "br" || value === "intl"
}

export async function searchCustomSearch(params: {
  query: string
  days: SearchWindowDays
  region: SearchRegion
  apiKey: string
  cx: string
}): Promise<ExpandedSearchItem[]> {
  const q = buildCseQuery(params.query, params.region)
  const url = new URL("https://www.googleapis.com/customsearch/v1")
  url.searchParams.set("key", params.apiKey)
  url.searchParams.set("cx", params.cx)
  url.searchParams.set("q", q)
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
    throw new Error(message)
  }

  return mapAndSortCseItems(payload)
}
