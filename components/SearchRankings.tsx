"use client"

import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { RankingItem, SearchRankings as SearchRankingsData } from "@/lib/query-rankings"

function buildRankingsUrl(year: number | null): string {
  if (year === null) return "/api/search-rankings"
  return `/api/search-rankings?year=${year}`
}

const rankingsCache = new Map<string, Promise<SearchRankingsData>>()

function fetchSearchRankings(year: number | null): Promise<SearchRankingsData> {
  const key = year === null ? "all" : String(year)
  const cached = rankingsCache.get(key)
  if (cached) return cached

  const request = fetch(buildRankingsUrl(year))
    .then(async (response) => {
      if (!response.ok) throw new Error("Failed to load rankings")
      return response.json() as Promise<SearchRankingsData>
    })
    .catch((error) => {
      rankingsCache.delete(key)
      throw error
    })

  rankingsCache.set(key, request)
  return request
}

export function RankingHighlight() {
  const [topPosition, setTopPosition] = useState<string | null>(null)
  const [topTech, setTopTech] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    fetchSearchRankings(null)
      .then((data) => {
        if (!isMounted) return
        setTopPosition(data.positions[0]?.label ?? null)
        setTopTech(data.technologies[0]?.label ?? null)
      })
      .catch(() => {
        // highlight is optional
      })

    return () => {
      isMounted = false
    }
  }, [])

  if (!topPosition && !topTech) return null

  return (
    <p className="text-sm font-display font-bold uppercase text-brutalist-ink/70">
      {topTech ? (
        <>
          Stack #1: <span className="text-brutalist-ink capitalize">{topTech}</span>
        </>
      ) : null}
      {topTech && topPosition ? <span className="mx-2">·</span> : null}
      {topPosition ? (
        <>
          Cargo #1: <span className="text-brutalist-ink capitalize">{topPosition}</span>
        </>
      ) : null}
    </p>
  )
}

interface RankingColumnProps {
  title: string
  items: RankingItem[]
  emptyMessage: string
}

function RankingColumn({ title, items, emptyMessage }: RankingColumnProps) {
  return (
    <div className="border-[3px] border-brutalist-ink bg-white p-4">
      <h3 className="font-display text-sm font-bold uppercase mb-4">{title}</h3>

      {items.length === 0 ? (
        <p className="text-sm text-brutalist-ink/50">{emptyMessage}</p>
      ) : (
        <ol className="space-y-3">
          {items.map((item, index) => (
            <li key={`${title}-${item.label}`} className="flex items-start gap-3">
              <span className="font-display text-xs font-bold text-brutalist-blue w-5 shrink-0">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium capitalize truncate">{item.label}</span>
                  <span className="text-xs font-display font-bold text-brutalist-ink/50 shrink-0">
                    {item.count}
                  </span>
                </div>
                <div className="mt-1 h-2 border-[2px] border-brutalist-ink bg-brutalist-paper">
                  <div
                    className="h-full bg-brutalist-yellow"
                    style={{ width: `${Math.min(item.percentage, 100)}%` }}
                  />
                </div>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

function formatPeriodLabel(year: number | null): string {
  if (year === null) return "de todos os tempos"
  return `de ${year}`
}

export function SearchRankings() {
  const [rankings, setRankings] = useState<SearchRankingsData | null>(null)
  const [availableYears, setAvailableYears] = useState<number[]>([])
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    let isMounted = true

    async function loadRankings() {
      setIsLoading(true)

      try {
        const data = await fetchSearchRankings(selectedYear)
        if (!isMounted) return

        setRankings(data)
        setHasError(false)

        if (data.availableYears.length > 0) {
          setAvailableYears(data.availableYears)
        }
      } catch (error) {
        console.error("Erro ao carregar rankings:", error)
        if (isMounted) setHasError(true)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    loadRankings()
    return () => {
      isMounted = false
    }
  }, [selectedYear])

  if (hasError && !rankings) {
    return null
  }

  return (
    <section id="tendencias" className="border-t-[3px] border-brutalist-ink mt-14 pt-10">
      <div className="font-display text-xs font-bold uppercase text-brutalist-ink/50 mb-2">Tendências</div>

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display text-2xl font-bold uppercase mb-2">O que a comunidade mais busca</h2>
          <p className="text-sm text-brutalist-ink/60">
            {isLoading
              ? "Carregando rankings..."
              : `Rankings com base em ${rankings?.totalQueries.toLocaleString("pt-BR") ?? "0"} consultas ${formatPeriodLabel(selectedYear)}.`}
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="ranking-year" className="font-display text-xs font-bold uppercase block">
            Filtrar por ano
          </label>
          <Select
            value={selectedYear === null ? "all" : String(selectedYear)}
            onValueChange={(value) => setSelectedYear(value === "all" ? null : Number(value))}
          >
            <SelectTrigger
              id="ranking-year"
              className="w-44 rounded-none border-[3px] border-brutalist-ink bg-brutalist-yellow px-4 py-5 font-display font-bold focus:ring-0"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-none border-[3px] border-brutalist-ink">
              <SelectItem value="all">Todos os anos</SelectItem>
              {availableYears.map((year) => (
                <SelectItem key={year} value={String(year)}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {!isLoading && rankings && (
        <div className="grid sm:grid-cols-2 gap-4">
          <RankingColumn title="Cargos" items={rankings.positions} emptyMessage="Ainda sem dados de cargos." />
          <RankingColumn
            title="Senioridade"
            items={rankings.seniority}
            emptyMessage="Ainda sem dados de senioridade."
          />
          <RankingColumn
            title="Tecnologias usadas"
            items={rankings.technologies}
            emptyMessage="Ainda sem dados de tecnologias."
          />
          <RankingColumn
            title="Tecnologias evitadas"
            items={rankings.avoidedTechnologies}
            emptyMessage="Ninguém marcou tecnologias evitadas ainda."
          />
        </div>
      )}
    </section>
  )
}
