import { describe, expect, it } from "vitest"
import { buildLinkedInJobsUrl } from "@/lib/linkedin-search-url"

describe("buildLinkedInJobsUrl", () => {
  it("encodes keywords and sets defaults", () => {
    const url = buildLinkedInJobsUrl('(React OR Node) AND "Junior"')
    const parsed = new URL(url)

    expect(parsed.origin + parsed.pathname).toBe("https://www.linkedin.com/jobs/search/")
    expect(parsed.searchParams.get("keywords")).toBe('(React OR Node) AND "Junior"')
    expect(parsed.searchParams.get("location")).toBe("Brasil")
    expect(parsed.searchParams.has("currentJobId")).toBe(false)
  })

  it("accepts custom location", () => {
    const url = buildLinkedInJobsUrl("React", { location: "São Paulo" })
    const parsed = new URL(url)
    expect(parsed.searchParams.get("location")).toBe("São Paulo")
  })
})
