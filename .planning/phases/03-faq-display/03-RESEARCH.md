# Phase 3: FAQ Display - Research

**Researched:** 2026-02-09
**Domain:** FAQ listing/detail pages, multi-answer schema, navigation, SEO, Bulma components
**Confidence:** HIGH

<user_constraints>

## User Constraints (from CONTEXT.md)

### Locked Decisions

#### FAQ listing layout
- Simple list of question titles (no previews, no category tags, no cards)
- Flat list, not grouped by category
- Sorted by most recent first
- Show all FAQs on one page (no pagination or infinite scroll — revisit when list grows past 50+)
- Clean dividers between items + hover highlight on list items
- Page has a title heading ("Frequently Asked Questions") plus a short intro (1-2 sentences explaining community-sourced nature — this doubles as the listing-level disclaimer)

#### Individual FAQ styling
- Question styled distinctly (larger, different color) paired with answer — not necessarily the page H1
- Content width follows Bulma container/column defaults (no custom max-width)
- Source attribution displayed below the answer
- "Last updated" date shown as subtle metadata near the source attribution
- Bulma `.content` class wraps the answer for automatic markdown typography
- Dark mode follows Bulma defaults (warm neutrals from Phase 1.1, no FAQ-specific tweaks)
- Answer content starts simple: plain text and lists. Richer markdown (images, code blocks, tables) supported later as needed

#### Multi-answer display
- Single FAQ file supports multiple answer sections, each with its own source attribution
- Answers stacked vertically with clear dividers between them
- Each answer labeled by its source (e.g., "From @username on IntegraForums") — not numbered
- Schema update in Phase 3: FAQ schema evolves to support per-answer source fields (sourceUrl, sourceAuthor, sourceDate per answer)

#### Navigation & wayfinding
- "FAQs" added as a nav item in the main navbar
- Homepage gets a prominent link/call-to-action directing users to /faqs
- Breadcrumbs on individual FAQ pages: Home > FAQs > [Question Title]
- "Back to FAQs" link on individual FAQ pages (in addition to breadcrumbs)
- Sticky "Back to FAQs" button on mobile when viewing individual FAQs
- No prev/next navigation between FAQs — users go back to the list
- FAQ URLs follow Nuxt Content file paths (current behavior from Phase 2)
- Dark mode toggle moved outside hamburger menu — visible at all viewport sizes
- Navbar extracted to its own Vue component
- Sitemap.xml generation verified (likely handled by @nuxtjs/seo, confirm during research)

#### Empty & edge states
- /faqs with no entries: simple "No FAQs yet" message
- FAQ-specific 404: "This FAQ doesn't exist" with link back to /faqs
- Broken source links: display the link as-is with a "(link may be outdated)" note

#### Disclaimers & trust framing
- Disclaimer on /faqs listing page as part of the intro text (formal/legal tone)
- Subtle disclaimer text on each individual FAQ page (not a banner or box — small muted text)
- Simple /terms or /disclaimer page with full legal language
- Inline disclaimers link to the full terms page
- Tone: formal/legal — "DE5.org aggregates community knowledge. Content is not verified or endorsed."

#### SEO & sharing
- FAQ pages generate og:title from question, og:description from first ~150 chars of answer
- Use @nuxtjs/seo module for meta tag generation

### Claude's Discretion
- Exact intro text wording on /faqs page
- Specific divider and hover highlight styling
- FAQ-specific 404 page design
- Breadcrumb component implementation
- Sticky back button implementation on mobile
- Empty state message wording
- Full terms/disclaimer page content (formal/legal template)
- Loading states

### Deferred Ideas (OUT OF SCOPE)
- Infinite scroll for FAQ list — revisit when list exceeds 50+ items
- Automated source link checking (build-time or CI job to detect dead source URLs) — add to backlog
- Category grouping and filtering — Phase 5 (Browse & Navigation)
- Search — Phase 4

</user_constraints>

## Summary

Phase 3 transforms the bare FAQ detail page from Phase 2 into a complete FAQ browsing experience. The work spans six areas: (1) creating an FAQ listing page at `/faqs`, (2) evolving the content schema to support multiple answers per question with per-answer source attribution, (3) updating the FAQ detail page for multi-answer rendering with distinct question styling, (4) building navigation infrastructure (navbar extraction, breadcrumbs, back-to-list, homepage CTA), (5) adding legal/trust framing pages (/terms), and (6) verifying SEO (og:tags, sitemap.xml).

