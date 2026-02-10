---
phase: 03-faq-display
plan: 02
subsystem: ui
tags: [nuxt-content, vue, pug, faq, bulma, breadcrumbs, seo, mobile]

# Dependency graph
requires:
  - phase: 03-faq-display
    provides: "FAQ schema with multi-answer support, AppNavbar with FAQs link, placeholder /faqs page"
  - phase: 02-content-system
    provides: "FAQ collection with typed schema, catch-all FAQ detail page"
provides:
  - "FAQ listing page at /faqs with queryCollection sorted by most recent"
  - "Overhauled FAQ detail page with breadcrumbs, multi-answer source attribution, disclaimers, SEO"
  - "Sticky mobile back-to-FAQs button for viewports < 1024px"
  - "Back-to-list navigation on FAQ detail pages"
affects: [future-search, future-browse-navigation]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Bulma .breadcrumb for FAQ page navigation (Home > FAQs > Question)"
    - "Multi-answer source attribution with v-if/v-else for array vs legacy fallback"
    - "Sticky mobile back button with position: sticky; bottom: 0; z-index: 29"
    - "SCSS variables auto-injected via nuxt.config.ts additionalData (no explicit @use needed)"

key-files:
  created: []
  modified:
    - "app/pages/faqs/index.vue"
    - "app/pages/faqs/[...slug].vue"

key-decisions:
  - "No explicit @use for SCSS variables in Vue SFCs -- nuxt.config.ts additionalData auto-injects them"
  - "Multi-answer source attribution labeled as 'From @username on IntegraForums' with fallback to legacy .box"
  - "Sticky mobile back button uses z-index 29 (below navbar z-index 30)"
  - "No changes to main.scss -- all styles scoped to components"

patterns-established:
  - "FAQ listing query: queryCollection('faqs').select().order().all() for flat sorted list"
  - "Detail page SEO: useSeoMeta with ogTitle from question, ogDescription from description field"
  - "Breadcrumbs via Bulma .breadcrumb component (not a custom component)"

# Metrics
duration: 4min
completed: 2026-02-10
---

# Phase 3 Plan 02: FAQ Pages Summary

**FAQ listing at /faqs with sorted question links and overhauled detail page featuring breadcrumbs, multi-answer source attribution, sticky mobile back button, and SEO meta**

## Performance

- **Duration:** 4 min
- **Started:** 2026-02-10T16:34:53Z
- **Completed:** 2026-02-10T16:38:55Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- FAQ listing page at /faqs shows all curated questions sorted by most recent, with intro/disclaimer text linking to /terms, hover highlights, and empty state
- FAQ detail page overhauled with breadcrumbs (Home > FAQs > Question), distinctly styled question heading, disclaimer, multi-answer source attribution, legacy single-answer fallback, back-to-list link, and sticky mobile back button
- SEO meta tags (ogTitle, ogDescription) set on both listing and detail pages
- SSG generates all FAQ routes (19 prerendered, 0 link checker errors) and sitemap.xml includes all FAQ URLs

## Task Commits

Each task was committed atomically:

1. **Task 1: Create FAQ listing page at /faqs** - `8062186` (feat)
2. **Task 2: Overhaul FAQ detail page with multi-answer, breadcrumbs, SEO** - `92dc40b` (feat)

## Files Created/Modified

- `app/pages/faqs/index.vue` - FAQ listing page with queryCollection query, intro/disclaimer, hover list items, and empty state
- `app/pages/faqs/[...slug].vue` - Overhauled FAQ detail page with breadcrumbs, question heading in primary color, disclaimer, multi-answer source attribution, back navigation, sticky mobile button, and SEO meta

## Decisions Made

- **No explicit @use for SCSS variables:** Discovered that `nuxt.config.ts` vite.css.preprocessorOptions.scss.additionalData already injects `@use "~/assets/scss/variables" as vars;` into every SCSS block. Adding it again in Vue SFCs causes a Sass "duplicate module namespace" error. Removed the explicit `@use` from the listing page.
- **Multi-answer labeling format:** Used "From @username on IntegraForums" per CONTEXT.md specific ideas, with external link icon and date.
- **No changes to main.scss:** All styles scoped to their respective components -- no global styles needed for FAQ pages.
- **Sticky button z-index 29:** Set below Bulma navbar's z-index 30 per research recommendation, confirmed in implementation.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Removed duplicate SCSS @use causing build failure**
- **Found during:** Task 2 (verification via yarn generate)
- **Issue:** The plan specified `@use '~/assets/scss/variables' as vars;` in the index.vue scoped styles, but `nuxt.config.ts` already injects this via Vite's additionalData. Sass threw "There's already a module with namespace 'vars'" error, failing the production build.
- **Fix:** Removed explicit `@use` from index.vue, replaced with a comment explaining the auto-injection.
- **Files modified:** app/pages/faqs/index.vue
- **Verification:** `yarn generate` succeeds with 0 errors, 19 routes prerendered
- **Committed in:** 92dc40b (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 bug fix)
**Impact on plan:** Essential fix for build correctness. The plan's SCSS import instruction conflicted with the existing Vite config.

## Issues Encountered

None beyond the deviation documented above.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All Phase 3 plans (01, 02, 03) now complete
- FAQ browsing experience fully functional: listing, detail pages with multi-answer support, terms page, FAQ-specific 404 handling
- Ready for Phase 4 (Search) -- FAQ listing provides the content base for search indexing
- Ready for Phase 5 (Browse & Navigation) -- category grouping can build on the flat listing

## Self-Check: PASSED

- FOUND: app/pages/faqs/index.vue
- FOUND: app/pages/faqs/[...slug].vue
- FOUND: 8062186 (Task 1 commit)
- FOUND: 92dc40b (Task 2 commit)
- `yarn lint` passes
- `yarn generate` succeeds (19 routes, 0 errors)
- Sitemap includes all FAQ URLs

---
*Phase: 03-faq-display*
*Completed: 2026-02-10*
