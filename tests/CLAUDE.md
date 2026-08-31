# Testing Rules (tests/)

These rules apply to all test files under `tests/`.

- Every behavior change requires at least one unit test covering the happy path and one covering a failure/edge case.
- Do not claim tests passed unless they actually executed and produced output.
- Test file names mirror source file names: `src/foo/bar.ts` → `tests/unit/foo/bar.test.ts`.
- Use descriptive `describe`/`it` blocks that read as specifications.
- Integration tests that call external APIs must use mocked HTTP responses in CI; real calls are for manual/demo runs only.
- Security tests verify: no secrets in output, forbidden tool calls are denied, log redaction works.
- Documentation quality tests check: broken links, required sections present, source traceability.

## Test Layers

| Layer | Location | Scope |
|-------|----------|-------|
| Unit | `tests/unit/` | Individual functions: normalization, hashing, delta calculation, mapping logic, redaction |
| Integration | `tests/integration/` | External system interaction with mocked HTTP responses |
| Security | `tests/security/` | Credential protection, unsafe tool denial, log redaction |
