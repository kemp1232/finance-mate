# Finance Mate AGENTS.md

This file defines the multi-agent workflow for building **Finance Mate**, an AI Financial Copilot MVP.

Use this file as the main coordination guide when working with Codex, Claude Code, or another coding agent. The goal is to build the project one milestone at a time without overbuilding, skipping ahead, or mixing responsibilities.

---

## 1. Project Summary

**Project name:** Finance Mate

**Product:** AI Financial Copilot mobile app

**Core question the product answers:**

> Where did my money go, and what should I do next?

**MVP stack:**

- Mobile: Expo React Native + TypeScript + Expo Router
- Backend: Hono + TypeScript
- Database: Neon Postgres + Prisma
- Auth: Supabase Auth with email/password
- Validation: Zod
- AI: OpenAI API, called only from the backend
- Monorepo: single repository with `apps/mobile`, `apps/api`, and optional `packages/shared`

---

## 2. Core Workflow Rule

Build Finance Mate using a milestone-based workflow.

Do not build the full product in one pass.

For every milestone:

1. Product Architect defines scope and acceptance criteria.
2. Backend Engineer plans backend changes.
3. React Native Engineer plans mobile changes.
4. Coding agent implements only the approved milestone.
5. QA / Code Review Agent reviews output.
6. Developer manually tests and approves.
7. Only then proceed to the next milestone.

The coding agent must stop after each milestone and provide:

- Summary of files created or changed
- Setup or migration steps
- Manual test checklist
- Known limitations
- Any assumptions made

---

## 3. Agents

## 3.1 Product Architect Agent

Use this agent before coding each milestone.

Reference file:

```txt
agents/product-architect.md
```

Responsibilities:

- Define milestone scope
- Prevent overbuilding
- Convert business requirements into acceptance criteria
- Clarify MVP vs later features
- Decide what must be built now and what should be deferred
- Prepare implementation prompt for Claude Code

Product Architect must enforce:

- One milestone at a time
- No feature creep
- No bank integrations in MVP
- No GCash/Maya integration in MVP
- No background jobs in MVP unless explicitly approved
- No investment advice features

Output format:

```txt
Milestone:
Scope:
Non-goals:
Backend requirements:
Mobile requirements:
Database requirements:
AI requirements:
Acceptance criteria:
Manual test checklist:
Risks / assumptions:
```

---

## 3.2 Backend Engineer Agent

Use this agent for all backend, database, auth, and AI API work.

Reference file:

```txt
agents/backend-engineer.md
skills/hono-backend-mvp-builder.md
```

Responsibilities:

- Hono API architecture
- Prisma schema and migrations
- Neon Postgres integration
- Supabase JWT verification
- Zod validation
- User data scoping
- Backend service layer
- AI service integration
- Receipt extraction endpoint
- Insights and chat endpoints

Backend rules:

- Use Hono, not Express.
- Keep routes thin.
- Put business logic in services.
- Use Zod on request bodies and AI responses.
- Never expose OpenAI API keys to mobile.
- Never expose Supabase service role key to mobile.
- Every protected query must be scoped by authenticated `userId`.
- Do not let the AI directly query the database.
- Backend must prepare safe, summarized data for AI prompts.

Preferred API structure:

```txt
apps/api
  src
    index.ts
    routes
    middleware
    services
    lib
    schemas
```

---

## 3.3 React Native Engineer Agent

Use this agent for all Expo React Native mobile work.

Reference file:

```txt
agents/react-native-engineer.md
skills/react-native-mvp-builder.md
```

Responsibilities:

- Expo Router navigation
- Auth screens
- Protected tabs/layouts
- Expense forms
- Receipt camera/upload flow
- Dashboard UI
- Budget screens
- Insights screen
- Chat screen
- Loading, error, and empty states
- API integration with TanStack Query

Mobile rules:

- Use TypeScript.
- Use Expo Router.
- Use React Hook Form + Zod for forms.
- Use TanStack Query for server state.
- Use secure storage for auth/session data where appropriate.
- Keep screens simple and focused.
- Avoid heavy custom UI until the MVP works.
- Do not call OpenAI directly from mobile.
- Do not put backend secrets in mobile environment variables.

Preferred mobile structure:

```txt
apps/mobile
  app
    (auth)
    (tabs)
    expense
  src
    components
    features
    lib
    types
```

---

## 3.4 QA / Code Review Agent

Use this agent after each milestone implementation.

Reference file:

```txt
agents/qa-code-reviewer.md
```

Responsibilities:

- Review if the implementation matches milestone scope
- Check acceptance criteria
- Find bugs and risky assumptions
- Verify user data isolation
- Verify auth protection
- Verify TypeScript and validation standards
- Check if the coding agent added unapproved features
- Produce a manual test checklist

QA must check:

- Does the app run?
- Does the API run?
- Are environment variables documented?
- Are secrets protected?
- Are database migrations included?
- Are routes protected where needed?
- Can users only access their own data?
- Did the agent stop at the correct milestone?

QA output format:

