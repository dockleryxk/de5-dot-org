# Phase 2: Content System - Research

**Researched:** 2026-02-09
**Domain:** Nuxt Content v3 collections, schemas, markdown curation, content rendering
**Confidence:** HIGH

## Summary

Phase 2 establishes the content system that underpins all FAQ functionality. The project already has a `content.config.ts` with a `faqs` collection defined, an empty `content/faqs/` directory, and `@nuxt/content` 3.11.2 installed. The work is primarily about hardening the existing schema (adding required source metadata and date fields), creating sample content files, building a catch-all page route to render FAQ markdown, and adding components for source attribution and freshness display.

Nuxt Content v3 uses an SQL-backed collection system where content is defined in `content.config.ts`, queried via `queryCollection()` (not the deprecated v2 `queryContent()`), and rendered with `<ContentRenderer>`. Page-type collections auto-generate routes from file paths. The existing `faqs` collection uses `asSeoCollection()` for SEO integration, which is correct.

A critical finding for SSG: Nitro's prerender crawler discovers routes by following `<a>` tags from the root page outward. FAQ pages that aren't linked from any discoverable page will **not** be pre-rendered during `nuxi generate`. This phase must ensure at minimum a listing page or `prerenderRoutes()` call exists so the crawler can discover all FAQ content pages. Without this, individual FAQ pages will 404 in production despite working in dev mode. However, since Phase 3 (FAQ Display) creates the `/faqs` listing page, this phase can get away with verifying in dev mode only -- the listing page in Phase 3 will make all FAQ routes discoverable for SSG.

**Primary recommendation:** Enhance the existing `content.config.ts` schema to make source metadata required, add `lastUpdated` date field, create a `pages/faqs/[...slug].vue` catch-all route with `ContentRenderer`, and build source attribution and freshness indicator display inline in that page component.

## Standard Stack

### Core (Already Installed)

| Library | Version | Purpose | Status |
|---------|---------|---------|--------|
| `@nuxt/content` | 3.11.2 | Content collections, markdown parsing, SQL-backed queries | Installed |
| `@nuxtjs/seo` | 3.4.0 | SEO metadata via `asSeoCollection()` | Installed |
| `zod` | 3.25.76 | Schema validation for content frontmatter | Transitive dep (via @nuxt/content) |
| `bulma` | 1.0.4 | CSS framework (`.content` class for typography) | Installed |

### Supporting (No New Dependencies Needed)

| Tool | Purpose | Notes |
|------|---------|-------|
| `Intl.DateTimeFormat` | Date formatting for "last updated" display | Native browser API, no library needed |
| Bulma `.content` class | Typography styling for rendered markdown | Already available from Phase 1.1 |
| Lucide icons | Source link icon, calendar icon for dates | Already installed (`nuxt-lucide-icons`) |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `Intl.DateTimeFormat` | `date-fns` or VueUse `useDateFormat` | Extra dependency for simple date display; not justified |
| Manual frontmatter `lastUpdated` | `nuxt-content-git` for git-based dates | Git-based dates break on fresh clones; manual is more reliable for SSG |
| `z.string()` for date fields | `z.date()` for date fields | Official docs show both patterns. `z.string()` is safer -- avoids YAML date auto-parsing inconsistencies. SQLite stores dates as strings regardless. Use `new Date()` at display time. |

**Installation:** No new packages needed, but `zod` should be added as an explicit dependency (see Open Questions).

## Architecture Patterns

### Recommended Content Directory Structure

```
content/
  faqs/
    engine/
      oil-type-recommendation.md
      break-in-period.md
    suspension/
      alignment-specs.md
    general/
      warranty-coverage.md
      paint-codes.md
```

Subdirectories under `faqs/` serve as category groupings. The `source: 'faqs/**/*.md'` glob in `content.config.ts` captures all nested markdown files. Nuxt Content v3 auto-extracts the static prefix from the source pattern -- so `content/faqs/engine/oil-type-recommendation.md` routes to `/faqs/engine/oil-type-recommendation`.

### Pattern 1: Content Schema with Source Metadata

**What:** Define frontmatter schema with required source fields and date tracking.
**When to use:** For all FAQ content files.

