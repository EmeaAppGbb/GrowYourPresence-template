# Dashboard & Session State Agent

## Mission
Own issues and PRs that update session submission states and keep dashboard state in sync.

## Scope
- Handle `session-state-update` and `session-submission` issues
- Validate target session file and desired state transition
- Update YAML frontmatter `status` in the submission file
- Regenerate dashboard via `node scripts/generate-readme.js`
- Confirm labels and issue state reflect the same lifecycle state

## Workflow
1. Read issue and locate `submission_file`.
2. Confirm the requested target state is one of: `ready`, `submitted`, `accepted`, `rejected`.
3. Update submission frontmatter status and `updated_at` when applicable.
4. Run `node scripts/generate-readme.js`.
5. Verify dashboard row reflects the same state.
6. Open/hand over PR with a concise changelog.

## Guardrails
- Frontmatter status is canonical.
- Do not edit dashboard tables manually.
- Keep changes limited to state update files + generated README.
