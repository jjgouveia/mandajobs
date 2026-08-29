export type SearchRegion = "br" | "intl"
export type SearchWindowDays = 7 | 15 | 30

export interface ExpandedSearchItem {
  title: string
  url: string
  snippet: string
  source: string
  publishedAt: string | null
}

const MAX_SEARCH_QUERY_LENGTH = 480

const BRAZIL_JOB_BOARDS = [
  "gupy.io",
  "infojobs.com.br",
  "catho.com.br",
  "vagas.com.br",
  "trampos.co",
  "programathor.com.br",
  "geekhunter.com.br",
  "remotar.com.br",
  "bne.com.br",
  "empregos.com.br",
  "glassdoor.com.br",
  "netvagas.com.br",
]

const BRAZIL_SIGNAL_PATTERN =
  /\b(brasil|brazil|brasileir[ao]s?|são paulo|sao paulo|rio de janeiro|belo horizonte|curitiba|porto alegre|recife|remoto brasil|remote brazil|vaga[s]? br|emprego[s]? br)\b/i

const INTERNATIONAL_ONLY_PATTERN =
  /\b(united states|usa only|u\.s\. only|europe only|european union only|uk only|canada only)\b/i

export class SearchApiError extends Error {
  statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.name = "SearchApiError"
    this.statusCode = statusCode
  }
}

export function toWebSearchQuery(linkedinQuery: string): string {
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
  if (query.length <= MAX_SEARCH_QUERY_LENGTH) return query
  return query.slice(0, MAX_SEARCH_QUERY_LENGTH).replace(/\s+\S*$/, "").trim()
}

function simplifyBooleanQuery(booleanQuery: string): string {
  let query = toWebSearchQuery(booleanQuery)
  query = query.replace(/[()]/g, " ")
  query = query.replace(/\s+-/g, " -")
  query = query.replace(/\s+/g, " ").trim()
  return trimQuery(query)
}

function buildRegionQuerySuffix(region: SearchRegion): string {
  if (region === "br") {
    return '(vagas OR vaga OR emprego) (Brasil OR Brazil OR brasileiro) -USA -"United States" -Europa'
  }

  return '(remote OR internacional OR worldwide OR "United States" OR Europe) -Brasil -Brazil -brasileiro'
}

export function buildKeywordFallback(booleanQuery: string, region: SearchRegion): string {
  const raw = toWebSearchQuery(getPrimaryBooleanQuery(booleanQuery))
  const tokens = raw
    .replace(/[()]/g, " ")
    .split(/\s+/)
    .filter((token) => token && token.toUpperCase() !== "OR" && token !== "-")
    .filter((token) => !token.startsWith("-"))
    .slice(0, 8)

  const negatives = (raw.match(/-\S+/g) ?? []).slice(0, 3)

  return trimQuery([...tokens, ...negatives, buildRegionQuerySuffix(region)].join(" "))
}

export function buildWebSearchQuery(linkedinQuery: string, region: SearchRegion): string {
  const core = simplifyBooleanQuery(getPrimaryBooleanQuery(linkedinQuery))
  return trimQuery(`${core} ${buildRegionQuerySuffix(region)}`.trim())
}

export function mapSearchClientError(statusCode: number, message: string): { httpStatus: number; message: string } {
  const normalized = message.toLowerCase()

  if (statusCode === 401 || normalized.includes("unauthorized") || normalized.includes("invalid api key")) {
    return {
      httpStatus: 502,
      message: "Chave da API Firecrawl inválida. Verifique FIRECRAWL_API_KEY na Vercel.",
    }
  }

  if (statusCode === 429 || normalized.includes("rate limit") || normalized.includes("quota")) {
    return {
      httpStatus: 429,
      message: "Cota da busca esgotada. Tente novamente mais tarde.",
    }
  }

  if (statusCode === 402 || normalized.includes("insufficient credits")) {
    return {
      httpStatus: 429,
      message: "Créditos do Firecrawl esgotados.",
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

function hostnameFromUrl(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return ""
  }
}

function isBrazilJobBoardHost(hostname: string): boolean {
  const host = hostname.toLowerCase()
  return BRAZIL_JOB_BOARDS.some((board) => host === board || host.endsWith(`.${board}`))
}

function hasBrazilSignal(text: string): boolean {
  return BRAZIL_SIGNAL_PATTERN.test(text)
}

function hasInternationalOnlySignal(text: string): boolean {
  return INTERNATIONAL_ONLY_PATTERN.test(text)
}

export function isBrazilJobResult(item: Pick<ExpandedSearchItem, "title" | "url" | "snippet">): boolean {
  const hostname = hostnameFromUrl(item.url).toLowerCase()
  const text = `${item.title} ${item.snippet} ${item.url}`

  if (hostname.endsWith(".br") || isBrazilJobBoardHost(hostname)) return true
  if (hasInternationalOnlySignal(text)) return false
  if (hasBrazilSignal(text)) return true

  return false
}

export function isInternationalJobResult(item: Pick<ExpandedSearchItem, "title" | "url" | "snippet">): boolean {
  const hostname = hostnameFromUrl(item.url).toLowerCase()
  const text = `${item.title} ${item.snippet} ${item.url}`

  if (hostname.endsWith(".br") || isBrazilJobBoardHost(hostname)) return false
  if (hasBrazilSignal(text) && !/\b(remote|remoto|worldwide|internacional)\b/i.test(text)) return false

  return true
}

export function filterResultsByRegion(items: ExpandedSearchItem[], region: SearchRegion): ExpandedSearchItem[] {
  const predicate = region === "br" ? isBrazilJobResult : isInternationalJobResult
  return items.filter(predicate)
}

export function mapWebResults(
  results: Array<{ title?: string; url?: string; description?: string }>
): ExpandedSearchItem[] {
  return results
    .filter((item): item is { title: string; url: string; description?: string } =>
      Boolean(item.title && item.url)
    )
    .map((item) => ({
      title: item.title,
      url: item.url,
      snippet: item.description ?? "",
      source: hostnameFromUrl(item.url),
      publishedAt: null,
    }))
}
