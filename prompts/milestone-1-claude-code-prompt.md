# Claude Code Prompt — Finance Mate Milestone 1

You are building Milestone 1 of Finance Mate, an AI Financial Copilot MVP.

Use the project context and agent/skill docs provided.

## Tech Stack

- Mobile: Expo React Native with TypeScript and Expo Router
- API: Hono with TypeScript
- Database: Neon Postgres with Prisma
- Auth: Supabase Auth using email and password
- Validation: Zod
- Monorepo: `apps/mobile`, `apps/api`, `packages/shared`

## Milestone 1 Goal

Create the project foundation with auth, database, protected routes, API auth middleware, default categories, and setup documentation.

## Tasks

1. Create the monorepo structure:

```txt
finance-mate
  apps
    mobile
    api
  packages
    shared
```

2. Setup Expo React Native app with TypeScript and Expo Router.
3. Setup Hono API with TypeScript.
4. Setup Prisma with initial schema:
   - User
   - Category
   - Expense
   - Budget
   - CategoryRule
   - ChatMessage
   - SpendingInsight
5. Setup Supabase Auth client in mobile app.
6. Build mobile auth screens:
   - Login
   - Sign Up
   - Forgot Password
   - Logout
7. Add protected app route handling.
8. Add Hono auth middleware that verifies Supabase JWT.
9. Add public API route:

```txt
GET /health
```

10. Add protected API route:

```txt
GET /me
```

11. Add Prisma seed script for default categories:

```txt
Food
Coffee
Groceries
Transportation
Shopping
Bills
Health
Entertainment
Travel
Subscriptions
Income
Other
```

12. Add environment variable examples.
13. Add README setup instructions.

## Out of Scope

Do not build:

- Expense CRUD
- Receipt scanning
- AI extraction
- Dashboard
- Budgets UI
- AI insights
- AI chat
- Weekly review

## Acceptance Criteria

- User can sign up.
- User can log in.
- User can log out.
- Protected mobile screens are not accessible without auth.
- API rejects unauthenticated `/me` requests.
- API returns authenticated user info from `/me` when a valid token is provided.
- Prisma migration runs successfully.
- Default categories are seeded.
- README explains how to run mobile and API locally.

## After Implementation, Report

Provide:

- Summary of what was built.
- Files created or changed.
- Setup instructions.
- Environment variables needed.
- Manual test checklist.
- Assumptions made.
- Known limitations.

Stop after Milestone 1. Do not continue to Milestone 2.
