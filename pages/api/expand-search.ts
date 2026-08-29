import type { NextApiRequest, NextApiResponse } from "next"
import {
  CseApiError,
  coerceSearchWindowDays,
  isSearchRegion,
  mapCseClientError,
  searchCustomSearch,
  type ExpandedSearchItem,
} from "@/lib/google-cse"

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

  const apiKey = process.env.GOOGLE_CSE_API_KEY
  const cx = process.env.GOOGLE_CSE_CX

  if (!apiKey || !cx || apiKey === "REPLACE_ME" || cx === "REPLACE_ME") {
    return res.status(503).json({
      error: "Busca ampliada não configurada. Defina GOOGLE_CSE_API_KEY e GOOGLE_CSE_CX.",
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
    const items = await searchCustomSearch({
      query: query.trim(),
      days: searchDays,
      region,
      apiKey,
      cx,
    })

    return res.status(200).json({ items })
  } catch (error) {
    const statusCode = error instanceof CseApiError ? error.statusCode : 502
    const message = error instanceof Error ? error.message : "Erro desconhecido"
    const mapped = mapCseClientError(statusCode, message)

    console.error("Erro na Custom Search:", { statusCode, message, query: query.trim().slice(0, 120) })
    return res.status(mapped.httpStatus).json({ error: mapped.message })
  }
}
