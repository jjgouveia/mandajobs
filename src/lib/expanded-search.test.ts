import { describe, expect, it } from "vitest"
import {
  getPrimaryBooleanQuery,
  toWebSearchQuery,
  isBrazilJobResult,
  isInternationalJobResult,
  buildWebSearchQuery,
} from "@/lib/expanded-search"

describe("getPrimaryBooleanQuery", () => {
  it("extracts first numbered alternative", () => {
    const raw = "1. (React) AND Junior\n2. (Frontend) AND React"
    expect(getPrimaryBooleanQuery(raw)).toBe("(React) AND Junior")
  })

  it("returns single query as-is", () => {
    expect(getPrimaryBooleanQuery("(React OR Vue) AND Senior")).toBe(
      "(React OR Vue) AND Senior"
    )
  })
})

describe("toWebSearchQuery", () => {
  it("converts boolean operators", () => {
    expect(toWebSearchQuery("React AND Node NOT php")).toBe("React Node -php")
  })
})

describe("region filters", () => {
  it("detects Brazil job boards", () => {
    expect(
      isBrazilJobResult({
        title: "Dev React",
        url: "https://www.gupy.io/jobs/123",
        snippet: "Vaga remota",
      })
    ).toBe(true)
  })

  it("rejects .br hosts for international", () => {
    expect(
      isInternationalJobResult({
        title: "Dev",
        url: "https://vagas.com.br/job/1",
        snippet: "São Paulo",
      })
    ).toBe(false)
  })
})

describe("buildWebSearchQuery", () => {
  it("appends Brazil region suffix", () => {
    const q = buildWebSearchQuery("(React) AND Junior", "br")
    expect(q).toContain("Brasil")
    expect(q).toContain("React")
  })
})