The most architecturally significant decision is the multi-answer schema. Nuxt Content v3 stores frontmatter in SQLite, and `z.array(z.object({...}))` is supported in schema definitions. The answers array lives in YAML frontmatter, while the markdown body renders as the primary answer content. This creates a hybrid approach: the markdown body is the "primary" answer rendered via `<ContentRenderer>`, and the frontmatter `answers` array holds additional answer metadata (source attribution per answer). A cleaner alternative -- putting all answers in frontmatter -- avoids the body/frontmatter split but loses markdown rendering flexibility.

The listing page (`pages/faqs/index.vue`) is straightforward: `queryCollection('faqs').order('lastUpdated', 'DESC').all()` returns all FAQs sorted by recency, rendered as a flat list with `<NuxtLink>` to each detail page. This also solves the SSG route discovery problem identified in Phase 2 research -- the listing page's links let Nitro's prerender crawler discover all FAQ routes.

**Primary recommendation:** Evolve the FAQ schema to include an `answers` array of objects in frontmatter (each with sourceUrl, sourceAuthor, sourceDate), keep the existing source fields for backward-compatible single-answer FAQs, build the listing page with `queryCollection().order().all()`, extract the navbar to its own component, and use Bulma's built-in breadcrumb component.

## Standard Stack

### Core (Already Installed -- No New Dependencies)

| Library | Version | Purpose | Status |
|---------|---------|---------|--------|
| `@nuxt/content` | 3.11.2 | FAQ collection queries, content rendering | Installed |
| `@nuxtjs/seo` | 3.4.0 | SEO meta, sitemap, og:tags via `asSeoCollection()` | Installed |
| `bulma` | 1.0.4 | Breadcrumbs, navbar, dividers, content typography, layout | Installed |
| `zod` | 3 | Schema validation (array of objects for multi-answer) | Installed |
| `nuxt-lucide-icons` | 2.x | Icons for navigation, source links, back button | Installed |
| `@nuxtjs/color-mode` | 4.x | Dark mode (already works, no FAQ-specific changes) | Installed |

### Supporting (No New Dependencies)

| Tool | Purpose | Notes |
|------|---------|-------|
| `Intl.DateTimeFormat` | Date formatting for listing and detail pages | Native browser API, already used in Phase 2 |
| `useSeoMeta()` | Set og:title, og:description per FAQ page | Built into Nuxt, works with @nuxtjs/seo |
| `useHead()` | Page title and meta tags | Built into Nuxt, already used in Phase 2 |
| Bulma `.breadcrumb` | Breadcrumb navigation on FAQ detail pages | Built into Bulma 1.0.4, zero config |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Bulma breadcrumb | Custom breadcrumb component | Not justified -- Bulma's built-in handles all needs |
| `position: sticky` for mobile back button | `position: fixed` | Sticky is better -- stays in document flow, no content overlap |
| Frontmatter answers array | Separate markdown files per answer | User decided single-file multi-answer (locked decision) |
| Body markdown + frontmatter metadata hybrid | All-frontmatter answers (no body) | Body markdown gives rich rendering via ContentRenderer; frontmatter for source metadata only |

**Installation:** No new packages needed. All dependencies already in `package.json`.

## Architecture Patterns

### Recommended File Structure Changes

```
app/
├── components/
│   ├── ThemeToggle.vue          # (existing) -- no changes
│   ├── AppNavbar.vue            # NEW: extracted navbar component
│   ├── FaqBreadcrumb.vue        # NEW: breadcrumb for FAQ pages
│   └── BackToFaqs.vue           # NEW: sticky back button for mobile
├── layouts/
│   └── default.vue              # MODIFY: use AppNavbar component
├── pages/
│   ├── index.vue                # MODIFY: add FAQ CTA link
│   ├── terms.vue                # NEW: legal disclaimer page
│   └── faqs/
│       ├── index.vue            # NEW: FAQ listing page
│       └── [...slug].vue        # MODIFY: multi-answer, breadcrumbs, SEO
├── error.vue                    # MODIFY: FAQ-specific 404 handling
content/
└── faqs/
    └── (existing files)         # MODIFY: update frontmatter for multi-answer schema
content.config.ts                # MODIFY: add answers array to schema
```

### Pattern 1: FAQ Listing Page with queryCollection

**What:** Index page that lists all FAQs sorted by most recent, with NuxtLink to each.
**When to use:** The `/faqs` route (listing page).

