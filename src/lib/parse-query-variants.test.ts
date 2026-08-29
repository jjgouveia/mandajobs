import { describe, expect, it } from "vitest"
import {
  parseQueryVariants,
  getPrimaryQuery,
  normalizeQueryVariants,
  dedupeQueryVariants,
} from "@/lib/parse-query-variants"

describe("parseQueryVariants", () => {
  it("parses numbered alternatives", () => {
    const raw = `1. (React OR Vue) AND Junior
2. Backend AND Node AND Senior`
    expect(parseQueryVariants(raw)).toEqual([
      "(React OR Vue) AND Junior",
      "Backend AND Node AND Senior",
    ])
  })

  it("returns single query", () => {
    expect(parseQueryVariants("(Node) AND Senior")).toEqual([
      "(Node) AND Senior",
    ])
  })

  it("strips markdown fences", () => {
    const raw = "```\n1. React AND Junior\n2. Vue AND Junior\n```"
    const variants = parseQueryVariants(raw)
    expect(variants.length).toBeGreaterThanOrEqual(1)
    expect(variants[0]).toContain("React")
  })

  it("drops near-duplicate numbered variants", () => {
    const raw = `1. ("Desenvolvedor Frontend" OR "Programador Front-end") AND (Junior OR Jr) AND (React OR TypeScript) AND (presencial OR on-site)
2. ("Desenvolvedor Web" OR "Frontend") AND (Junior OR Jr) AND (React OR TypeScript) AND (presencial OR on-site)`
    const variants = parseQueryVariants(raw)
    expect(variants).toHaveLength(1)
  })
})

describe("dedupeQueryVariants", () => {
  it("keeps meaningfully different variants", () => {
    expect(
      dedupeQueryVariants([
        "Frontend AND React AND Junior",
        "Backend AND Node AND Senior",
      ])
    ).toHaveLength(2)
  })
})

describe("getPrimaryQuery", () => {
  it("returns first variant", () => {
    expect(getPrimaryQuery(["a", "b"])).toBe("a")
  })

  it("returns empty for empty list", () => {
    expect(getPrimaryQuery([])).toBe("")
  })
})

describe("normalizeQueryVariants", () => {
  it("prefers structured variants", () => {
    const result = normalizeQueryVariants(["  React AND Junior  "], "ignored")
    expect(result.primary).toBe("React AND Junior")
    expect(result.variants).toHaveLength(1)
  })

  it("falls back to raw parse", () => {
    const result = normalizeQueryVariants([], "1. A AND React\n2. B AND Node AND Senior")
    expect(result.variants.length).toBeGreaterThanOrEqual(1)
  })
})
