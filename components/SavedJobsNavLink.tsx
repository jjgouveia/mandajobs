"use client"

import Link from "next/link"
import { useSavedJobs } from "../hooks/useSavedJobs"

export function SavedJobsNavLink() {
  const { savedJobs } = useSavedJobs()

  return (
    <Link
      href="/#vagas-salvas"
      className="no-underline text-brutalist-ink hover:text-brutalist-blue inline-flex items-center gap-2"
    >
      Vagas salvas
      {savedJobs.length > 0 ? (
        <span className="font-display text-[10px] font-bold uppercase bg-brutalist-ink text-brutalist-yellow px-1.5 py-0.5 min-w-[1.25rem] text-center">
          {savedJobs.length}
        </span>
      ) : null}
    </Link>
  )
}
