import { useCallback, useEffect, useState } from "react"
import type { ExpandedSearchItem } from "@/lib/expanded-search"
import { trackJobSaved, trackJobUnsaved } from "@/lib/analytics-events"

export const SAVED_JOBS_KEY = "mandajobs:saved-jobs-v1"

export interface SavedJob extends ExpandedSearchItem {
  savedAt: string
}

function readSavedJobs(): SavedJob[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(SAVED_JOBS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as SavedJob[]
    if (!Array.isArray(parsed)) return []
    return parsed.filter((item) => item && typeof item.url === "string")
  } catch {
    return []
  }
}

function writeSavedJobs(jobs: SavedJob[]) {
  try {
    localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(jobs))
  } catch {
    // ignore
  }
}

export function useSavedJobs() {
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([])

  useEffect(() => {
    setSavedJobs(readSavedJobs())
  }, [])

  const isSaved = useCallback(
    (url: string) => savedJobs.some((job) => job.url === url),
    [savedJobs]
  )

  const toggleSave = useCallback((item: ExpandedSearchItem) => {
    setSavedJobs((prev) => {
      const exists = prev.some((job) => job.url === item.url)
      const next = exists
        ? prev.filter((job) => job.url !== item.url)
        : [{ ...item, savedAt: new Date().toISOString() }, ...prev]

      if (exists) trackJobUnsaved()
      else trackJobSaved()

      writeSavedJobs(next)
      return next
    })
  }, [])

  const removeSaved = useCallback((url: string) => {
    setSavedJobs((prev) => {
      const next = prev.filter((job) => job.url !== url)
      writeSavedJobs(next)
      trackJobUnsaved()
      return next
    })
  }, [])

  return { savedJobs, isSaved, toggleSave, removeSaved }
}
