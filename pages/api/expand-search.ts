import type { NextApiRequest, NextApiResponse } from "next"
import {
  coerceSearchWindowDays,
  isSearchRegion,
  mapSearchClientError,
  SearchApiError,
  type ExpandedSearchItem,
} from "@/lib/expanded-search"
import { searchWithFirecrawl } from "@/lib/firecrawl-search"
import {
  checkRateLimit,
  EXPAND_SEARCH_LIMIT,
  getClientIp,
} from "@/lib/rate-limit"
import { MAX_EXPAND_QUERY_LENGTH, MIN_EXPAND_QUERY_LENGTH } from "@/lib/app-limits"

interface ExpandSearchResponse {
  items?: ExpandedSearchItem[]
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExpandSearchResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" })
  }

  const ip = getClientIp(req)
  const rate = checkRateLimit(`expand-search:${ip}`, EXPAND_SEARCH_LIMIT)
  if (!rate.success) {
    return res.status(429).json({
      error: "Limite de busca ampliada atingido. Tente novamente mais tarde.",
    })
  }

  const apiKey = process.env.FIRECRAWL_API_KEY?.trim()

  if (!apiKey || apiKey === "REPLACE_ME") {
    console.error("FIRECRAWL_API_KEY ausente ou placeholder")
    return res.status(503).json({
      error: "Busca ampliada indisponível no momento.",
    })
  }

  const { query, days, region } = req.body ?? {}

  if (
    typeof query !== "string" ||
    query.trim().length < MIN_EXPAND_QUERY_LENGTH ||
    query.length > MAX_EXPAND_QUERY_LENGTH
  ) {
    return res.status(400).json({ error: "Query inválida" })
  }

  const searchDays = coerceSearchWindowDays(days)
  if (!searchDays || !isSearchRegion(region)) {
    return res.status(400).json({ error: "Filtros inválidos" })
  }

  try {
    const items = await searchWithFirecrawl({
      query: query.trim(),
      days: searchDays,
      region,
      apiKey,
    })

    return res.status(200).json({ items })
  } catch (error) {
    const statusCode = error instanceof SearchApiError ? error.statusCode : 502
    const message = error instanceof Error ? error.message : "Erro desconhecido"
    const mapped = mapSearchClientError(statusCode, message)

    console.error("Erro na busca ampliada:", { statusCode, message, query: query.trim().slice(0, 120) })
    return res.status(mapped.httpStatus).json({ error: mapped.message })
  }
}
