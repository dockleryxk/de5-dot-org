# DE5.org

## What This Is

A community knowledge hub for the Acura Integra Type S (DE5) that aggregates and curates information from Facebook groups and forums into a single, searchable resource. It helps both current owners and prospective buyers find answers without digging through scattered social media posts.

## Core Value

Users can quickly find reliable, sourced answers to common DE5 questions without searching through multiple Facebook groups and forums.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Data ingestion from Facebook group (Acura Integra Type S Owners Club)
- [ ] Data ingestion from forum (IntegraForums.com DE5 section)
- [ ] FAQs page based on common questions discovered from ingested data
- [ ] Search or chat interface to find information (whichever is simpler)
- [ ] Traffic analytics
- [ ] Homepage with cover photo (manually sourced)
- [ ] Sources cited for all information

### Out of Scope

- Real-time chat/community features — not building another forum
- User accounts/authentication — read-only resource for v1
- Automated cover photo submissions — manual curation first
- Mobile app — web-first
- Buyer's guide, maintenance guide pages — future iterations after core is validated
- Multiple FB groups/forums — start with one of each

## Context

**Data Sources (v1):**
- Facebook group: "Acura Integra Type S Owners Club" — https://www.facebook.com/groups/acuraintegratypes
- Forum: IntegraForums.com Type S section — https://www.integraforums.com/forum/forums/integra-type-s-forum.116/
  - Note: Parent forum covers all Integra generations; only this section and child links are DE5-specific

**Technical Environment:**
- Domain: de5.org (owned)
- Framework preference: Nuxt Content
- Hosting candidates: Sherpa.sh, Netlify (cost concerns), DigitalOcean (overhead concerns)

**Project Nature:**
- Hobby project — budget and simplicity prioritized over features
- Solo maintainer
- Open-source on public GitHub repo
- Built with Claude Code and GSD (Get Shit Done) workflow

**Key Unknowns (for research):**
- Facebook group data access: API restrictions, scraping feasibility, legal considerations
- Forum scraping approach for XenForo-based IntegraForums
- Search vs chat: which is simpler to implement and maintain with Nuxt

**Security (open-source considerations):**
- No hardcoded secrets or API keys in codebase
- All configuration via environment variables
- `.env.example` with dummy values for contributors
- Scraper credentials never committed

## Constraints

- **Budget**: Minimal — free tiers and cheap hosting preferred
- **Complexity**: Simple to maintain as a solo hobby project
- **Legal**: Must respect data source terms of service; prefer partnerships with admins where possible
- **Tech stack**: Nuxt Content preferred unless research suggests otherwise
- **License**: GPL-3.0 — derivative works must also be open-source
- **Security**: No secrets in code; environment variables for all configuration

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Start with 1 FB group + 1 forum | Validate approach before scaling data sources | — Pending |
| Nuxt Content | User preference, good for content-heavy sites | — Pending |
| Search OR chat, not both | Ship simpler option first, add other later if needed | — Pending |
| Manual cover photos | No traffic yet; automate engagement features when there's an audience | — Pending |
| Open-source (GPL-3.0) | Community benefit; derivative works must share alike | — Pending |
| Claude/GSD attribution | Transparency about tooling used to build project | — Pending |

---
*Last updated: 2025-02-05 after initialization*
