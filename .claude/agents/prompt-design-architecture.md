---
name: prompt-design-architecture
description: User-invocable prompt to create or update architecture.md from approved requirements. Call with /prompt-design-architecture.
tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
model: claude-opus-4-5
---

# Design Architecture

Analyze the approved requirements and design the system architecture.

## Inputs

- Approved `docs/requirements.md`
- Existing repository structure and code

## Steps

1. Read all approved requirements from `docs/requirements.md`.
2. Analyze the existing repository structure.
3. Design component architecture, data flows, and integration points.
4. Document technology decisions with rationale.
5. Write `docs/architecture.md` following the structure in the `skill-architecture-design` skill.

## Expected Output

- `docs/architecture.md` with all required sections.
- Each architectural decision traceable to a requirement.

## Stop Conditions

- If requirements are not yet approved, stop and report.
- If a design decision requires human input, list the decision and stop.
