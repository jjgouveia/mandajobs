"use client"

import { Bookmark, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useSavedJobs } from "../hooks/useSavedJobs"

function formatSavedAt(isoDate: string): string {
  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) return "Data não informada"

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
  }).format(date)
}

export function SavedJobsSection() {
  const { savedJobs, removeSaved } = useSavedJobs()

  return (
    <section id="vagas-salvas" className="border-t-[3px] border-brutalist-ink mt-14 pt-10 scroll-mt-24">
      <div className="flex items-center gap-2 mb-1">
        <Bookmark className="w-5 h-5" />
        <h2 className="font-display text-xl font-bold uppercase">Vagas salvas</h2>
        {savedJobs.length > 0 ? (
          <span className="font-display text-xs font-bold uppercase bg-brutalist-ink text-brutalist-yellow border-[2px] border-brutalist-ink px-2 py-0.5">
            {savedJobs.length}
          </span>
        ) : null}
      </div>

      {savedJobs.length === 0 ? (
        <p className="text-sm text-brutalist-ink/60 max-w-xl">
          Nenhuma vaga salva ainda. Use o ícone de marcador nos resultados da busca ampliada na web.
        </p>
      ) : (
        <ul className="mt-6 space-y-3">
          {savedJobs.map((job) => (
            <li
              key={job.url}
              className="border-[3px] border-brutalist-ink bg-white p-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4"
            >
              <div className="min-w-0 space-y-2">
                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium leading-snug hover:underline inline-flex items-start gap-2"
                >
                  <span>{job.title}</span>
                  <ExternalLink className="w-4 h-4 shrink-0 text-brutalist-ink/40 mt-0.5" />
                </a>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="rounded-none border-[3px] border-brutalist-ink bg-brutalist-paper text-brutalist-ink">
                    {job.source}
                  </Badge>
                  <span className="text-brutalist-ink/50 text-xs">Salva em {formatSavedAt(job.savedAt)}</span>
                </div>
                {job.snippet ? (
                  <p className="text-brutalist-ink/60 text-sm leading-relaxed line-clamp-2">{job.snippet}</p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => removeSaved(job.url)}
                className="font-display text-xs font-bold uppercase border-[3px] border-brutalist-ink px-3 py-1.5 bg-white hover:bg-brutalist-pink transition-colors shrink-0 self-start"
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
