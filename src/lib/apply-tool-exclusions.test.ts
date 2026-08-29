import { describe, expect, it } from "vitest"
import { applyToolExclusionsToQuery } from "@/lib/apply-tool-exclusions"

describe("applyToolExclusionsToQuery", () => {
  it("returns original query when no exclusions", () => {
    const query = '(React OR Node) AND "Frontend"'
    expect(applyToolExclusionsToQuery(query, "")).toBe(query)
  })

  it("appends NOT clauses for tools", () => {
    const result = applyToolExclusionsToQuery(
      '(React OR Node) AND Frontend',
      "php, ruby"
    )
    expect(result).toContain("NOT php")
    expect(result).toContain("NOT ruby")
  })

  it("quotes tools that need quotes", () => {
    const result = applyToolExclusionsToQuery("React", ".net, spring boot")
    expect(result).toContain('NOT ".net"')
    expect(result).toContain('NOT "spring boot"')
  })

  it("applies exclusions to numbered sections", () => {
    const result = applyToolExclusionsToQuery(
      "1. React AND Junior\n2. Frontend AND React",
      "php"
    )
    expect(result).toMatch(/1\..*NOT php/)
    expect(result).toMatch(/2\..*NOT php/)
  })
})
