import type { NextApiRequest, NextApiResponse } from "next"
import {
  coerceSearchWindowDays,
  isSearchRegion,
  mapSearchClientError,
  SearchApiError,
  type ExpandedSearchItem,
} from "@/lib/expanded-search"
import { searchWithFirecrawl } from "@/lib/firecrawl-search"

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

  const apiKey = process.env.FIRECRAWL_API_KEY?.trim()

  if (!apiKey || apiKey === "REPLACE_ME") {
    return res.status(503).json({
      error: "Busca ampliada não configurada. Defina FIRECRAWL_API_KEY.",
    })
  }

  const { query, days, region } = req.body ?? {}

  if (typeof query !== "string" || query.trim().length < 3 || query.length > 1500) {
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
