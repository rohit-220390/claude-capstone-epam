---
description: User-invocable prompt to generate targeted clarification questions for ambiguous requirements. Call with /prompts/prompt-clarify-requirement.
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
---

# Clarify Requirement

Given a requirement with identified ambiguities, generate only the specific questions needed to resolve them.

## Inputs

- The normalized requirement with flagged ambiguities
- The source content from Jira

## Steps

1. Review each flagged ambiguity.
2. For each, generate a specific, answerable question.
3. Group questions by topic.
4. Present questions to the human and **stop**.

## Expected Output

A numbered list of clarification questions, each referencing:
- The requirement ID and field
- Why it is ambiguous
- What information is needed

## Stop Conditions

- Always stop after presenting questions. Do not proceed until answers are provided.
