# Roadmap: DE5.org

## Overview

This roadmap transforms DE5.org from concept to a functional community knowledge hub for Acura Integra Type S owners. The journey progresses from open-source project scaffolding through content infrastructure, search capabilities, automated data ingestion, and analytics. Each phase delivers standalone value, allowing validation and iteration before adding complexity.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation** - Open-source project setup with Nuxt Content v3
- [x] **Phase 1.1: Set Up Styling** - (INSERTED) Styling infrastructure
- [x] **Phase 2: Content System** - Content collections, schema, and manual curation workflow
- [ ] **Phase 3: FAQ Display** - Mobile-responsive FAQ pages with source attribution
- [ ] **Phase 4: Search** - Client-side full-text search with MiniSearch
- [ ] **Phase 5: Browse & Navigation** - Category browsing and shareable permalinks
- [ ] **Phase 6: Analytics** - Privacy-friendly traffic analytics and search query logging
- [ ] **Phase 7: Forum Scraping** - Automated XenForo content ingestion pipeline
- [ ] **Phase 8: Visual Polish** - Homepage design with cover photo

## Phase Details

### Phase 1: Foundation
**Goal**: Establish open-source project infrastructure with proper licensing, documentation, and secure configuration patterns
**Depends on**: Nothing (first phase)
**Requirements**: INFR-01, INFR-02, INFR-03, INFR-04
**Success Criteria** (what must be TRUE):
  1. Running `npm run dev` starts a working Nuxt Content v3 development server
  2. Repository contains GPL-3.0 LICENSE file at root
  3. README includes setup instructions and Claude/GSD attribution
  4. `.env.example` documents all required environment variables with dummy values
  5. No secrets or API keys exist in committed code
**Plans**: 3 plans

Plans:
- [x] 01-01-PLAN.md — Scaffold Nuxt 4 project and configure core application
- [x] 01-02-PLAN.md — Dev tooling and code quality infrastructure
- [x] 01-03-PLAN.md — Documentation, licensing, and GitHub infrastructure

