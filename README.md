# AI-Native Agentic SDLC – Automated Documentation Sync (Claude Code Version)

This is the **Claude Code** equivalent of the GitHub Copilot capstone project. It implements the same agentic SDLC workflow — detecting requirement changes in Jira and synchronizing repository documentation through a 10-agent pipeline with human approval gates — translated from GitHub Copilot's customization mechanisms to Claude Code's equivalents.

## What This Project Does

1. Retrieves requirements from Jira.
2. Detects changes against previously synchronized versions.
3. Routes the change through a specialist agent pipeline: Requirement Analyst → Architecture → Design Review → Planning → Documentation → Implementation → Test & Verification → Code Review → PR.
4. Produces a pull request with Summary, Changes Made, Test Evidence, Known Limitations, and a Reviewer Checklist.
5. Enforces human approval at every consequential gate — nothing merges automatically.

## Prerequisites

| Requirement | Notes |
|-------------|-------|
| [Node.js](https://nodejs.org/) 20.x+ | Matches `@types/node@^20` across `package.json` |
| [Claude Code](https://claude.ai/code) | Powers the agents, skills, and hooks under `.claude/` |
| A Jira instance (Cloud or Data Center/Server) | Only needed to exercise the requirement-analysis step; the rest (tests, bookstore-app demo) works without it |

## Quick Start (5 minutes)

```bash
cd "Claude Capstone"
npm install
npm test
```

If `npm test` passes (12 suites, ~63 tests), the core pipeline tooling is working correctly — no external credentials required for this step.

## Claude Code Customization Mechanisms Used

| Mechanism | Location | Purpose |
|-----------|----------|---------|
| Project Instructions | `CLAUDE.md` | Always-on engineering rules for the entire project |
| Scoped Instructions | `src/CLAUDE.md`, `tests/CLAUDE.md`, `docs/CLAUDE.md`, `src/integrations/CLAUDE.md` | Directory-scoped rules for code quality, testing, documentation, and integrations |
| Agents | `.claude/agents/*.md` | 10 specialist roles with descriptions Claude uses to route tasks |
| Skills | `.claude/agents/skill-*.md` | 9 user-invocable domain procedures |
| Prompts | `.claude/agents/prompt-*.md` | 11 user-invocable task entry points |
| Hooks | `.claude/settings.json` hooks section | Deterministic security, validation, and audit controls |
| MCP | `.mcp.json` | GitHub MCP server for PR creation |

## Comparison: Copilot Capstone vs Claude Capstone

| Copilot Mechanism | Location | Claude Equivalent | Location |
|-------------------|----------|-------------------|----------|
| `copilot-instructions.md` | `.github/copilot-instructions.md` | `CLAUDE.md` | `CLAUDE.md` |
| Scoped instructions | `.github/instructions/*.instructions.md` | Sub-CLAUDE.md files | `src/CLAUDE.md`, `tests/CLAUDE.md`, `docs/CLAUDE.md`, `src/integrations/CLAUDE.md` |
| Agent definitions | `.github/agents/*.agent.md` | Agent files with frontmatter | `.claude/agents/*.md` |
| Skill packages | `.github/skills/*/SKILL.md` | User-invocable skill agents | `.claude/agents/skill-*.md` |
| Prompt files | `.github/prompts/*.prompt.md` | User-invocable prompt agents | `.claude/agents/prompt-*.md` |
| Hook configs (JSON) | `.github/hooks/*.json` | `hooks` section | `.claude/settings.json` |
| MCP server config | `.vscode/mcp.json` | Project MCP config | `.mcp.json` |

### Key Translation Differences

1. **Scoped instructions**: Copilot uses `applyTo:` frontmatter in `.instructions.md` files. Claude uses sub-`CLAUDE.md` files in each subdirectory.

2. **Agent routing**: Copilot agents list tools by capability type (`execute`, `read`, etc.). Claude agents use a `description` field that Claude reads to decide when to invoke the agent automatically.

3. **Skills and Prompts**: Copilot skills/prompts are separate mechanism types. In Claude Code, both are represented as user-invocable agents in `.claude/agents/` (prefixed `skill-` or `prompt-`).

4. **Hooks**: Copilot uses three separate JSON hook config files (`security.json`, `validation.json`, `audit.json`). Claude Code consolidates all hooks into `.claude/settings.json` under a single `hooks` object, with event names mapped as: `preToolUse` → `PreToolUse`, `postToolUse` → `PostToolUse`, `agentStop` → `Stop`, `subagentStop` → `SubagentStop`, `sessionStart` → `SessionStart`, `userPromptSubmitted` → `UserPromptSubmit`.

5. **Hook scripts**: Unchanged — same scripts at `src/security/hooks/*.mjs`, referenced by relative path.

6. **MCP**: Copilot uses `.vscode/mcp.json` with a `servers` key. Claude Code uses `.mcp.json` at the project root with an `mcpServers` key.

## Repository Structure

```
.claude/
  agents/        10 agent definitions + 9 skills + 11 prompts (all .md with frontmatter)
  settings.json  Hooks (security, validation, audit) + permissions allowlist
.mcp.json        GitHub MCP server configuration
CLAUDE.md        Primary project instructions (always applied)
docs/
  requirements.md, architecture.md, design-review.md,
  impl-plan.md, documentation-map.md, changelog.md
src/
  integrations/  Jira REST adapter (Cloud + Data Center/Server)
  requirement/   Normalized requirement model, normalizer, and analyze-requirement CLI
  change-detection/  Hashing, delta calculation, impact classification
  documentation-sync/  Requirement-to-artifact mapping & impact analysis
  validation/    Documentation quality checks
  security/      Secret scanning, log redaction, tool policy, hook scripts
tests/           unit, integration, and security test suites
bookstore-app/   Sample product built by the pipeline — self-contained, own package.json/tests
```

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. (Optional — only needed to fetch live requirements from Jira) Copy `.env.example` to `.env` and fill in your Jira credentials.

3. The GitHub MCP server in `.mcp.json` authenticates via OAuth when the `pr` agent runs — no token to store.

## Running

| Command | Purpose |
|---------|---------|
| `npm run build` | Compile TypeScript |
| `npm test` | Run the full Jest suite with coverage |
| `npm run test:unit` | Unit tests only |
| `npm run test:integration` | Integration tests only (mocked HTTP) |
| `npm run test:security` | Secret scanning / redaction / tool-policy tests |
| `npm run secret-scan` | Scan the repository for credential patterns |
| `npx tsx src/requirement/analyze-requirement-cli.ts --source jira --id <KEY>` | Fetch, normalize, diff, and write a requirement to `docs/requirements.md` |

## Demo (bookstore-app)

The `bookstore-app/` folder is the actual feature (`EPMCDMETST-52015`, Non-Fiction search filters) built by the pipeline:

```bash
cd bookstore-app
npm install
npm test
npm start   # starts the search API + UI on http://localhost:3000
```
