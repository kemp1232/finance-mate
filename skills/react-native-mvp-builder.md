# Skill: React Native MVP Builder

## Purpose

Use this skill when building Finance Mate mobile features with Expo React Native and TypeScript.

## Stack

Use:

- Expo React Native
- TypeScript
- Expo Router
- React Hook Form
- Zod
- TanStack Query
- Expo SecureStore
- Expo Image Picker

## App Structure

Recommended structure:

```txt
apps/mobile
  app
    (auth)
      login.tsx
      signup.tsx
      forgot-password.tsx
    (tabs)
      index.tsx
      expenses.tsx
      budgets.tsx
      insights.tsx
      chat.tsx
    expense
      add.tsx
      scan.tsx
      review.tsx
  src
    components
    features
      auth
      expenses
      dashboard
      budgets
      insights
      chat
    lib
      api.ts
      supabase.ts
      secure-storage.ts
    types
```

## Form Rules

- Use React Hook Form.
- Use Zod schemas for validation.
- Show validation messages beside or below relevant fields.
- Money fields should support PHP formatting but store numeric values.
- Dates should be explicit and editable.

## API Rules

- Use one API client wrapper.
- Attach authenticated token to every protected request.
- Handle 401 responses by clearing session and redirecting to login.
- Use TanStack Query for read requests and mutations.

## Auth Rules

- Use Supabase Auth for email/password.
- Store session securely using Expo SecureStore when appropriate.
- Do not store passwords locally.
- Do not expose service role keys.

## Receipt Flow Rules

For receipt-based expenses:

1. User captures or selects image.
2. Mobile sends image to backend.
3. Backend performs AI extraction.
4. Mobile displays review screen.
5. User edits or confirms extracted values.
6. Only then save the expense.

Do not auto-save AI-extracted receipt data.

## UI State Rules

Every screen that loads server data should include:

- Loading state
- Error state
- Empty state
- Pull-to-refresh if useful

## Money Display

Default currency is PHP.

Use display examples:

```txt
₱245.50
₱8,000
₱14,350
```

## Do Not Do

- Do not call OpenAI from the mobile app.
- Do not store API secrets in mobile env variables.
- Do not build unnecessary animation-heavy UI.
- Do not add global state management unless needed.
