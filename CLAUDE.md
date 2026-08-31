# Agentic SDLC Documentation Sync — Claude Code Project

## Project Overview

This repository implements an AI-native SDLC workflow that detects requirement changes in Jira and synchronizes repository documentation through a multi-agent pipeline.

## Core Rules

- Requirements in Jira are authoritative. Never invent acceptance criteria.
- Ask for clarification when source requirements are ambiguous — do not guess.
- Never expose, persist, or log credentials (API tokens, passwords, auth headers).
- Do not modify production code before the implementation gate is approved.
- Every behavior change requires tests and documentation impact analysis.
- Do not silently delete existing documentation; explain removals in the change proposal.
- Do not claim tests passed unless they actually ran and produced evidence.
- Use repository conventions before introducing new dependencies.

## Architecture

- Agents in `.claude/agents/` define specialist roles with minimum required tools.
- Skills in `.claude/agents/` (prefixed `skill-`) package reusable domain procedures.
- Prompts in `.claude/agents/` (prefixed `prompt-`) define reusable task entry points.
- Hooks in `.claude/settings.json` enforce deterministic security and validation controls.
- External APIs are accessed through the REST adapter in `src/integrations/` (Jira Cloud/Data Center) using credentials from environment variables — agents never hold raw credentials, and credentials are never printed, logged, or written to any file.
- Pull requests are created via the GitHub MCP server (`.mcp.json`, OAuth-authenticated) rather than a custom GitHub integration — the repo must have a `git` remote configured before the `pr` agent can push/open a PR.

## Key Commands

| Command | Purpose |
|---------|---------|
| `npm run build` | Compile TypeScript |
| `npm test` | Run full Jest suite with coverage |
| `npm run test:unit` | Unit tests only |
| `npm run test:integration` | Integration tests only (mocked HTTP) |
| `npm run test:security` | Security tests only |
| `npm run lint` | Run ESLint |
| `npm run secret-scan` | Scan repository for credential patterns |
| `npx tsx src/requirement/analyze-requirement-cli.ts --source jira --id <KEY>` | Fetch, normalize, diff, and write a requirement to `docs/requirements.md` |

## SDLC Artifacts

- `docs/requirements.md` — approved requirements and acceptance criteria
- `docs/architecture.md` — system design and data flow
- `docs/design-review.md` — risks, gaps, and decisions
- `docs/impl-plan.md` — dependency-ordered implementation tasks
- `docs/documentation-map.md` — requirement-to-artifact mapping
- `docs/changelog.md` — human-readable change summary

## Language and Style

- TypeScript with strict mode enabled.
- Use ES module imports (`import`/`export`), not CommonJS.
- Prefer `const` over `let`; avoid `any`.
- Name files in kebab-case. Name types/interfaces in PascalCase.
- Keep functions small and focused. Extract shared logic rather than duplicating.

## Code Quality

- TypeScript strict mode is enabled. Do not use `any`; prefer explicit types or `unknown` with narrowing.
- Use ES module `import`/`export` syntax. No CommonJS `require`.
- Prefer `const` declarations. Use `let` only when reassignment is necessary.
- File names use kebab-case. Types and interfaces use PascalCase. Functions and variables use camelCase.
- Functions should do one thing. Extract shared logic into utility modules rather than duplicating.
- Error handling: catch specific error types, provide actionable messages, and propagate errors that callers need to handle.
- No unused imports, variables, or dead code.

## Security

- Never place API tokens, passwords, or auth headers in source files, agent definitions, skill files, prompt files, logs, or PR descriptions.
- Credentials are loaded from environment variables only.
- `.env` files must be in `.gitignore`. Commit only `.env.example` with empty values.
- Log output must redact Authorization headers, token-like strings, and email/password patterns.
- The `PreToolUse` hook must deny attempts to read `.env`, write credential patterns, or execute unauthorized destructive commands.
- Use a dedicated least-privilege integration identity for Atlassian access.
- Validate and sanitize all external input before using it in file paths, shell commands, or API calls.

## Testing

- Every behavior change requires at least one unit test covering the happy path and one covering a failure/edge case.
- Do not claim tests passed unless they actually executed and produced output.
- Test file names mirror source file names: `src/foo/bar.ts` → `tests/unit/foo/bar.test.ts`.
- Use descriptive `describe`/`it` blocks that read as specifications.
- Integration tests that call external APIs must use mocked HTTP responses in CI; real calls are for manual/demo runs only.
- Security tests verify: no secrets in output, forbidden tool calls are denied, log redaction works.
- Documentation quality tests check: broken links, required sections present, source traceability.

## Documentation

- Every documentation file must trace back to a source requirement ID.
- Include the source system (Jira) and source ID in each section that derives from an external requirement.
- Do not silently remove existing documentation sections. Propose removals explicitly with justification.
- Use consistent Markdown heading levels: H1 for document title, H2 for major sections, H3 for subsections.
- Keep `docs/documentation-map.md` updated when adding or changing requirement-to-artifact mappings.
- Architecture diagrams use text-based notation (ASCII or Mermaid) so they are diffable in PRs.
- Acceptance criteria from requirements.md must appear verbatim — do not paraphrase unless the requirement is clarified.

## Integrations

- Jira is accessed via the native REST client in `src/integrations/jira/`. Support both Cloud and Data Center/Server: use API v2 (`/rest/api/2/...`) since it works on both deployment types.
- Credentials come from environment variables only: `JIRA_BASE_URL`/`JIRA_AUTH_TOKEN` (+ optional `JIRA_EMAIL` for Cloud Basic auth). Never pass credentials as tool/function parameters from agent context, and never write them to logs, docs, or committed files.
- All Atlassian API access is read-only for MVP. Do not implement write operations unless explicitly approved.
- HTTP clients must handle: 401/403 (stop, report auth issue without exposing the token), 404 (mark Not Found, do not auto-delete docs), 429 (bounded exponential backoff), 5xx (retry bounded times, then pause).
- Return normalized data structures from adapters — agents never see raw Jira REST responses.
- Pagination must be handled transparently; callers receive complete result sets.
- Integration logic must remain source-agnostic downstream of normalization.
- The `analyze-requirement` CLI (`npm run analyze-requirement` or `npx tsx src/requirement/analyze-requirement-cli.ts --source jira --id <key>`) is the reference entry point for fetching, normalizing, diffing, and writing an entry to `docs/requirements.md`.
