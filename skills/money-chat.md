# Skill: Ask AI About Your Money

## Purpose

Use this skill when implementing Finance Mate's AI chat feature where users ask questions about their spending data.

## Chat Goal

The chat should let users ask simple financial questions in natural language.

Examples:

```txt
How much did I spend on coffee?
What did I spend yesterday?
What's my biggest expense?
Which subscriptions do I have?
Why did I overspend this month?
Can I still spend on eating out this week?
```

## Core Rule

The AI should not directly query the database.

The backend must provide safe server-side query functions and pass only the needed data to the AI.

## Supported Question Types for MVP

Support:

1. Spending by category.
2. Spending by date range.
3. Biggest expenses.
4. Merchant search.
5. Budget status.
6. Subscription-like recurring merchants.
7. Simple explanation of overspending based on available data.

## Chat API

Use:

```txt
POST /chat
GET /chat/messages
```

Request:

```ts
{
  message: string
}
```

Response:

```ts
{
  answer: string
}
```

## Suggested Backend Flow

1. Receive user question.
2. Classify intent.
3. Run safe backend query or stat calculation.
4. Send question and retrieved data to AI.
5. Generate a concise answer.
6. Save user and assistant messages.
7. Return answer.

## Safe Query Functions

Create functions like:

```ts
getSpendingByCategory(userId, categoryName, dateRange)
getSpendingByDateRange(userId, dateRange)
getBiggestExpenses(userId, dateRange, limit)
getMerchantSpending(userId, merchantName, dateRange)
getBudgetStatus(userId, month)
getRecurringMerchants(userId, dateRange)
```

All functions must scope by `userId`.

## Answer Style

Keep responses simple and practical.

Example:

```txt
You spent ₱2,400 on Coffee this month across 12 transactions.

Your top coffee merchants were:
1. Starbucks — ₱1,650
2. Dunkin — ₱450
3. Coffee Bean — ₱300
```

## Refusal and Limitation Rules

If the user asks for something outside available data, say so.

Example:

```txt
I can only answer based on expenses you've logged in Finance Mate. I don't have bank account or GCash data yet.
```

If the user asks for investment advice, avoid specific recommendations.

Allowed:

```txt
I can help you understand your spending and saving capacity, but I can't recommend specific investments.
```

Avoid:

```txt
Buy this stock.
```

## Accuracy Rules

- Do not make up numbers.
- Do not mention merchants not found in user data.
- Do not claim a subscription exists unless there is recurring merchant evidence.
- If there is not enough data, say so.
- Prefer exact date ranges in responses.
