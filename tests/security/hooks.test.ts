import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const HOOKS_DIR = join(process.cwd(), 'src', 'security', 'hooks');

interface RunHookOptions {
  cwd?: string;
}

function runHook(scriptName: string, input: unknown, options?: RunHookOptions): Record<string, unknown> {
  const output = execFileSync('node', [join(HOOKS_DIR, scriptName)], {
    input: JSON.stringify(input),
    encoding: 'utf-8',
    cwd: options?.cwd,
  });
  return JSON.parse(output);
}

describe('pre-tool-use hook', () => {
  it('denies edits to .env using the real toolArgs.filePath shape', () => {
    const result = runHook('pre-tool-use.mjs', {
      toolName: 'edit',
      toolArgs: { filePath: '.env' },
    });
    expect(result.permissionDecision).toBe('deny');
  });

  it('denies destructive bash commands using the real toolArgs.command shape', () => {
    const result = runHook('pre-tool-use.mjs', {
      toolName: 'bash',
      toolArgs: { command: 'git push --force origin main' },
    });
    expect(result.permissionDecision).toBe('deny');
  });

  it('allows safe tool calls', () => {
    const result = runHook('pre-tool-use.mjs', {
      toolName: 'bash',
      toolArgs: { command: 'npm test' },
    });
    expect(result.permissionDecision).toBe('allow');
  });
});

describe('post-tool-use hook', () => {
  it('redacts credentials from toolResult.textResultForLlm', () => {
    const result = runHook('post-tool-use.mjs', {
      toolName: 'bash',
      toolResult: { resultType: 'success', textResultForLlm: 'Authorization: Bearer abc123.def456xyz' },
    }) as { modifiedResult?: { textResultForLlm: string } };
    expect(result.modifiedResult?.textResultForLlm).toContain('[REDACTED]');
  });

  it('returns an empty object when there is nothing to redact', () => {
    const result = runHook('post-tool-use.mjs', {
      toolName: 'bash',
      toolResult: { resultType: 'success', textResultForLlm: 'ordinary output' },
    });
    expect(result.modifiedResult).toBeUndefined();
  });
});

describe('agent-stop hook', () => {
  it('allows completion when no secrets are present in the repo', () => {
    const result = runHook('agent-stop.mjs', { stopReason: 'end_turn' });
    expect(result.decision).toBe('allow');
  });
});

describe('subagent-stop hook', () => {
  let fixtureDir: string;

  beforeEach(() => {
    // Create isolated temp directory for each test
    fixtureDir = mkdtempSync(join(tmpdir(), 'subagent-stop-test-'));
    // Create minimal docs directory (hook scans 'src', 'docs', '.github' relative to cwd)
    mkdirSync(join(fixtureDir, 'docs'), { recursive: true });
  });

  afterEach(() => {
    // Clean up fixture directory
    rmSync(fixtureDir, { recursive: true, force: true });
  });

  it('blocks the pr agent when docs/changelog.md has no dated entry', () => {
    // Write a changelog without a dated entry (no "## [" pattern)
    writeFileSync(join(fixtureDir, 'docs', 'changelog.md'), '# Changelog\n\nNo entries yet.\n');
    const result = runHook('subagent-stop.mjs', { agentName: 'pr', response: 'done' }, { cwd: fixtureDir });
    expect(result.decision).toBe('block');
  });

  it('allows the pr agent when docs/changelog.md has a dated entry', () => {
    // Write a changelog with a dated entry matching "## [" pattern
    writeFileSync(join(fixtureDir, 'docs', 'changelog.md'), '# Changelog\n\n## [Unreleased] - 2026-08-25\n\n### Added\n- Feature X\n');
    const result = runHook('subagent-stop.mjs', { agentName: 'pr', response: 'done' }, { cwd: fixtureDir });
    expect(result.decision).toBe('allow');
  });

  it('allows non-pr subagents to complete when no secrets are present', () => {
    // Non-pr agents don't need changelog validation, use isolated fixture
    const result = runHook('subagent-stop.mjs', { agentName: 'architecture', response: 'done' }, { cwd: fixtureDir });
    expect(result.decision).toBe('allow');
  });
});
