/**
 * Shareable URL helpers for the job search form.
 */

import {
  isLanguagePref,
  isWorkMode,
  parseLevelType,
  type LanguagePref,
  type LevelType,
  type WorkMode,
} from "@/lib/job-presets"

export interface ShareableFormParams {
  title: string
  tools: string
  toolsIdontUse: string
  level: LevelType
  workMode: WorkMode
  language: LanguagePref
  location: string
}

export function buildShareableSearchParams(form: ShareableFormParams): URLSearchParams {
  const params = new URLSearchParams()
  if (form.title) params.set("cargo", form.title)
  if (form.tools) params.set("stack", form.tools)
  if (form.toolsIdontUse) params.set("evitar", form.toolsIdontUse)
  if (form.level) params.set("nivel", form.level.toLowerCase())
  if (form.workMode && form.workMode !== "any") params.set("modalidade", form.workMode)
  if (form.language && form.language !== "both") params.set("idioma", form.language)
  if (form.location) params.set("local", form.location)
  return params
}

export function parseShareableSearchParams(
  search: string | URLSearchParams
): Partial<ShareableFormParams> {
  const params = typeof search === "string" ? new URLSearchParams(search) : search
  const result: Partial<ShareableFormParams> = {}

  const cargo = params.get("cargo")
  if (cargo) result.title = cargo

  const stack = params.get("stack")
  if (stack) result.tools = stack

  const evitar = params.get("evitar")
  if (evitar) result.toolsIdontUse = evitar

  const nivel = parseLevelType(params.get("nivel"))
  if (nivel) result.level = nivel

  const modalidade = params.get("modalidade")
  if (modalidade && isWorkMode(modalidade)) result.workMode = modalidade

  if (params.get("remoto") === "1") result.workMode = "remoto"

  const idioma = params.get("idioma")
  if (idioma && isLanguagePref(idioma)) result.language = idioma

  const local = params.get("local")
  if (local) result.location = local

  return result
}

export function replaceShareableUrl(form: ShareableFormParams) {
  if (typeof window === "undefined") return
  const params = buildShareableSearchParams(form)
  const query = params.toString()
  const next = query ? `${window.location.pathname}?${query}` : window.location.pathname
  window.history.replaceState(null, "", next)
}

export function getShareableUrl(form: ShareableFormParams): string {
  if (typeof window === "undefined") return ""
  const params = buildShareableSearchParams(form)
  const query = params.toString()
  return query ? `${window.location.origin}${window.location.pathname}?${query}` : window.location.href
}
