import { describe, expect, it } from "vitest"
import {
  parseCommaSeparatedList,
  normalizePosition,
  formatSeniorityLabel,
} from "@/lib/parse-search-fields"

describe("parseCommaSeparatedList", () => {
  it("splits by commas and normalizes", () => {
    expect(parseCommaSeparatedList("React, Node,  AWS")).toEqual([
      "react",
      "node",
      "aws",
    ])
  })

  it("handles empty input", () => {
    expect(parseCommaSeparatedList("")).toEqual([])
    expect(parseCommaSeparatedList(null)).toEqual([])
  })

  it("splits by e / and", () => {
    expect(parseCommaSeparatedList("react e node and python")).toEqual([
      "react",
      "node",
      "python",
    ])
  })
})

describe("normalizePosition", () => {
  it("lowercases and trims", () => {
    expect(normalizePosition("  Frontend Dev  ")).toBe("frontend dev")
  })
})

describe("formatSeniorityLabel", () => {
  it("maps known levels", () => {
    expect(formatSeniorityLabel("junior")).toBe("Junior")
    expect(formatSeniorityLabel("medium")).toBe("Pleno")
    expect(formatSeniorityLabel("intern")).toBe("Estagiário")
  })
})
