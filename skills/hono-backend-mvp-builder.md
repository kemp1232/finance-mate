# Skill: Hono Backend MVP Builder

## Purpose

Use this skill when building Finance Mate backend features with Hono, TypeScript, Prisma, Supabase Auth, Zod, and OpenAI.

## Stack

Use:

- Hono
- TypeScript
- Prisma
- Neon Postgres
- Supabase Auth
- Zod
- OpenAI API

## Backend Structure

Recommended structure:

```txt
apps/api
  src
    index.ts
    routes
      expenses.ts
      receipts.ts
      categories.ts
      budgets.ts
      dashboard.ts
      insights.ts
      chat.ts
      weekly-review.ts
    middleware
      require-auth.ts
    services
      ai.service.ts
      expense.service.ts
      insight.service.ts
      dashboard.service.ts
      category.service.ts
    lib
      prisma.ts
      supabase.ts
      openai.ts
    schemas
      expense.schema.ts
      receipt.schema.ts
      budget.schema.ts
```

## Route Rules

- Keep route handlers thin.
- Validate request input in route handlers.
- Call service functions for business logic.
- Return consistent response shapes.
- Protect all user-data routes with auth middleware.

## Auth Middleware Rules

The `requireAuth` middleware should:

1. Read bearer token.
2. Verify Supabase JWT by calling `supabaseAdmin.auth.getUser(token)` (service-role client) rather than manually decoding/verifying the JWT.
3. Upsert the local `User` row (`id`, `email`) so it stays in sync with Supabase Auth. There is no separate signup webhook — the local `User` row is created lazily on a user's first authenticated request.
4. Attach authenticated user ID to Hono context.
5. Reject invalid or missing token with 401.

Unauthorized response:

```json
{
  "error": "Unauthorized"
}
```

## Data Scoping Rule

Every query for user-owned data must include authenticated `userId`.

Bad:

```ts
prisma.expense.findMany()
```

Good:

```ts
prisma.expense.findMany({ where: { userId } })
```

## Validation Rules

Use Zod for:

- Request bodies
- Query params
- AI structured outputs
- Shared types where useful

## AI Rules

- OpenAI calls happen only in backend services.
- Do not send full raw transaction history unless necessary.
- Prefer sending summarized stats to AI.
- Validate AI responses before saving or returning.
- Never let AI directly query the database.

## Error Handling

Use consistent errors:

```json
{
  "error": "Something went wrong"
}
```

Validation errors:

```json
{
  "error": "Validation failed",
  "details": []
}
```

## Do Not Do

- Do not use Express.
- Do not add GraphQL.
- Do not add background jobs in MVP.
- Do not implement banking integrations.
- Do not expose secrets to mobile.
