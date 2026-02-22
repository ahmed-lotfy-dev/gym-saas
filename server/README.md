# Gym SaaS Backend

Backend API for the multi-tenant Gym SaaS platform.

## Run

```bash
bun install
bun run dev
```

Server default: `http://localhost:3001`

## API Docs

- Swagger UI: `http://localhost:3001/docs`
- Docs helper route: `http://localhost:3001/api/v1/docs`

## Access Model

- `super_admin`
  - Platform operations role kept for incidents, abuse handling, billing disputes, and migrations.
  - Not intended for default day-to-day tenant data access.
- `gym_admin` (gym owner)
  - Access limited to their assigned `gymId`.
  - Can manage and view their own gym resources.

## Current Testing Notes

- Route auth for some gym endpoints is temporarily relaxed to speed up testing via `/docs`.
- Target production model is owner-first (`gym_admin`) access with explicit, auditable support access when needed.
- Gym and branch create request schemas are currently set for testing (no required fields in docs yet).
- This is temporary and should be tightened before production.

## Common Commands

```bash
bun run dev
bun run build
bun run db:generate
bun run db:migrate
bun run db:push
bun run db:studio
```
