# Documentation Rules (docs/)

These rules apply to all documentation files under `docs/`.

- Every documentation file must trace back to a source requirement ID.
- Include the source system (Jira) and source ID in each section that derives from an external requirement.
- Do not silently remove existing documentation sections. Propose removals explicitly with justification.
- Use consistent Markdown heading levels: H1 for document title, H2 for major sections, H3 for subsections.
- Keep `docs/documentation-map.md` updated when adding or changing requirement-to-artifact mappings.
- Architecture diagrams use text-based notation (ASCII or Mermaid) so they are diffable in PRs.
- Acceptance criteria from requirements.md must appear verbatim — do not paraphrase unless the requirement is clarified.

## Required Documents

- `docs/requirements.md` — approved requirements and acceptance criteria
- `docs/architecture.md` — system design and data flow
- `docs/design-review.md` — risks, gaps, and decisions
- `docs/impl-plan.md` — dependency-ordered implementation tasks
- `docs/documentation-map.md` — requirement-to-artifact mapping
- `docs/changelog.md` — human-readable change summary
