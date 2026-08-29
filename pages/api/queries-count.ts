import { NextApiRequest, NextApiResponse } from "next"
import { collection, getCountFromServer } from "firebase/firestore"
import { QUERIES_COUNT_CACHE_SECONDS } from "@/lib/app-limits"
import { db } from "../../utils/firebaseConfig"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido" })
  }

  try {
    const collectionRef = collection(db, "queries")
    const snapshot = await getCountFromServer(collectionRef)

    res.setHeader(
      "Cache-Control",
      `s-maxage=${QUERIES_COUNT_CACHE_SECONDS}, stale-while-revalidate=${QUERIES_COUNT_CACHE_SECONDS * 2}`
    )
    return res.status(200).json({ count: snapshot.data().count })
  } catch (error) {
    console.error("Erro ao buscar contagem de consultas:", error)
    return res.status(500).json({ error: "Erro ao buscar contagem" })
  }
}