# Finance Mate - Claude Code Milestone Prompt Pack

Use this file to run Finance Mate through Claude Code one milestone at a time.

Copy only one milestone prompt into Claude Code at a time. Do not ask Claude Code to implement multiple milestones in one run. After Claude Code finishes a milestone, manually test it, review it, approve it, and then use the next milestone prompt.

## Universal Rules For Every Claude Code Run

Claude Code must:

- Read `AGENTS.md` first.
- Read `prompts/project-context.md`.
- Read `prompts/milestone-plan.md`.
- Read the agent and skill docs listed in the current milestone prompt.
- Inspect the existing repo before making changes.
- Preserve unrelated user changes.
- Implement only the current milestone.
- Use TypeScript throughout.
- Use Hono for the API.
- Use Prisma for database access.
- Use Supabase Auth for authentication.
- Use Zod for request validation and AI structured output validation.
- Keep OpenAI calls backend-only.
- Scope every user-owned backend query by authenticated `userId`.
- Add or update README/setup docs when setup, env vars, commands, or migrations change.
- Add or update e2e tests for the milestone after implementation.
- Run available type checks, linting, tests, and e2e tests when possible.
- Run a QA/code-review pass after tests.
- Run the skill sync review after fixes and update only docs that are now inaccurate.
- Stop after the milestone. Do not continue to the next milestone.

Claude Code must not build:

- Bank integrations
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

If prerequisites from an earlier milestone are missing or broken, Claude Code should fix only the minimum necessary prerequisite issue to complete the current milestone, document it clearly, and avoid adding future milestone features.

Required final output for every milestone:

```txt
Summary:

Files changed:

How to run:

Environment variables needed:

Database migration/seed steps:

E2E tests added/updated:

Verification performed:

Manual test checklist:

QA/code review result:

Skill sync result:

Assumptions:

Known limitations:

Next recommended milestone:
```

---

## Milestone 1 Prompt - Project Setup, Auth, Database

Copy this prompt into Claude Code:

```txt
We are building Finance Mate using the provided AGENTS.md, project context, milestone plan, agent docs, and skills.

Start with Milestone 1 only: Project Setup, Auth, Database.

Read these files before coding:
- AGENTS.md
- prompts/project-context.md
- prompts/milestone-plan.md
- agents/product-architect.md
- agents/backend-engineer.md
- agents/react-native-engineer.md
- agents/qa-code-reviewer.md
- skills/claude-code-milestone-workflow.md
- skills/e2e-test-builder.md
- skills/skill-sync-reviewer.md
- skills/react-native-mvp-builder.md
- skills/hono-backend-mvp-builder.md

Current milestone:
Create the foundation for the Finance Mate MVP.

Relevant stack:
- Expo React Native with TypeScript and Expo Router
- Hono with TypeScript
- Prisma with Neon Postgres
- Supabase Auth using email/password
- Zod
- Monorepo structure: apps/mobile, apps/api, packages/shared

Files/areas likely involved:
- apps/mobile
- apps/api
- packages/shared
- prisma schema and migrations
- seed scripts
- README/setup docs
- environment variable examples
- e2e test folders

Tasks:
1. Create or complete the monorepo structure:
   - apps/mobile
   - apps/api
   - packages/shared when useful for shared schemas/types
2. Set up the Expo React Native app with TypeScript and Expo Router.
3. Set up the Hono API with TypeScript.
4. Set up Prisma and an initial database schema for the MVP foundation.
5. Include default category data and a seed script.
6. Set up Supabase Auth on mobile for email/password auth.
7. Build simple auth screens:
   - Login
   - Sign Up
   - Forgot Password
   - Logout access from a protected area
8. Add protected mobile route handling.
9. Add Hono auth middleware that verifies Supabase JWTs.
10. Add public API route:
   - GET /health
11. Add protected API route:
   - GET /me
12. Add Zod validation where request input exists.
13. Add environment variable examples for mobile and API.
14. Add README setup instructions.
15. Add or update e2e tests for auth/API foundation:
   - health route golden path
   - unauthenticated protected route rejection
   - authenticated /me route

Default categories to seed:
- Food
- Coffee
- Groceries
- Transportation
- Shopping
- Bills
- Health
- Entertainment
- Travel
- Subscriptions
- Income
- Other

Out of scope:
- Expense CRUD
- Receipt scanning
- AI extraction
- AI categorization
- Dashboard
- Budget UI
- AI insights
- AI chat
- Weekly review
- Bank, GCash, Maya, Plaid, payment, investment, or admin features

Acceptance criteria:
- Mobile app runs.
- API runs.
- Prisma migration runs.
- Default categories are seeded.
- User can sign up.
- User can log in.
- User can log out.
- Protected mobile screens require auth.
- GET /health works without auth.
- GET /me rejects unauthenticated requests.
- GET /me returns authenticated user info with a valid token.
- Required env vars and local setup are documented.

Manual test checklist:
- Run API locally and call GET /health.
- Call GET /me without a token and confirm 401.
- Sign up in the mobile app.
- Log in in the mobile app.
- Confirm protected screens are visible after login.
- Log out and confirm protected screens are blocked.
- Run Prisma migration.
- Run category seed and confirm default categories exist.

After implementation:
1. Run available format/typecheck/lint/test commands.
2. Add or update e2e tests for this milestone only.
3. Run the QA/code review checklist from agents/qa-code-reviewer.md.
4. Fix any issues found in review.
5. Run the skill sync review from skills/skill-sync-reviewer.md.
6. Update docs only if implementation changed a documented pattern.
7. Report using the required final output format from prompts/claude-code-milestone-prompts.md.
8. Stop after Milestone 1. Do not continue to Milestone 2.
```

