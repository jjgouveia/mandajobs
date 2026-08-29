import { track } from "@vercel/analytics/react"

type EventProps = Record<string, string | number | boolean | null | undefined>

function safeTrack(name: string, props?: EventProps) {
  try {
    const cleaned: Record<string, string | number | boolean> = {}
    if (props) {
      for (const [key, value] of Object.entries(props)) {
        if (value === null || value === undefined) continue
        cleaned[key] = value
      }
    }
    track(name, cleaned)
  } catch {
    // Analytics must never break the UX
  }
}

export function trackQueryGenerated(props: {
  level: string
  hasAvoidTools: boolean
  workMode: string
}) {
  safeTrack("query_generated", props)
}

export function trackQueryCopied(variantIndex: number) {
  safeTrack("query_copied", { variantIndex })
}

export function trackLinkedInOpened(source: "direct" | "modal") {
  safeTrack("linkedin_opened", { source })
}

export function trackExpandedSearchRun(props: {
  region: string
  days: number
  resultCount: number
}) {
  safeTrack("expanded_search_run", props)
}

export function trackJobSaved() {
  safeTrack("job_saved")
}

export function trackJobUnsaved() {
  safeTrack("job_unsaved")
}

export function trackPresetApplied(presetId: string) {
  safeTrack("preset_applied", { presetId })
}

export function trackShareLinkCopied() {
  safeTrack("share_link_copied")
}
