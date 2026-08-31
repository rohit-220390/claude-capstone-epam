---
name: prompt-generate-tests
description: User-invocable prompt to generate and run tests for changed behavior. Call with /prompt-generate-tests.
tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
model: claude-opus-4-5
---

# Generate Tests

Create or update tests for the specified behavior change and run them.

## Inputs

- Files changed and the behavior they implement
- Relevant requirements from `docs/requirements.md`

## Steps

1. Identify what behavior changed.
2. Write unit tests covering:
   - Happy path (expected input → expected output)
   - Error cases (404, missing fields, auth failure)
   - Edge cases (empty data, large input)
3. Run the tests.
4. Report actual results.

## Expected Output

- Test files with descriptive `describe`/`it` blocks.
- Test execution output (command, exit code, summary).

## Stop Conditions

- If tests fail, report the failures with output — do not proceed to PR.
