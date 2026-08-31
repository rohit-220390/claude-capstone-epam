---
name: prompt-implement-task
description: User-invocable prompt to implement one approved task from the implementation plan with tests. Provide the task ID. Call with /prompt-implement-task.
tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
model: claude-opus-4-5
---

# Implement Task

Implement a single approved task from `docs/impl-plan.md`.

## Inputs

- Task ID from the implementation plan
- `docs/requirements.md`, `docs/architecture.md` for reference

## Steps

1. Read the task definition from `docs/impl-plan.md`.
2. Verify all dependencies are complete.
3. Implement the source code following repository conventions.
4. Add unit tests covering happy path and failure cases.
5. Run the tests to verify they pass.
6. Update documentation if the task affects docs.

## Expected Output

- Source files implementing the task.
- Test files with passing tests.
- Build verification (compiles without errors).

## Stop Conditions

- If dependencies are not met, stop and report which are missing.
- If tests fail, report the failures and stop.
- If the task requires a design decision not in the architecture, stop and escalate.
