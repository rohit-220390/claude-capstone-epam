---
description: User-invocable skill for performing structured architecture review to identify risks, gaps, and design decisions that need resolution. Call with /skills/skill-design-review.
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
---

# Design Review Skill

## Review Process

1. Read `docs/requirements.md` to understand what must be built.
2. Read `docs/architecture.md` to understand the proposed design.
3. For each requirement, verify the architecture addresses it.
4. Identify risks, gaps, and decisions needing resolution.
5. Produce `docs/design-review.md` with categorized findings.

## Finding Categories

| Type | Description |
|------|-------------|
| **Risk** | Something that could go wrong. Has likelihood and impact. |
| **Gap** | A requirement not addressed by the architecture. |
| **Decision** | A design choice that needs explicit human approval. |

## Severity Levels

- **Blocking** — Must be resolved before implementation can proceed.
- **High** — Should be resolved before implementation; workaround possible.
- **Medium** — Should be addressed but does not block progress.
- **Low** — Nice to have; can be deferred.

## Finding Format

```markdown
### DR-001: [Title]
- **Type**: Risk | Gap | Decision
- **Severity**: Blocking | High | Medium | Low
- **Requirement**: [Source ID]
- **Description**: [What was found]
- **Recommendation**: [Proposed resolution]
```

## Rules

- Review all requirements, not just the changed ones.
- Flag missing error handling, security gaps, and scalability concerns.
- Do not approve architecture that has Blocking findings.
