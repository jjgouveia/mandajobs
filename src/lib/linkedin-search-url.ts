const BRAZIL_GEO_ID = "106057199"

export interface LinkedInSearchOptions {
  location?: string
  geoId?: string
}

/**
 * Builds a LinkedIn Jobs search URL with a properly encoded boolean query.
 */
export function buildLinkedInJobsUrl(
  query: string,
  options: LinkedInSearchOptions = {}
): string {
  const keywords = query.trim()
  const location = (options.location?.trim() || "Brasil")
  const geoId = options.geoId ?? BRAZIL_GEO_ID

  const params = new URLSearchParams({
    keywords,
    location,
    geoId,
    refresh: "true",
  })

  return `https://www.linkedin.com/jobs/search/?${params.toString()}`
}
