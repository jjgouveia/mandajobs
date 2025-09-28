"use client"

import { useState, useEffect } from "react"
import { Star, ExternalLink } from "lucide-react"
import Link from "next/link"

interface RepoStarsCountProps {
  user: string
  repo: string
}

export default function RepoStarsCount({ user, repo }: RepoStarsCountProps) {
  const [stars, setStars] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${user}/${repo}`)
        const data = await response.json()
        setStars(data.stargazers_count)
      } catch (error) {
        console.error("Error fetching stars:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStars()
  }, [user, repo])

  return (
    <Link
      href={`https://github.com/${user}/${repo}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200"
      aria-label={`${repo} repository on GitHub`}
      title={`${repo} repository on GitHub`}
    >
      <Star className="w-4 h-4 text-gray-400 group-hover:text-yellow-400 transition-colors" />
      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
        {loading ? "..." : stars?.toLocaleString() || "0"}
      </span>
      <ExternalLink className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  )
}
