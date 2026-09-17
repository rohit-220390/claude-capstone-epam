---
description: User-invocable skill for generating or running unit tests, integration tests, documentation quality checks, or producing verification evidence. Call with /skills/skill-testing.
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
---

# Testing Skill

## Test Layers

| Layer | Scope | Examples |
|-------|-------|----------|
| Unit | Individual functions | Normalization, hashing, delta calculation, mapping logic, redaction |
| Integration | External system interaction | Jira retrieval, pagination, auth failure, rate limiting |
| Agent Contract | Agent output validation | Expected artifacts, required structure, stop conditions |
| Documentation Quality | Doc completeness | Broken links, required sections, source traceability |
| Security | Credential protection | Secret scanning, unsafe tool denial, log redaction |
| End-to-End | Full workflow | Changed requirement → docs updated → tests pass → PR |

## Test File Conventions

- Source: `src/foo/bar.ts` → Test: `tests/unit/foo/bar.test.ts`
- Integration tests: `tests/integration/`
- Security tests: `tests/security/`

## Documentation Quality Checks

1. Every `docs/*.md` file has an H1 title.
2. Requirement references use valid source IDs.
3. No broken internal links.
4. `docs/documentation-map.md` entries reference existing files.
5. Architecture diagrams are present where referenced.

## Rules

- Never fabricate test output. Only report actual results.
- Integration tests use mocked HTTP in CI; real calls only for demo.
- Every behavior change needs at least one happy-path and one failure test.
- Report: command executed, exit code, relevant output.
