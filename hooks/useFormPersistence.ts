import { useCallback, useEffect, useRef, useState } from "react"
import {
  coerceLanguagePref,
  coerceWorkMode,
  isLevelType,
  type LanguagePref,
  type LevelType,
  type WorkMode,
} from "@/lib/job-presets"
import { FORM_PERSIST_DEBOUNCE_MS } from "@/lib/app-limits"

export const FORM_STORAGE_KEY = "mandajobs:form-v1"

export interface PersistedFormState {
  title: string
  tools: string
  toolsIdontUse: string
  level: LevelType
  workMode: WorkMode
  language: LanguagePref
  location: string
  lastVariants: string[]
}

const DEFAULT_STATE: PersistedFormState = {
  title: "",
  tools: "",
  toolsIdontUse: "",
  level: "Junior",
  workMode: "any",
  language: "both",
  location: "",
  lastVariants: [],
}

export function parsePersistedForm(raw: string | null): PersistedFormState | null {
  if (!raw) return null
  try {
    const data = JSON.parse(raw) as Partial<PersistedFormState>
    return {
      title: typeof data.title === "string" ? data.title : "",
      tools: typeof data.tools === "string" ? data.tools : "",
      toolsIdontUse: typeof data.toolsIdontUse === "string" ? data.toolsIdontUse : "",
      level: isLevelType(data.level) ? data.level : "Junior",
      workMode: coerceWorkMode(data.workMode),
      language: coerceLanguagePref(data.language),
      location: typeof data.location === "string" ? data.location : "",
      lastVariants: Array.isArray(data.lastVariants)
        ? data.lastVariants.filter((v): v is string => typeof v === "string")
        : [],
    }
  } catch {
    return null
  }
}

export function useFormPersistence(initial?: Partial<PersistedFormState>) {
  const [state, setState] = useState<PersistedFormState>({
    ...DEFAULT_STATE,
    ...initial,
  })
  const [hydrated, setHydrated] = useState(false)
  const skipNextSave = useRef(false)

  useEffect(() => {
    const fromStorage = parsePersistedForm(localStorage.getItem(FORM_STORAGE_KEY))
    if (fromStorage) {
      skipNextSave.current = true
      setState((prev) => ({ ...prev, ...fromStorage, ...initial }))
    }
    setHydrated(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!hydrated) return
    if (skipNextSave.current) {
      skipNextSave.current = false
      return
    }

    const timer = window.setTimeout(() => {
      try {
        localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(state))
      } catch {
        // ignore quota errors
      }
    }, FORM_PERSIST_DEBOUNCE_MS)

    return () => window.clearTimeout(timer)
  }, [state, hydrated])

  const update = useCallback((patch: Partial<PersistedFormState>) => {
    setState((prev) => ({ ...prev, ...patch }))
  }, [])

  return { state, update, hydrated }
}
