---
name: prompt-review-design
description: User-invocable prompt to perform structured architecture review identifying risks, gaps, and decisions. Call with /prompt-review-design.
tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
model: claude-opus-4-5
---

# Review Design

Perform a structured review of the architecture against approved requirements.

## Inputs

- `docs/requirements.md` — approved requirements
- `docs/architecture.md` — proposed architecture

## Steps

1. Verify every requirement is addressed by the architecture.
2. Check for security risks, missing error handling, and scalability concerns.
3. Identify design decisions that need human approval.
4. Categorize findings by type (Risk/Gap/Decision) and severity.
5. Write `docs/design-review.md` with all findings.

## Expected Output

- `docs/design-review.md` with categorized, severity-rated findings.
- Summary: count of Blocking/High/Medium/Low findings.
- Recommendation: proceed, revise, or block.

## Stop Conditions

- If Blocking findings exist, report them and stop. Architecture must be revised.
