---
phase: 03-faq-display
plan: 03
subsystem: ui
tags: [legal, terms, error-handling, 404, vue, pug]

# Dependency graph
requires:
  - phase: 02-content-system
    provides: "FAQ content schema and sample files (for error page FAQ route detection)"
provides:
  - "Legal terms/disclaimer page at /terms"
  - "FAQ-specific 404 error page with Browse All FAQs link"
  - "Enhanced error.vue with three-tier 404 handling"
affects: [03-faq-display, future-legal-updates]

# Tech tracking
tech-stack:
  added: []
  patterns: ["URL-based error page branching with computed property", "Bulma .content class for legal text typography"]

key-files:
  created:
    - app/pages/terms.vue
  modified:
    - app/error.vue

key-decisions:
  - "Terms page as Vue SFC (not Nuxt Content markdown) for static legal text that rarely changes"
  - "Robust URL detection in error.vue using URL constructor with fallback for bare paths"

patterns-established:
  - "Static content pages as Vue SFCs in pages/ when content is non-dynamic"
  - "Error page route detection via error.url with URL parsing for full URL support"

# Metrics
duration: 4min
completed: 2026-02-10
---

# Phase 03 Plan 03: Terms Page and FAQ-Specific Error Handling Summary

**Legal disclaimer page at /terms with five sections plus FAQ-aware 404 error page showing contextual messaging and Browse All FAQs link**

## Performance

- **Duration:** 4 min
- **Started:** 2026-02-10T15:59:22Z
- **Completed:** 2026-02-10T16:03:17Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Legal terms/disclaimer page at /terms with five sections: Disclaimer, Source Attribution, Not Professional Advice, Community Content, and Trademarks
- FAQ-specific 404 error page shows "FAQ Not Found" with "Browse All FAQs" and "Go Home" buttons for any URL starting with /faqs
- General 404 and non-404 error handling preserved unchanged
- All pages prerender successfully in SSG build

## Task Commits

Each task was committed atomically:

1. **Task 1: Create legal terms/disclaimer page at /terms** - `fccd33b` (feat)
2. **Task 2: Enhance error page with FAQ-specific 404 handling** - `1389016` (feat)

**Plan metadata:** pending (docs: complete plan)

## Files Created/Modified
- `app/pages/terms.vue` - Legal terms and disclaimer page with five content sections and SEO meta
- `app/error.vue` - Enhanced error page with three-tier handling: FAQ 404, general 404, non-404 errors

## Decisions Made
- **Terms page as Vue SFC:** Used `pages/terms.vue` instead of a Nuxt Content markdown file because the legal content is static text that rarely changes, avoiding the need for a content collection catch-all route.
- **URL detection approach:** Used `new URL()` constructor with try/catch fallback because the NuxtError `url` field contains full URLs (e.g., `http://localhost:3001/faqs/...`) not just paths, so `startsWith('/faqs')` alone would not work.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed URL detection for FAQ route matching in error page**
- **Found during:** Task 2 (Enhance error page)
- **Issue:** The NuxtError `url` field contains full URLs (e.g., `http://localhost:3001/faqs/nonexistent/path`), not just path segments. Using `startsWith('/faqs')` directly on the full URL would never match.
- **Fix:** Used `new URL(errorUrl).pathname.startsWith('/faqs')` with try/catch fallback for bare path strings.
- **Files modified:** app/error.vue
- **Verification:** Confirmed via curl that error JSON returns full URLs; URL constructor correctly extracts pathname.
- **Committed in:** 1389016 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 bug fix)
**Impact on plan:** Essential fix for correctness. Without it, FAQ-specific 404s would never trigger.

## Issues Encountered
None beyond the deviation documented above.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- /terms page ready for linking from FAQ listing and detail page disclaimers (Plan 02 dependency)
- FAQ-specific 404 handling ready for any /faqs/* route errors
- SSG build verified: both new/modified pages prerender successfully

## Self-Check: PASSED

- FOUND: app/pages/terms.vue
- FOUND: app/error.vue
- FOUND: fccd33b (Task 1 commit)
- FOUND: 1389016 (Task 2 commit)

---
*Phase: 03-faq-display*
*Completed: 2026-02-10*
