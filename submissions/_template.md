---
# YAML Frontmatter Schema for Submission Files
# File naming: submissions/{year}/{event-slug}/session-{n}.md

submission_id: ""               # Unique: {event-slug}-session-{n}
event_id: ""                    # Links to event file
status: draft                   # draft | review | revision | approved | submitted | accepted | rejected | waitlisted
created_at: ""                  # ISO 8601
updated_at: ""                  # ISO 8601

# Session Details
session_title: ""
session_format: ""              # talk | workshop | keynote | panel | lightning-talk
session_level: ""               # beginner | intermediate | advanced
session_duration: ""            # e.g., "45 minutes"
session_language: "English"
session_track: ""               # Target track at the event

# Submission Fields (adapt to what CFP asks for)
abstract: ""                    # Short abstract (usually 150-300 words)
detailed_description: ""        # Longer description if required
key_takeaways: []               # List of audience takeaways
target_audience: ""
prerequisites: ""
tags: []

# Speaker Info (pulled from profile, may need per-event customization)
bio_variant: "medium"           # short | medium | full
custom_bio: ""                  # Override if needed

# Review Tracking
review_issue: null              # GitHub issue number
feedback_history: []            # List of revision notes
---

# {Session Title}

> **Event**: {Event Name} | **Status**: `draft` | **Format**: `talk`

## Abstract

<!-- The session abstract as it will appear in the submission -->

## Detailed Description

<!-- Longer description if the CFP requires one -->

## Key Takeaways

<!-- What attendees will learn -->

1. 
2. 
3. 

## Outline

<!-- Session outline / agenda -->

| Time | Topic |
|------|-------|
| 0:00 | Introduction |
| | |
| | Wrap-up & Q&A |

## Why This Session?

<!-- Why this session is a good fit for this specific event -->

## Speaker Notes

<!-- Internal notes - not part of the submission -->
