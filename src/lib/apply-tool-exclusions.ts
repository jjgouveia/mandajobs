import { parseCommaSeparatedList } from "@/lib/parse-search-fields"

function buildExclusionClause(toolsIdontUse: string): string | null {
  const tools = parseCommaSeparatedList(toolsIdontUse)
  if (tools.length === 0) return null

  const clauses = tools.map((tool) => {
    const needsQuotes = tool.includes(" ") || tool.startsWith(".")
    return needsQuotes ? `NOT "${tool}"` : `NOT ${tool}`
  })

  return `(${clauses.join(" AND ")})`
}

function appendExclusions(section: string, exclusionClause: string): string {
  const trimmed = section.trimEnd()
  if (!trimmed) return trimmed

  const normalizedSection = trimmed.toLowerCase()
  const alreadyExcluded = exclusionClause
    .replace(/[()]/g, "")
    .split(" AND ")
    .every((clause) => normalizedSection.includes(clause.toLowerCase()))

  if (alreadyExcluded) return trimmed

  return `${trimmed} AND ${exclusionClause}`
}

export function applyToolExclusionsToQuery(booleanQuery: string, toolsIdontUse: string): string {
  const exclusionClause = buildExclusionClause(toolsIdontUse)
  if (!exclusionClause) return booleanQuery

  const numberedSections = booleanQuery.split(/(?=\d+\.\s)/).filter((part) => part.trim())

  if (numberedSections.length > 1) {
    return numberedSections.map((section) => appendExclusions(section, exclusionClause)).join("")
  }

  return appendExclusions(booleanQuery, exclusionClause)
}
