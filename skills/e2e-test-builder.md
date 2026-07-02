# Skill: E2E Test Builder

## Purpose

Use this skill at the end of every milestone to add or update end-to-end tests that prove the milestone's acceptance criteria actually work, not just that the code compiles.

E2E tests exercise the real system: mobile UI flows against a running API, or HTTP calls against a running Hono server backed by a test database. They are not a replacement for QA / Code Review, they are evidence for it.

## When to Use

Run this skill after implementation and before the QA / Code Review Agent signs off, as part of the milestone loop:

```txt
Plan -> Implement -> E2E Test -> Review -> Fix -> Approve -> Next milestone
```

Use it whenever a milestone adds or changes:

- An auth flow
- An API route
- A mobile screen or navigation flow
- Any user-facing data mutation (create/edit/delete)

## Tech Stack

Backend API e2e tests:

- Vitest or Jest as the test runner
- Supertest (or Hono's built-in test client) to call routes over HTTP
- A dedicated test database or a transaction-scoped Prisma test setup — never run e2e tests against production or shared dev data

Mobile e2e tests:

- Maestro for Expo React Native flows (preferred: no native build config, works with Expo Go/dev client, simple YAML flows)
- Detox only if Maestro cannot cover a specific native interaction

## Test Structure

Recommended layout:

```txt
apps/api
  e2e
    auth.e2e.ts
    expenses.e2e.ts
    receipts.e2e.ts
    budgets.e2e.ts
    dashboard.e2e.ts
    insights.e2e.ts
    chat.e2e.ts

apps/mobile
  e2e
    flows
      auth-signup-login.yaml
      add-expense.yaml
      scan-receipt.yaml
      view-dashboard.yaml
      set-budget.yaml
      ask-ai-chat.yaml
```

Name test files after the milestone feature they cover, not after implementation files.

## What to Cover Per Milestone

Cover only the current milestone's acceptance criteria. Do not write e2e tests for future milestone flows.

Every milestone's e2e suite must include:

- The golden path: the primary flow described in the milestone's acceptance criteria, end to end.
- Auth boundary: unauthenticated requests to protected routes are rejected.
- Data isolation: a second test user cannot see or modify the first user's data.
- One meaningful failure case: invalid input, missing field, or AI response that fails validation.

Do not aim for full coverage of every edge case in e2e tests — that belongs in unit tests. E2E tests confirm the critical path works end to end.

## API E2E Test Rules

- Spin up the Hono app in-process (or against a local test server) and call it with Supertest/fetch.
- Use a seeded or freshly migrated test database, reset between runs.
- Create at least two distinct test users to verify data scoping.
- Assert on both status code and response shape.
- Mock the OpenAI call at the network boundary (never hit the real API in e2e tests) and assert the backend validates the mocked AI response with Zod before using it.

## Mobile E2E Test Rules

- Write flows against a running Expo dev build pointed at a local or staging API.
- Cover navigation, form submission, and resulting UI state (loading -> success/error).
- Use test credentials from environment config, never hardcode real user data.
- Keep flows short and named after the user action, not the screen implementation.

## Required Output After Writing E2E Tests

```txt
E2E tests added/updated:

How to run:

Test data / fixtures required:

Golden path covered:

Auth/data isolation covered:

Failure case covered:

Known gaps (deferred to later milestone):
```

## Do Not Do

- Do not write e2e tests for milestones not yet implemented.
- Do not run e2e tests against production data or real third-party APIs.
- Do not treat passing e2e tests as a substitute for the QA / Code Review Agent's manual review.
- Do not block a milestone on flaky infrastructure issues unrelated to the feature — flag them instead.
