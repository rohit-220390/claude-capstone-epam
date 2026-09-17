---
description: User-invocable skill for retrieving Jira issues, searching with JQL, fetching issue history, or handling Jira-specific field mapping and pagination. Call with /skills/skill-jira-integration.
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
---

# Jira Integration Skill

## Access Method

Jira access is provided by the native REST adapter in `src/integrations/jira/jira-adapter.ts`, which supports both **Jira Cloud** and **Jira Data Center/Server** using REST API v2 (`/rest/api/2/...`) — the common denominator supported by both deployment types.

The easiest entry point is the CLI:
```
npx tsx src/requirement/analyze-requirement-cli.ts --source jira --id <ISSUE-KEY>
```

## Configuration

Credentials come from environment variables only (see `.env.example`):

| Variable | Required | Notes |
|----------|----------|-------|
| `JIRA_BASE_URL` | Yes | e.g. `https://jira.your-company.com` (Data Center) or `https://your-domain.atlassian.net` (Cloud) |
| `JIRA_AUTH_TOKEN` | Yes | Personal Access Token (Data Center) or API token (Cloud) |
| `JIRA_EMAIL` | Cloud only | Combined with `JIRA_AUTH_TOKEN` as Basic auth for Cloud. Leave unset for Data Center. |

## Available Operations

| Operation | Description |
|-----------|-------------|
| `getIssue(config, key)` | Retrieve a single Jira issue by key (e.g., ABC-123) |
| `searchIssues(config, jql)` | Search issues using JQL query |
| `getIssueHistory(config, key)` | Retrieve the changelog of an issue |
| `normalizeJiraIssue(issue)` | Convert a raw Jira REST response into the shared `NormalizedRequirement` schema |

## Field Mapping

| Jira Field | Normalized Field |
|------------|-----------------|
| `key` | `sourceId` |
| `fields.summary` | `title` |
| `fields.description` | `description` |
| Bullet/numbered lines parsed from description | `acceptanceCriteria` |
| `fields.updated` | `version` and `updatedAt` |
| — | `source: 'jira'` |

## Error Handling

| HTTP Status | Action |
|-------------|--------|
| 401/403 | Stop. Report "Authentication/authorization failed for Jira." Do not expose the token. |
| 404 | Mark requirement as Not Found. Do not delete existing docs. |
| 429 | Retry with bounded exponential backoff (max 3 retries, base 1s). |
| 5xx | Retry bounded times (max 3), then pause workflow. |

## Pagination

Jira uses `startAt` + `maxResults`. Iterate until `startAt + results.length >= total`. Return the complete result set to callers.

## Rules

- All operations are read-only.
- Credentials come from environment variables, never from tool parameters.
- Return normalized data, not raw Jira REST responses.
- Prefer API v2 over v3 so the same code works against Data Center and Cloud.