### Phase 1.1: Set Up Styling (INSERTED)
**Goal**: Establish styling infrastructure (Bulma SCSS, design tokens, dark mode, Inter font, Lucide icons, responsive layout shell) for all future UI phases
**Depends on**: Phase 1
**Requirements**: None (inserted infrastructure phase)
**Success Criteria** (what must be TRUE):
  1. Bulma CSS classes work in Vue templates (navbar, content, columns, box, etc.)
  2. Dark mode toggles via sun/moon icon in navbar, persists across refresh
  3. Dark mode uses warm neutral backgrounds (#171717), not blue-tinted
  4. Inter font renders from self-hosted source (no external CDN requests)
  5. Responsive layout: navbar collapses to hamburger on mobile, content stacks
  6. SCSS design tokens ($type-s-red, spacing, shadows, transitions) available in Vue SFC styles
  7. Lucide icon components auto-import in templates
**Plans**: 2 plans

Plans:
- [x] 1.1-01-PLAN.md — Styling infrastructure: packages, config, SCSS architecture
- [x] 1.1-02-PLAN.md — Components, layout shell, and visual verification

### Phase 2: Content System
**Goal**: Define content collections and enable manual FAQ curation with proper source metadata
**Depends on**: Phase 1
**Requirements**: DATA-01, DATA-02, CONT-02, CONT-03
**Success Criteria** (what must be TRUE):
  1. Admin can create/edit FAQ content by adding/modifying markdown files in content/ directory
  2. Each content file stores source URL, original author, and original post date in frontmatter
  3. Content displays "Last updated" date visible to users
  4. Source attribution renders as clickable link to original post
**Plans**: 2 plans

Plans:
- [x] 02-01-PLAN.md — Harden FAQ schema (fix zod import, require source fields, add lastUpdated) and create 3 sample FAQ files
- [x] 02-02-PLAN.md — Catch-all FAQ page route with ContentRenderer, source attribution link, and freshness date display

### Phase 3: FAQ Display
**Goal**: Users can view curated FAQ content on mobile-responsive pages
**Depends on**: Phase 2
**Requirements**: CONT-01, CONT-04
**Success Criteria** (what must be TRUE):
  1. User can navigate to /faqs and see list of curated questions
  2. User can view individual FAQ with full answer and source attribution
  3. FAQ pages render correctly on mobile devices (viewport 375px to 768px)
  4. FAQ pages render correctly on desktop (viewport 1024px+)
**Plans**: TBD

Plans:
- [ ] 03-01: TBD
- [ ] 03-02: TBD

### Phase 4: Search
**Goal**: Users can find FAQs and content using fast client-side search
**Depends on**: Phase 3
**Requirements**: SRCH-01
**Success Criteria** (what must be TRUE):
  1. Search input is prominently visible on FAQ pages
  2. Search results appear instantly (no server round-trip)
  3. Search handles typos with fuzzy matching
  4. Search returns relevant results for partial word matches (prefix search)
**Plans**: TBD

Plans:
- [ ] 04-01: TBD

### Phase 5: Browse & Navigation
**Goal**: Users can discover content through category browsing and share specific FAQs
**Depends on**: Phase 4
**Requirements**: SRCH-02, SRCH-03
**Success Criteria** (what must be TRUE):
  1. User can filter/browse FAQs by category or topic
  2. Each FAQ has a unique, shareable URL (permalink)
  3. Sharing a permalink loads directly to that FAQ
  4. Category pages show count of FAQs in each category
**Plans**: TBD

Plans:
- [ ] 05-01: TBD
- [ ] 05-02: TBD

### Phase 6: Analytics
**Goal**: Track visitor traffic and search behavior to identify content gaps
**Depends on**: Phase 5
**Requirements**: ANLY-01, ANLY-03
**Success Criteria** (what must be TRUE):
  1. Site tracks page views without compromising user privacy (no cookies required)
  2. Admin can view traffic dashboard showing visitors over time
  3. Search queries are logged with timestamps
  4. Admin can review search logs to identify frequently-searched-but-not-found topics
**Plans**: TBD

Plans:
- [ ] 06-01: TBD
- [ ] 06-02: TBD

### Phase 7: Forum Scraping
**Goal**: Automatically ingest content from IntegraForums.com DE5 section
**Depends on**: Phase 6
**Requirements**: DATA-03
**Success Criteria** (what must be TRUE):
  1. Running scraper script produces markdown files in content/ directory
  2. Scraped content includes source URL, author, and post date
  3. Scraper handles rate limiting without getting blocked
  4. Duplicate detection prevents re-importing existing content
  5. Scraped content appears on site after rebuild
**Plans**: TBD

Plans:
- [ ] 07-01: TBD
- [ ] 07-02: TBD

### Phase 8: Visual Polish
**Goal**: Homepage displays cover photo for visual engagement
**Depends on**: Phase 7
**Requirements**: ANLY-02
**Success Criteria** (what must be TRUE):
  1. Homepage displays a prominent cover photo of a DE5 Integra Type S
  2. Cover photo is optimized for web (compressed, responsive sizing)
  3. Cover photo includes attribution if sourced externally
  4. Homepage provides clear navigation to FAQs and search
**Plans**: TBD

Plans:
- [ ] 08-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 1.1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 3/3 | Complete | 2026-02-05 |
| 1.1 Set Up Styling | 2/2 | Complete | 2026-02-09 |
| 2. Content System | 2/2 | Complete | 2026-02-09 |
| 3. FAQ Display | 0/TBD | Not started | - |
| 4. Search | 0/TBD | Not started | - |
| 5. Browse & Navigation | 0/TBD | Not started | - |
| 6. Analytics | 0/TBD | Not started | - |
| 7. Forum Scraping | 0/TBD | Not started | - |
| 8. Visual Polish | 0/TBD | Not started | - |

---
*Roadmap created: 2025-02-05*
*Last updated: 2026-02-09*
