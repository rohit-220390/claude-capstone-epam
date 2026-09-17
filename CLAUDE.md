# Agentic SDLC Documentation Sync — Claude Code Project

## Project Overview

This repository implements an AI-native SDLC workflow that detects requirement changes in Jira and synchronizes repository documentation through a 10-agent pipeline with human approval gates. The pipeline produces pull requests with full traceability from Jira ticket to merged code.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up credentials (only needed for live Jira calls)
cp .env.example .env
# Fill in: JIRA_BASE_URL, JIRA_AUTH_TOKEN, JIRA_EMAIL (Cloud only)

# 3. Verify everything works (no Jira credentials needed)
npm test

# 4. Trigger the full SDLC pipeline for a Jira ticket
npx tsx src/requirement/analyze-requirement-cli.ts --source jira --id <ISSUE-KEY>
# Then tell Claude: "start the SDLC pipeline, requirement is in docs/requirements.md"
```

## Repository Structure

```
.claude/
  agents/           10 specialist agents (sdlc-orchestrator, requirement-analyst,
                    architecture, design-review, planning, documentation,
                    implementation, test-verification, code-review, pr)
  commands/
    skills/         9 reusable domain skills — invoke as /skills/skill-<name>
    prompts/        11 task entry-point prompts — invoke as /prompts/prompt-<name>
  settings.json     Hooks (PreToolUse, PostToolUse, Stop, SubagentStop,
                    SessionStart, UserPromptSubmit) + permissions allowlist
.mcp.json           GitHub MCP server config (server name: "github", OAuth)
CLAUDE.md           This file — always-on project instructions
src/
  integrations/     Jira REST adapter (supports Cloud + Data Center/Server)
  requirement/      NormalizedRequirement model, normalizer, analyze-requirement CLI
  change-detection/ Content hashing, delta calculation, impact classification
  documentation-sync/ Requirement-to-artifact mapping and impact analysis
  validation/       Documentation quality checks (broken links, required sections)
  security/         Secret scanning, log redaction, tool policy, hook scripts
tests/
  unit/             Mirrors src/ structure exactly
  integration/      Jira retrieval with mocked HTTP responses
  security/         Secret scanning, redaction, and tool-policy tests
docs/               SDLC pipeline artifacts (see SDLC Artifacts section)
```

> **Scoped instructions**: `src/CLAUDE.md`, `tests/CLAUDE.md`, `docs/CLAUDE.md`,
> and `src/integrations/CLAUDE.md` contain directory-specific rules that
> automatically apply when working in those folders.

## Target Application

The bookstore application built by this pipeline (`EPMCDMETST-52015`) lives at
**`../bookstore-app-claude/`** — a sibling folder one level above this repo.
When implementing changes to the bookstore, write all source and test files
under `../bookstore-app-claude/`. Do not create target-application folders
inside this pipeline repo's `src/` or root.

## Architecture

- Agents in `.claude/agents/` define specialist roles with minimum required tools. Claude routes to them automatically based on task description — never call them by name directly.
- Skills in `.claude/commands/skills/` package reusable domain knowledge, invoked as `/skills/skill-<name>`.
- Prompts in `.claude/commands/prompts/` are task executors for each pipeline step, invoked as `/prompts/prompt-<name>`.
- Hooks in `.claude/settings.json` enforce deterministic security and validation on every tool call.
- External APIs are accessed through `src/integrations/` using credentials from environment variables only — never from agent context or prompt text.
- Pull requests are created via the GitHub MCP server (server name: `github` in `.mcp.json`, OAuth-authenticated). The repo must have a `git` remote configured before the `pr` agent can push and open a PR.

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

| File | Purpose |
|------|---------|
| `docs/requirements.md` | Approved requirements and acceptance criteria |
| `docs/architecture.md` | System design, data flow, target app location |
| `docs/design-review.md` | Risks, gaps, and decisions with severity ratings |
| `docs/impl-plan.md` | Dependency-ordered implementation tasks |
| `docs/documentation-map.md` | Requirement-to-artifact mapping |
| `docs/changelog.md` | Human-readable change summary |

## Language, Style, and Code Quality

- TypeScript strict mode is enabled. Do not use `any`; prefer explicit types or `unknown` with narrowing.
- Use ES module `import`/`export` syntax. No CommonJS `require`.
- Prefer `const` declarations. Use `let` only when reassignment is necessary.
- File names use kebab-case. Types and interfaces use PascalCase. Functions and variables use camelCase.
- Functions should do one thing. Extract shared logic into utility modules rather than duplicating.
- Error handling: catch specific error types, provide actionable messages, and propagate errors that callers need to handle.
- No unused imports, variables, or dead code.

## Core Rules

- Requirements in Jira are authoritative. Never invent acceptance criteria.
- Ask for clarification when source requirements are ambiguous — do not guess.
- Never expose, persist, or log credentials (API tokens, passwords, auth headers).
- Do not modify production code before the implementation gate is approved.
- Every behavior change requires tests and documentation impact analysis.
- Do not silently delete existing documentation; explain removals in the change proposal.
- Do not claim tests passed unless they actually ran and produced evidence.
- Use repository conventions before introducing new dependencies.

## Security

- Never place API tokens, passwords, or auth headers in source files, agent definitions, skill files, prompt files, logs, or PR descriptions.
- Credentials are loaded from environment variables only. See `.env.example` for required variables.
- `.env` is in `.gitignore`. Commit only `.env.example` with empty values.
- Log output must redact Authorization headers, token-like strings, and email/password patterns.
- The `PreToolUse` hook denies attempts to read `.env`, write credential patterns, or execute unauthorized destructive commands.
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
- Acceptance criteria from `docs/requirements.md` must appear verbatim — do not paraphrase unless the requirement is clarified.

## Integrations

- Jira is accessed via the native REST client in `src/integrations/jira/`. Support both Cloud and Data Center/Server using API v2 (`/rest/api/2/...`) — the common denominator for both deployment types.
- Credentials come from environment variables only: `JIRA_BASE_URL`, `JIRA_AUTH_TOKEN`, and optionally `JIRA_EMAIL` for Cloud Basic auth. Never pass credentials as tool parameters or write them to logs, docs, or committed files.
- All Atlassian API access is read-only for MVP. Do not implement write operations unless explicitly approved.
- HTTP clients must handle: 401/403 (stop, report auth issue without exposing the token), 404 (mark Not Found, do not auto-delete docs), 429 (bounded exponential backoff, max 3 retries), 5xx (retry bounded times, then pause workflow).
- Return normalized data structures from adapters — agents never see raw Jira REST responses.
- Pagination must be handled transparently; callers receive complete result sets.
- Integration logic must remain source-agnostic downstream of normalization.
