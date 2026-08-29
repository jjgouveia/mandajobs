import { useCallback, useRef, useState, type ReactNode } from "react"
import { toast } from "react-hot-toast"
import { Bookmark, BookmarkCheck, CalendarDays, ChevronDown, ExternalLink, Globe2, SearchIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { ExpandedSearchItem, SearchRegion, SearchWindowDays } from "@/lib/expanded-search"
import { trackExpandedSearchRun } from "@/lib/analytics-events"
import { useSavedJobs } from "../hooks/useSavedJobs"

interface ExpandedSearchProps {
  query: string
}

const DAY_OPTIONS: SearchWindowDays[] = [7, 15, 30]

function formatPublishedAt(isoDate: string | null): string {
  if (!isoDate) return "Data não informada"
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(isoDate))
}

function FilterChip({
  isActive,
  onClick,
  children,
}: {
  isActive: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`font-display text-xs font-bold uppercase border-[3px] border-brutalist-ink px-3 py-1.5 transition-colors ${
        isActive ? "bg-brutalist-ink text-brutalist-yellow" : "bg-white text-brutalist-ink hover:bg-brutalist-paper"
      }`}
    >
      {children}
    </button>
  )
}

export function ExpandedSearch({ query }: ExpandedSearchProps) {
  const [days, setDays] = useState<SearchWindowDays>(7)
  const [region, setRegion] = useState<SearchRegion>("br")
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [items, setItems] = useState<ExpandedSearchItem[]>([])
  const [showSaved, setShowSaved] = useState(false)
  const requestIdRef = useRef(0)
  const { savedJobs, isSaved, toggleSave, removeSaved } = useSavedJobs()

  const expandSearch = useCallback(async () => {
    const requestId = ++requestIdRef.current
    setIsLoading(true)

    try {
      const response = await fetch("/api/expand-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, days, region }),
      })

      if (requestId !== requestIdRef.current) return

      const data = await response.json()

      if (requestId !== requestIdRef.current) return

      if (!response.ok) {
        toast.error(data.error || "Não foi possível ampliar a busca")
        return
      }

      const nextItems: ExpandedSearchItem[] = data.items ?? []
      setItems(nextItems)
      setHasSearched(true)
      trackExpandedSearchRun({
        region,
        days,
        resultCount: nextItems.length,
      })
    } catch (error) {
      if (requestId !== requestIdRef.current) return
      console.error(error)
      toast.error("Falha ao processar a busca ampliada")
    } finally {
      if (requestId === requestIdRef.current) {
        setIsLoading(false)
      }
    }
  }, [query, days, region])

  return (
    <div className="space-y-4 border-[3px] border-brutalist-ink bg-brutalist-paper p-4">
      <div>
        <p className="font-display font-bold text-sm uppercase">Ampliar busca na web</p>
        <p className="text-brutalist-ink/60 text-sm mt-1">
          Usa a mesma query no Google, com filtro de período e região.
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <CalendarDays className="w-4 h-4 text-brutalist-ink/50" />
          {DAY_OPTIONS.map((option) => (
            <FilterChip key={option} isActive={days === option} onClick={() => setDays(option)}>
              {option} dias
            </FilterChip>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Globe2 className="w-4 h-4 text-brutalist-ink/50" />
          <FilterChip isActive={region === "br"} onClick={() => setRegion("br")}>
            Vagas no Brasil
          </FilterChip>
          <FilterChip isActive={region === "intl"} onClick={() => setRegion("intl")}>
            Vagas na gringa
          </FilterChip>
        </div>
      </div>

      <Button
        type="button"
        onClick={() => void expandSearch()}
        disabled={isLoading}
        className="w-full rounded-none border-[3px] border-brutalist-ink bg-brutalist-yellow text-brutalist-ink hover:bg-brutalist-yellow/80 font-display font-bold uppercase py-3 transition-colors"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-brutalist-ink/30 border-t-brutalist-ink rounded-full animate-spin" />
            Buscando na web...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <SearchIcon className="w-5 h-5" />
            Ampliar busca
          </span>
        )}
      </Button>

      {hasSearched && items.length === 0 && (
        <p className="text-brutalist-ink/60 text-sm text-center py-2">
          Nenhum resultado recente para esses filtros. Tente outro período ou região.
        </p>
      )}

      {items.length > 0 && (
        <ul className="space-y-3">
          {items.map((item) => {
            const saved = isSaved(item.url)
            return (
              <li key={item.url} className="relative">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border-[3px] border-brutalist-ink bg-white p-4 pr-12 hover:bg-brutalist-paper transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 space-y-1">
                      <p className="font-medium leading-snug">{item.title}</p>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className="rounded-none border-[3px] border-brutalist-ink bg-brutalist-paper text-brutalist-ink">
                          {item.source}
                        </Badge>
                        <span className="text-brutalist-ink/50 text-xs">{formatPublishedAt(item.publishedAt)}</span>
                      </div>
                      {item.snippet && (
                        <p className="text-brutalist-ink/60 text-sm leading-relaxed">{item.snippet}</p>
                      )}
                    </div>
                    <ExternalLink className="w-4 h-4 shrink-0 text-brutalist-ink/40 mt-1" />
                  </div>
                </a>
                <button
                  type="button"
                  aria-label={saved ? "Remover dos salvos" : "Salvar vaga"}
                  onClick={() => toggleSave(item)}
                  className="absolute top-3 right-3 p-1.5 border-[2px] border-brutalist-ink bg-white hover:bg-brutalist-yellow transition-colors"
                >
                  {saved ? (
                    <BookmarkCheck className="w-4 h-4 text-brutalist-ink" />
                  ) : (
                    <Bookmark className="w-4 h-4 text-brutalist-ink/50" />
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      )}

      {savedJobs.length > 0 && (
        <div className="border-t-[3px] border-brutalist-ink pt-4">
          <button
            type="button"
            onClick={() => setShowSaved((v) => !v)}
            className="w-full flex items-center justify-between font-display text-xs font-bold uppercase"
          >
            Vagas salvas ({savedJobs.length})
            <ChevronDown className={`w-4 h-4 transition-transform ${showSaved ? "rotate-180" : ""}`} />
          </button>
          {showSaved && (
            <ul className="mt-3 space-y-2">
              {savedJobs.map((job) => (
                <li
                  key={job.url}
                  className="flex items-start justify-between gap-2 border-[2px] border-brutalist-ink bg-white p-3"
                >
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium hover:underline min-w-0"
                  >
                    {job.title}
                  </a>
                  <button
                    type="button"
                    aria-label="Remover"
                    onClick={() => removeSaved(job.url)}
                    className="text-xs font-display font-bold uppercase text-brutalist-ink/50 hover:text-brutalist-ink shrink-0"
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