```typescript
// content.config.ts
import { defineCollection, defineContentConfig } from '@nuxt/content'
import { asSeoCollection } from '@nuxtjs/seo/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    faqs: defineCollection(
      asSeoCollection({
        type: 'page',
        source: 'faqs/**/*.md',
        schema: z.object({
          // FAQ-specific fields
          question: z.string(),
          category: z.string(),
          // Source attribution (required for transparency)
          sourceUrl: z.string(),
          sourceAuthor: z.string(),
          sourceDate: z.string(),
          // Freshness tracking (manual -- git dates unreliable in SSG)
          lastUpdated: z.string(),
        }),
      }),
    ),
    content: defineCollection(
      asSeoCollection({
        type: 'page',
        source: '*.md',
      }),
    ),
  },
})
```

**Source:** [Nuxt Content - Define Collections](https://content.nuxt.com/docs/collections/define), [Schema Validators](https://content.nuxt.com/docs/collections/validators)

**Key decision: `z.string()` for dates, not `z.date()`.**
The official collection definition docs show `z.date()` as an option, and the markdown frontmatter docs show `z.string()` for date fields. Both work. However, `z.string()` is safer because: (1) YAML parsers can auto-convert date-like strings to Date objects inconsistently, (2) SQLite stores everything as strings internally anyway, (3) the official frontmatter docs example uses `z.string()` with `order('date', 'DESC')` proving string dates sort correctly. Parse to `Date` at display time with `new Date(dateString)`.

**Key decision: `z` imported from `zod`, not `@nuxt/content`.**
The official Schema Validators docs state: "The `z` re-export from `@nuxt/content` is deprecated and will be removed in a future release." The `zod` package (v3.25.76) is already available as a transitive dependency. Source: [Schema Validators docs](https://content.nuxt.com/docs/collections/validators).

### Pattern 2: Catch-All FAQ Page Route

**What:** A `[...slug].vue` page that fetches and renders any FAQ by route path.
**When to use:** Standard pattern for page-type content collections.

```vue
<!-- app/pages/faqs/[...slug].vue -->
<script setup lang="ts">
// Fetch FAQ content matching the current route path
const route = useRoute()
const { data: faq } = await useAsyncData(route.path, () => {
  return queryCollection('faqs').path(route.path).first()
})

// 404 if FAQ not found
if (!faq.value) {
  throw createError({ statusCode: 404, statusMessage: 'FAQ not found' })
}

// SEO metadata from frontmatter
useHead({ title: faq.value.question })
</script>
```

**Source:** [Nuxt Content - queryCollection](https://content.nuxt.com/docs/utils/query-collection), [Nuxt Content - Migration Guide catch-all pattern](https://content.nuxt.com/docs/getting-started/migration)

Key API details from official docs:
- `queryCollection('faqs')` -- collection name is required first argument
- `.path(route.path)` -- matches by URL path (page collections only)
- `.first()` -- returns first match or `null`
- `.all()` -- returns all matches as array
- `.order('field', 'DESC')` -- SQL-style ordering
- `.select('field1', 'field2')` -- select specific fields
- `.where('field', '=', 'value')` -- SQL operators: `=`, `>`, `<`, `<>`, `IN`, `BETWEEN`, `LIKE`, `IS NULL`

### Pattern 3: ContentRenderer for Markdown Display

**What:** Render parsed markdown content from `queryCollection` results.
**When to use:** Whenever displaying markdown body content.

The `<ContentRenderer>` component takes the full page object from `queryCollection().first()` and renders the AST-parsed markdown body. It exclusively works with Markdown files.

```pug
//- Pug equivalent
.content(v-if="faq")
  ContentRenderer(:value="faq")
```

Wrap in Bulma's `.content` class for automatic typography styling (headings, lists, links, code blocks).

**Props available:** `value` (required, the document), `tag` (wrapper element, default `div`), `excerpt` (boolean), `components` (custom component mapping), `prose` (enable prose components), `class`, `unwrap`.

**Source:** [ContentRenderer docs](https://content.nuxt.com/docs/components/content-renderer)

### Pattern 4: Source Attribution Display

**What:** Inline display of source URL, author, and original post date.
**When to use:** On every FAQ page, below the rendered content.

```pug
//- Source attribution with external link
.box.mt-5
  p.is-size-7.mb-0
    LucideExternalLink(:size="14" style="vertical-align: middle;")
    |  Source:
    = ' '
    a(:href="faq.sourceUrl" target="_blank" rel="noopener noreferrer")
      | {{ faq.sourceAuthor }}
    |  &middot; {{ formatDate(faq.sourceDate) }}
```

### Pattern 5: Freshness Indicator

**What:** Display "Last updated" date from frontmatter.
**When to use:** On every FAQ page, visible to users.

Use `Intl.DateTimeFormat` for locale-aware formatting:

```typescript
// Format ISO date string to human-readable
const formatDate = (dateStr: string): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateStr))
}
```

### Built-In Page-Type Fields

Every page-type collection automatically includes these fields (no need to define in schema):

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique content identifier |
| `path` | string | Generated route path from file structure |
| `title` | string | From frontmatter or first `<h1>` |
| `description` | string | From frontmatter or first `<p>` |
| `body` | object | Parsed AST with type, children, toc |
| `stem` | string | File path without extension |
| `seo` | object | SEO metadata (optional, from asSeoCollection) |
| `navigation` | boolean/object | Navigation inclusion control |

Source: [Collection Types docs](https://content.nuxt.com/docs/collections/types)

### Anti-Patterns to Avoid

- **`queryContent()` instead of `queryCollection()`:** v2 API. Does not exist in v3. Will throw runtime error.
- **Importing `z` from `@nuxt/content`:** Deprecated. Import from `zod` directly.
- **Using `z.date()` for frontmatter dates:** Risk of YAML auto-parsing inconsistencies. Use `z.string()` with ISO date format.
- **Relying on file system dates (`createdAt`/`updatedAt`):** Not available in Content v3. File metadata changes on clone/deploy. Use explicit frontmatter fields instead.
- **Creating `pages/faqs.vue` as a single page:** Won't handle nested FAQ routes. Need `pages/faqs/[...slug].vue` for dynamic routing.
- **Using `._path` (underscore prefix):** v2 syntax. In v3, all underscore-prefixed fields were renamed (e.g., `.path` not `._path`).

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Markdown rendering | Custom markdown parser | `<ContentRenderer>` | AST parsing, Vue component injection, prose styling |
| Content querying | File-system reads | `queryCollection()` | SQL-backed, typed, filterable, sortable |
| Route generation | Manual route config | Page-type collection + `[...slug].vue` | Auto path mapping from content directory structure |
| Date formatting | Custom date formatter | `Intl.DateTimeFormat` | Native, locale-aware, zero dependencies |
| SEO metadata | Manual meta tags | `asSeoCollection()` + `useHead()` | Handles og:tags, structured data, sitemap integration |
| Typography styling | Custom prose CSS | Bulma `.content` class | Already styled for headings, lists, links, code, tables |

**Key insight:** Nuxt Content v3 handles the entire pipeline from markdown files to rendered, routed, SEO-optimized pages. The implementation work is configuration and integration, not building from scratch.

## Common Pitfalls

### Pitfall 1: queryContent vs queryCollection

**What goes wrong:** Using `queryContent()` (v2 API) which doesn't exist in v3, causing runtime error.
**Why it happens:** Training data, blog posts, and StackOverflow answers still reference v2 patterns.
**How to avoid:** Always use `queryCollection('faqs')` with collection name as first argument.
**Warning signs:** `queryContent is not a function` error at runtime.

### Pitfall 2: Module Order in nuxt.config.ts

**What goes wrong:** SEO frontmatter fields silently ignored, metadata not generated.
**Why it happens:** `@nuxt/content` loaded before `@nuxtjs/seo`.
**How to avoid:** `@nuxtjs/seo` MUST come before `@nuxt/content` in the modules array. Already correct in current config.
**Warning signs:** Missing og:tags, empty sitemap entries, no structured data.

### Pitfall 3: Date Fields with z.date()

**What goes wrong:** Schema validation failures or inconsistent date values depending on YAML parser behavior.
**Why it happens:** YAML can auto-parse date-like strings into Date objects, but behavior varies. Zod's `z.date()` expects a real Date object, not a string.
**How to avoid:** Use `z.string()` for all date fields. Store as ISO format (`2026-02-09`). Parse to Date at display time.
**Warning signs:** Content build errors mentioning date validation, or dates displaying as `[object Object]`.

### Pitfall 4: Static Site Generation Route Discovery

**What goes wrong:** FAQ pages not generated during `nuxi generate` because the crawler never discovers them.
**Why it happens:** Nitro's prerender crawler follows `<a>` tags from the root page outward. If no page links to `/faqs/engine/oil-type`, it won't be pre-rendered. The Nuxt docs confirm: "pages that are not linked to a discoverable page can't be pre-rendered automatically."
**How to avoid:** One of: (a) Create a listing page with `<NuxtLink>` to all FAQ routes (Phase 3 does this), (b) Add `routeRules: { '/faqs/**': { prerender: true } }`, or (c) Use `prerenderRoutes()` in a page component. For Phase 2, verify in dev mode only. Phase 3's listing page will solve SSG discovery.
**Warning signs:** 404s on FAQ pages in production, but working in dev mode.

### Pitfall 5: Boolean Fields Stored as 0/1

**What goes wrong:** `z.boolean()` fields queried with `where('published', '=', true)` return no results.
**Why it happens:** Known Nuxt Content v3 bug (GitHub issue #2927, now closed/fixed via PR #3018) -- SQLite stores booleans as 0/1 integers.
**How to avoid:** If using boolean fields, compare against 1/0 in where clauses: `.where('published', '=', 1)`. Note: This may be fixed in current v3.11.2 but worth testing if boolean fields are added.
**Warning signs:** Queries returning empty results despite matching content existing.

### Pitfall 6: Deprecated z Import from @nuxt/content

**What goes wrong:** Works now but will break in a future @nuxt/content release.
**Why it happens:** The current content.config.ts imports `z` from `@nuxt/content`, which is officially deprecated per the Schema Validators docs.
**How to avoid:** Import `z` from `zod` directly. The package is already available (3.25.76) as a transitive dependency.
**Warning signs:** Deprecation warning in build output (may not appear yet but will eventually become an error).

### Pitfall 7: Dot Files No Longer Ignored

**What goes wrong:** Hidden files (like `.gitkeep`, `.DS_Store`) get imported as content items.
**Why it happens:** v3 no longer ignores dot files by default (breaking change from v2).
**How to avoid:** Exclude them explicitly in source config: `exclude: ['**/.*']`, or use the glob pattern `'faqs/**/*.md'` which already excludes dotfiles by not matching them.
**Warning signs:** Unexpected content items with paths like `/.gitkeep`.

## Code Examples

Verified patterns from official sources:

### Example FAQ Markdown File

```markdown
---
question: "What oil type does the Integra Type S require?"
category: "engine"
sourceUrl: "https://www.integraforums.com/forum/threads/oil-type.12345/"
sourceAuthor: "ForumUser123"
sourceDate: "2025-08-15"
lastUpdated: "2026-02-09"
title: "Oil Type Recommendation"
description: "Recommended oil type and weight for the Acura Integra Type S K20C1 engine"
---

The Acura Integra Type S uses a K20C1 turbocharged engine that requires
**0W-20** full synthetic oil meeting Honda HTO-06 specification.

## Capacity

- With filter change: 5.7 quarts (5.4 liters)
- Without filter change: 5.3 quarts (5.0 liters)

## Recommended Brands

- Honda Genuine 0W-20 (OEM)
- Mobil 1 0W-20
- Pennzoil Ultra Platinum 0W-20
```

**Source:** [Nuxt Content Markdown docs](https://content.nuxt.com/docs/files/markdown)

### Complete Catch-All Page Component (Pug)

```vue
<template lang="pug">
//- FAQ detail page with content rendering and source attribution
section.section(v-if="faq")
  .container
    //- FAQ question as page heading
    h1.title {{ faq.question }}

    //- Freshness indicator -- last updated date
    p.is-size-7.has-text-grey.mb-5
      LucideCalendar(:size="14" style="vertical-align: middle;")
      |  Last updated: {{ formatDate(faq.lastUpdated) }}

    //- Rendered markdown content (Bulma .content class for typography)
    .content
      ContentRenderer(:value="faq")

    //- Source attribution box with external link
    .box.mt-5
      p.is-size-7.mb-0
        LucideExternalLink(:size="14" style="vertical-align: middle;")
        |  Source:
        = ' '
        a(:href="faq.sourceUrl" target="_blank" rel="noopener noreferrer")
          | {{ faq.sourceAuthor }}
        |  &middot; {{ formatDate(faq.sourceDate) }}
</template>

<script setup lang="ts">
// Fetch FAQ by route path
const route = useRoute()
const { data: faq } = await useAsyncData(route.path, () => {
  return queryCollection('faqs').path(route.path).first()
})

// 404 handling
if (!faq.value) {
  throw createError({ statusCode: 404, statusMessage: 'FAQ not found' })
}

// Page SEO from frontmatter
useHead({ title: faq.value.question })

// Format ISO date string to human-readable
const formatDate = (dateStr: string): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateStr))
}
</script>
```

**Source:** [queryCollection docs](https://content.nuxt.com/docs/utils/query-collection), [ContentRenderer docs](https://content.nuxt.com/docs/components/content-renderer), [Migration Guide catch-all pattern](https://content.nuxt.com/docs/getting-started/migration)

### Querying Multiple FAQs (for listing page or SSG crawl)

```typescript
// Fetch all FAQs sorted by lastUpdated (most recent first)
const { data: faqs } = await useAsyncData('faq-list', () => {
  return queryCollection('faqs')
    .select('path', 'question', 'category', 'lastUpdated')
    .order('lastUpdated', 'DESC')
    .all()
})
```

**Source:** [queryCollection docs](https://content.nuxt.com/docs/utils/query-collection)

## State of the Art

| Old Approach (Content v2) | Current Approach (Content v3) | When Changed | Impact |
|---------------------------|-------------------------------|--------------|--------|
| `queryContent()` | `queryCollection('name')` | Content v3.0 (2024) | Must specify collection name |
| File-based storage | SQL-backed (SQLite) | Content v3.0 (2024) | Better query performance, requires `better-sqlite3` |
| `<ContentDoc>`, `<ContentList>`, `<ContentQuery>` | `<ContentRenderer>` only | Content v3.0 (2024) | All other render components removed |
| `z` from `@nuxt/content` | `z` from `zod` directly | Content v3.x (2025) | Deprecated re-export; import from `zod` |
| `document._path` | `document.path` | Content v3.0 (2024) | No underscore prefix on fields |
| Auto `createdAt`/`updatedAt` | Manual frontmatter dates | Content v3.0 (2024) | File metadata not tracked; use explicit fields |
| `_dir.yml` | `.navigation.yml` | Content v3.0 (2024) | Config file renamed |
| Dot files auto-ignored | Dot files included by default | Content v3.0 (2024) | Must exclude explicitly or use specific globs |
| `<ContentSlot>`, `<MDCSlot>` | Native Vue `<slot mdc-unwrap="p">` | Content v3.0 (2024) | Content-specific slot components removed |

**Deprecated/outdated:**
- `queryContent()`: v2 API, does not exist in v3
- `<ContentDoc>`, `<ContentList>`, `<ContentQuery>`, `<ContentNavigation>`: Removed in v3
- `useContent()` composable: Removed in v3
- `searchContent()`: Removed in v3
- Document-driven mode (auto markdown-to-pages): Removed in v3
- `z` from `@nuxt/content`: Deprecated re-export, will be removed
- `_dir.yml`: Renamed to `.navigation.yml` in v3

## Open Questions

1. **Should `zod` be added as an explicit dependency?**
   - What we know: zod 3.25.76 is available as a transitive dependency of @nuxt/content
   - What's unclear: Whether relying on transitive deps is safe across updates
   - Recommendation: Add `zod` as explicit dependency in package.json for stability (same pattern as `better-sqlite3` and `eslint` in this project). Run `yarn add zod`.

2. **Category structure: flat vs hierarchical?**
   - What we know: The `source: 'faqs/**/*.md'` glob supports nested directories. Category can be derived from path or from frontmatter.
   - What's unclear: Whether categories should be directory-based (content/faqs/engine/), frontmatter-based (`category: engine`), or both.
   - Recommendation: Use both -- directory structure for file organization, frontmatter `category` field for querying. Keep them in sync. Phase 5 (Browse & Navigation) will use the `category` field for filtering.

3. **How many sample FAQ files to create?**
   - What we know: Need enough to verify schema, rendering, and attribution work across different categories
   - What's unclear: Exact number
   - Recommendation: Create 3 sample FAQs across 2 categories to validate the system without over-investing in placeholder content

4. **Prose component customization for Bulma?**
   - What we know: Bulma's `.content` class provides typography styling. ContentRenderer renders HTML from markdown AST. Wrapping `<ContentRenderer>` in a `.content` div should work.
   - What's unclear: Whether any prose components will conflict with Bulma's styling.
   - Recommendation: Start with Bulma's `.content` wrapper. Override prose components only if visual issues arise. Keep it simple for Phase 2.

5. **SSG route discovery for FAQ pages?**
   - What we know: Nitro's crawler follows links from `/`. FAQ pages without inbound links won't be pre-rendered.
   - What's unclear: Whether Nuxt Content v3 has any built-in `prerender:routes` hook that auto-registers content page routes. Official docs don't mention this.
   - Recommendation: For Phase 2, verify FAQ pages in dev mode only. Phase 3 creates the `/faqs` listing page with `<NuxtLink>` to all FAQs, which gives the crawler the links it needs. If SSG issues arise before Phase 3, add `routeRules: { '/faqs/**': { prerender: true } }` to nuxt.config.ts as a stopgap.

## Sources

### Primary (HIGH confidence)
- [Nuxt Content - Define Collections](https://content.nuxt.com/docs/collections/define) - Collection definition, schema, source patterns
- [Nuxt Content - Collection Types](https://content.nuxt.com/docs/collections/types) - Built-in fields for page/data types (path, title, description, body, etc.)
- [Nuxt Content - Schema Validators](https://content.nuxt.com/docs/collections/validators) - z import deprecation confirmed, Zod v3/v4 support
- [Nuxt Content - Collection Sources](https://content.nuxt.com/docs/collections/sources) - Source prefix auto-extraction, path mapping
- [Nuxt Content - queryCollection](https://content.nuxt.com/docs/utils/query-collection) - Full query API (where, order, select, path, first, all, count)
- [Nuxt Content - ContentRenderer](https://content.nuxt.com/docs/components/content-renderer) - Component props (value, tag, excerpt, components, prose, unwrap)
- [Nuxt Content - Markdown](https://content.nuxt.com/docs/files/markdown) - Frontmatter syntax, built-in fields (title, description, navigation), date field examples
- [Nuxt Content - Migration Guide](https://content.nuxt.com/docs/getting-started/migration) - v2 to v3 changes, catch-all page pattern, removed components
- [Nuxt Content - Configuration](https://content.nuxt.com/docs/getting-started/configuration) - Module config (highlight, toc, database options)
- [Nuxt Content - Static Hosting](https://content.nuxt.com/docs/deploy/static) - WASM SQLite for client-side queries, `nuxi generate`
- [Nuxt SEO - Content Integration](https://nuxtseo.com/docs/nuxt-seo/guides/nuxt-content) - asSeoCollection usage, module order requirement
- [Nuxt SEO - Sitemap Content Integration](https://nuxtseo.com/docs/sitemap/integrations/content) - asSitemapCollection, sitemap frontmatter fields
- [Nuxt 4 - Prerendering](https://nuxt.com/docs/4.x/getting-started/prerendering) - Crawler behavior, route discovery, prerender:routes hook

### Secondary (MEDIUM confidence)
- [GitHub #2927 - Zod schema issues](https://github.com/nuxt/content/issues/2927) - Boolean 0/1 bug confirmed, fixed in PR #3018. Also `z.string().datetime()` for date fields.
- [Bulma - Content element](https://bulma.io/documentation/elements/content/) - Typography styling for rendered HTML

### Tertiary (LOW confidence)
- None. All findings verified against official documentation.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries already installed. Versions confirmed in package.json. No new deps needed.
- Architecture: HIGH - Patterns directly from Nuxt Content v3 official docs, migration guide, and queryCollection API docs. Verified `z` deprecation in validators docs. ContentRenderer props verified from component docs.
- Pitfalls: HIGH - Verified via official docs (migration guide for removed APIs, validators docs for z deprecation), GitHub issues (#2927 for boolean bug), Nuxt prerendering docs (crawler behavior). SSG route discovery confirmed against Nuxt 4 prerendering docs.

**Research date:** 2026-02-09
**Valid until:** 2026-03-09 (stable domain, Nuxt Content v3 is mature)
