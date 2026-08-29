const LIST_SPLIT_PATTERN = /[,;/|]|\s+e\s+|\s+and\s+/i

export function parseCommaSeparatedList(value: string | undefined | null): string[] {
  if (!value?.trim()) return []

  return value
    .split(LIST_SPLIT_PATTERN)
    .map((item) => normalizeSearchToken(item))
    .filter((item) => item.length > 0)
}

export function normalizeSearchToken(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ")
}

export function normalizePosition(value: string | undefined | null): string {
  if (!value?.trim()) return ""
  return normalizeSearchToken(value)
}

export function formatSeniorityLabel(level: string | undefined | null): string {
  const normalized = normalizeSearchToken(level ?? "")

  const labels: Record<string, string> = {
    junior: "Junior",
    pleno: "Pleno",
    senior: "Senior",
    estagiario: "Estagiário",
    "estagiário": "Estagiário",
    intern: "Estagiário",
    medium: "Pleno",
  }

  return labels[normalized] ?? level?.trim() ?? "Outro"
}
