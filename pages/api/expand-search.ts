import type { NextApiRequest, NextApiResponse } from "next"
import {
  isSearchRegion,
  isSearchWindowDays,
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

  if (!apiKey || !cx) {
    return res.status(503).json({
      error: "Busca ampliada não configurada. Defina GOOGLE_CSE_API_KEY e GOOGLE_CSE_CX.",
    })
  }

  const { query, days, region } = req.body ?? {}

  if (typeof query !== "string" || query.trim().length < 3 || query.length > 1500) {
    return res.status(400).json({ error: "Query inválida" })
  }

  if (!isSearchWindowDays(days) || !isSearchRegion(region)) {
    return res.status(400).json({ error: "Filtros inválidos" })
  }

  try {
    const items = await searchCustomSearch({
      query: query.trim(),
      days,
      region,
      apiKey,
      cx,
    })

    return res.status(200).json({ items })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro desconhecido"
    console.error("Erro na Custom Search:", message)
    return res.status(502).json({ error: "Não foi possível ampliar a busca agora" })
  }
}
