# Copilot Instructions for EventExplorer

This repository is an **AI-powered speaking event discovery and submission management system** for the speaker configured in this repository.

## Repository Purpose
- Automatically discover tech conference speaking opportunities
- Create structured event files with detailed metadata
- Compose session submission proposals tailored to each event
- Track the full lifecycle: discovery → review → submission → outcome

## Key Configuration Files
- `config/speaker-profile.md` — Speaker bio, topics, expertise, past sessions
- `config/discovery-criteria.md` — What events to search for, sources, exclusions
- `config/submission-defaults.md` — Session format preferences, topic-to-session mapping

## File Conventions
- Event files: `events/{year}/{event-id}.md` with YAML frontmatter (see `events/_template.md`)
- Submission files: `submissions/{year}/{event-slug}/session-{n}.md` (see `submissions/_template.md`)
- All state is tracked in YAML frontmatter `status` field — this is the source of truth
- The README dashboard is auto-generated from frontmatter — never edit the dashboard tables manually

## Workflow Rules
1. **One PR per event** — each discovered event gets its own PR with its event file
2. **One PR per submission set** — each event's submission proposals get their own PR
3. **Frontmatter is truth** — status field in YAML frontmatter is canonical; labels are derived
4. **README updates** — always regenerate via `node scripts/generate-readme.js`, include in PRs
5. **Never fabricate event details** — mark uncertain info with `verification_required: true`
6. **Always verify CFP deadlines** — skip events with expired CFPs

## When Working on Discovery Issues
1. Read `config/discovery-criteria.md` for search criteria and curated sources
2. Read `config/speaker-profile.md` for topic matching
3. Check existing `events/` files to avoid duplicates (match on `event_id`)
4. For each event found, create a new branch and PR with the event file
5. Include `node scripts/generate-readme.js` output in the PR

## When Working on Submission Issues
1. Read the specific event file to understand CFP requirements and themes
2. Read `config/speaker-profile.md` and `config/submission-defaults.md`
3. Ground the submission in existing accepted/submitted material:
   - Read prior submissions for the same event under `submissions/{year}/{event-slug}/`
   - Review recent merged submission PRs and changed sessions for reusable strengths and pitfalls
   - Capture concrete learnings in `config/submission-agent-grounding.md`
4. Visit the event's CFP page (use Playwright) to understand submission fields
5. In Playwright, validate every field before handoff:
   - Confirm each required CFP field is present in the proposal
   - Verify all character/word limits are respected (title, abstract, takeaways, bio, etc.)
   - If any limit/field mismatch is found, fix the submission content before opening/reviewing the PR
6. Create 1-3 session proposals matching the event's themes to the speaker's expertise
7. Include `node scripts/generate-readme.js` output in the PR

## Custom Agent Definitions (Repository)
- `config/agents/dashboard-session-state-agent.md` — Handles dashboard and session state update tasks/issues
- `config/agents/submission-feedback-learner-agent.md` — Builds grounding from PR feedback and submission edits

## MCP Servers Available
- **Playwright** — for navigating event websites and CFP pages
- **Fetch** — for retrieving web content
