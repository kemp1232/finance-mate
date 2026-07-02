# Skill: Expense and Budget Domain

## Purpose

Use this skill when implementing Finance Mate expense logging, receipt-confirmed expenses, categories, category learning rules, and monthly budgets.

## Domain Goal

Help users track expenses and compare spending against monthly category budgets.

## Default Categories

Seed these categories:

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

For MVP, focus on expenses. `Income` may exist as a default category but income tracking is not a core MVP flow.

## Expense Fields

An expense should include:

```ts
amount: number
merchant: string
date: string
categoryId: string
notes?: string
paymentMethod?: string
source: "MANUAL" | "RECEIPT_SCAN" | "RECEIPT_UPLOAD"
receiptImageUrl?: string
aiConfidence?: number
```

## Manual Expense Flow

1. User opens Add Expense.
2. User enters amount, merchant, date, category, optional notes, and optional payment method.
3. App validates form.
4. Backend validates request.
5. Expense is saved under authenticated user ID.
6. Expense appears in expenses list.

## Receipt Expense Flow

1. User captures or uploads receipt.
2. Backend extracts merchant, amount, date, and category using AI.
3. AI response is validated.
4. User reviews and edits result.
5. User confirms.
6. Expense is saved.

Never auto-save AI receipt extraction without user review.

## AI Extraction Fields

Receipt extraction should return:

```ts
merchant: string
amount: number | null
date: string
category: string
confidence: number
rawText?: string
```

Fallback rules:

- If amount is unclear, return `null`.
- If date is unclear, default to today and lower confidence.
- If merchant is unclear, use `Unknown Merchant`.
- If category is unclear, use `Other`.

## Categorization Priority

Use this order:

1. User-specific category rule.
2. System merchant map.
3. AI categorization.
4. Fallback to `Other`.

## Example Merchant Mapping

```txt
Starbucks -> Coffee
Dunkin -> Coffee
Mercury Drug -> Health
Watsons -> Health
Shell -> Transportation
Petron -> Transportation
SM Supermarket -> Groceries
Robinsons Supermarket -> Groceries
Meralco -> Bills
Maynilad -> Bills
Netflix -> Subscriptions
Spotify -> Subscriptions
GrabFood -> Food
Grab -> Transportation or Food depending on text
```

## Category Learning Rule

When a user changes an AI-suggested or system-suggested category, save a rule.

Example:

```txt
Merchant: GrabFood
Old category: Transportation
New category: Food
```

Save:

```ts
merchantPattern: "GrabFood"
categoryId: Food
```

Next time, use the user's saved rule first.

## Budget Fields

Budget should include:

```ts
categoryId: string
month: string
limitAmount: number
```

Month format:

```txt
YYYY-MM
```

## Budget Warning Thresholds

Use:

```txt
70% = Soft warning
90% = Strong warning
100% = Over budget
```

Example warning:

```txt
You're 90% through your Shopping budget with 10 days remaining.
```

## Important Calculations

Budget spent amount:

```txt
sum expenses where userId matches, categoryId matches, and date is within the selected month
```

Remaining budget:

```txt
limitAmount - spentAmount
```

Budget percent used:

```txt
spentAmount / limitAmount * 100
```

## Security Rules

- Every expense must belong to the authenticated user.
- Every budget must belong to the authenticated user.
- Users must not access other users' expenses, budgets, or rules.
