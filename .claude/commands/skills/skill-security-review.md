---
description: User-invocable skill for checking credential leakage, validating secret handling, reviewing dependency safety, or enforcing input validation. Call with /skills/skill-security-review.
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
---

# Security Review Skill

## Secret Detection Patterns

Scan for these patterns in all files (excluding `.env.example`):

| Pattern | Description |
|---------|-------------|
| Atlassian API token prefix | `ATATT3x` followed by token characters |
| Authorization header | `Bearer` followed by a token value |
| Basic auth header | HTTP Basic scheme with a base64-encoded value |
| Query parameter credentials | `token` or `api_key` query parameter with a value |
| Hardcoded credentials | `password`, `secret`, `apitoken` followed by `=` or `:` with a literal value |

## File Exclusions

These files must never contain real credential values:
- `*.md` in `.claude/agents/`, `*.md` in `.claude/commands/skills/`, `*.md` in `.claude/commands/prompts/`, `docs/*.md`
- `src/**/*.ts`
- `tests/**/*.ts`
- `*.json` (except `package-lock.json`)

## Dependency Safety

- Check `package.json` for known vulnerable versions.
- Flag dependencies with no recent maintenance.
- Verify `package-lock.json` integrity.

## Input Validation

- External input (Jira content) must be sanitized before:
  - Using in file paths
  - Using in shell commands
  - Writing to documentation files (escape special characters)

## Rules

- If a secret is detected, block the operation and require remediation.
- Log redaction must strip Authorization headers and token-like strings.
- The `PreToolUse` hook must deny reading `.env` or writing credential patterns.
