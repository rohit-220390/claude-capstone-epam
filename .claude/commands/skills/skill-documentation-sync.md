---
description: User-invocable skill for mapping requirement changes to repository documentation, performing impact analysis, and synchronizing documentation artifacts. Call with /skills/skill-documentation-sync.
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
---

# Documentation Sync Skill

## Documentation Map

`docs/documentation-map.md` tracks which requirements map to which repository artifacts:

```markdown
| Requirement | Source | Repository Artifact | Impact Type |
|-------------|--------|-------------------|-------------|
| PAY-123 | Jira | docs/requirements.md | behavior |
| PAY-123 | Jira | docs/architecture.md | architecture |
```

## Synchronization Workflow

1. **Load** — Get the changed requirement and its previous version.
2. **Delta** — Calculate what changed (added/removed/modified fields).
3. **Map** — Look up `docs/documentation-map.md` for affected artifacts.
4. **Search** — Scan the repository for additional references to the requirement ID.
5. **Patch** — Generate proposed documentation updates.
6. **Validate** — Check consistency with requirements and architecture.
7. **Quality** — Run documentation quality checks.
8. **Gate** — Request human approval if the change affects architecture, public behavior, or removes information.

## Impact Classification

| Type | Trigger |
|------|---------|
| `documentation-only` | Description or formatting changed |
| `architecture-impacting` | New component, changed data flow, or integration change |
| `code-impacting` | Behavior, logic, or API change |
| `test-impacting` | Acceptance criteria changed |
| `unclear` | Cannot determine — ask human |

## Rules

- Never silently delete documentation. Propose removals with justification.
- Update `docs/documentation-map.md` when mappings change.
- Validate that updated docs are consistent with the source requirement.
