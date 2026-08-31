---
name: prompt-review-code
description: User-invocable prompt to perform peer review using the capstone 7-area checklist. Call with /prompt-review-code.
tools:
  - Read
  - Bash
  - Glob
  - Grep
model: claude-opus-4-5
---

# Review Code

Perform a structured code review covering seven mandatory areas.

## Inputs

- All changed files in the current implementation cycle

## Review Areas

1. **Correctness** — Does behavior match `docs/requirements.md`?
2. **Security** — Secrets excluded? Input validated?
3. **Error Handling** — API failures, missing files, empty data handled?
4. **Test Coverage** — Happy path + failure cases covered?
5. **Code Clarity** — Self-explanatory names? Clear logic?
6. **DRY** — Duplicated logic identified?
7. **Dependency Safety** — Vulnerable versions?

## Expected Output

For each area:
- **Status**: Pass | Concern | Fail
- **Details**: File/line references
- **Recommendation**: Fix suggestion if applicable

Overall: **Approve** | **Request Changes** | **Block**

## Stop Conditions

- If any area is "Fail", the review result is "Block" — PR must not be created.
