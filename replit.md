# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod 3.x, `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (ESM bundle)

## Artifacts

- `artifacts/policyperfect/` — PolicyPerfect main website (React + Vite, Tailwind v3, wouter routing, preview at `/`)
- `artifacts/api-server/` — Express 5 backend (preview at `/api`)
- `artifacts/mockup-sandbox/` — design/mockup artifact (preview at `/__mockup`)

## Libraries

- `lib/db/` — Drizzle schema + DB connection (`@workspace/db`)
- `lib/api-spec/` — OpenAPI spec + codegen config
- `lib/api-client-react/` — generated React Query hooks

## Database Schema

Tables: `leads`, `claims`, `offers`, `features`, `testimonials`, `site_settings`, `users`, `service_requests`, `ticket_messages`, `user_policies`, `session`

## Backend Notes

- Session management: `express-session` + `connect-pg-simple` (PostgreSQL session store)
- Auth: custom SHA-256 password hashing (no bcrypt)
- Admin credentials: env vars `ADMIN_USERNAME` / `ADMIN_PASSWORD`
- PDF policy parsing: `pdf-parse` library in `artifacts/api-server/src/pdfParser.ts`
- Routes use `app.post/get/put/delete(...)` directly (not Express Router), wired via `registerRoutes(app)` in `app.ts`
- `zod` must be a direct dep of `api-server` (not just inherited through `@workspace/db`)

## Frontend Notes

- `@shared/` alias resolves to `artifacts/policyperfect/src/shared/`
- `src/shared/schema.ts` — frontend type defs + Zod validation schemas (Lead, Claim, etc.)
- `src/shared/routes.ts` — API path constants used by forms/hooks
- Custom `queryClient.ts` with `credentials: "include"` fetch and 401 handling
- Tailwind v3 with custom color tokens (dark blue primary, yellow secondary)
- Fonts: Outfit (display) + Plus Jakarta Sans (body) via Google Fonts

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/db run push-force` — force push (skip interactive prompts)

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
