# Finance Mate — Milestone Plan

## Milestone 1 — Project Setup, Auth, Database

Build foundation only.

Acceptance criteria:

- Mobile app runs.
- API runs.
- Prisma migration runs.
- Supabase email/password auth works.
- User can sign up, log in, and log out.
- API rejects unauthenticated requests.
- Protected `GET /me` works.
- Default categories are seeded.

Do not build expenses yet.

## Milestone 2 — Manual Expense Logging

Acceptance criteria:

- User can create expense manually.
- User can edit expense.
- User can delete expense.
- User can view expenses by latest date.
- Expenses are scoped to logged-in user only.

Do not build receipt scanning yet.

## Milestone 3 — Receipt Upload and AI Extraction

Acceptance criteria:

- User can select image.
- User can capture image.
- AI extracts merchant, amount, date, and category.
- User can edit AI result before saving.
- Expense saves correctly.

## Milestone 4 — AI Categorization and Learning Rules

Acceptance criteria:

- Known merchants map to expected categories.
- User category corrections are remembered.
- Categorization priority is user rule, system merchant map, AI fallback, then Other.

## Milestone 5 — Dashboard and Budgets

Acceptance criteria:

- User sees total spent today.
- User sees total spent this month.
- User sees spending by category.
- User sees remaining budget.
- User can create, edit, and delete category budgets.
- Budget warnings show at 70%, 90%, and 100%.

## Milestone 6 — AI Spending Insights

Acceptance criteria:

- User can generate insights.
- Insights explain spending changes.
- Insights are based on real spending data.
- AI does not hallucinate merchants, categories, or numbers not in provided stats.

## Milestone 7 — Ask AI About Your Money

Acceptance criteria:

- User can ask spending questions.
- AI answers using the user's actual expense data.
- AI refuses questions outside available financial data.
- AI avoids regulated investment advice.

## Milestone 8 — Weekly Financial Review

Acceptance criteria:

- User can generate weekly review on demand.
- Review includes total spent.
- Review includes highlights.
- Review compares categories to previous week.
- Review identifies biggest purchase.