```vue
<template lang="pug">
//- FAQ listing page
section.section
  .container
    //- Page heading and intro/disclaimer
    h1.title Frequently Asked Questions
    p.subtitle.has-text-grey
      | Community-sourced answers for Acura Integra Type S owners.
      | Information is aggregated from forums and owners — not verified or endorsed.
      |
      NuxtLink(to="/terms") Full disclaimer

    //- FAQ list -- flat, sorted by most recent, with dividers
    template(v-if="faqs && faqs.length")
      .faq-list
        NuxtLink.faq-list-item(
          v-for="faq in faqs"
          :key="faq.path"
          :to="faq.path"
        )
          span.faq-question {{ faq.question }}

    //- Empty state
    template(v-else)
      p.has-text-grey No FAQs yet. Check back soon.
</template>

<script setup lang="ts">
// Fetch all FAQs sorted by most recently updated
const { data: faqs } = await useAsyncData('faq-list', () => {
  return queryCollection('faqs')
    .select('path', 'question', 'lastUpdated')
    .order('lastUpdated', 'DESC')
    .all()
})

// Page SEO
useHead({ title: 'Frequently Asked Questions' })
useSeoMeta({
  ogTitle: 'Frequently Asked Questions | DE5.org',
  ogDescription: 'Community-sourced answers to common Acura Integra Type S questions.',
})
</script>
```

