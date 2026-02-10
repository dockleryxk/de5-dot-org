# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2025-02-05)

**Core value:** Users can quickly find reliable, sourced answers to common DE5 questions without searching multiple platforms.
**Current focus:** Phase 3 - FAQ Display (in progress)

## Current Position

Phase: 3 of 8 (FAQ Display) — IN PROGRESS
Plan: 1 of 3 in current phase (03-03 complete)
Status: Executing phase plans
Last activity: 2026-02-10 — Completed 03-03-PLAN.md (terms page + FAQ error handling)

Progress: [####------] 33%

## Performance Metrics

**Velocity:**
- Total plans completed: 8
- Average duration: ~4 minutes
- Total execution time: ~0.5 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 1. Foundation | 3/3 | ~13m | ~4.3m |
| 1.1 Set Up Styling | 2/2 | ~9m | ~4.5m |
| 2. Content System | 2/2 | ~7m | ~3.5m |
| 3. FAQ Display | 1/3 | ~4m | ~4m |

**Recent Trend:**
- Last 5 plans: 1.1-02 (~6m), 02-01 (~4m), 02-02 (~3m), 03-03 (~4m)
- Trend: Stable

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- [Init]: Nuxt Content v3 selected as framework (user preference, content-heavy site)
- [Init]: MiniSearch for client-side search (free, fast, sufficient for hundreds of FAQs)
- [Init]: Facebook automation deferred (API deprecated April 2024, legal risk)
- [Init]: GPL-3.0 license with Claude/GSD attribution (open-source commitment)
- [FND-01]: Used Nuxt 4.3.0 minimal template with app/ directory structure
- [FND-02]: Added better-sqlite3 as explicit dependency for Nuxt Content v3
- [FND-03]: Installed eslint as direct devDependency for @nuxt/eslint peer requirement
- [FND-04]: robots.txt renamed to _robots.txt by @nuxtjs/robots module
- [FND-05]: Prettier config: no semicolons, single quotes, trailing commas, 100 char width, LF endings
- [FND-06]: lint-staged targets: *.{js,ts,mjs,vue} for ESLint+Prettier, *.{json,md,yml,yaml,css} for Prettier only
- [FND-07]: Conventional Commits enforced via commitlint commit-msg hook
- [FND-08]: CI workflow uses .nvmrc for Node version (no hardcoded version)
- [FND-09]: Dependabot groups nuxt ecosystem and dev-tools separately
- [Q-001]: CLAUDE.md at project root with critical gotchas for Claude Code sessions
- [Q-001]: .gitignore ignores Claude Code local files, keeps shared config tracked
- [1.1-01]: @use syntax exclusively (no @import) for Dart Sass 1.80+ / Vite 7 compatibility
- [1.1-01]: $scheme-h: 0, $scheme-s: 0% eliminates Bulma's blue undertone for warm neutrals
- [1.1-01]: dataValue: 'theme' bridges @nuxtjs/color-mode with Bulma's [data-theme=dark]
- [1.1-01]: lint-staged updated to include .scss files for Prettier formatting
- [1.1-02]: ClientOnly wrapper required for colorMode-dependent rendering (SSR hydration mismatch)
- [1.1-02]: @typescript-eslint/no-unused-vars disabled for .vue files (Pug templates not parsed by vue-eslint-parser)
- [1.1-02]: Bulma 1.x navbar-burger requires exactly 4 span elements
- [02-01]: zod v3 (not v4) required for Nuxt Content v3 compatibility -- v4 causes toJSONSchema errors
- [02-01]: All FAQ source metadata fields required (no optional) for transparency
- [02-01]: Dates stored as z.string() not z.date() to avoid YAML parsing issues
- [02-02]: Inline date formatting and source attribution (no extracted components) -- simple enough for single page
- [02-02]: Intl.DateTimeFormat for locale-aware date display (no external date library needed)
- [03-03]: Terms page as Vue SFC (not Nuxt Content markdown) for static legal text that rarely changes
- [03-03]: Robust URL detection in error.vue using URL constructor with fallback for bare paths

### Pending Todos

- [ ] Audit imported Inter font weights (area: ui) — check if all 4 weights (400/500/600/700) are actually used after Phase 1.1
- [ ] Investigate PurgeCSS without Nuxt module (area: ui) — use @fullhuman/postcss-purgecss directly instead of nuxt-purgecss

### Roadmap Evolution

- Phase 1.1 inserted after Phase 1: Set up styling (URGENT)

### Blockers/Concerns

- [Research]: Phase 7 (Forum Scraping) needs research on IntegraForums.com XenForo configuration
- [Research]: Check if target forum has RSS feeds or REST API before scraping

### Quick Tasks Completed

| # | Description | Date | Commit | Directory |
|---|-------------|------|--------|-----------|
| 001 | Init Claude Code config (CLAUDE.md + .gitignore) | 2026-02-05 | 73649ed | [001-init-claude-code-config](./quick/001-init-claude-code-config/) |

## Session Continuity

Last session: 2026-02-10
Stopped at: Completed 03-03-PLAN.md (terms page + FAQ error handling)
Resume file: .planning/phases/03-faq-display/03-03-SUMMARY.md

---
*State initialized: 2025-02-05*
