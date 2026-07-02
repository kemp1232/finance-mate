# Skill: Claude Code Milestone Workflow

## Purpose

Use this skill whenever Claude Code or another coding agent is asked to implement part of Finance Mate.

The goal is to keep implementation controlled, reviewable, and milestone-based.

## Core Rule

Build only one milestone at a time.

Do not implement future milestone functionality unless explicitly requested.

## Workflow

1. Read the project context.
2. Read the current milestone requirements.
3. Identify relevant files or folders.
4. Implement only the requested milestone.
5. Run type checks, linting, and tests if available.
6. Stop after the milestone is complete.
7. Report files changed, setup steps, assumptions, and manual test checklist.

## Required Agent Output After Coding

At the end of every coding run, provide:

```txt
Summary:

Files changed:

How to run:

Environment variables needed:

Manual test checklist:

Assumptions:

Known limitations:

Next recommended milestone:
```

## Scope Guardrails

If asked to build Milestone 1, do not build expenses.

If asked to build Milestone 2, do not build receipt AI extraction.

If asked to build Milestone 3, do not build dashboards unless required to verify expense saving.

If asked to build Milestone 4, do not build AI chat.

If asked to build Milestone 5, do not build AI insights unless the milestone explicitly includes them.

If asked to build Milestone 6, do not build chat.

If asked to build Milestone 7, do not build background weekly notifications.

If asked to build Milestone 8, generate weekly review on demand only.

## Change Control

Ask for approval before:

- Changing the selected tech stack.
- Moving away from the monorepo structure.
- Replacing Supabase Auth.
- Replacing Prisma.
- Replacing Hono.
- Adding paid-only services.
- Adding complex architecture not requested.

Do not ask for approval for small implementation details that are already implied by the milestone.

## Quality Bar

Every milestone should leave the project in a working state.

Do not leave placeholder code for core milestone features.

Stubs are acceptable only for future milestones and must be clearly labeled.