**Source:** [queryCollection docs](https://content.nuxt.com/docs/utils/query-collection)

**Key details:**
- `index.vue` in `pages/faqs/` takes priority over `[...slug].vue` for the `/faqs` route (Nuxt route specificity rules)
- `.select('path', 'question', 'lastUpdated')` reduces payload -- only fetches fields needed for the list
- `.order('lastUpdated', 'DESC')` sorts newest first (string date ordering works for ISO format)
- The `<NuxtLink>` elements solve SSG route discovery -- Nitro's crawler follows these links during `nuxi generate`

### Pattern 2: Multi-Answer Schema with Frontmatter Array

**What:** Schema evolution to support per-answer source attribution via `z.array(z.object({...}))`.
**When to use:** All FAQ content files with multiple answers.

```typescript
// content.config.ts -- evolved schema
schema: z.object({
  // FAQ display field
  question: z.string(),
  // Category for future filtering (Phase 5)
  category: z.string(),
  // Legacy single-answer source fields (kept for backward compatibility)
  sourceUrl: z.string(),
  sourceAuthor: z.string(),
  sourceDate: z.string(),
  // Freshness tracking
  lastUpdated: z.string(),
  // Multi-answer support: array of answer source attributions
  answers: z.array(z.object({
    sourceUrl: z.string(),
    sourceAuthor: z.string(),
    sourceDate: z.string(),
  })).optional(),
}),
```

**Critical finding:** Nuxt Content v3 supports `z.array(z.object({...}))` in schemas. Arrays are stored as JSON strings in SQLite. You cannot query into nested array fields with `.where()` (no dot notation support for nested fields -- [GitHub Discussion #3008](https://github.com/nuxt/content/discussions/3008)), but that is fine because we only need to read the answers array on the detail page, not filter by it.

**Corresponding frontmatter for a multi-answer FAQ:**

```yaml
---
question: 'What oil type does the Integra Type S require?'
category: 'engine'
sourceUrl: 'https://www.integraforums.com/forum/threads/oil-type.12345/'
sourceAuthor: 'ForumUser123'
sourceDate: '2025-08-15T00:00:00'
lastUpdated: '2026-02-09T00:00:00'
title: 'Oil Type Recommendation'
description: 'Recommended oil type and weight for the Acura Integra Type S K20C1 engine'
answers:
  - sourceUrl: 'https://www.integraforums.com/forum/threads/oil-type.12345/'
    sourceAuthor: 'ForumUser123'
    sourceDate: '2025-08-15T00:00:00'
  - sourceUrl: 'https://www.integraforums.com/forum/threads/oil-type.67890/'
    sourceAuthor: 'TypeSMechanic'
    sourceDate: '2025-09-20T00:00:00'
---

Primary answer content here (rendered via ContentRenderer)...
```

**Design decision on body vs. frontmatter for answer content:**

The markdown body (`ContentRenderer`) renders the consolidated answer text. The `answers` array in frontmatter holds per-answer source attribution metadata only. This is the pragmatic approach because:
1. ContentRenderer only works with the document body -- you cannot render arbitrary markdown from frontmatter fields
2. Multiple separate markdown "bodies" per file are not supported by Nuxt Content v3
3. The user decision says answers are "stacked vertically with clear dividers" and "labeled by source" -- this suggests the answer text is unified while source attribution varies
4. For FAQ content where answers from multiple sources are synthesized into one authoritative answer, the body holds the synthesized text and the answers array credits all contributing sources

**If truly separate answer bodies are needed later:** Each answer's text content could be stored as a string field in the frontmatter objects and rendered via MDC (Markdown Components) syntax or `v-html` with a markdown parser. But this adds complexity beyond Phase 3's scope.

### Pattern 3: Bulma Breadcrumb

**What:** Navigation breadcrumbs using Bulma's built-in component.
**When to use:** Individual FAQ detail pages.

```pug
//- Breadcrumb navigation: Home > FAQs > [Question]
nav.breadcrumb.mb-4(aria-label="breadcrumbs")
  ul
    li
      NuxtLink(to="/") Home
    li
      NuxtLink(to="/faqs") FAQs
    li.is-active
      a(aria-current="page") {{ faq.question }}
```

**Source:** [Bulma Breadcrumb docs](https://bulma.io/documentation/components/breadcrumb/)

Key details:
- Uses `nav.breadcrumb` container with `ul/li/a` structure
- `is-active` on the last `li` marks current page and disables its link
- Dividers (`/`) are auto-generated via CSS `::before` pseudo-element
- Separator options: default `/`, `has-arrow-separator`, `has-bullet-separator`, `has-dot-separator`
- NuxtLink for Home and FAQs provides client-side navigation

### Pattern 4: Navbar Extraction with Always-Visible Theme Toggle

**What:** Extract navbar to component, move theme toggle to navbar-brand so it is visible at all viewport sizes.
**When to use:** Default layout.

```pug
//- AppNavbar.vue -- extracted navbar component
nav.navbar.is-fixed-top(role="navigation" aria-label="main navigation")
  .container
    .navbar-brand
      //- Site name link
      NuxtLink.navbar-item.has-text-weight-bold(to="/") DE5.org
      //- Theme toggle -- in navbar-brand = always visible (not inside hamburger)
      .navbar-item
        ThemeToggle
      //- Mobile hamburger toggle
      a.navbar-burger(
        role="button"
        aria-label="menu"
        :aria-expanded="menuOpen"
        :class="{ 'is-active': menuOpen }"
        @click="menuOpen = !menuOpen"
      )
        span(aria-hidden="true")
        span(aria-hidden="true")
        span(aria-hidden="true")
        span(aria-hidden="true")
    //- Collapsible navbar menu (desktop: visible, mobile: toggle)
    .navbar-menu(:class="{ 'is-active': menuOpen }")
      .navbar-end
        NuxtLink.navbar-item(to="/faqs") FAQs
```

**Source:** [Bulma Navbar docs](https://bulma.io/documentation/components/navbar/)

**Key insight:** `navbar-brand` is always visible on both mobile (<1024px) and desktop (>=1024px). By placing the ThemeToggle inside `navbar-brand`, it stays visible regardless of hamburger state. The "FAQs" link goes in `navbar-menu` / `navbar-end` so it collapses into the hamburger on mobile (this is appropriate since the FAQs listing is a secondary navigation item, not a primary control like the theme toggle).

### Pattern 5: Sticky Mobile Back Button

**What:** A "Back to FAQs" button that sticks to the bottom of the viewport on mobile.
**When to use:** Individual FAQ detail pages on mobile viewports.

```pug
//- Sticky back button -- mobile only
.back-to-faqs-mobile
  NuxtLink.button.is-primary.is-fullwidth(to="/faqs")
    LucideArrowLeft(:size="16")
    |  Back to FAQs
```

```scss
// Sticky back button -- only visible on mobile (< 1024px)
.back-to-faqs-mobile {
  display: none; // Hidden on desktop

  @media (max-width: 1023px) {
    display: block;
    position: sticky;
    bottom: 0;
    padding: vars.$spacing-sm vars.$spacing-md;
    background: var(--bulma-scheme-main);
    border-top: 1px solid var(--bulma-border);
    z-index: 30;
  }
}
```

**Key details:**
- `position: sticky; bottom: 0;` keeps the button at the viewport bottom while scrolling
- Hidden on desktop via `display: none` with a mobile-only media query
- Uses Bulma CSS variables for theme-aware background/border colors
- `z-index: 30` ensures it sits above content but below the navbar (Bulma navbar z-index is 30, so this may need to be lower or the navbar z-index confirmed)
- The `sticky` approach is preferred over `fixed` because it stays in document flow and avoids content overlap at the bottom of the page

**Mobile browser caveat:** `position: sticky; bottom: 0` has a known quirk on mobile browsers where the address bar hiding/showing can cause brief visual jumps. This is minor and acceptable for the use case.

### Pattern 6: SEO Meta Tags for FAQ Pages

**What:** Set og:title and og:description per FAQ page from content data.
**When to use:** Individual FAQ detail pages.

```typescript
// On the FAQ detail page, after fetching content
useHead({ title: faq.value.question })
useSeoMeta({
  ogTitle: faq.value.question,
  ogDescription: faq.value.description || faq.value.question,
})
```

**Source:** [Nuxt useSeoMeta docs](https://nuxt.com/docs/4.x/api/composables/use-seo-meta), [Nuxt SEO Content integration](https://nuxtseo.com/docs/nuxt-seo/guides/nuxt-content)

The `description` field is auto-populated by Nuxt Content from the first `<p>` in the markdown body if not explicitly set in frontmatter. This gives us the "first ~150 chars of answer" behavior for og:description without extra work. The `asSeoCollection()` wrapper already provides SEO field integration. To explicitly use the SEO fields from `asSeoCollection`, call `useSeoMeta(faq.value.seo || {})` and `useHead(faq.value.head || {})`.

### Anti-Patterns to Avoid

- **Creating a `/faqs.vue` parent layout page:** In Nuxt 4, `pages/faqs.vue` becomes a parent layout that wraps `pages/faqs/index.vue` and `pages/faqs/[...slug].vue`. Only create it if you need shared layout between listing and detail. For this phase, keep listing and detail as separate standalone pages.
- **Querying nested `answers` array fields with `.where()`:** Nuxt Content v3 stores arrays as JSON strings in SQLite. Dot-notation filtering (`where('answers.sourceAuthor', '=', 'x')`) is not supported. Only read the answers array on the detail page.
- **Using `<ContentDoc>`, `<ContentList>`, or `<ContentQuery>`:** These v2 components do not exist in v3. Use `queryCollection()` + `<ContentRenderer>` only.
- **Putting long text content in YAML frontmatter arrays:** YAML multi-line strings in arrays are fragile and hard to edit. Keep answer *text* in the markdown body; only *metadata* in the answers array.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Breadcrumb navigation | Custom breadcrumb HTML/CSS | Bulma `.breadcrumb` component | Built-in separator styles, active state, responsive, dark mode aware |
| FAQ list dividers | Custom border CSS | Bulma `hr` or border utilities | Consistent with design system, theme-aware |
| Responsive layout | Custom media queries for container widths | Bulma `.container`, `.columns`, `.section` | Already handles responsive breakpoints |
| OG meta tags | Manual `<meta>` injection | `useSeoMeta()` from Nuxt | Type-safe, XSS-safe, SSR-compatible |
| Sitemap | Custom sitemap generator | @nuxtjs/seo (already installed) | Auto-discovers routes from prerendered pages |
| Sticky element behavior | Custom scroll event listener | CSS `position: sticky` | Native browser support, no JS needed, performant |

**Key insight:** Bulma + Nuxt's built-in composables handle nearly all the UI and SEO needs. The custom work is assembling these pieces and implementing the multi-answer display logic.

## Common Pitfalls

### Pitfall 1: Route Priority Between index.vue and [...slug].vue

**What goes wrong:** The `/faqs` listing page renders the catch-all `[...slug].vue` instead of `index.vue`, or vice versa.
**Why it happens:** Misunderstanding Nuxt's route specificity rules.
**How to avoid:** `pages/faqs/index.vue` always takes priority for the exact `/faqs` route. `pages/faqs/[...slug].vue` handles all deeper paths like `/faqs/engine/oil-type`. This is the correct and documented behavior.
**Warning signs:** Navigating to `/faqs` shows a 404 or the detail page template instead of the listing.
**Source:** [Nuxt Pages docs](https://nuxt.com/docs/4.x/directory-structure/app/pages)

### Pitfall 2: SSG Route Discovery (Now Solved)

**What goes wrong:** FAQ detail pages 404 in production because they were not pre-rendered.
**Why it happens:** Nitro's prerender crawler only follows `<a>` tags from discoverable pages. Without a listing page, FAQ detail pages have no inbound links.
**How to avoid:** The listing page at `/faqs` with `<NuxtLink>` to every FAQ solves this automatically. The crawler follows `/` -> `/faqs` (from navbar link) -> `/faqs/engine/oil-type` (from listing links). No `routeRules` or `prerenderRoutes()` needed.
**Warning signs:** Pages work in `yarn dev` but 404 after `yarn generate`.

### Pitfall 3: z.array(z.object()) Schema Validation

**What goes wrong:** Build failure or content validation errors when adding the `answers` array to the schema.
**Why it happens:** Complex nested Zod schemas in Nuxt Content v3 have had edge-case bugs (GitHub issues #2927, #3008). The JSON Schema Draft-07 conversion may not handle all Zod constructs.
**How to avoid:** Keep the answers schema simple -- flat object properties (strings only, no nested objects within answers). Mark `answers` as `.optional()` so existing single-answer FAQs still validate. Test with `yarn generate` after schema changes.
**Warning signs:** Build errors mentioning `toJSONSchema`, validation failures on content files that worked before.

### Pitfall 4: Navbar-brand Item Overflow on Mobile

**What goes wrong:** Adding the ThemeToggle to `navbar-brand` causes horizontal overflow on small screens (< 375px), pushing the hamburger off-screen.
**Why it happens:** `navbar-brand` is always visible and has limited horizontal space on mobile. Too many items cause overflow.
**How to avoid:** Keep `navbar-brand` items minimal: brand name + theme toggle + hamburger. The ThemeToggle component is 44px wide (touch target), which fits alongside the brand name and burger on 375px+ screens. Test at 375px viewport width (iPhone SE).
**Warning signs:** Hamburger button wrapping below the brand name, horizontal scrollbar appearing.

### Pitfall 5: Sticky Bottom vs. Fixed Bottom on Mobile

**What goes wrong:** The "Back to FAQs" button overlaps footer content or causes scroll issues.
**Why it happens:** `position: fixed; bottom: 0` removes the element from document flow, covering content below it.
**How to avoid:** Use `position: sticky; bottom: 0` which keeps the element in document flow. The element sticks at the viewport bottom while scrolling but naturally unsticks when the user reaches the end of the content area.
**Warning signs:** Footer hidden behind the sticky button, content cut off at the bottom of the page.

### Pitfall 6: YAML Array of Objects Formatting

**What goes wrong:** YAML parsing errors in frontmatter when defining the `answers` array.
**Why it happens:** YAML indentation is significant. Incorrect indentation in frontmatter arrays causes parse failures.
**How to avoid:** Use consistent 2-space indentation. Each array item starts with `- `. All properties of an object are indented under the `- `. Follow the exact pattern in the code examples.
**Warning signs:** Nuxt Content build errors mentioning YAML parsing, content page showing raw frontmatter.

### Pitfall 7: Sitemap Not Including Dynamic Routes

**What goes wrong:** FAQ pages missing from generated sitemap.xml.
**Why it happens:** @nuxtjs/seo's sitemap module discovers routes from prerendered pages. If FAQ pages aren't pre-rendered (see Pitfall 2), they won't appear in the sitemap.
**How to avoid:** The listing page solution (Pitfall 2) also fixes this. Pre-rendered pages are automatically included in the sitemap by the `nuxt:prerender` application source in @nuxtjs/seo's sitemap module.
**Warning signs:** Running `yarn generate` and checking `.output/public/sitemap.xml` -- FAQ URLs missing.

## Code Examples

Verified patterns from official sources:

### FAQ Listing Query (with field selection and ordering)

```typescript
// Fetch all FAQs, select only listing-relevant fields, sort newest first
const { data: faqs } = await useAsyncData('faq-list', () => {
  return queryCollection('faqs')
    .select('path', 'question', 'lastUpdated')
    .order('lastUpdated', 'DESC')
    .all()
})
```

**Source:** [queryCollection API](https://content.nuxt.com/docs/utils/query-collection)

### Multi-Answer FAQ Frontmatter

```yaml
---
question: 'What oil type does the Integra Type S require?'
category: 'engine'
sourceUrl: 'https://www.integraforums.com/forum/threads/oil-type.12345/'
sourceAuthor: 'ForumUser123'
sourceDate: '2025-08-15T00:00:00'
lastUpdated: '2026-02-09T00:00:00'
title: 'Oil Type Recommendation'
description: 'Recommended oil type and weight for the Acura Integra Type S K20C1 engine'
answers:
  - sourceUrl: 'https://www.integraforums.com/forum/threads/oil-type.12345/'
    sourceAuthor: 'ForumUser123'
    sourceDate: '2025-08-15T00:00:00'
  - sourceUrl: 'https://www.integraforums.com/forum/threads/oil-discussion.67890/'
    sourceAuthor: 'TypeSMechanic'
    sourceDate: '2025-09-20T00:00:00'
---

The Acura Integra Type S uses a K20C1 turbocharged engine that requires
**0W-20** full synthetic oil meeting Honda HTO-06 specification.

...
```

### Multi-Answer Detail Page Rendering (Pug)

```pug
//- Render the consolidated answer body
.content
  ContentRenderer(:value="faq")

//- Source attribution for each answer contributor
.answer-sources.mt-5
  template(v-if="faq.answers && faq.answers.length")
    //- Multiple answer sources
    .answer-source(v-for="(answer, idx) in faq.answers" :key="idx")
      hr.my-3(v-if="idx > 0")
      p.is-size-7.has-text-grey
        LucideExternalLink(:size="14" style="vertical-align: middle;")
        |  From
        = ' '
        a(:href="answer.sourceUrl" target="_blank" rel="noopener noreferrer")
          | {{ answer.sourceAuthor }}
        |  &middot; {{ formatDate(answer.sourceDate) }}
  template(v-else)
    //- Fallback: single-answer source (backward compatible with Phase 2 schema)
    .box
      p.is-size-7.mb-0
        LucideExternalLink(:size="14" style="vertical-align: middle;")
        |  Source:
        = ' '
        a(:href="faq.sourceUrl" target="_blank" rel="noopener noreferrer")
          | {{ faq.sourceAuthor }}
        |  &middot; {{ formatDate(faq.sourceDate) }}
```

### Bulma Breadcrumb (Pug)

```pug
nav.breadcrumb(aria-label="breadcrumbs")
  ul
    li
      NuxtLink(to="/") Home
    li
      NuxtLink(to="/faqs") FAQs
    li.is-active
      a(aria-current="page") {{ faq.question }}
```

**Source:** [Bulma Breadcrumb](https://bulma.io/documentation/components/breadcrumb/)

### useSeoMeta for FAQ Detail Page

```typescript
// After fetching FAQ content
useSeoMeta({
  ogTitle: faq.value.question,
  ogDescription: faq.value.description,
})
```

**Source:** [Nuxt useSeoMeta](https://nuxt.com/docs/4.x/api/composables/use-seo-meta)

### Navbar Theme Toggle in navbar-brand (Always Visible)

```pug
.navbar-brand
  NuxtLink.navbar-item.has-text-weight-bold(to="/") DE5.org
  //- Theme toggle in navbar-brand = visible at all viewport sizes
  .navbar-item
    ThemeToggle
  //- Hamburger (mobile only, must be last child of navbar-brand)
  a.navbar-burger(...)
    span(aria-hidden="true")
    span(aria-hidden="true")
    span(aria-hidden="true")
    span(aria-hidden="true")
```

**Source:** [Bulma Navbar](https://bulma.io/documentation/components/navbar/)

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Single source per FAQ | Multi-answer array in frontmatter | Phase 3 (this phase) | Schema evolution, backward compatible via optional field |
| No listing page | `/faqs` index page with queryCollection | Phase 3 (this phase) | Solves SSG route discovery + provides user browsing |
| Inline navbar in layout | Extracted AppNavbar component | Phase 3 (this phase) | Better maintainability as nav grows |
| Theme toggle inside hamburger | Theme toggle in navbar-brand | Phase 3 (this phase) | Visible at all viewport sizes |
| Google FAQ rich results | AI-optimized structured data | August 2023 | Google removed FAQ rich results for non-authoritative sites; Schema.org markup still helps AI citations |

**Deprecated/outdated:**
- Google FAQ rich results: Removed for most sites (August 2023). Schema.org FAQPage markup still helps AI search agents but no longer produces Google rich snippets. Not worth the effort for this project -- skip FAQPage structured data.

## Sitemap Verification

**Confirmed:** @nuxtjs/seo's sitemap module auto-discovers routes from three sources: `nuxt:pages` (static page analysis), `nuxt:prerender` (prerendered URLs), and `nuxt:route-rules`. Since this project uses `nuxi generate` (SSG) and the listing page ensures all FAQ routes are prerendered, the sitemap will automatically include all FAQ URLs without additional configuration.

**Source:** [Nuxt Sitemap docs](https://nuxtseo.com/docs/sitemap/getting-started/introduction)

**Verification step:** After `yarn generate`, check `.output/public/sitemap.xml` for FAQ URLs. The site URL must be set (already configured in `nuxt.config.ts` as `site.url`).

## Open Questions

1. **Body + frontmatter hybrid for multi-answer: is it clear enough for content editors?**
   - What we know: The markdown body holds the synthesized answer text. The `answers` array in frontmatter holds source attribution metadata per contributor. ContentRenderer renders the body. Source attribution is rendered from the frontmatter array.
   - What's unclear: Whether future content editors will find this intuitive. The mental model is "body = what the reader sees, answers = who contributed to this information."
   - Recommendation: Document the pattern clearly in a `content/faqs/README.md` or similar. Keep the hybrid approach for Phase 3 as it is the simplest path that satisfies the user's locked decisions. Revisit if content editors find it confusing.

2. **Should existing FAQ files migrate to the answers array immediately?**
   - What we know: The `answers` field is optional in the schema. Existing FAQ files with single-answer source fields will still validate.
   - What's unclear: Whether to update existing files to use the new `answers` array format during this phase or leave them using the legacy single-answer fields.
   - Recommendation: Update existing sample FAQs to use the `answers` array format to demonstrate the pattern. The detail page should handle both cases (answers array present vs. fallback to legacy source fields) for backward compatibility.

3. **Terms page: should it be a Nuxt Content markdown file or a Vue page?**
   - What we know: The `content` collection (source: `*.md`) already exists in `content.config.ts` for general content pages. A terms page could be `content/terms.md` or `pages/terms.vue`.
   - What's unclear: Whether the terms page needs dynamic content or is purely static.
   - Recommendation: Use `pages/terms.vue` as a plain Vue page. The terms content is static legal text that rarely changes. Using a Vue page avoids needing a `[...slug].vue` catch-all for the content collection. Keep it simple.

4. **Hamburger menu z-index interaction with sticky back button**
   - What we know: Bulma navbar uses z-index 30 (`.navbar.is-fixed-top`). The sticky back button needs to be below the navbar but above page content.
   - What's unclear: Exact z-index stacking with Bulma's defaults.
   - Recommendation: Set the sticky button to `z-index: 29` (below navbar's 30) and test that it does not overlap the navbar when scrolling to the top. Confirm Bulma's actual z-index values during implementation.

## Sources

### Primary (HIGH confidence)
- [Nuxt Content - queryCollection](https://content.nuxt.com/docs/utils/query-collection) - Full query API (order, select, where, all, first, count, path)
- [Nuxt Content - Define Collections](https://content.nuxt.com/docs/collections/define) - Schema definition with z.array(z.object())
- [Nuxt Content - Schema Validators](https://content.nuxt.com/docs/collections/validators) - Zod v3 support, nested arrays, JSON Schema Draft-07
- [Nuxt Content - ContentRenderer](https://content.nuxt.com/docs/components/content-renderer) - Props: value, tag, excerpt, components, prose, unwrap
- [Nuxt Content - Markdown](https://content.nuxt.com/docs/files/markdown) - Frontmatter, body AST, MDC syntax
- [Nuxt 4 - Pages](https://nuxt.com/docs/4.x/directory-structure/app/pages) - Route priority: index.vue over [...slug].vue
- [Nuxt - useSeoMeta](https://nuxt.com/docs/4.x/api/composables/use-seo-meta) - og:title, og:description from content data
- [Bulma - Breadcrumb](https://bulma.io/documentation/components/breadcrumb/) - nav.breadcrumb with ul/li, is-active, separator options
- [Bulma - Navbar](https://bulma.io/documentation/components/navbar/) - navbar-brand always visible, navbar-menu hidden on mobile
- [Nuxt SEO - Content Integration](https://nuxtseo.com/docs/nuxt-seo/guides/nuxt-content) - asSeoCollection, module order, useSeoMeta(page.seo)
- [Nuxt Sitemap - Introduction](https://nuxtseo.com/docs/sitemap/getting-started/introduction) - Auto-discovery from nuxt:prerender, nuxt:pages sources

### Secondary (MEDIUM confidence)
- [GitHub Discussion #3008](https://github.com/nuxt/content/discussions/3008) - Nested field querying not supported in v3 queryCollection
- [Array Field Filtering in Nuxt Content v3](https://zhul.in/en/2025/10/20/nuxt-content-v3-z-array-query-challenge/) - z.array stored as JSON strings, LIKE workaround for filtering
- [GitHub Issue #2927](https://github.com/nuxt/content/issues/2927) - Zod schema bugs (boolean 0/1, partially resolved)
- [MDN - CSS position: sticky](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position) - Sticky bottom behavior, mobile browser quirks

### Tertiary (LOW confidence)
- Mobile browser sticky bottom quirk: Address bar hiding/showing can cause visual jumps with `position: sticky; bottom: 0`. Based on community reports, not verified against official browser documentation. Impact is minor/cosmetic.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries already installed, versions confirmed, no new dependencies needed
- Architecture: HIGH - File structure patterns from Nuxt 4 docs, query API from Nuxt Content v3 docs, Bulma components from official docs
- Multi-answer schema: HIGH for storage/rendering, MEDIUM for the body+frontmatter hybrid pattern (works technically but is a design choice that may need iteration based on content editor experience)
- Pitfalls: HIGH - Route priority confirmed in Nuxt docs, SSG discovery from Phase 2 research, nested query limitations from GitHub discussions with multiple confirming sources

**Research date:** 2026-02-09
**Valid until:** 2026-03-09 (stable domain, all libraries are mature releases)
