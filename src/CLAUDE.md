# Code Quality Rules (src/)

These rules apply to all TypeScript source files under `src/`.

- TypeScript strict mode is enabled. Do not use `any`; prefer explicit types or `unknown` with narrowing.
- Use ES module `import`/`export` syntax. No CommonJS `require`.
- Prefer `const` declarations. Use `let` only when reassignment is necessary.
- File names use kebab-case. Types and interfaces use PascalCase. Functions and variables use camelCase.
- Functions should do one thing. Extract shared logic into utility modules rather than duplicating.
- Error handling: catch specific error types, provide actionable messages, and propagate errors that callers need to handle.
- No unused imports, variables, or dead code.