---

## Milestone 2 Prompt - Manual Expense Logging

Copy this prompt into Claude Code after Milestone 1 has been approved:

```txt
We are building Finance Mate using the provided AGENTS.md, project context, milestone plan, agent docs, and skills.

Start Milestone 2 only: Manual Expense Logging.

Do not start this milestone unless Milestone 1 has been implemented and approved. If the foundation is missing, stop and report what is missing.

Read these files before coding:
- AGENTS.md
- prompts/project-context.md
- prompts/milestone-plan.md
- agents/backend-engineer.md
- agents/react-native-engineer.md
- agents/qa-code-reviewer.md
- skills/claude-code-milestone-workflow.md
- skills/e2e-test-builder.md
- skills/skill-sync-reviewer.md
- skills/react-native-mvp-builder.md
- skills/hono-backend-mvp-builder.md
- skills/expense-budget-domain.md

Current milestone:
Let authenticated users manually create, view, edit, and delete expenses.

Relevant stack:
- Expo React Native with TypeScript and Expo Router
- React Hook Form + Zod for mobile forms
- TanStack Query for server state
- Hono routes and service layer
- Prisma
- Supabase-authenticated API requests
- Zod validation

Files/areas likely involved:
- apps/api/src/routes/expenses.ts
- apps/api/src/services/expense.service.ts
- apps/api/src/schemas/expense.schema.ts
- apps/api/src/routes/categories.ts if category listing is not present
- apps/mobile/app/(tabs)/expenses.tsx
- apps/mobile/app/expense/add.tsx
- apps/mobile/app/expense/[id].tsx or equivalent edit route
- apps/mobile/src/features/expenses
- apps/mobile/src/lib/api.ts
- shared schemas/types if already used
- e2e tests for expenses
- README/setup docs if commands or env vars change

Tasks:
1. Implement Expense CRUD API for authenticated users:
   - GET /expenses
   - GET /expenses/:id
   - POST /expenses
   - PATCH /expenses/:id
   - DELETE /expenses/:id
2. Keep routes thin and put business logic in services.
3. Validate request bodies and relevant params/query values with Zod.
4. Ensure all expense queries and mutations are scoped by authenticated userId.
5. Add category listing support if the mobile category selector needs it.
6. Build mobile expense list screen with loading, error, and empty states.
7. Build Add Expense screen with amount, merchant, date, category, notes, and optional payment method when supported by the schema.
8. Build Edit Expense flow.
9. Build Delete Expense flow with a confirmation step.
10. Build category selector using seeded categories.
11. Use TanStack Query for expense reads and mutations.
12. Attach Supabase auth token to backend requests.
13. Add e2e tests for expense create/list/edit/delete, auth rejection, data isolation, and one validation failure.

Expense requirements:
- amount: numeric, positive
- merchant: required string
- date: explicit and editable
- categoryId: required
- notes: optional
- paymentMethod: optional if supported by the schema
- source should be MANUAL for manual expenses if the schema tracks source

Out of scope:
- Receipt scanning or uploads
- AI receipt extraction
- AI categorization
- User learning rules
- Dashboard summaries
- Budgets
- AI insights
- AI chat
- Weekly review

Acceptance criteria:
- User can create an expense manually.
- User can view expenses by latest date.
- User can edit an expense.
- User can delete an expense.
- User can choose a category.
- Invalid expense input is rejected with validation errors.
- User only sees their own expenses.
- User cannot edit or delete another user's expenses.
- Mobile screens include loading, error, and empty states.

Manual test checklist:
- Log in.
- Open Expenses and confirm empty state if no expenses exist.
- Create an expense with amount, merchant, date, and category.
- Confirm the expense appears in the list.
- Edit the amount/category and confirm changes persist.
- Delete the expense and confirm it disappears.
- Try submitting invalid form data and confirm validation messages appear.
- Confirm API rejects expense routes without auth.
- Confirm test user B cannot view or mutate test user A expenses.

After implementation:
1. Run available format/typecheck/lint/test commands.
2. Add or update e2e tests for this milestone only.
3. Run the QA/code review checklist from agents/qa-code-reviewer.md.
4. Fix any issues found in review.
5. Run the skill sync review from skills/skill-sync-reviewer.md.
6. Update docs only if implementation changed a documented pattern.
7. Report using the required final output format from prompts/claude-code-milestone-prompts.md.
8. Stop after Milestone 2. Do not continue to Milestone 3.
```

