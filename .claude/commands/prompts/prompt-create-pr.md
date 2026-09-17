---
description: User-invocable prompt to generate PR description, changelog, and reviewer checklist. Requires passing verification summary. Call with /prompts/prompt-create-pr.
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
---

# Create PR

Generate the pull request with all required sections after verification passes.

## Inputs

- Verification summary (must show PASS)
- List of changed files
- Source requirement IDs
- Test evidence

## Steps

1. Verify that the verification summary shows PASS.
2. Generate the PR description with all 5 required sections (see `/skills/skill-pull-request`).
3. Update `docs/changelog.md` with the change entry.
4. Create the PR using git commands (branch, commit, push, PR).

## Expected Output

- PR description with: Summary, Changes Made, Test Evidence, Known Limitations, Reviewer Checklist.
- Updated `docs/changelog.md`.
- Git branch and PR created.

## Stop Conditions

- If verification did not pass, refuse to create the PR and report why.
- If test evidence is missing, refuse and report.