```txt
Review result: Pass / Needs changes
Scope compliance:
Bugs found:
Security concerns:
Data isolation concerns:
Missing acceptance criteria:
Manual test checklist:
Recommended fixes before next milestone:
```

---

## 4. Skills and When to Use Them

## 4.1 Claude Code Milestone Workflow Skill

Reference file:

```txt
skills/claude-code-milestone-workflow.md
```

Use for every coding session.

Purpose:

- Keep Claude Code focused on one milestone
- Prevent unrelated implementation
- Require summaries and test checklists
- Require explicit stop points

Use this skill together with every milestone prompt.

---

## 4.2 React Native MVP Builder Skill

Reference file:

```txt
skills/react-native-mvp-builder.md
```

Use when the milestone includes mobile work.

Examples:

- Auth screens
- Dashboard screen
- Expense form
- Receipt scan screen
- Budget UI
- Insights screen
- Chat screen

---

## 4.3 Hono Backend MVP Builder Skill

Reference file:

```txt
skills/hono-backend-mvp-builder.md
```

Use when the milestone includes backend work.

Examples:

- Hono routes
- Prisma schema
- Supabase auth middleware
- Zod schemas
- AI service
- Dashboard service
- Chat service

---

## 4.4 Expense Budget Domain Skill

Reference file:

```txt
skills/expense-budget-domain.md
```

Use for expense, category, receipt, categorization, and budget logic.

Examples:

- Manual expense logging
- Receipt extraction review flow
- Category rules
- Monthly category budgets
- Budget thresholds

---

## 4.5 Dashboard Insights Skill

Reference file:

```txt
skills/dashboard-insights.md
```

Use for dashboard summaries and AI spending insights.

Examples:

- Total spent today
- Total spent this month
- Spending by category
- Remaining budget
- Week-over-week comparison
- Biggest purchase
- Recurring merchant detection
- Plain-language AI insights

---

## 4.6 Money Chat Skill

Reference file:

```txt
skills/money-chat.md
```

Use for the Ask AI About Your Money feature.

Examples:

- Spending by category questions
- Spending by date range questions
- Biggest expense questions
- Merchant spending questions
- Budget status questions
- Subscription-like recurring merchant questions

Rules:

- AI should answer only using available user spending data.
- AI should not provide regulated financial or investment advice.
- AI should not directly query the database.
- Backend should use safe query handlers and pass summarized results to AI.

---

## 4.7 E2E Test Builder Skill

Reference file:

```txt
skills/e2e-test-builder.md
```

Use after implementing a milestone and before QA / Code Review sign-off.

Examples:

- API e2e tests for new or changed routes (Supertest/Vitest against Hono)
- Mobile e2e flows for new or changed screens (Maestro)
- Auth boundary and user data isolation checks
- Golden-path coverage for the milestone's acceptance criteria

---

## 4.8 Skill Sync Reviewer Skill

Reference file:

```txt
skills/skill-sync-reviewer.md
```

Use after Review/Fix and before Approve, at the end of every milestone.

Examples:

- Updating a "preferred structure" example that changed during implementation
- Correcting a rule that turned out to be wrong or incomplete
- Recording a new reusable pattern for future milestones to follow
- Keeping `agents/` and `skills/` docs accurate as the source of truth

---

## 5. Milestone Workflow

Reference files:

```txt
prompts/project-context.md
prompts/milestone-plan.md
```

Milestones:

1. Project setup, auth, database, Hono API foundation
2. Manual expense logging
3. Receipt upload and AI extraction
4. AI categorization and learning rules
5. Dashboard and budgets
6. AI spending insights
7. Ask AI About Your Money
8. Weekly financial review

Each milestone should follow this loop:

```txt
Plan -> Implement -> E2E Test -> Review -> Fix -> Skill Sync -> Approve -> Next milestone
```

Write or update e2e tests (see `skills/e2e-test-builder.md`) right after implementation, before handing off to QA / Code Review. E2E tests give the reviewer real evidence that the milestone's acceptance criteria work end to end.

After Review/Fix, run the Skill Sync Reviewer (see `skills/skill-sync-reviewer.md`) to check whether the milestone's actual implementation changed anything the `agents/` or `skills/` docs assumed, and update those docs before approving. This keeps future milestones planned against accurate instructions instead of stale ones.

Do not start a new milestone until the current one passes review.

---

## 6. Recommended Prompt Assembly Per Milestone

## Milestone 1 — Project Setup, Auth, Database

Use:

```txt
prompts/project-context.md
prompts/milestone-plan.md
agents/product-architect.md
agents/backend-engineer.md
agents/react-native-engineer.md
agents/qa-code-reviewer.md
skills/claude-code-milestone-workflow.md
skills/e2e-test-builder.md
skills/skill-sync-reviewer.md
skills/react-native-mvp-builder.md
skills/hono-backend-mvp-builder.md
prompts/milestone-1-claude-code-prompt.md
```

Do not include domain skills yet unless needed.

---

## Milestone 2 — Manual Expense Logging

Use:

```txt
prompts/project-context.md
prompts/milestone-plan.md
agents/backend-engineer.md
agents/react-native-engineer.md
agents/qa-code-reviewer.md
skills/claude-code-milestone-workflow.md
skills/e2e-test-builder.md
skills/skill-sync-reviewer.md
skills/react-native-mvp-builder.md
skills/hono-backend-mvp-builder.md
skills/expense-budget-domain.md
```

---

## Milestone 3 — Receipt Upload and AI Extraction

Use:

```txt
prompts/project-context.md
prompts/milestone-plan.md
agents/backend-engineer.md
agents/react-native-engineer.md
agents/qa-code-reviewer.md
skills/claude-code-milestone-workflow.md
skills/e2e-test-builder.md
skills/skill-sync-reviewer.md
skills/react-native-mvp-builder.md
skills/hono-backend-mvp-builder.md
skills/expense-budget-domain.md
```

---

## Milestone 4 — AI Categorization and Learning Rules

Use:

```txt
prompts/project-context.md
prompts/milestone-plan.md
agents/backend-engineer.md
agents/react-native-engineer.md
agents/qa-code-reviewer.md
skills/claude-code-milestone-workflow.md
skills/e2e-test-builder.md
skills/skill-sync-reviewer.md
skills/hono-backend-mvp-builder.md
skills/expense-budget-domain.md
```

---

## Milestone 5 — Dashboard and Budgets

Use:

```txt
prompts/project-context.md
prompts/milestone-plan.md
agents/backend-engineer.md
agents/react-native-engineer.md
agents/qa-code-reviewer.md
skills/claude-code-milestone-workflow.md
skills/e2e-test-builder.md
skills/skill-sync-reviewer.md
skills/react-native-mvp-builder.md
skills/hono-backend-mvp-builder.md
skills/expense-budget-domain.md
skills/dashboard-insights.md
```

---

## Milestone 6 — AI Spending Insights

Use:

```txt
prompts/project-context.md
prompts/milestone-plan.md
agents/backend-engineer.md
agents/react-native-engineer.md
agents/qa-code-reviewer.md
skills/claude-code-milestone-workflow.md
skills/e2e-test-builder.md
skills/skill-sync-reviewer.md
skills/hono-backend-mvp-builder.md
skills/dashboard-insights.md
```

---

## Milestone 7 — Ask AI About Your Money

Use:

```txt
prompts/project-context.md
prompts/milestone-plan.md
agents/backend-engineer.md
agents/react-native-engineer.md
agents/qa-code-reviewer.md
skills/claude-code-milestone-workflow.md
skills/e2e-test-builder.md
skills/skill-sync-reviewer.md
skills/react-native-mvp-builder.md
skills/hono-backend-mvp-builder.md
skills/money-chat.md
```

---

## Milestone 8 — Weekly Financial Review

Use:

```txt
prompts/project-context.md
prompts/milestone-plan.md
agents/backend-engineer.md
agents/react-native-engineer.md
agents/qa-code-reviewer.md
skills/claude-code-milestone-workflow.md
skills/e2e-test-builder.md
skills/skill-sync-reviewer.md
skills/hono-backend-mvp-builder.md
skills/dashboard-insights.md
```

---

## 7. Standard Coding Agent Instructions

Every coding agent session must follow these rules:

1. Read the provided project context first.
2. Identify the current milestone.
3. Implement only the current milestone.
4. Do not add future milestone features.
5. Use TypeScript throughout.
6. Use Zod for validation.
7. Use Hono for backend routes.
8. Use Prisma for database access.
9. Use Supabase Auth for authentication.
10. Keep OpenAI calls backend-only.
11. Keep user data scoped by authenticated user ID.
12. Add or update README instructions when setup changes.
13. Provide a manual test checklist.
14. Stop after milestone completion.

---

## 8. Definition of Done Per Milestone

A milestone is done only when:

- The project builds or the agent clearly states what still needs setup.
- TypeScript errors are resolved or documented.
- Required environment variables are documented.
- Database migrations are included when schema changes.
- Protected API routes require auth.
- User data is scoped to the logged-in user.
- Mobile screens include loading and error states.
- Manual test checklist is provided.
- QA / Code Review Agent has reviewed the output.
- Developer has approved moving forward.

---

## 9. Non-Goals for All Agents

Do not build these unless explicitly approved later:

- Bank integration
- GCash integration
- Maya integration
- Plaid integration
- Payment processing
- Investment recommendations
- Stock picking
- Net worth tracking
- Shared family accounts
- Push notifications
- Background scheduled jobs
- Admin dashboard
- Web app
- Multi-currency support
- Offline-first sync

---

## 10. First Milestone Start Command

Use this instruction when starting Milestone 1 with Claude Code:

```txt
We are building Finance Mate using the provided AGENTS.md, project context, milestone plan, agent docs, and skills.

Start with Milestone 1 only: Project setup, auth, database, and Hono API foundation.

Follow the Claude Code Milestone Workflow Skill.
Do not implement expense CRUD, receipt scanning, dashboard, budgets, insights, chat, or weekly review yet.

At the end, provide:
- files created/changed
- setup steps
- environment variables needed
- database migration/seed steps
- manual test checklist
- assumptions made

Stop after Milestone 1.
```