---

## Milestone 3 Prompt - Receipt Upload and AI Extraction

Copy this prompt into Claude Code after Milestone 2 has been approved:

```txt
We are building Finance Mate using the provided AGENTS.md, project context, milestone plan, agent docs, and skills.

Start Milestone 3 only: Receipt Upload and AI Extraction.

Do not start this milestone unless Milestones 1 and 2 have been implemented and approved. If prerequisites are missing, stop and report what is missing.

Read these files before coding:
- AGENTS.md
- prompts/project-context.md
- prompts/milestone-plan.md
- agents/backend-engineer.md
- agents/react-native-engineer.md
- agents/qa-code-reviewer.md
- skills/claude-code-milestone-workflow.md
- skills/e2e-test-builder.md
- skills/skill-sync-reviewer.md
- skills/react-native-mvp-builder.md
- skills/hono-backend-mvp-builder.md
- skills/expense-budget-domain.md

Current milestone:
Let users capture or select a receipt image, extract expense details with backend AI, review/edit the result, and save the confirmed expense.

Relevant stack:
- Expo Image Picker / camera support
- Expo React Native with TypeScript and Expo Router
- Hono backend
- Prisma
- OpenAI API from backend only
- Zod validation for request data and AI structured output
- TanStack Query mutations

Files/areas likely involved:
- apps/api/src/routes/receipts.ts
- apps/api/src/services/receipt.service.ts
- apps/api/src/services/ai.service.ts
- apps/api/src/lib/openai.ts
- apps/api/src/schemas/receipt.schema.ts
- apps/api/src/routes/expenses.ts or expense service integration
- apps/mobile/app/expense/scan.tsx
- apps/mobile/app/expense/review.tsx
- apps/mobile/src/features/receipts
- apps/mobile/src/features/expenses
- apps/mobile/src/lib/api.ts
- e2e tests for receipt extraction
- README/env docs for OpenAI and image upload constraints

Tasks:
1. Add receipt image capture/select flow on mobile.
2. Add a backend receipt extraction endpoint.
3. Keep OpenAI calls server-side only.
4. Send receipt image data from mobile to backend in a simple MVP-safe format.
5. Use OpenAI vision extraction in the backend service.
6. Validate AI structured output with Zod before returning it.
7. Return extracted fields:
   - merchant
   - amount
   - date
   - category
   - confidence
8. Add fallback behavior:
   - amount unclear: null
   - date unclear: today with lower confidence
   - merchant unclear: Unknown Merchant
   - category unclear: Other
9. Build Review Extracted Receipt screen.
10. Let users edit all extracted fields before saving.
11. Save confirmed receipt as an expense with source RECEIPT_SCAN or RECEIPT_UPLOAD when supported by the schema.
12. Do not auto-save AI output.
13. Add e2e tests with mocked OpenAI extraction:
   - upload/capture golden path as feasible
   - backend extraction endpoint auth rejection
   - AI response validation failure
   - confirmed receipt becomes an expense
   - data isolation for saved receipt expense

Out of scope:
- AI category learning rules
- System merchant-category priority logic beyond simple category name mapping if needed to save the receipt
- Dashboard
- Budgets
- AI insights
- AI chat
- Weekly review
- Background processing
- Real storage service integration unless already approved and documented

Acceptance criteria:
- User can take a receipt photo.
- User can upload/select a receipt image.
- Backend extracts merchant, amount, date, category, and confidence.
- AI output is validated with Zod.
- User can review and edit AI result before saving.
- Confirmed receipt becomes an expense.
- Mobile app never calls OpenAI directly.
- OpenAI API key is never exposed to mobile.

Manual test checklist:
- Log in.
- Open Scan Receipt.
- Select an image from the device.
- Confirm extraction returns editable fields.
- Edit at least one extracted field.
- Save the reviewed result.
- Confirm the saved receipt appears in the expense list.
- Try extraction without auth and confirm 401.
- Test a mocked invalid AI response and confirm it is rejected.

After implementation:
1. Run available format/typecheck/lint/test commands.
2. Add or update e2e tests for this milestone only.
3. Run the QA/code review checklist from agents/qa-code-reviewer.md.
4. Fix any issues found in review.
5. Run the skill sync review from skills/skill-sync-reviewer.md.
6. Update docs only if implementation changed a documented pattern.
7. Report using the required final output format from prompts/claude-code-milestone-prompts.md.
8. Stop after Milestone 3. Do not continue to Milestone 4.
```

