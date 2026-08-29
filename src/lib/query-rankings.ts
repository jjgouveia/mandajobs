import {
  formatSeniorityLabel,
  normalizePosition,
  parseCommaSeparatedList,
} from "@/lib/parse-search-fields"

export interface RankingItem {
  label: string
  count: number
  percentage: number
}

export interface SearchRankings {
  totalQueries: number
  year: number | null
  availableYears: number[]
  positions: RankingItem[]
  technologies: RankingItem[]
  avoidedTechnologies: RankingItem[]
  seniority: RankingItem[]
}

export interface StoredQueryRecord {
  title?: string
  tools?: string
  toolsIdontUse?: string
  level?: string
}

const DEFAULT_LIMIT = 8

function incrementCount(map: Map<string, number>, key: string, amount = 1): void {
  if (!key) return
  map.set(key, (map.get(key) ?? 0) + amount)
}

function toRankingItems(map: Map<string, number>, total: number, limit = DEFAULT_LIMIT): RankingItem[] {
  return [...map.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "pt-BR"))
    .slice(0, limit)
    .map(([label, count]) => ({
      label,
      count,
      percentage: total > 0 ? Math.round((count / total) * 1000) / 10 : 0,
    }))
}

export function buildSearchRankings(
  records: StoredQueryRecord[],
  options: { year?: number | null; availableYears?: number[] } = {}
): SearchRankings {
  const positions = new Map<string, number>()
  const technologies = new Map<string, number>()
  const avoidedTechnologies = new Map<string, number>()
  const seniority = new Map<string, number>()

  let technologyMentions = 0
  let avoidedMentions = 0

  for (const record of records) {
    const position = normalizePosition(record.title)
    if (position) incrementCount(positions, position)

    const levelLabel = formatSeniorityLabel(record.level)
    incrementCount(seniority, levelLabel)

    for (const tool of parseCommaSeparatedList(record.tools)) {
      incrementCount(technologies, tool)
      technologyMentions += 1
    }

    for (const tool of parseCommaSeparatedList(record.toolsIdontUse)) {
      incrementCount(avoidedTechnologies, tool)
      avoidedMentions += 1
    }
  }

  const totalQueries = records.length

  return {
    totalQueries,
    year: options.year ?? null,
    availableYears: options.availableYears ?? [],
    positions: toRankingItems(positions, totalQueries),
    technologies: toRankingItems(technologies, technologyMentions || totalQueries),
    avoidedTechnologies: toRankingItems(avoidedTechnologies, avoidedMentions || totalQueries),
    seniority: toRankingItems(seniority, totalQueries),
  }
}
