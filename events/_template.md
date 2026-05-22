---
# YAML Frontmatter Schema for Event Files
# Copy this template when creating a new event file.
# File naming: events/{year}/{year}-{event-slug}.md

event_id: ""                    # Unique: lowercase slug (e.g., "microsoft-build-2026")
event_name: ""                  # Full event name
event_year: 2026                # Year the event takes place
status: discovered              # discovered | researching | shortlisted | approved | rejected | closed
verification_required: false    # true if details need human verification

# Event Details
event_url: ""                   # Event homepage
start_date: ""                  # YYYY-MM-DD
end_date: ""                    # YYYY-MM-DD
location: ""                    # City, Country (or "Online")
country: ""                     # Country code (e.g., PT, US, DE)
format: ""                      # in-person | online | hybrid
tracks: []                      # Relevant tracks/themes

# CFP Details
cfp_url: ""                     # Direct link to CFP/submission page
cfp_open_date: ""               # YYYY-MM-DD
cfp_deadline: ""                # YYYY-MM-DD
cfp_status: unknown             # open | closed | unknown
submission_format: ""           # What the CFP asks for (title, abstract, bio, etc.)

# Discovery Metadata
discovered_at: ""               # ISO 8601 timestamp
discovered_by: ""               # "agent" or "manual"
source_url: ""                  # Where we found this event
source_platform: ""             # sessionize | papercall | cfpland | web-search | manual
tier: 2                         # 1 (flagship) | 2 (regional) | 3 (niche)

# Review Metadata
review_issue: null              # GitHub issue number
rejection_reason: ""            # Why it was rejected (if applicable)
notes: ""                       # Free-form notes

# Submission Tracking
submissions: []                 # List of submission file paths
---

# {Event Name}

> **Status**: `discovered` | **CFP Deadline**: `TBD` | **Event Date**: `TBD`

## Overview

<!-- Brief description of the event, its audience, and why it's relevant -->

## Key Details

| Field | Value |
|-------|-------|
| 🌐 Website | [Link]() |
| 📅 Event Dates | TBD |
| 📍 Location | TBD |
| 🎤 CFP Deadline | TBD |
| 📝 CFP Link | [Submit]() |
| 🏷️ Tier | 2 |

## Relevant Tracks / Themes

<!-- List the tracks or themes that match our speaker profile -->

## CFP Requirements

<!-- What does the submission form ask for? (title, abstract, bio, outline, etc.) -->

## Why This Event?

<!-- Why is this a good fit? What topics should we submit? -->

## Agent Notes

<!-- Notes from the discovery agent about this event -->
