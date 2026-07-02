# Skill: Dashboard and Spending Insights

## Purpose

Use this skill when implementing Finance Mate daily/monthly dashboard, category summaries, budget progress, AI spending insights, and weekly financial reviews.

## Dashboard Goal

The dashboard should answer:

```txt
How much did I spend, where did it go, and am I still within budget?
```

## Required Dashboard Values

Show:

- Total spent today
- Total spent this month
- Spending by category
- Remaining budget
- Top 3 categories this month
- Recent expenses

## Dashboard API

Use:

```txt
GET /dashboard/summary?month=YYYY-MM
```

Response shape:

```ts
{
  totalSpentToday: number
  totalSpentThisMonth: number
  remainingBudget: number
  spendingByCategory: Array<{
    category: string
    amount: number
  }>
  topCategories: Array<{
    category: string
    amount: number
  }>
  recentExpenses: Expense[]
}
```

## Chart Rules

Keep charts simple.

Use:

- Pie or donut chart for spending by category.
- Bar chart for daily spending this month.

Do not build complex analytics charts in MVP.

## AI Spending Insights Goal

Insights should explain what changed, not just show numbers.

Examples:

```txt
You spent 38% more on Food this week compared to last week.
Grab spending increased by ₱1,200 compared to last week.
Coffee purchases totaled ₱2,400 this month.
Entertainment is your second-largest expense this month.
You're close to your Shopping budget.
```

## Required Insight Types

Implement first:

1. Week-over-week category changes.
2. Month-to-date top categories.
3. Budget warning insights.
4. Biggest purchase of the week.
5. Recurring merchant detection.

## Insight Generation Rule

The backend should calculate raw stats first.

Then send summarized stats to AI.

Do not ask AI to calculate from raw unsummarized transaction history unless necessary.

Good AI input shape:

```json
{
  "currentWeek": {
    "totalSpent": 14350,
    "categoryTotals": {
      "Food": 5200,
      "Transport": 2100,
      "Shopping": 3200
    }
  },
  "previousWeek": {
    "totalSpent": 11800,
    "categoryTotals": {
      "Food": 3800,
      "Transport": 1900,
      "Shopping": 3600
    }
  },
  "budgets": [
    {
      "category": "Food",
      "limit": 8000,
      "spent": 5200
    }
  ]
}
```

## Structured Insight Output

Validate AI output against:

```ts
type SpendingInsight = {
  title: string
  description: string
  severity: "info" | "warning" | "danger"
  category?: string
}
```

## Weekly Review

For MVP, weekly review should be generated on demand from a button.

Do not build background jobs yet.

Example:

```txt
You spent ₱14,350 this week.

Highlights:
- Food spending increased by 18%.
- Shopping decreased by 12%.
- Biggest purchase: ₱3,200 at Power Mac.
- Grab spending increased by ₱1,200.
- You are still within your Food and Transport budgets.
```

## Weekly Review API

Use:

```txt
POST /weekly-review/generate
```

Response:

```ts
{
  summary: string
  highlights: string[]
}
```

## AI Accuracy Rules

- AI must not invent merchants.
- AI must not invent categories.
- AI must not invent amounts.
- AI should only reference data provided by backend stats.
- If there is not enough data, say so clearly.
