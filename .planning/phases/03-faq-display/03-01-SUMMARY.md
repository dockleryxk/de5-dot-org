---
phase: 03-faq-display
plan: 01
subsystem: ui
tags: [nuxt-content, zod, bulma, navbar, schema, vue]

# Dependency graph
requires:
  - phase: 02-content-system
    provides: "FAQ collection with typed schema, FAQ detail page"
  - phase: 1.1-set-up-styling
    provides: "Bulma theming, ThemeToggle component, navbar layout"
provides:
  - "FAQ schema with optional multi-answer source attribution array"
  - "AppNavbar component with always-visible theme toggle and FAQs link"
  - "Homepage CTA linking to /faqs"
  - "Placeholder /faqs listing page for SSG route resolution"
affects: [03-02-PLAN, 03-03-PLAN]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "z.array(z.object()).optional() for backward-compatible schema evolution"
    - "Navbar extraction pattern: AppNavbar.vue with menu state and route watcher"
    - "navbar-brand for always-visible elements (theme toggle outside hamburger)"

key-files:
  created:
    - "app/components/AppNavbar.vue"
    - "app/pages/faqs/index.vue"
  modified:
    - "content.config.ts"
    - "content/faqs/engine/oil-type-recommendation.md"
    - "app/layouts/default.vue"
    - "app/pages/index.vue"

key-decisions:
  - "Multi-answer schema uses optional z.array for backward compatibility with single-answer FAQs"
  - "ThemeToggle placed in navbar-brand (not navbar-menu) for all-viewport visibility"
  - "FAQs link in navbar-end (collapses into hamburger on mobile)"
  - "Placeholder /faqs page added to unblock SSG prerender (Plan 02 replaces it)"

patterns-established:
  - "Schema evolution: add optional fields to preserve backward compatibility"
  - "Component extraction: move state + watchers into extracted component"

# Metrics
duration: 4min
completed: 2026-02-10
---

# Phase 3 Plan 01: Schema & Navigation Infrastructure Summary

**FAQ schema evolved with optional multi-answer source attribution array; navbar extracted to AppNavbar with always-visible theme toggle and FAQs link; homepage CTA directing users to /faqs**

## Performance

- **Duration:** 4 min
- **Started:** 2026-02-10T15:59:18Z
- **Completed:** 2026-02-10T16:03:01Z
- **Tasks:** 3 (+ 1 deviation fix)
- **Files modified:** 6

## Accomplishments

- FAQ schema now supports an optional `answers` array with per-answer sourceUrl/sourceAuthor/sourceDate for multi-source attribution
- Navbar extracted to standalone AppNavbar.vue with ThemeToggle moved to navbar-brand (visible at all viewport sizes) and FAQs NuxtLink in navbar-end
- Homepage updated with "Browse FAQs" button CTA and clickable FAQs card linking to /faqs
- SSG build verified passing (yarn generate succeeds with 0 link checker errors)

## Task Commits

Each task was committed atomically:

1. **Task 1: Evolve FAQ schema for multi-answer support** - `220e34e` (feat)
2. **Task 2: Extract navbar to AppNavbar component** - `886fcef` (feat)
3. **Task 3: Add FAQ call-to-action on homepage** - `9ab2849` (feat)
4. **Deviation fix: Placeholder /faqs listing page** - `b544ea0` (fix)

## Files Created/Modified

- `content.config.ts` - Added optional `answers` array to FAQ schema for multi-answer source attribution
- `content/faqs/engine/oil-type-recommendation.md` - Updated frontmatter to demonstrate multi-answer pattern with 2 sources
- `app/components/AppNavbar.vue` - New: extracted navbar with ThemeToggle in navbar-brand, FAQs link in navbar-end, menu state management
- `app/layouts/default.vue` - Simplified to use AppNavbar component (removed inline navbar, menuOpen state, and route watcher)
- `app/pages/index.vue` - Replaced "Coming soon" with "Browse FAQs" button CTA and clickable FAQs card
- `app/pages/faqs/index.vue` - New: placeholder listing page to resolve SSG prerender 404 (Plan 02 replaces this)

## Decisions Made

- **Multi-answer schema backward compatibility:** Added `answers` as `.optional()` so existing single-answer FAQs validate without changes. Top-level sourceUrl/sourceAuthor/sourceDate fields kept for backward compatibility.
- **ThemeToggle placement:** Moved from navbar-menu (inside hamburger) to navbar-brand (always visible). Per Bulma docs, navbar-brand elements are visible at all viewport sizes.
- **FAQs link in navbar-end:** Placed in the collapsible menu area, appropriate for a secondary nav item that doesn't need to be visible on mobile at all times.
- **Placeholder /faqs page:** Created minimal listing page to prevent SSG prerender 404 errors from navbar and homepage links to /faqs. Plan 02 will replace this with the full implementation.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Added placeholder /faqs listing page for SSG build**
- **Found during:** Final verification (yarn generate)
- **Issue:** The navbar and homepage both link to /faqs, but no index page existed for that route. The `[...slug].vue` catch-all handled `/faqs` and returned 404. Nitro's prerender link checker failed with 4 errors.
- **Fix:** Created minimal `app/pages/faqs/index.vue` with heading, intro text, and empty state message. Plan 02 will replace this with the full FAQ listing.
- **Files modified:** app/pages/faqs/index.vue
- **Verification:** `yarn generate` succeeds with 0 link checker errors, 13 routes prerendered
- **Committed in:** b544ea0

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Necessary to unblock SSG build. Plan 02 will replace the placeholder with the real implementation. No scope creep.

## Issues Encountered

None - all planned tasks executed without issues. The only problem was the SSG build failure from the missing /faqs route, resolved via deviation Rule 3.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Schema infrastructure ready for Plan 02's FAQ listing page (queryCollection with multi-answer support)
- AppNavbar component ready for Plan 02/03 to add breadcrumb navigation or additional links
- Homepage CTA already links to /faqs (will work once Plan 02 implements the full listing)
- Placeholder /faqs page can be replaced directly by Plan 02's implementation

## Self-Check: PASSED

- All 6 created/modified files verified on disk
- All 4 commit hashes verified in git log
- Must-have artifacts verified: schema answers array, AppNavbar with navbar-brand, default.vue using AppNavbar, index.vue linking to /faqs, AppNavbar linking to /faqs
- `yarn lint` passes
- `yarn generate` succeeds (13 routes, 0 errors)

---
*Phase: 03-faq-display*
*Completed: 2026-02-10*
