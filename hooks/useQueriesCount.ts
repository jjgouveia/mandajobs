import { useCallback, useEffect, useState } from "react"

async function fetchQueriesCount(options?: { bypassCache?: boolean }): Promise<number | null> {
  try {
    const response = await fetch("/api/queries-count", options?.bypassCache ? { cache: "no-store" } : undefined)
    if (!response.ok) return null

    const data = await response.json()
    const count = data?.count
    if (typeof count !== "number" || !Number.isFinite(count)) return null

    return count
  } catch (error) {
    console.error("Erro ao buscar contagem de consultas:", error)
    return null
  }
}

export function useQueriesCount() {
  const [count, setCount] = useState<number | null>(null)

  const refresh = useCallback(async () => {
    const value = await fetchQueriesCount({ bypassCache: true })
    if (value !== null) setCount(value)
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  return { count, refresh }
}
