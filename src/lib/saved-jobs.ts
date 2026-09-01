import type { ExpandedSearchItem } from "@/lib/expanded-search"

export const SAVED_JOBS_KEY = "mandajobs:saved-jobs-v1"
export const SAVED_JOBS_EVENT = "mandajobs:saved-jobs-changed"

export interface SavedJob extends ExpandedSearchItem {
  savedAt: string
}

export function isHttpUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return parsed.protocol === "http:" || parsed.protocol === "https:"
  } catch {
    return false
  }
}

function isSavedJob(value: unknown): value is SavedJob {
  if (!value || typeof value !== "object") return false
  if (!("url" in value) || !("title" in value) || !("savedAt" in value)) return false

  const { url, title, savedAt } = value
  return (
    typeof url === "string" &&
    isHttpUrl(url) &&
    typeof title === "string" &&
    typeof savedAt === "string"
  )
}

export function parseSavedJobs(raw: string | null): SavedJob[] {
  if (!raw) return []

  try {
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isSavedJob)
  } catch {
    return []
  }
}

export function isJobSaved(jobs: SavedJob[], url: string): boolean {
  return jobs.some((job) => job.url === url)
}

export function toggleSavedJob(
  jobs: SavedJob[],
  item: ExpandedSearchItem,
  savedAt: string
): SavedJob[] {
  if (isJobSaved(jobs, item.url)) {
    return jobs.filter((job) => job.url !== item.url)
  }

  if (!isHttpUrl(item.url)) return jobs

  return [{ ...item, savedAt }, ...jobs]
}

export function removeSavedJob(jobs: SavedJob[], url: string): SavedJob[] {
  return jobs.filter((job) => job.url !== url)
}

export function readSavedJobs(): SavedJob[] {
  if (typeof window === "undefined") return []
  try {
    return parseSavedJobs(localStorage.getItem(SAVED_JOBS_KEY))
  } catch {
    return []
  }
}

export function writeSavedJobs(jobs: SavedJob[]): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(jobs))
  } catch {
    // ignore quota / private mode
  }
}

export function notifySavedJobsChanged(): void {
  if (typeof window === "undefined") return
  window.dispatchEvent(new Event(SAVED_JOBS_EVENT))
}
