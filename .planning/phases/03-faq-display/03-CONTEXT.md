# Phase 3: FAQ Display - Context

**Gathered:** 2026-02-09
**Status:** Ready for planning

<domain>
## Phase Boundary

Users can view curated FAQ content on mobile-responsive pages. This includes an FAQ listing page at /faqs and individual FAQ pages with full answers and source attribution. Phase 3 also updates the FAQ schema to support multiple answers per question with per-answer source attribution. Creating/editing content remains a manual markdown workflow (established in Phase 2). Search, filtering, and category browsing belong to later phases.

</domain>

<decisions>
## Implementation Decisions

### FAQ listing layout
- Simple list of question titles (no previews, no category tags, no cards)
- Flat list, not grouped by category
- Sorted by most recent first
- Show all FAQs on one page (no pagination or infinite scroll — revisit when list grows past 50+)
- Clean dividers between items + hover highlight on list items
- Page has a title heading ("Frequently Asked Questions") plus a short intro (1-2 sentences explaining community-sourced nature — this doubles as the listing-level disclaimer)

### Individual FAQ styling
- Question styled distinctly (larger, different color) paired with answer — not necessarily the page H1
- Content width follows Bulma container/column defaults (no custom max-width)
- Source attribution displayed below the answer
- "Last updated" date shown as subtle metadata near the source attribution
- Bulma `.content` class wraps the answer for automatic markdown typography
- Dark mode follows Bulma defaults (warm neutrals from Phase 1.1, no FAQ-specific tweaks)
- Answer content starts simple: plain text and lists. Richer markdown (images, code blocks, tables) supported later as needed

### Multi-answer display
- Single FAQ file supports multiple answer sections, each with its own source attribution
- Answers stacked vertically with clear dividers between them
- Each answer labeled by its source (e.g., "From @username on IntegraForums") — not numbered
- Schema update in Phase 3: FAQ schema evolves to support per-answer source fields (sourceUrl, sourceAuthor, sourceDate per answer)

### Navigation & wayfinding
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

### Empty & edge states
- /faqs with no entries: simple "No FAQs yet" message
- FAQ-specific 404: "This FAQ doesn't exist" with link back to /faqs
- Broken source links: display the link as-is with a "(link may be outdated)" note

### Disclaimers & trust framing
- Disclaimer on /faqs listing page as part of the intro text (formal/legal tone)
- Subtle disclaimer text on each individual FAQ page (not a banner or box — small muted text)
- Simple /terms or /disclaimer page with full legal language
- Inline disclaimers link to the full terms page
- Tone: formal/legal — "DE5.org aggregates community knowledge. Content is not verified or endorsed."

### SEO & sharing
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

</decisions>

<specifics>
## Specific Ideas

- Multi-answer labeling: "From @username on IntegraForums" format for per-answer source attribution
- Disclaimer tone reference: "DE5.org aggregates community knowledge. Content is not verified or endorsed. Use at your own risk."
- The intro on /faqs should serve double duty as both welcome text and disclaimer

</specifics>

<deferred>
## Deferred Ideas

- Infinite scroll for FAQ list — revisit when list exceeds 50+ items
- Automated source link checking (build-time or CI job to detect dead source URLs) — add to backlog
- Category grouping and filtering — Phase 5 (Browse & Navigation)
- Search — Phase 4

</deferred>

---

*Phase: 03-faq-display*
*Context gathered: 2026-02-09*
