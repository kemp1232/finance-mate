# Finance Mate — Agents and Skills Setup

Finance Mate is an AI Financial Copilot MVP built as a single monorepo.

Recommended stack:

- Mobile: Expo React Native + TypeScript + Expo Router
- Backend: Hono + TypeScript
- Database: Neon Postgres + Prisma
- Auth: Supabase Auth using email/password
- Validation: Zod
- AI: OpenAI API from backend only
- Monorepo structure: `apps/mobile`, `apps/api`, `packages/shared`

## How to Use These Docs

Use these markdown files as reusable instructions for Codex, Claude Code, or any coding agent.

Recommended workflow:

1. Start with `prompts/project-context.md`.
2. Pick one milestone.
3. Attach the relevant agent doc from `agents/`.
4. Attach the relevant skill docs from `skills/`.
5. Tell the coding agent to implement only the current milestone.
6. Add or update e2e tests for the milestone (`skills/e2e-test-builder.md`).
7. Review manually.
8. Run QA checklist.
9. Sync the `agents/` and `skills/` docs with anything that changed during implementation (`skills/skill-sync-reviewer.md`).
10. Proceed to the next milestone only after approval.

## Recommended Agents

- `agents/product-architect.md`
- `agents/react-native-engineer.md`
- `agents/backend-engineer.md`
- `agents/qa-code-reviewer.md`

## Recommended Skills

- `skills/claude-code-milestone-workflow.md`
- `skills/react-native-mvp-builder.md`
- `skills/hono-backend-mvp-builder.md`
- `skills/expense-budget-domain.md`
- `skills/dashboard-insights.md`
- `skills/money-chat.md`
- `skills/e2e-test-builder.md`
- `skills/skill-sync-reviewer.md`

## Important Rule

Build Finance Mate one milestone at a time. Do not ask Claude Code to build the full MVP in one pass.

## Getting Started (Milestone 1: Project Setup, Auth, Database)

### Prerequisites

- Node.js 18+
- A [Neon](https://neon.tech) Postgres database
- A [Supabase](https://supabase.com) project with email/password auth enabled

### Monorepo layout

```txt
finance-mate
  apps/api      Hono API (TypeScript, Prisma, Supabase JWT verification)
  apps/mobile   Expo React Native app (TypeScript, Expo Router)
  packages/shared  Shared Zod schemas/types used by both apps
```

### 1. Install dependencies

From the repo root (npm workspaces):

```bash
npm install
```

### 2. Configure environment variables

```bash
cp apps/api/.env.example apps/api/.env
cp apps/mobile/.env.example apps/mobile/.env
```

Fill in:

- `apps/api/.env`
  - `DATABASE_URL` — Neon Postgres connection string
  - `SUPABASE_URL` — Supabase project URL
  - `SUPABASE_SERVICE_ROLE_KEY` — Supabase service role key (server-only, never share with mobile)
  - `PORT` — optional, defaults to `3000`
- `apps/mobile/.env`
  - `EXPO_PUBLIC_SUPABASE_URL` — Supabase project URL
  - `EXPO_PUBLIC_SUPABASE_ANON_KEY` — Supabase anon/public key
  - `EXPO_PUBLIC_API_URL` — Finance Mate API base URL (e.g. `http://localhost:3000`, or your machine's LAN IP when testing on a physical device)

In your Supabase project, disable "Confirm email" during local testing if you want to log in immediately after sign up, or check the confirmation email.

### 3. Run the database migration and seed default categories

```bash
npm run api:prisma:migrate
npm run api:prisma:seed
```

This creates the `User`, `Category`, `Expense`, `Budget`, `CategoryRule`, `ChatMessage`, and `SpendingInsight` tables (only `User` and `Category` are used by routes in this milestone — the rest exist ahead of later milestones) and seeds the default categories: Food, Coffee, Groceries, Transportation, Shopping, Bills, Health, Entertainment, Travel, Subscriptions, Income, Other.

### 4. Run the API

```bash
npm run api:dev
```

Verify it's up:

```bash
curl http://localhost:3000/health
# {"data":{"status":"ok"}}

curl http://localhost:3000/me
# {"error":"Unauthorized"}
```

### 5. Run the mobile app

```bash
npm run mobile:start
```

Open in Expo Go, an iOS/Android simulator, or a dev build. Sign up, confirm your email if required, log in, and confirm the Home screen loads your account info from `GET /me` with a "Log out" button.

### Running tests

```bash
npm run api:test
```

API e2e tests mock the Supabase Auth client and Prisma at the module boundary (no live Neon/Supabase project is required to run them) and cover: `GET /health` golden path, `GET /me` unauthenticated rejection, `GET /me` with a valid token, and user data isolation between two authenticated users.
