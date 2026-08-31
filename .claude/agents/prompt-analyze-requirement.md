---
name: prompt-analyze-requirement
description: User-invocable prompt to analyze a Jira source and produce normalized requirements. Provide source (jira) and sourceId (Jira issue key). Call with /prompt-analyze-requirement.
tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
model: claude-opus-4-5
---

# Analyze Requirement

Retrieve the requirement from the specified source and produce a normalized representation.

## Inputs

- `source`: `jira`
- `sourceId`: The Jira issue key (e.g., PAY-123)

## Steps

1. Fetch the requirement using the appropriate integration tool.
2. Normalize it into the standard requirement schema (see `skill-requirement-analysis`).
3. Compute the content hash.
4. If a previous version exists in `docs/requirements.md`, compute the delta.
5. Classify the impact: documentation-only, architecture-impacting, code-impacting, test-impacting, or unclear.
6. If the requirement is ambiguous, list clarification questions and **stop**.
7. Otherwise, update `docs/requirements.md` with the normalized requirement.

## Expected Output

- Updated `docs/requirements.md` with the requirement entry.
- Delta summary if this is an update.
- Impact classification.
- Clarification questions if ambiguity was detected.

## Stop Conditions

- Source returns 404 or empty content → mark as Not Found, stop.
- Ambiguity detected → list questions, stop.
- Authentication failure → report error (no token), stop.
