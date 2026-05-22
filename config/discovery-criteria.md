---
# Discovery Criteria Configuration
# The event discovery agent uses this file to search for relevant speaking opportunities.
# Edit these settings to tune what events are discovered.

search_frequency: weekly
max_results_per_run: 20
look_ahead_months: 6
min_days_before_event: 30
---

# Event Discovery Criteria

## Target Event Types

### Tier 1 — High Priority (flagship conferences)
<!-- Customize these examples to match your preferred event brands, regions, and audience size. -->
- Microsoft Ignite
- Microsoft Build
- KubeCon + CloudNativeCon (Europe / North America)
- GitHub Universe
- NDC (Oslo, London, Sydney, etc.)
- DevIntersection
- Techorama
- GOTO Conference
- QCon
- WeAreDevelopers World Congress

### Tier 2 — Regional & Community Events
- Global Azure
- Azure Day (any country)
- .NET Conf / .NET Day
- DevDays (any country/region)
- Cloud Summit
- API Days
- Platform Engineering Day
- AI DevDay / AI Conference
- Developer Week
- FOSDEM (cloud-native / AI tracks)

### Tier 3 — Niche & Emerging
- AI-focused conferences and summits
- Application modernization events
- Platform engineering meetups accepting CFPs
- Cloud-native / Kubernetes community days

## Search Keywords

### Primary Keywords
- "call for speakers" OR "call for papers" OR "CFP"
- Combined with: AI agents, application modernization, platform engineering, cloud native, GitHub Copilot, Kubernetes, developer productivity

### Secondary Keywords
- "speaker submission" OR "submit a session"
- Combined with: Microsoft, Azure, .NET, Semantic Kernel, Radius, distributed systems

## Geographic Focus

### Priority Regions
1. **Europe** (EMEA home region) — all countries
2. **North America** — major conferences only (Tier 1)
3. **Online/Virtual** — any

### Excluded Regions
- None explicitly excluded, but prioritize travel-feasible locations

## Date Constraints
- **Event date**: Within the next 6 months from discovery date
- **CFP deadline**: Must be at least 7 days in the future
- **Preference**: Events with CFP deadlines 2+ weeks away (time to prepare)

## Curated CFP Sources

### Aggregator Sites
- https://sessionize.com/app/search (search for open CFPs)
- https://www.papercall.io/events
- https://cfpland.com/
- https://confs.tech/
- https://developers.events/
- https://community.cncf.io/events/
- https://cfp.ninja/

### Community Calendars
- https://developer.microsoft.com/en-us/community/events
- https://www.meetup.com/pro/microsoft-reactor/
- https://cloudnativeday.ch/ (example of regional events)

## Exclusion Rules
- Skip events that are **vendor-specific** to competing platforms unless they clearly include open, cross-platform, or multi-vendor tracks
- Skip events with **registration fees for speakers** (pay-to-speak)
- Skip events that have **already passed their CFP deadline**
- Skip events that are **primarily academic/research** (unless AI-focused)
- Skip events in the **rejected events list** (check `events/` frontmatter for `status: rejected`)

## Discovery Quality Rules
- Always verify CFP status by visiting the event website
- Mark events as `verification_required: true` if information is uncertain
- Prefer events found on curated CFP platforms over general web search
- Include the source URL where the CFP was found
