import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
  type Firestore,
  type Query,
  type QueryConstraint,
  type QueryDocumentSnapshot,
  type QuerySnapshot,
} from "firebase/firestore"
import type { StoredQueryRecord } from "@/lib/query-rankings"

const PAGE_SIZE = 500

export interface FetchedQueryRecords {
  records: StoredQueryRecord[]
  availableYears: number[]
}

function toDate(value: unknown): Date | null {
  if (!value) return null
  if (value instanceof Date) return value
  if (typeof value === "object" && value !== null && "toDate" in value) {
    const timestamp = value as { toDate: () => Date }
    return timestamp.toDate()
  }
  return null
}

function mapDocToRecord(data: Record<string, unknown>): StoredQueryRecord {
  return {
    title: typeof data.title === "string" ? data.title : "",
    tools: typeof data.tools === "string" ? data.tools : "",
    toolsIdontUse: typeof data.toolsIdontUse === "string" ? data.toolsIdontUse : "",
    level: typeof data.level === "string" ? data.level : "",
  }
}

function getYearBounds(year: number): { start: Date; end: Date } {
  return {
    start: new Date(year, 0, 1, 0, 0, 0, 0),
    end: new Date(year, 11, 31, 23, 59, 59, 999),
  }
}

function buildQuery(
  collectionRef: ReturnType<typeof collection>,
  year: number | null,
  lastDoc: QueryDocumentSnapshot | null
): Query {
  const constraints: QueryConstraint[] = []

  if (year !== null) {
    const { start, end } = getYearBounds(year)
    constraints.push(where("timestamp", ">=", start), where("timestamp", "<=", end))
  }

  constraints.push(orderBy("timestamp", "desc"), limit(PAGE_SIZE))

  if (lastDoc) {
    constraints.push(startAfter(lastDoc))
  }

  return query(collectionRef, ...constraints)
}

export async function fetchAllQueryRecords(
  db: Firestore,
  year: number | null = null
): Promise<FetchedQueryRecords> {
  const collectionRef = collection(db, "queries")
  const records: StoredQueryRecord[] = []
  const years = new Set<number>()
  let lastDoc: QueryDocumentSnapshot | null = null

  while (true) {
    const snapshot: QuerySnapshot = await getDocs(buildQuery(collectionRef, year, lastDoc))
    if (snapshot.empty) break

    for (const doc of snapshot.docs) {
      const data = doc.data()
      const date = toDate(data.timestamp)

      if (date) {
        years.add(date.getFullYear())
      }

      records.push(mapDocToRecord(data))
    }

    lastDoc = snapshot.docs[snapshot.docs.length - 1] ?? null
    if (snapshot.docs.length < PAGE_SIZE) break
  }

  return {
    records,
    availableYears: [...years].sort((a, b) => b - a),
  }
}

export function parseYearParam(value: string | string[] | undefined): number | null {
  if (!value || value === "all") return null

  const raw = Array.isArray(value) ? value[0] : value
  const year = Number(raw)

  if (!Number.isInteger(year) || year < 2000 || year > 2100) return null

  return year
}
