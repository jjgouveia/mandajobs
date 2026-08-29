import { describe, expect, it } from "vitest"
import {
  buildShareableSearchParams,
  parseShareableSearchParams,
} from "@/lib/shareable-form-url"

describe("shareable-form-url", () => {
  it("builds and parses params", () => {
    const params = buildShareableSearchParams({
      title: "frontend",
      tools: "react, node",
      toolsIdontUse: "php",
      level: "Pleno",
      workMode: "remoto",
      language: "pt",
      location: "Brasil",
    })

    expect(params.get("cargo")).toBe("frontend")
    expect(params.get("stack")).toBe("react, node")
    expect(params.get("modalidade")).toBe("remoto")

    const parsed = parseShareableSearchParams(params)
    expect(parsed.title).toBe("frontend")
    expect(parsed.level).toBe("Pleno")
    expect(parsed.workMode).toBe("remoto")
    expect(parsed.language).toBe("pt")
  })

  it("supports legacy remoto=1", () => {
    const parsed = parseShareableSearchParams("?remoto=1&cargo=backend")
    expect(parsed.workMode).toBe("remoto")
    expect(parsed.title).toBe("backend")
  })
})
