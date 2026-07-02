# Skill: Skill Sync Reviewer

## Purpose

Use this skill at the end of every milestone, after Fix and before Approve, to keep the `agents/` and `skills/` docs accurate.

These docs are the source of truth for how future milestones get built. If a milestone's actual implementation diverges from what a skill or agent doc says — a different library, a changed folder structure, a rule that turned out to be wrong or incomplete — the docs must be updated in the same milestone. Otherwise every future milestone is planned and reviewed against stale instructions.

## When to Use

Run this after QA / Code Review has approved fixes, as part of the milestone loop:

```txt
Plan -> Implement -> E2E Test -> Review -> Fix -> Skill Sync -> Approve -> Next milestone
```

## What to Check

For each agent/skill doc that was referenced during this milestone (see `AGENTS.md` section 6 for the milestone's doc list), check whether the milestone's actual changes still match what the doc says:

- Folder/file structure examples (`Preferred API structure`, `Preferred mobile structure`, e2e test layout, etc.)
- Named libraries, tools, or versions
- Rules that were bent, contradicted, or superseded by an explicit approved decision
- New patterns introduced this milestone that later milestones should reuse (e.g. a new shared service, a new response shape, a new test fixture pattern)
- Examples/checklists that reference features that no longer match the milestone's real acceptance criteria

Do not update docs for:

- Speculative future milestones
- One-off exceptions that shouldn't become the new default
- Anything not actually implemented and approved this milestone

## How to Update

1. Identify the specific doc(s) affected (usually in `agents/` or `skills/`).
2. Make the smallest edit that keeps the doc accurate — update the example, rule, or structure block, don't rewrite unrelated sections.
3. If a change contradicts a "Do Not Do" rule, confirm it was an explicit approved decision (see `AGENTS.md` section 2, Change Control) before editing the rule away.
4. If `AGENTS.md` itself references outdated structure (e.g. milestone doc lists, the loop diagram), update it too.

## Required Output After Skill Sync

```txt
Docs reviewed:

Docs updated:

Reason for each update:

Docs intentionally left unchanged (and why):
```

If nothing needed updating, state that explicitly rather than skipping the step silently.

## Do Not Do

- Do not silently skip this step because "nothing seemed different."
- Do not rewrite a doc's tone, structure, or unrelated sections while fixing one fact.
- Do not change scope-control rules (non-goals, tech stack, milestone boundaries) without explicit developer approval.
