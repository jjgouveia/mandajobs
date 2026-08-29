/**
 * Parses AI-generated LinkedIn boolean queries into clean variant strings.
 */

export interface ParsedQueryResult {
  variants: string[]
  primary: string
}

/** Drop a second variant when it is nearly identical to the first (token Jaccard). */
const NEAR_DUPLICATE_THRESHOLD = 0.72

function stripMarkdownAndQuotes(raw: string): string {
  const withoutFences = raw.replace(/```(?:\w+)?\n?([\s\S]*?)```/g, "$1")
  return withoutFences.replace(/^["'`]+|["'`]+$/g, "").trim()
}

function cleanVariantLine(line: string): string {
  return line
    .replace(/^\s*\d+[.)]\s*/i, "")
    .replace(/^[-*]\s+/, "")
    .trim()
}

function tokenizeQuery(query: string): Set<string> {
  return new Set(
    query
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[()"[\]']/g, " ")
      .replace(/-/g, " ")
      .split(/\s+/)
      .map((token) => token.trim())
      .filter((token) => token.length > 0 && token !== "and" && token !== "or" && token !== "not")
  )
}

function jaccardSimilarity(a: string, b: string): number {
  const setA = tokenizeQuery(a)
  const setB = tokenizeQuery(b)
  if (setA.size === 0 && setB.size === 0) return 1
  if (setA.size === 0 || setB.size === 0) return 0

  let intersection = 0
  for (const token of setA) {
    if (setB.has(token)) intersection += 1
  }

  const union = setA.size + setB.size - intersection
  return union === 0 ? 0 : intersection / union
}

/**
 * Removes the leading title OR-group so we can compare seniority/stack/work-mode tails.
 * e.g. ("Frontend" OR "Front-end") AND (Junior) AND (React) → (Junior) AND (React)
 */
function stripLeadingTitleGroup(query: string): string {
  return query
    .replace(/^\s*\([^)]*\)\s*(?:AND\s*)?/i, "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
}

function areNearDuplicateVariants(a: string, b: string): boolean {
  const tailA = stripLeadingTitleGroup(a)
  const tailB = stripLeadingTitleGroup(b)
  if (tailA.length > 0 && tailA === tailB) return true
  return jaccardSimilarity(a, b) >= NEAR_DUPLICATE_THRESHOLD
}

/**
 * Keeps at most two variants and drops near-duplicates of the primary.
 */
export function dedupeQueryVariants(variants: string[]): string[] {
  if (variants.length <= 1) return variants

  const [primary, ...rest] = variants
  const unique = [primary]

  for (const candidate of rest) {
    if (unique.length >= 2) break
    const tooSimilar = unique.some((kept) => areNearDuplicateVariants(kept, candidate))
    if (!tooSimilar) unique.push(candidate)
  }

  return unique
}

/**
 * Extracts 1–2 boolean query variants from free-form AI output.
 * Supports numbered lists (1. / 2.), newlines, or a single blob.
 */
export function parseQueryVariants(raw: string): string[] {
  const cleaned = stripMarkdownAndQuotes(raw)
  if (!cleaned) return []

  const numberedParts = cleaned
    .split(/(?=\d+[.)]\s)/)
    .map((part) => cleanVariantLine(part))
    .filter((part) => part.length > 0)

  if (numberedParts.length > 1) {
    return dedupeQueryVariants(numberedParts.slice(0, 2))
  }

  const lines = cleaned
    .split(/\n+/)
    .map((line) => cleanVariantLine(line))
    .filter((line) => line.length > 0 && /[A-Za-z(]/.test(line))

  if (lines.length > 1) {
    return dedupeQueryVariants(lines.slice(0, 2))
  }

  if (numberedParts.length === 1) {
    return [numberedParts[0]]
  }

  if (lines.length === 1) {
    return [lines[0]]
  }

  return cleaned ? [cleaned] : []
}

export function getPrimaryQuery(variants: string[]): string {
  return variants[0]?.trim() ?? ""
}

export function toParsedQueryResult(raw: string): ParsedQueryResult {
  const variants = parseQueryVariants(raw)
  return {
    variants,
    primary: getPrimaryQuery(variants),
  }
}

/**
 * Normalizes structured variants from the API / Genkit, with free-form fallback.
 */
export function normalizeQueryVariants(
  variants: string[] | undefined,
  fallbackRaw?: string
): ParsedQueryResult {
  const cleaned = dedupeQueryVariants(
    (variants ?? [])
      .map((v) => cleanVariantLine(stripMarkdownAndQuotes(v)))
      .filter((v) => v.length > 0)
      .slice(0, 2)
  )

  if (cleaned.length > 0) {
    return { variants: cleaned, primary: getPrimaryQuery(cleaned) }
  }

  if (fallbackRaw) {
    return toParsedQueryResult(fallbackRaw)
  }

  return { variants: [], primary: "" }
}
