import { describe, expect, it } from "vitest"
import type { ExpandedSearchItem } from "@/lib/expanded-search"
import {
  isJobSaved,
  parseSavedJobs,
  removeSavedJob,
  toggleSavedJob,
  type SavedJob,
} from "@/lib/saved-jobs"

function job(overrides: Partial<ExpandedSearchItem> = {}): ExpandedSearchItem {
  return {
    title: "Dev Frontend",
    url: "https://jobs.example.com/frontend",
    snippet: "React remoto",
    source: "example.com",
    publishedAt: "2026-09-01T12:00:00.000Z",
    ...overrides,
  }
}

function saved(overrides: Partial<SavedJob> = {}): SavedJob {
  return {
    ...job(),
    savedAt: "2026-09-01T15:00:00.000Z",
    ...overrides,
  }
}

describe("parseSavedJobs", () => {
  it("returns empty list for empty storage", () => {
    expect(parseSavedJobs(null)).toEqual([])
    expect(parseSavedJobs("")).toEqual([])
  })

  it("parses valid jobs", () => {
    const stored = [saved()]
    expect(parseSavedJobs(JSON.stringify(stored))).toEqual(stored)
  })

  it("drops invalid entries", () => {
    const raw = JSON.stringify([
      saved(),
      { title: "sem url" },
      null,
      { url: "" },
    ])

    expect(parseSavedJobs(raw)).toEqual([saved()])
  })

  it("returns empty list for invalid JSON or non-array", () => {
    expect(parseSavedJobs("{not json")).toEqual([])
    expect(parseSavedJobs(JSON.stringify({ url: "https://x.com" }))).toEqual([])
  })

  it("drops non-http urls", () => {
    const raw = JSON.stringify([
      saved({ url: "javascript:alert(1)" }),
      saved({ url: "https://ok.example.com" }),
    ])

    expect(parseSavedJobs(raw)).toEqual([saved({ url: "https://ok.example.com" })])
  })
})

describe("isJobSaved", () => {
  it("matches by url", () => {
    const jobs = [saved({ url: "https://a.com" })]
    expect(isJobSaved(jobs, "https://a.com")).toBe(true)
    expect(isJobSaved(jobs, "https://b.com")).toBe(false)
  })
})

describe("toggleSavedJob", () => {
  it("adds a job at the front when it is not saved", () => {
    const existing = saved({ url: "https://old.com", title: "Antiga" })
    const next = toggleSavedJob([existing], job(), "2026-09-01T16:00:00.000Z")

    expect(next).toHaveLength(2)
    expect(next[0]).toMatchObject({
      url: job().url,
      savedAt: "2026-09-01T16:00:00.000Z",
    })
    expect(next[1]).toEqual(existing)
  })

  it("removes a job when it is already saved", () => {
    const item = job()
    const jobs = [saved({ url: item.url }), saved({ url: "https://other.com" })]

    expect(toggleSavedJob(jobs, item, "2026-09-01T16:00:00.000Z")).toEqual([
      saved({ url: "https://other.com" }),
    ])
  })

  it("does not save a non-http url", () => {
    const prev = [saved()]
    const next = toggleSavedJob(
      prev,
      job({ url: "javascript:alert(1)" }),
      "2026-09-01T16:00:00.000Z"
    )

    expect(next).toEqual(prev)
  })
})

describe("removeSavedJob", () => {
  it("removes only the matching url", () => {
    const jobs = [saved({ url: "https://keep.com" }), saved({ url: "https://drop.com" })]
    expect(removeSavedJob(jobs, "https://drop.com")).toEqual([saved({ url: "https://keep.com" })])
  })

  it("keeps the list unchanged when the url is missing", () => {
    const jobs = [saved()]
    expect(removeSavedJob(jobs, "https://missing.com")).toEqual(jobs)
  })
})