---

## Milestone 4 Prompt - AI Categorization and Learning Rules

Copy this prompt into Claude Code after Milestone 3 has been approved:

```txt
We are building Finance Mate using the provided AGENTS.md, project context, milestone plan, agent docs, and skills.

Start Milestone 4 only: AI Categorization and Learning Rules.

Do not start this milestone unless Milestones 1 through 3 have been implemented and approved. If prerequisites are missing, stop and report what is missing.

Read these files before coding:
- AGENTS.md
- prompts/project-context.md
- prompts/milestone-plan.md
- agents/backend-engineer.md
- agents/qa-code-reviewer.md
- skills/claude-code-milestone-workflow.md
- skills/e2e-test-builder.md
- skills/skill-sync-reviewer.md
- skills/hono-backend-mvp-builder.md
- skills/expense-budget-domain.md

Current milestone:
Automatically categorize expenses and remember user corrections.

Relevant stack:
- Hono backend
- Prisma
- Supabase-authenticated routes
- Zod validation
- OpenAI API from backend only for categorization fallback

Files/areas likely involved:
- apps/api/src/services/category.service.ts
- apps/api/src/services/expense.service.ts
- apps/api/src/services/receipt.service.ts
- apps/api/src/services/ai.service.ts
- apps/api/src/routes/categories.ts
- apps/api/src/schemas/category.schema.ts
- Prisma schema/migration for user-specific category rules if not already present
- seed scripts for system merchant mapping
- e2e tests for categorization
- README/docs if env, migrations, or seed steps change

Tasks:
1. Implement category priority logic:
   - user-specific rule
   - system merchant mapping
   - AI categorization fallback
   - Other
2. Add or complete system merchant-category mapping.
3. Add or complete user-specific category rules.
4. When a user changes a suggested category, save a user-specific rule for that merchant or merchant pattern.
5. Apply user-specific rules before system mappings.
6. Use AI categorization only as fallback and only from the backend.
7. Validate AI category output with Zod.
8. Ensure all user rule queries are scoped by authenticated userId.
9. Integrate categorization with manual expense and receipt-confirmed expense flows where category suggestions are needed.
10. Add e2e tests for known merchant mapping, user correction learning, fallback behavior, auth rejection, and data isolation.

Required system mappings:
- Starbucks -> Coffee
- Mercury Drug -> Health
- Shell -> Transportation
- SM Supermarket -> Groceries

Additional useful mappings may be included only if they already appear in `skills/expense-budget-domain.md` and do not expand product scope.

Out of scope:
- Dashboard
- Budgets
- AI spending insights
- AI chat
- Weekly review
- Investment advice
- Background learning jobs
- Bank integrations

Acceptance criteria:
- Starbucks maps to Coffee.
- Mercury Drug maps to Health.
- Shell maps to Transportation.
- SM Supermarket maps to Groceries.
- User corrections are remembered next time.
- User-specific rule has priority over system mapping.
- System mapping has priority over AI fallback.
- AI fallback has priority over Other.
- Users cannot access or affect another user's category rules.

Manual test checklist:
- Create or categorize a Starbucks expense and confirm Coffee is suggested/used.
- Create or categorize a Mercury Drug expense and confirm Health is suggested/used.
- Create or categorize a Shell expense and confirm Transportation is suggested/used.
- Create or categorize an SM Supermarket expense and confirm Groceries is suggested/used.
- Change a suggested category for a merchant and save.
- Create another expense for that merchant and confirm the user's correction is remembered.
- Confirm another user does not inherit that correction.
- Confirm backend routes reject unauthenticated category-rule actions.

After implementation:
1. Run available format/typecheck/lint/test commands.
2. Add or update e2e tests for this milestone only.
3. Run the QA/code review checklist from agents/qa-code-reviewer.md.
4. Fix any issues found in review.
5. Run the skill sync review from skills/skill-sync-reviewer.md.
6. Update docs only if implementation changed a documented pattern.
7. Report using the required final output format from prompts/claude-code-milestone-prompts.md.
8. Stop after Milestone 4. Do not continue to Milestone 5.
```

