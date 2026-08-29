export type WorkMode = "remoto" | "hibrido" | "presencial" | "any"
export type LanguagePref = "pt" | "en" | "both"
export type LevelType = "Junior" | "Pleno" | "Senior" | "Estagiário"

export interface JobPreset {
  id: string
  label: string
  title: string
  tools: string
}

export const JOB_PRESETS: JobPreset[] = [
  {
    id: "frontend",
    label: "Frontend",
    title: "frontend",
    tools: "react, typescript, javascript, css, html",
  },
  {
    id: "backend",
    label: "Backend",
    title: "backend",
    tools: "node, java, python, sql, api",
  },
  {
    id: "devops",
    label: "DevOps",
    title: "devops",
    tools: "aws, docker, kubernetes, terraform, linux",
  },
  {
    id: "data",
    label: "Data",
    title: "data engineer",
    tools: "python, sql, spark, airflow, aws",
  },
  {
    id: "mobile",
    label: "Mobile",
    title: "mobile",
    tools: "react native, flutter, kotlin, swift",
  },
  {
    id: "qa",
    label: "QA",
    title: "qa",
    tools: "selenium, cypress, jest, api testing",
  },
]

export function isLevelType(value: unknown): value is LevelType {
  return value === "Junior" || value === "Pleno" || value === "Senior" || value === "Estagiário"
}

export function isWorkMode(value: unknown): value is WorkMode {
  return value === "remoto" || value === "hibrido" || value === "presencial" || value === "any"
}

export function isLanguagePref(value: unknown): value is LanguagePref {
  return value === "pt" || value === "en" || value === "both"
}

export function coerceWorkMode(value: unknown): WorkMode {
  return isWorkMode(value) ? value : "any"
}

export function coerceLanguagePref(value: unknown): LanguagePref {
  return isLanguagePref(value) ? value : "both"
}

/** Maps UI/URL level strings to LevelType (handles accents and casing). */
export function parseLevelType(value: unknown): LevelType | null {
  if (typeof value !== "string" || !value.trim()) return null
  const normalized = value.trim().toLowerCase()
  if (normalized === "junior") return "Junior"
  if (normalized === "pleno") return "Pleno"
  if (normalized === "senior") return "Senior"
  if (normalized === "estagiário" || normalized === "estagiario") return "Estagiário"
  const capitalized = `${value.trim().charAt(0).toUpperCase()}${value.trim().slice(1)}`
  return isLevelType(capitalized) ? capitalized : null
}
