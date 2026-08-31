---
name: skill-implementation-planning
description: User-invocable skill for creating dependency-ordered implementation plans, breaking architecture into tasks, identifying dependencies and blockers. Call with /skill-implementation-planning.
tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
model: claude-opus-4-5
---

# Implementation Planning Skill

## Plan Structure

`docs/impl-plan.md` must contain:

1. **Overview** — What is being implemented and the source requirements.
2. **Task List** — Ordered tasks with dependencies.
3. **Dependency Graph** — Visual or textual representation of task ordering.
4. **Risks and Blockers** — Items that could delay implementation.

## Task Format

```markdown
### TASK-001: [Title]
- **Dependencies**: None | TASK-NNN, TASK-NNN
- **Requirement**: [Source IDs]
- **Description**: [What to implement]
- **Acceptance Criteria**: [Verifiable conditions]
- **Complexity**: Low | Medium | High
- **Files**: [Expected files to create/modify]
```

## Ordering Rules

1. Tasks with no dependencies come first.
2. Infrastructure/foundation tasks before feature tasks.
3. Integration adapters before agents that consume them.
4. Tests are part of each task, not a separate phase.
5. Documentation updates are part of each task when applicable.

## Rules

- Every task must have at least one acceptance criterion.
- Flag tasks requiring external credentials or human decisions.
- Do not plan tasks for unapproved requirements.
- Keep tasks small enough to be implemented and tested independently.
