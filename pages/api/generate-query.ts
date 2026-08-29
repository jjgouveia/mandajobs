import { NextApiRequest, NextApiResponse } from "next"
import { generateLinkedInQuery } from "@/ai/flows/generate-linkedin-query"
import { applyToolExclusionsToQuery } from "@/lib/apply-tool-exclusions"
import { coerceLanguagePref, coerceWorkMode } from "@/lib/job-presets"
import { getPrimaryQuery, normalizeQueryVariants } from "@/lib/parse-query-variants"
import {
  checkRateLimit,
  GENERATE_QUERY_LIMIT,
  getClientIp,
} from "@/lib/rate-limit"
import { collection, addDoc } from "firebase/firestore"
import { db } from "../../utils/firebaseConfig"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" })
  }

  const ip = getClientIp(req)
  const rate = checkRateLimit(`generate-query:${ip}`, GENERATE_QUERY_LIMIT)
  if (!rate.success) {
    return res.status(429).json({
      error: "Limite de consultas atingido. Tente novamente mais tarde.",
    })
  }

  try {
    let { title, tools, toolsIdontUse, level, workMode, language, location } = req.body

    if (level) {
      level = String(level).toLowerCase()
    }

    if (!title || !tools) {
      return res.status(400).json({ error: "Dados incompletos" })
    }

    toolsIdontUse = toolsIdontUse ?? ""
    const resolvedWorkMode = coerceWorkMode(workMode)
    const resolvedLanguage = coerceLanguagePref(language)
    const resolvedLocation = typeof location === "string" ? location.trim() : ""

    type SeniorityKey = "junior" | "pleno" | "senior" | "estagiário"

    const seniorities: Record<SeniorityKey, string> = {
      junior: "junior",
      pleno: "medium",
      senior: "senior",
      estagiário: "intern",
    }

    const seniorityKey = (level as string) in seniorities ? (level as SeniorityKey) : "junior"

    const result = await generateLinkedInQuery({
      title,
      tools,
      toolsIdontUse,
      level: seniorities[seniorityKey],
      workMode: resolvedWorkMode,
      language: resolvedLanguage,
      location: resolvedLocation || undefined,
    })

    const normalized = normalizeQueryVariants(result.variants)
    const variants = normalized.variants.map((variant) =>
      applyToolExclusionsToQuery(variant, toolsIdontUse)
    )
    const primary = getPrimaryQuery(variants)

    if (!primary) {
      return res.status(500).json({ error: "Nenhuma consulta foi gerada" })
    }

    await addDoc(collection(db, "queries"), {
      query_string: primary,
      level: seniorityKey,
      title,
      tools,
      toolsIdontUse,
      workMode: resolvedWorkMode,
      language: resolvedLanguage,
      location: resolvedLocation || null,
      timestamp: new Date(),
    })

    return res.status(200).json({ variants, primary })
  } catch (error: unknown) {
    console.error("Erro ao gerar query:", error)
    return res.status(500).json({
      error: "Erro ao processar a requisição",
    })
  }
}
