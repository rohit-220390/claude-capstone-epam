---
name: prompt-verify-release
description: User-invocable prompt to run all tests and documentation quality checks to produce verification evidence for the PR gate. Call with /prompt-verify-release.
tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
model: claude-opus-4-5
---

# Verify Release

Execute the full verification suite and produce evidence for the PR gate.

## Steps

1. Run unit tests: `npm run test:unit`
2. Run integration tests: `npm run test:integration`
3. Run security tests: `npm run test:security`
4. Run secret scan: `npm run secret-scan`
5. Run documentation quality checks (broken links, required sections, traceability).
6. Compile results into a verification summary.

## Expected Output

A verification summary containing:
- Each test suite: command, exit code, pass/fail count
- Secret scan: pass/fail
- Documentation quality: pass/fail with details
- Overall: **PASS** or **FAIL**

## Stop Conditions

- If any suite fails, overall result is FAIL — do not proceed to PR creation.
- Never fabricate results. Report actual command output.
