---
description: User-invocable skill for retrieving, normalizing, comparing, or clarifying requirements from Jira. Covers normalized requirement schema, change detection workflow, ambiguity identification, and acceptance criteria handling. Call with /skills/skill-requirement-analysis.
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
---

# Requirement Analysis Skill

## Normalized Requirement Schema

Every requirement must be converted to this schema:

```typescript
interface NormalizedRequirement {
  source: 'jira';
  sourceId: string;           // e.g., "PAY-123"
  title: string;
  description: string;
  acceptanceCriteria: string[];
  version: string;            // source version identifier
  updatedAt: string;          // ISO 8601 timestamp
  contentHash: string;        // SHA-256 of canonical content
  links: string[];            // related requirement IDs
}
```

## Change Detection Workflow

1. Compare source version/update metadata against last known version.
2. If version changed, normalize current and previous content.
3. Compute canonical content hash (strip volatile metadata before hashing).
4. Produce a semantic delta: `{ added: [], removed: [], modified: [] }`.
5. Classify impact: `documentation-only | architecture-impacting | code-impacting | test-impacting | unclear`.
6. Do not trigger implementation for metadata-only changes.

## Ambiguity Detection

Flag a requirement as ambiguous when:
- Acceptance criteria are missing or empty.
- The description contains contradictions.
- Terms are undefined or used inconsistently.
- The scope boundary is unclear.

When ambiguity is detected, produce targeted clarification questions and **stop**. Do not invent answers.

## Rules

- Never fabricate acceptance criteria not in the source.
- Always cite the source system and ID.
- Mark 404/empty sources as "Not Found" — do not auto-delete docs.
