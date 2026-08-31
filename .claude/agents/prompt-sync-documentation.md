---
name: prompt-sync-documentation
description: User-invocable prompt to analyze a requirement delta and update impacted repository documentation. Call with /prompt-sync-documentation.
tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
model: claude-opus-4-5
---

# Sync Documentation

Analyze the requirement change and synchronize affected repository documentation.

## Inputs

- Changed requirement (current and previous normalized versions)
- `docs/documentation-map.md` — requirement-to-artifact mapping

## Steps

1. Calculate the requirement delta.
2. Look up affected artifacts in `docs/documentation-map.md`.
3. Search the repository for additional references to the requirement ID.
4. Generate proposed documentation patches.
5. Validate consistency with requirements and architecture.
6. Run documentation quality checks.
7. Update `docs/documentation-map.md` if mappings changed.

## Expected Output

- Updated documentation files.
- Updated `docs/documentation-map.md`.
- Summary of changes made and why.

## Stop Conditions

- If the change affects architecture or removes information, stop and request human approval.
- If consistency validation fails, stop and report conflicts.