---

## Milestone 5 Prompt - Dashboard and Budgets

Copy this prompt into Claude Code after Milestone 4 has been approved:

```txt
We are building Finance Mate using the provided AGENTS.md, project context, milestone plan, agent docs, and skills.

Start Milestone 5 only: Dashboard and Budgets.

Do not start this milestone unless Milestones 1 through 4 have been implemented and approved. If prerequisites are missing, stop and report what is missing.

Read these files before coding:
- AGENTS.md
- prompts/project-context.md
- prompts/milestone-plan.md
- agents/backend-engineer.md
- agents/react-native-engineer.md
- agents/qa-code-reviewer.md
- skills/claude-code-milestone-workflow.md
- skills/e2e-test-builder.md
- skills/skill-sync-reviewer.md
- skills/react-native-mvp-builder.md
- skills/hono-backend-mvp-builder.md
- skills/expense-budget-domain.md
- skills/dashboard-insights.md

Current milestone:
Show spending overview and category budget progress.

Relevant stack:
- Hono backend service-layer calculations
- Prisma
- Zod validation
- Expo React Native with TypeScript
- TanStack Query
- Simple chart/progress UI suitable for Expo

Files/areas likely involved:
- apps/api/src/routes/dashboard.ts
- apps/api/src/routes/budgets.ts
- apps/api/src/services/dashboard.service.ts
- apps/api/src/services/budget.service.ts
- apps/api/src/schemas/budget.schema.ts
- apps/mobile/app/(tabs)/index.tsx
- apps/mobile/app/(tabs)/budgets.tsx
- apps/mobile/src/features/dashboard
- apps/mobile/src/features/budgets
- apps/mobile/src/lib/api.ts
- e2e tests for dashboard and budgets
- README/docs if commands, env vars, or migrations change

Tasks:
1. Implement monthly dashboard summary API:
   - GET /dashboard/summary?month=YYYY-MM
2. Backend should calculate:
   - total spent today
   - total spent this month
   - spending by category
   - remaining budget
   - recent expenses
   - top categories if useful for the dashboard
3. Implement Budget CRUD API for authenticated users:
   - GET /budgets?month=YYYY-MM
   - POST /budgets
   - PATCH /budgets/:id
   - DELETE /budgets/:id
4. Validate month as YYYY-MM.
5. Validate budget amounts as positive numbers.
6. Scope all dashboard, expense, and budget queries by authenticated userId.
7. Build dashboard screen with loading, error, and empty states.
8. Build budget list/create/edit/delete screens or flows.
9. Show budget progress indicators.
10. Show warning states:
   - 70% = soft warning
   - 90% = strong warning
   - 100% = over budget
11. Use PHP currency display consistently.
12. Add e2e tests for summary, budget CRUD, warning thresholds, auth rejection, data isolation, and invalid input.

Out of scope:
- AI spending insight generation
- AI chat
- Weekly review
- Receipt extraction changes unless needed for compatibility
- Background notifications
- Bank integrations

Acceptance criteria:
- User sees daily total.
- User sees monthly total.
- User sees category spending.
- User sees remaining budget.
- User sees recent expenses.
- User can create budgets.
- User can edit budgets.
- User can delete budgets.
- Budget warnings display correctly at 70%, 90%, and 100%.
- Users cannot see or mutate another user's budgets.
- Dashboard calculations use only the logged-in user's data.

Manual test checklist:
- Create several expenses across categories for the current month.
- Open dashboard and confirm daily/monthly totals.
- Confirm spending by category is correct.
- Create a category budget.
- Confirm remaining budget is correct.
- Edit the budget and confirm progress updates.
- Add expenses to cross 70%, 90%, and 100% usage and confirm warnings.
- Delete a budget and confirm it disappears.
- Confirm unauthenticated API calls are rejected.
- Confirm test user B cannot see test user A dashboard/budgets.

After implementation:
1. Run available format/typecheck/lint/test commands.
2. Add or update e2e tests for this milestone only.
3. Run the QA/code review checklist from agents/qa-code-reviewer.md.
4. Fix any issues found in review.
5. Run the skill sync review from skills/skill-sync-reviewer.md.
6. Update docs only if implementation changed a documented pattern.
7. Report using the required final output format from prompts/claude-code-milestone-prompts.md.
8. Stop after Milestone 5. Do not continue to Milestone 6.
```

