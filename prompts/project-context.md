# Finance Mate — Project Context

## Product Summary

Finance Mate is an AI Financial Copilot MVP for users who want to understand where their money goes and what to do next.

The MVP should help users:

- Log expenses manually.
- Scan or upload receipts.
- Extract merchant, amount, date, and category from receipts using AI.
- Automatically categorize expenses.
- Edit categories and allow the system to learn from corrections.
- View daily and monthly spending dashboards.
- Create monthly budget goals by category.
- Generate AI spending insights.
- Ask questions about their money using chat.
- Generate a weekly financial review on demand.

## MVP Philosophy

Keep the MVP simple, useful, and testable.

Do not build:

- Bank integrations
- GCash or Maya integrations
- Plaid
- Payment processing
- Investment advice
- Net worth tracking
- Push notifications
- Background jobs
- Admin dashboard
- Web app
- Multi-currency support
- Offline-first sync

## Tech Stack

Use:

- Expo React Native with TypeScript
- Expo Router
- Hono with TypeScript
- Prisma
- Neon Postgres
- Supabase Auth for email/password auth
- Zod for validation
- OpenAI API from backend only

## Monorepo Structure

Use a single monorepo:

```txt
finance-mate
  apps
    mobile
    api
  packages
    shared
```

## Currency

Default currency is PHP.

Display amounts like:

```txt
₱245.50
₱8,000
₱14,350
```

## AI Safety Rules

- Never expose OpenAI API keys to the mobile app.
- Never let the AI directly query the database.
- Backend must compute or retrieve user-specific data first, then send only the needed summarized data to the AI.
- Validate AI output with Zod before saving or displaying structured data.
- AI should not provide regulated financial or investment advice.

Allowed example:

```txt
You may want to reduce GrabFood spending if you want to stay within your Food budget.
```

Avoid:

```txt
You should buy this stock.
```
