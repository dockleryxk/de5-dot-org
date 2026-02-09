---
phase: 02-content-system
plan: 01
subsystem: content
tags: [zod, nuxt-content, schema, faq, markdown]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: Nuxt Content v3 with initial content.config.ts and faqs collection
provides:
  - Hardened FAQ schema with required source metadata fields
  - 3 sample FAQ content files across 2 categories
  - zod as explicit dependency for schema validation
affects: [02-02-PLAN, content rendering, FAQ pages]

# Tech tracking
tech-stack:
  added: [zod v3]
  patterns: [required source attribution on all FAQ content, category subdirectories]

key-files:
  created:
    - content/faqs/engine/oil-type-recommendation.md
    - content/faqs/engine/break-in-period.md
    - content/faqs/general/warranty-coverage.md
  modified:
    - content.config.ts
    - package.json

key-decisions:
  - 'Installed zod v3 (not v4) to match Nuxt Content bundled version'
  - 'All source metadata fields required (no optional) for transparency'
  - 'Dates as z.string() not z.date() to avoid YAML parsing issues'

patterns-established:
  - 'FAQ files organized in category subdirectories: content/faqs/{category}/{slug}.md'
  - 'Source attribution required: sourceUrl, sourceAuthor, sourceDate on all FAQs'
  - 'Freshness tracking via manual lastUpdated field (git dates unreliable in SSG)'

# Metrics
duration: 4min
completed: 2026-02-09
---

# Phase 02 Plan 01: FAQ Schema and Sample Content Summary

**Hardened FAQ schema with required source attribution (sourceUrl, sourceAuthor, sourceDate, lastUpdated) using zod v3, plus 3 sample FAQ files across engine and general categories**

## Performance

- **Duration:** 4 min
- **Started:** 2026-02-09T19:45:18Z
- **Completed:** 2026-02-09T19:48:51Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments

- Fixed deprecated `z` import from `@nuxt/content` to use `zod` directly
- Made all source metadata fields required (removed `.optional()`) and added `lastUpdated`
- Created 3 sample FAQ files that validate against the hardened schema
- Added zod v3 as explicit dependency (matching Nuxt Content's bundled version)

## Task Commits

Each task was committed atomically:

1. **Task 1: Harden FAQ schema and fix zod import** - `0f7ad6e` (feat)
2. **Task 2: Create sample FAQ content files** - `4deecc4` (feat)

## Files Created/Modified

- `content.config.ts` - Updated zod import and hardened FAQ schema with required fields
- `package.json` - Added zod v3 as explicit dependency
- `yarn.lock` - Updated lockfile for zod addition
- `content/faqs/.gitkeep` - Removed (replaced by real content files)
- `content/faqs/engine/oil-type-recommendation.md` - FAQ about K20C1 oil type (0W-20)
- `content/faqs/engine/break-in-period.md` - FAQ about 600-mile break-in procedure
- `content/faqs/general/warranty-coverage.md` - FAQ about warranty coverage periods

## Decisions Made

- **zod v3 over v4:** `yarn add zod` installed zod v4.3.6 which caused `toJSONSchema` errors with Nuxt Content's internal zod v3.25.76. Downgraded to `zod@3` for compatibility. This is the correct approach until Nuxt Content migrates to zod v4.
- **All fields required:** No `.optional()` on any source metadata field -- every FAQ must have full source attribution for transparency and credibility.
- **Dates as strings:** Using `z.string()` for sourceDate and lastUpdated avoids YAML date parsing inconsistencies across different parsers.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Downgraded zod from v4 to v3**
- **Found during:** Task 1 (zod installation)
- **Issue:** `yarn add zod` installed zod v4.3.6 which is incompatible with Nuxt Content v3's internal zod v3.25.76. The `nuxt prepare` step failed with `Zod toJSONSchema error for schema: ZodObject Cannot read properties of undefined (reading 'def')`
- **Fix:** Ran `yarn add zod@3` to install zod v3.25.76, matching Nuxt Content's bundled version
- **Files modified:** package.json, yarn.lock
- **Verification:** `nuxt prepare` and `yarn dev` both succeed without errors
- **Committed in:** 0f7ad6e (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Essential fix for compatibility. No scope creep. Plan intent (explicit zod dependency) fully preserved.

## Issues Encountered

None beyond the zod v4 incompatibility documented above.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Schema contract locked: all FAQ content must include source attribution and freshness date
- 3 sample files ready for Plan 02's rendering work (FAQ listing page and detail pages)
- Content validates successfully against hardened schema (3/3 parsed by Nuxt Content)

## Self-Check: PASSED

- All 6 files verified present on disk
- Both task commits (0f7ad6e, 4deecc4) verified in git log

---
*Phase: 02-content-system*
*Completed: 2026-02-09*
