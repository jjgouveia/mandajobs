"use client"

import { useState, type KeyboardEvent } from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { parseCommaSeparatedList, normalizeSearchToken } from "@/lib/parse-search-fields"

interface TagInputProps {
  id: string
  value: string
  onChange: (csv: string) => void
  placeholder?: string
  className?: string
}

export function TagInput({ id, value, onChange, placeholder, className }: TagInputProps) {
  const tags = parseCommaSeparatedList(value)
  const [draft, setDraft] = useState("")

  function commitTag(raw: string) {
    const nextTag = normalizeSearchToken(raw)
    if (!nextTag) return
    if (tags.includes(nextTag)) {
      setDraft("")
      return
    }
    onChange([...tags, nextTag].join(", "))
    setDraft("")
  }

  function removeTag(tag: string) {
    onChange(tags.filter((t) => t !== tag).join(", "))
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault()
      commitTag(draft.replace(/,/g, ""))
      return
    }

    if (event.key === "Backspace" && draft === "" && tags.length > 0) {
      event.preventDefault()
      removeTag(tags[tags.length - 1])
    }
  }

  function handleBlur() {
    if (draft.trim()) commitTag(draft)
  }

  return (
    <div
      className={`flex flex-wrap items-center gap-2 rounded-none border-[3px] border-brutalist-ink bg-white px-3 py-2 focus-within:border-brutalist-blue ${className ?? ""}`}
    >
      {tags.map((tag) => (
        <Badge
          key={tag}
          className="rounded-none border-[2px] border-brutalist-ink bg-brutalist-paper text-brutalist-ink font-display text-xs uppercase gap-1 pr-1"
        >
          {tag}
          <button
            type="button"
            aria-label={`Remover ${tag}`}
            onClick={() => removeTag(tag)}
            className="ml-1 hover:text-brutalist-pink"
          >
            <X className="w-3 h-3" />
          </button>
        </Badge>
      ))}
      <input
        id={id}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder={tags.length === 0 ? placeholder : "Adicionar..."}
        className="flex-1 min-w-[120px] bg-transparent border-0 outline-none text-base placeholder:text-brutalist-ink/40 py-2"
      />
    </div>
  )
}
