import { NextApiRequest, NextApiResponse } from "next"
import { fetchAllQueryRecords, parseYearParam } from "@/lib/fetch-query-records"
import { buildSearchRankings } from "@/lib/query-rankings"
import { SEARCH_RANKINGS_CACHE_SECONDS } from "@/lib/app-limits"
import { db } from "../../utils/firebaseConfig"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido" })
  }

  try {
    const year = parseYearParam(req.query.year)
    const { records, availableYears } = await fetchAllQueryRecords(db, year)

    const rankings = buildSearchRankings(records, {
      year,
      availableYears: year === null ? availableYears : [],
    })

    res.setHeader(
      "Cache-Control",
      `s-maxage=${SEARCH_RANKINGS_CACHE_SECONDS}, stale-while-revalidate=${SEARCH_RANKINGS_CACHE_SECONDS * 2}`
    )
    return res.status(200).json(rankings)
  } catch (error) {
    console.error("Erro ao buscar rankings:", error)
    return res.status(500).json({ error: "Erro ao buscar rankings" })
  }
}