---

## Milestone 6 Prompt - AI Spending Insights

Copy this prompt into Claude Code after Milestone 5 has been approved:

```txt
We are building Finance Mate using the provided AGENTS.md, project context, milestone plan, agent docs, and skills.

Start Milestone 6 only: AI Spending Insights.

Do not start this milestone unless Milestones 1 through 5 have been implemented and approved. If prerequisites are missing, stop and report what is missing.

Read these files before coding:
- AGENTS.md
- prompts/project-context.md
- prompts/milestone-plan.md
- agents/backend-engineer.md
- agents/react-native-engineer.md
- agents/qa-code-reviewer.md
- skills/claude-code-milestone-workflow.md
- skills/e2e-test-builder.md
- skills/skill-sync-reviewer.md
- skills/hono-backend-mvp-builder.md
- skills/dashboard-insights.md

Current milestone:
Generate plain-language spending insights from real user spending stats.

Relevant stack:
- Hono backend
- Prisma
- Zod validation
- OpenAI API from backend only
- Expo React Native with TypeScript
- TanStack Query

Files/areas likely involved:
- apps/api/src/routes/insights.ts
- apps/api/src/services/insight.service.ts
- apps/api/src/services/dashboard.service.ts
- apps/api/src/services/ai.service.ts
- apps/api/src/schemas/insight.schema.ts
- apps/api/src/lib/openai.ts
- apps/mobile/app/(tabs)/insights.tsx
- apps/mobile/src/features/insights
- apps/mobile/src/lib/api.ts
- e2e tests for insights with mocked AI
- README/env docs for OpenAI if not already documented

Tasks:
1. Implement server-side spending stat calculations:
   - week-over-week category comparisons
   - month-to-date top category summaries
   - budget warning insights
   - biggest purchase insight
   - recurring merchant detection
2. Prepare safe summarized data for the AI prompt.
3. Do not send unnecessary raw transaction history to AI.
4. Generate concise AI insight text.
5. Validate AI structured output with Zod before saving or returning.
6. Include insight severity:
   - info
   - warning
   - danger
7. Build Insights screen with generate/refresh behavior.
8. Show loading, error, empty, and generated states.
9. Persist insights only if existing schema supports it cleanly; otherwise return generated insights without overbuilding storage.
10. Add e2e tests with mocked OpenAI:
   - generate insights golden path
   - auth rejection
   - data isolation
   - AI invalid response validation failure
   - no hallucinated merchant/category/amount from mocked stats

Out of scope:
- Chat interface
- Saved chat messages
- Weekly review screen/API
- Investment advice
- Background jobs or scheduled insight generation
- Push notifications

Acceptance criteria:
- User can generate insights.
- Insights are based on real spending data.
- Backend calculates stats before calling AI.
- AI does not invent merchants.
- AI does not invent categories.
- AI does not invent amounts.
- AI explains spending changes clearly.
- Insights have severity: info, warning, or danger.
- Mobile Insights screen handles loading, error, empty, and generated states.

Manual test checklist:
- Create expenses across this week and previous week.
- Create at least one budget near a warning threshold.
- Generate insights.
- Confirm insights reference only real categories, merchants, and amounts.
- Confirm at least one severity appears.
- Confirm no investment advice is produced.
- Confirm unauthenticated insight API calls are rejected.
- Confirm test user B cannot generate insights from test user A data.

After implementation:
1. Run available format/typecheck/lint/test commands.
2. Add or update e2e tests for this milestone only.
3. Run the QA/code review checklist from agents/qa-code-reviewer.md.
4. Fix any issues found in review.
5. Run the skill sync review from skills/skill-sync-reviewer.md.
6. Update docs only if implementation changed a documented pattern.
7. Report using the required final output format from prompts/claude-code-milestone-prompts.md.
8. Stop after Milestone 6. Do not continue to Milestone 7.
```

