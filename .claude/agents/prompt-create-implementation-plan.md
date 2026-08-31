---
name: prompt-create-implementation-plan
description: User-invocable prompt to create a dependency-ordered implementation plan from approved architecture and design review documents. Call with /prompt-create-implementation-plan.
tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
model: claude-opus-4-5
---

# Create Implementation Plan

Break the approved architecture into dependency-ordered implementation tasks.

## Inputs

- `docs/requirements.md` — approved requirements
- `docs/architecture.md` — approved architecture
- `docs/design-review.md` — resolved findings

## Steps

1. Identify all implementation tasks from the architecture.
2. Determine dependencies between tasks.
3. Order tasks so dependencies are satisfied.
4. Estimate complexity and list acceptance criteria for each task.
5. Flag tasks needing external resources or human decisions.
6. Write `docs/impl-plan.md`.

## Expected Output

- `docs/impl-plan.md` with ordered tasks per the `skill-implementation-planning` format.

## Stop Conditions

- If architecture has unresolved Blocking findings, stop and report.
- If a task requires unapproved resources, flag and stop.
