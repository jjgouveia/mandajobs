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

export function buildKeywordFallback(booleanQuery: string, region: SearchRegion): string {
  const raw = toWebSearchQuery(getPrimaryBooleanQuery(booleanQuery))
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

export function buildWebSearchQuery(linkedinQuery: string, region: SearchRegion): string {
  const core = simplifyBooleanQuery(getPrimaryBooleanQuery(linkedinQuery))
  const location = region === "br" ? "vaga Brasil" : "remote job -Brasil"
  return trimQuery(`${core} ${location}`.trim())
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