---

## Milestone 7 Prompt - Ask AI About Your Money

Copy this prompt into Claude Code after Milestone 6 has been approved:

```txt
We are building Finance Mate using the provided AGENTS.md, project context, milestone plan, agent docs, and skills.

Start Milestone 7 only: Ask AI About Your Money.

Do not start this milestone unless Milestones 1 through 6 have been implemented and approved. If prerequisites are missing, stop and report what is missing.

Read these files before coding:
- AGENTS.md
- prompts/project-context.md
- prompts/milestone-plan.md
- agents/backend-engineer.md
- agents/react-native-engineer.md
- agents/qa-code-reviewer.md
- skills/claude-code-milestone-workflow.md
- skills/e2e-test-builder.md
- skills/skill-sync-reviewer.md
- skills/react-native-mvp-builder.md
- skills/hono-backend-mvp-builder.md
- skills/money-chat.md

Current milestone:
Add a chat interface backed by safe server-side access to the user's spending data.

Relevant stack:
- Expo React Native with TypeScript
- Hono backend
- Prisma
- Zod validation
- OpenAI API from backend only
- TanStack Query or mutations for chat requests

Files/areas likely involved:
- apps/api/src/routes/chat.ts
- apps/api/src/services/chat.service.ts
- apps/api/src/services/chat-query.service.ts or equivalent safe query module
- apps/api/src/services/ai.service.ts
- apps/api/src/schemas/chat.schema.ts
- Prisma schema/migration for saved chat messages if not already present
- apps/mobile/app/(tabs)/chat.tsx
- apps/mobile/src/features/chat
- apps/mobile/src/lib/api.ts
- e2e tests for chat with mocked AI
- README/docs if migrations or env vars change

Tasks:
1. Implement Chat API:
   - POST /chat
   - GET /chat/messages
2. Save user and assistant chat messages when supported by schema.
3. Add safe backend query/stat functions for supported question types:
   - spending by category
   - spending by date range
   - biggest expense
   - merchant spending
   - budget status
   - subscription-like recurring merchants
   - simple overspending explanation based on available data
4. Ensure the AI never directly queries the database.
5. Backend must classify or route questions to safe query handlers before AI response generation.
6. Pass only retrieved/summarized user data to AI.
7. Validate request bodies and any structured AI outputs with Zod.
8. Refuse or limit questions outside available Finance Mate data.
9. Avoid regulated financial or investment advice.
10. Build mobile Chat screen with:
    - message history
    - input box
    - send state
    - loading/error/empty states
11. Add e2e tests with mocked AI:
    - supported spending question golden path
    - saved messages
    - auth rejection
    - data isolation
    - refusal for unsupported/investment-style question
    - no direct database access by AI

Supported questions:
- How much did I spend on coffee?
- What did I spend yesterday?
- What is my biggest expense?
- Which subscriptions do I have?
- Why did I overspend this month?
- Can I still spend on eating out this week?

Out of scope:
- Weekly financial review
- Background chat summaries
- Voice input
- Bank integrations
- Investment recommendations
- Net worth tracking

Acceptance criteria:
- User can ask spending questions.
- AI answers using the user's actual expense data.
- Backend controls all data retrieval.
- AI does not directly query the database.
- Saved chat messages are available to the logged-in user.
- Users cannot see another user's chat messages.
- AI refuses or limits answers outside available data.
- AI avoids regulated investment advice.

Manual test checklist:
- Log in.
- Ask how much was spent on a category with known expenses.
- Ask what was spent yesterday.
- Ask for the biggest expense.
- Ask which subscriptions exist with recurring merchant data.
- Ask an unsupported question and confirm the app explains the limitation.
- Ask for investment advice and confirm the answer avoids recommendations.
- Refresh chat and confirm messages persist.
- Confirm unauthenticated chat calls are rejected.
- Confirm test user B cannot see test user A messages or data.

After implementation:
1. Run available format/typecheck/lint/test commands.
2. Add or update e2e tests for this milestone only.
3. Run the QA/code review checklist from agents/qa-code-reviewer.md.
4. Fix any issues found in review.
5. Run the skill sync review from skills/skill-sync-reviewer.md.
6. Update docs only if implementation changed a documented pattern.
7. Report using the required final output format from prompts/claude-code-milestone-prompts.md.
8. Stop after Milestone 7. Do not continue to Milestone 8.
```

