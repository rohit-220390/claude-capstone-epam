# Integration Rules (src/integrations/, src/requirement/, src/change-detection/, src/documentation-sync/)

These rules apply to all integration and data-processing modules.

- Jira is accessed via the native REST client in `src/integrations/jira/`. Support both Cloud and Data Center/Server: use API v2 (`/rest/api/2/...`) since it works on both deployment types; the Cloud-only v3 API must not be relied upon as the default.
- Credentials come from environment variables only: `JIRA_BASE_URL`/`JIRA_AUTH_TOKEN` (+ optional `JIRA_EMAIL` for Cloud Basic auth). Never pass credentials as tool/function parameters from agent context, and never write them to logs, docs, or committed files.
- All Atlassian API access is read-only for MVP. Do not implement write operations unless explicitly approved.
- HTTP clients must handle: 401/403 (stop, report auth issue without exposing the token), 404 (mark Not Found, do not auto-delete docs), 429 (bounded exponential backoff), 5xx (retry bounded times, then pause).
- Return normalized data structures from adapters — agents never see raw Jira REST responses. Use `normalizeJiraIssue()` (or the generic `normalizeRequirement()`) in `src/requirement/normalizer.ts` to convert raw REST payloads into the shared `NormalizedRequirement` schema.
- Pagination must be handled transparently; callers receive complete result sets.
- Integration logic must remain source-agnostic downstream of normalization: the same `NormalizedRequirement` schema and change-detection pipeline apply regardless of whether data came from Jira or a future source system.
- The `analyze-requirement` CLI is the reference entry point for fetching, normalizing, diffing, and writing an entry to `docs/requirements.md`.
