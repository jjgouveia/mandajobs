"use client"

import { Info } from "lucide-react"

interface QueryCountWithTooltipProps {
  count: number | null
}

const TOOLTIP_TEXT =
  "Este número conta só as consultas salvas depois da migração para o Firebase. O histórico antigo ficou no Supabase, e perdemos acesso a esse projeto. O Manda Jobs também ficou parado um tempo enquanto eu estava 100% na Ativos. Por isso o total parece baixo."

export function QueryCountWithTooltip({ count }: QueryCountWithTooltipProps) {
  return (
    <span className="inline-flex items-center gap-1.5 flex-wrap justify-center">
      <strong className="text-brutalist-ink">{count !== null ? count.toLocaleString("pt-BR") : "..."}</strong>
      <span className="group relative inline-flex">
        <button
          type="button"
          className="inline-flex items-center justify-center w-5 h-5 border-[2px] border-brutalist-ink/30 bg-white text-brutalist-ink/60 hover:text-brutalist-ink hover:border-brutalist-ink transition-colors"
          aria-label="Por que o número de consultas é baixo?"
        >
          <Info className="w-3 h-3" aria-hidden="true" />
        </button>
        <span
          role="tooltip"
          className="pointer-events-none absolute bottom-[calc(100%+0.5rem)] left-1/2 z-20 w-64 -translate-x-1/2 border-[3px] border-brutalist-ink bg-white px-3 py-2 text-left text-xs leading-relaxed text-brutalist-ink shadow-brutal opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
        >
          {TOOLTIP_TEXT}
        </span>
      </span>
      <span>consultas geradas</span>
    </span>
  )
}