---

## Milestone 8 Prompt - Weekly Financial Review

Copy this prompt into Claude Code after Milestone 7 has been approved:

```txt
We are building Finance Mate using the provided AGENTS.md, project context, milestone plan, agent docs, and skills.

Start Milestone 8 only: Weekly Financial Review.

Do not start this milestone unless Milestones 1 through 7 have been implemented and approved. If prerequisites are missing, stop and report what is missing.

Read these files before coding:
- AGENTS.md
- prompts/project-context.md
- prompts/milestone-plan.md
- agents/backend-engineer.md
- agents/react-native-engineer.md
- agents/qa-code-reviewer.md
- skills/claude-code-milestone-workflow.md
- skills/e2e-test-builder.md
- skills/skill-sync-reviewer.md
- skills/hono-backend-mvp-builder.md
- skills/dashboard-insights.md

Current milestone:
Generate an on-demand weekly financial summary from the user's actual expense data.

Relevant stack:
- Hono backend
- Prisma
- Zod validation
- OpenAI API from backend only
- Expo React Native with TypeScript
- TanStack Query/mutations

Files/areas likely involved:
- apps/api/src/routes/weekly-review.ts
- apps/api/src/services/weekly-review.service.ts
- apps/api/src/services/ai.service.ts
- apps/api/src/schemas/weekly-review.schema.ts
- apps/mobile/app/(tabs)/weekly-review.tsx or equivalent route
- apps/mobile/src/features/weekly-review
- apps/mobile/src/lib/api.ts
- e2e tests for weekly review with mocked AI
- README/docs if routes, commands, env vars, or migrations change

Tasks:
1. Implement on-demand weekly review API:
   - POST /weekly-review/generate
2. Calculate backend stats before calling AI:
   - current week total spending
   - previous week total spending
   - current vs previous week comparison
   - biggest purchase this week
   - category increases/decreases
   - relevant merchant highlights such as increased merchant spending when supported by the data
3. Pass only safe summarized stats to AI.
4. Validate AI output with Zod.
5. Return:
   - summary
   - highlights
   - underlying totals when useful for UI verification
6. Build Weekly Review screen with:
   - Generate Weekly Review button
   - loading state
   - error state
   - empty/not-enough-data state
   - generated summary and highlights
7. Do not create background jobs or scheduled reviews.
8. Add e2e tests with mocked AI:
   - generate weekly review golden path
   - not enough data behavior
   - auth rejection
   - data isolation
   - AI invalid response validation failure

Out of scope:
- Push notifications
- Background scheduled jobs
- Email summaries
- Investment advice
- Bank integrations
- New analytics beyond the weekly review acceptance criteria

Acceptance criteria:
- User can tap Generate Weekly Review.
- Review shows total spent this week.
- Review includes highlights.
- Review compares current week vs previous week.
- Review identifies biggest purchase.
- AI does not invent merchants, categories, or amounts.
- Review uses only the logged-in user's data.
- Weekly review is generated on demand only.

Manual test checklist:
- Create expenses for the current week.
- Create expenses for the previous week.
- Tap Generate Weekly Review.
- Confirm total spent this week is correct.
- Confirm highlights reference real categories/merchants/amounts.
- Confirm biggest purchase is correct.
- Confirm week-over-week comparison is reasonable.
- Confirm not-enough-data behavior with a new user.
- Confirm unauthenticated API calls are rejected.
- Confirm test user B cannot generate a review from test user A data.

After implementation:
1. Run available format/typecheck/lint/test commands.
2. Add or update e2e tests for this milestone only.
3. Run the QA/code review checklist from agents/qa-code-reviewer.md.
4. Fix any issues found in review.
5. Run the skill sync review from skills/skill-sync-reviewer.md.
6. Update docs only if implementation changed a documented pattern.
7. Report using the required final output format from prompts/claude-code-milestone-prompts.md.
8. Stop after Milestone 8. Do not add post-MVP features.
```
