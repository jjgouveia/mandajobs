# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Manda Jobs is a Next.js (Pages Router) app that generates a LinkedIn boolean job-search query (`AND`/`OR`/`NOT`/`()`) from a user's job title, tools used/avoided, and seniority level, via a Google Gemini prompt orchestrated with Genkit. Content and UI copy are in Portuguese.

## Commands

```bash
npm run dev          # Next dev server
npm run dev-turbo    # Next dev with Turbopack, port 9002
npm run build        # Production build
npm run start        # Serve production build
npm run lint         # next lint
npm run typecheck    # tsc --noEmit
npm run genkit:dev   # Launch Genkit dev UI against src/ai/dev.ts (inspect/test AI flows directly)
npm run genkit:watch # Same, with watch mode
```

There is no test suite/framework configured in this repo.

`next.config.ts` sets `typescript.ignoreBuildErrors` and `eslint.ignoreDuringBuilds`, so `npm run build` succeeding does **not** mean the code typechecks or lints cleanly — run `typecheck` and `lint` explicitly.

Required env vars (see `.env.example`): `GEMINI_API_KEY` and the `FIREBASE_*` set (`FIREBASE_API_KEY`, `FIREBASE_AUTH_DOMAIN_KEY`, `FIREBASE_PROJECT_ID_KEY`, `FIREBASE_STORAGE_BUCKE_KEY` [sic], `FIREBASE_MESSAGING_SENDER_KEY`, `FIREBASE_APP_ID_KEY`, `FIREBASE_MEASURAMENT_ID_KEY` [sic]). These are read without a `NEXT_PUBLIC_` prefix, but `utils/firebaseConfig.js` is also imported directly from the client-side page (see below), so they must still be present at build/runtime in the client bundle.

## Architecture

### Two parallel source trees

The `@/*` path alias (`tsconfig.json`) resolves to `./src/*`, but most of the app's components/hooks/utils predate that and live at the repo root instead:

- **Root-level, relative imports**: `components/`, `hooks/`, `utils/`, `interfaces/` — mostly plain `.tsx`/`.js`, the original site UI (`Hero`, `Header`, `FooterExperimental`, `Partners`, etc.) and `utils/firebaseConfig.js`.
- **`src/`, `@/` imports**: `src/components/ui/*` (shadcn/ui, Radix-based, "new-york" style per `components.json`), `src/lib/utils.ts` (the `cn()` helper), and `src/ai/*` (Genkit).

When adding a component, check `components.json` aliases (`@/components`, `@/components/ui`, `@/lib`, `@/hooks`) — new shadcn-style UI pieces belong under `src/`, not the root `components/` tree.

`interfaces/database.types.ts` is a leftover Supabase schema type (`consult` table) from before the project moved to Firebase — it isn't wired to anything currently in use; don't treat it as the source of truth for Firestore document shape.

`tailwind.config.js`'s `content` array includes `./src/**` alongside `./pages/**`, `./components/**`, and `./app/**` — this was added after a real bug where shadcn `SelectContent`'s `bg-popover`/`shadow-md` classes (used only inside `src/components/ui/select.tsx`) were silently dropped by Tailwind's JIT scanner because `src/**` wasn't scanned. If a shadcn/ui component's own classes ever appear unstyled, check this glob first.

### AI query generation flow

1. `src/ai/genkit.ts` creates the shared `ai` Genkit instance with the `googleAI()` plugin, model `googleai/gemini-2.0-flash`.
2. `src/ai/flows/generate-linkedin-query.ts` defines the flow: a zod input/output schema, an `ai.definePrompt` template, and `ai.defineFlow` (`generateLinkedInQueryFlow`) wrapped by the exported `generateLinkedInQuery()`. This is the place to change the prompt or the query-generation logic.
3. `src/ai/dev.ts` is the Genkit CLI entrypoint (imported by the `genkit:dev`/`genkit:watch` scripts) — it just registers the flow(s) so they're testable in Genkit's local dev UI, independent of Next.js.
4. `pages/api/generate-query.ts` is the only API route. It validates the request body, maps the Portuguese seniority label (`junior`/`pleno`/`senior`/`estagiário`) to the level string the flow expects, calls `generateLinkedInQuery`, and persists the result to the Firestore `queries` collection.

### Data persistence quirk

Both the server and the client write to Firestore's `queries` collection for a single form submission: `pages/api/generate-query.ts` writes after generating the query, and `pages/index.tsx`'s `insertQuery()` writes again client-side once the API response comes back (with a different document shape — no `title`/`tools`/`level` fields). If you touch this flow, be aware a submission currently produces two Firestore documents, not one.

### Styling

Dark-themed by default, Tailwind CSS + CSS variables (`styles/globals.css`) + shadcn/ui ("new-york" style, neutral base color). Full color tokens, typography, spacing, and component usage conventions (Card, Button, Select, Dialog, Badge, Toast via `react-hot-toast`) are documented in `DESIGN_SYSTEM.md` — check it before introducing new UI patterns rather than improvising new conventions.
