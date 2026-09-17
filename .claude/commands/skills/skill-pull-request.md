---
description: User-invocable skill for generating PR descriptions, changelog entries, or reviewer checklists for the final pull request. Call with /skills/skill-pull-request.
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
---

# Pull Request Skill

## Required PR Sections

### 1. Summary
2-3 sentences: what was built, why, and which source requirements drove it.

### 2. Changes Made
Bulleted list of every added or modified file with a brief reason:
```markdown
- `src/integrations/jira/jira-adapter.ts` — Added Jira issue retrieval with error handling
- `docs/requirements.md` — Updated with PAY-123 requirement (timeout changed to 60s)
```

### 3. Test Evidence
Actual test command output. Include:
- Command run (e.g., `npm test`)
- Exit code
- Summary line (e.g., "Tests: 24 passed, 0 failed")
- Key output snippets

**Never fabricate.** If tests were not run, state that explicitly.

### 4. Known Limitations
- Requirements marked "Not Found"
- Out-of-scope items deferred to future work
- Known edge cases not yet covered

### 5. Reviewer Checklist
```markdown
- [ ] Requirements match source Jira content
- [ ] Architecture is consistent with requirements
- [ ] Tests cover happy path and failure cases
- [ ] No credentials in source, docs, or logs
- [ ] Documentation map is up to date
- [ ] Changelog accurately reflects changes
```

## Changelog Format

`docs/changelog.md` entry:
```markdown
## [Date] - [Requirement ID] - [Brief Title]
- **Changed**: [What changed and why]
- **Source**: [Jira link or ID]
- **Impact**: [documentation-only | code | architecture]
```

## Rules

- PR may only be created after verification gates pass.
- Include source requirement IDs in the summary.
- The human must review and merge — never auto-merge.

## PR Creation Mechanism

- The repository must already be a git repo with a GitHub remote configured.
- Push the working branch with `git` (via Bash), then create the pull request with the `github` MCP server.
- The GitHub MCP server (`.mcp.json`, server name `github`) authenticates via OAuth — no personal access token is stored or handled by the agent.
- If the MCP server or a GitHub remote is not configured, stop and tell the human what's missing.
