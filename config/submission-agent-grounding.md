# Submission Agent Grounding

This file captures durable lessons from submission PR reviews and session refinements.

## Composition Baseline
- Start from event-specific requirements and map them to speaker strengths.
- Reuse proven structures from already submitted sessions before drafting net-new content.
- Keep claims concrete and outcome-oriented; avoid generic AI language.

## PR Feedback Learnings (Living)
Add entries in this format after each merged submission PR:

### YYYY-MM-DD — PR #<number> — <event-id>
- **What changed:** <short summary of edits made during review>
- **Why it improved:** <why reviewers accepted the change>
- **Reusable pattern:** <rule future submissions should follow>
- **Avoid next time:** <anti-pattern to prevent>

## Submission Form Validation Checklist (Playwright)
Before handing over a submission PR for review:
1. Open CFP form page with Playwright.
2. Confirm every required form field is represented in the submission markdown.
3. Validate character/word limits for each constrained field (title, abstract, takeaways, bio, etc.).
4. If any field is missing or over limit, revise the markdown first.
5. Re-check the form after edits to ensure all limits and fields pass.
