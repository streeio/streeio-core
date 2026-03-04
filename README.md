# Proptech Admin

A modern Turborepo monorepo powering the Proptech Admin applications.

## Rules & Standards
- **pnpm**: Use `pnpm` exclusively (`pnpm install`, `pnpm dev`, `pnpm db:push`). No `npm` or `yarn`. 
- **Type Safety**: Fully typed. Use Zod for validation.
- **Frontend**: React 19, TNext Js 16.
- **Styling**: Tailwind CSS v4, shadcn/ui.
- **Backend/DB**: trpc, PostgreSQL, Drizzle ORM.
- **Auth**: Better-Auth.

## Pre-commit Tools
- **Code Formatting**: `pnpm dlx ultracite fix` runs automatically.
- **Type Checking**: TypeScript limits restrict broken commits (`check-types`).
- **Commitlint**: Use conventional commits (e.g., `feat: build dashboard`, `fix: header padding`).

## Getting Started

1. Install dependencies
```bash
pnpm install
```

2. Setup Database
```bash
# Update .env accordingly, then
pnpm db:push
```

3. Run Development Server
```bash
pnpm dev
```

## Useful Commands
- `pnpm dev`: Start all dev servers.
- `pnpm db:studio`: Open Drizzle Studio.
- `pnpm db:push`: Push local schema changes to database.
- `pnpm check-types`: Check TypeScript across workspaces.
- `pnpm run knip`: Find dead/unused code.
