# Finance Mate — Agents and Skills Setup

Finance Mate is an AI Financial Copilot MVP built as a single monorepo.

Recommended stack:

- Mobile: Expo React Native + TypeScript + Expo Router
- Backend: Hono + TypeScript
- Database: Neon Postgres + Prisma
- Auth: Supabase Auth using email/password
- Validation: Zod
- AI: OpenAI API from backend only
- Monorepo structure: `apps/mobile`, `apps/api`, `packages/shared`

## How to Use These Docs

Use these markdown files as reusable instructions for Codex, Claude Code, or any coding agent.

Recommended workflow:

1. Start with `prompts/project-context.md`.
2. Pick one milestone.
3. Attach the relevant agent doc from `agents/`.
4. Attach the relevant skill docs from `skills/`.
5. Tell the coding agent to implement only the current milestone.
6. Review manually.
7. Run QA checklist.
8. Proceed to the next milestone only after approval.

## Recommended Agents

- `agents/product-architect.md`
- `agents/react-native-engineer.md`
- `agents/backend-engineer.md`
- `agents/qa-code-reviewer.md`

## Recommended Skills

- `skills/claude-code-milestone-workflow.md`
- `skills/react-native-mvp-builder.md`
- `skills/hono-backend-mvp-builder.md`
- `skills/expense-budget-domain.md`
- `skills/dashboard-insights.md`
- `skills/money-chat.md`

## Important Rule

Build Finance Mate one milestone at a time. Do not ask Claude Code to build the full MVP in one pass.
