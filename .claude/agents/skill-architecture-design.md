---
name: skill-architecture-design
description: User-invocable skill for creating or updating system architecture documentation, designing component architecture, data flows, or integration points. Call with /skill-architecture-design.
tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
model: claude-opus-4-5
---

# Architecture Design Skill

## Architecture Document Structure

`docs/architecture.md` must contain:

1. **System Overview** — High-level description and purpose.
2. **Component Architecture** — Each component with responsibility, interfaces, and dependencies.
3. **Data Flow** — How data moves through the system (text-based diagrams).
4. **Integration Architecture** — External system connections and protocols.
5. **Technology Decisions** — Chosen technologies with rationale.
6. **Security Architecture** — Credential handling, access control, data protection.
7. **Error Handling Strategy** — System-wide error handling approach.

## Diagram Conventions

Use text-based diagrams for diffability:

```
Component A ──→ Component B ──→ Component C
     │                              │
     └──→ Component D ──────────────┘
```

Or Mermaid syntax for richer diagrams.

## Design Principles

- Single source of truth: Jira/Confluence for requirements, Git for technical artifacts.
- Specialization: each agent/component has a narrow responsibility.
- Least privilege: minimum required access per component.
- Deterministic guardrails: Hooks for policy enforcement.
- Separation of credentials: auth handled by infrastructure, not prompts.

## Rules

- Every architectural decision must trace to a requirement.
- Identify constraints and assumptions explicitly.
- Flag decisions that need human approval.

## Target Application Folders

This repository's own `src/`/`tests/` implement the SDLC documentation-sync pipeline itself, not the products described by ingested requirements. When a requirement requires building/extending a separate target application inside this repository:

- List the repository root first to see which top-level application folders already exist.
- If the requirement extends a product that already has a folder (e.g. a prior feature for the same app), reuse that folder.
- If the requirement is for a **different** application, create a new, distinctly-named top-level folder.
- Record the chosen folder name and the reuse-vs-new decision explicitly in `docs/architecture.md`.
