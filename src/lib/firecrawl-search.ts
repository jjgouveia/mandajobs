import {
  buildKeywordFallback,
  buildWebSearchQuery,
  filterResultsByRegion,
  mapWebResults,
  SearchApiError,
  type ExpandedSearchItem,
  type SearchRegion,
  type SearchWindowDays,
} from "@/lib/expanded-search"

interface FirecrawlWebResult {
  title?: string
  url?: string
  description?: string
  position?: number
}

interface FirecrawlSearchData {
  web?: FirecrawlWebResult[]
}

interface FirecrawlSearchResponse {
  success?: boolean
  data?: FirecrawlSearchData | FirecrawlWebResult[]
  error?: string
}

function formatUsDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  const year = date.getFullYear()
  return `${month}/${day}/${year}`
}

export function buildFirecrawlTbs(days: SearchWindowDays): string {
  const sortByDate = "sbd:1"

  if (days === 7) return `${sortByDate},qdr:w`
  if (days === 30) return `${sortByDate},qdr:m`

  const max = new Date()
  const min = new Date()
  min.setDate(min.getDate() - 15)

  return `${sortByDate},cdr:1,cd_min:${formatUsDate(min)},cd_max:${formatUsDate(max)}`
}

function buildRegionParams(region: SearchRegion): { country: string; location: string } {
  if (region === "br") {
    return { country: "BR", location: "Brazil" }
  }

  return { country: "US", location: "United States" }
}

function extractWebResults(data: FirecrawlSearchResponse["data"]): FirecrawlWebResult[] {
  if (!data) return []
  if (Array.isArray(data)) return data
  return data.web ?? []
}

const MAX_RESULTS = 10
const FETCH_LIMIT = 25

async function fetchFirecrawlResults(params: {
  query: string
  days: SearchWindowDays
  region: SearchRegion
  apiKey: string
}): Promise<ExpandedSearchItem[]> {
  const { country, location } = buildRegionParams(params.region)

  const response = await fetch("https://api.firecrawl.dev/v2/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${params.apiKey}`,
    },
    body: JSON.stringify({
      query: params.query,
      limit: FETCH_LIMIT,
      sources: ["web"],
      country,
      location,
      tbs: buildFirecrawlTbs(params.days),
      safe: true,
    }),
  })

  const payload = (await response.json()) as FirecrawlSearchResponse

  if (!response.ok || payload.success === false) {
    const message = payload.error || "Falha na API do Firecrawl"
    throw new SearchApiError(message, response.status)
  }

  return filterResultsByRegion(mapWebResults(extractWebResults(payload.data)), params.region).slice(
    0,
    MAX_RESULTS
  )
}

export async function searchWithFirecrawl(params: {
  query: string
  days: SearchWindowDays
  region: SearchRegion
  apiKey: string
}): Promise<ExpandedSearchItem[]> {
  const queries = [
    buildWebSearchQuery(params.query, params.region),
    buildKeywordFallback(params.query, params.region),
  ]

  let lastError: SearchApiError | null = null

  for (const query of queries) {
    if (!query) continue

    try {
      const results = await fetchFirecrawlResults({ ...params, query })
      if (results.length > 0) return results
    } catch (error) {
      if (!(error instanceof SearchApiError)) throw error
      lastError = error
      if (error.statusCode !== 400) throw error
    }
  }

  throw lastError ?? new SearchApiError("Falha na API do Firecrawl", 502)
}
