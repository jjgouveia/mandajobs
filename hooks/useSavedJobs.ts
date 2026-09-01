import { useCallback, useEffect, useState } from "react"
import type { ExpandedSearchItem } from "@/lib/expanded-search"
import { trackJobSaved, trackJobUnsaved } from "@/lib/analytics-events"
import {
  isJobSaved,
  notifySavedJobsChanged,
  readSavedJobs,
  removeSavedJob,
  SAVED_JOBS_EVENT,
  SAVED_JOBS_KEY,
  toggleSavedJob,
  writeSavedJobs,
  type SavedJob,
} from "@/lib/saved-jobs"

export { SAVED_JOBS_KEY }
export type { SavedJob }

export function useSavedJobs() {
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([])

  useEffect(() => {
    const refresh = () => setSavedJobs(readSavedJobs())
    const onStorage = (event: StorageEvent) => {
      if (event.key === SAVED_JOBS_KEY) refresh()
    }

    refresh()
    window.addEventListener(SAVED_JOBS_EVENT, refresh)
    window.addEventListener("storage", onStorage)

    return () => {
      window.removeEventListener(SAVED_JOBS_EVENT, refresh)
      window.removeEventListener("storage", onStorage)
    }
  }, [])

  const isSaved = useCallback((url: string) => isJobSaved(savedJobs, url), [savedJobs])

  const toggleSave = useCallback((item: ExpandedSearchItem) => {
    const prev = readSavedJobs()
    const exists = isJobSaved(prev, item.url)
    const next = toggleSavedJob(prev, item, new Date().toISOString())

    writeSavedJobs(next)
    setSavedJobs(next)
    if (exists) trackJobUnsaved()
    else trackJobSaved()
    notifySavedJobsChanged()
  }, [])

  const removeSaved = useCallback((url: string) => {
    const next = removeSavedJob(readSavedJobs(), url)
    writeSavedJobs(next)
    setSavedJobs(next)
    notifySavedJobsChanged()
    trackJobUnsaved()
  }, [])

  return { savedJobs, isSaved, toggleSave, removeSaved }
}
