---
created: 2026-02-09T15:36:34.461Z
title: Investigate PurgeCSS without Nuxt module
area: ui
files:
  - nuxt.config.ts
  - postcss.config.js
---

## Problem

The user's locked decision in Phase 1.1 CONTEXT.md specifies nuxt-purgecss to strip unused Bulma classes at build time. Research found nuxt-purgecss has a Nuxt 4 compatibility issue (GitHub #203, Jul 2025) and was last published Sep 2022. The Phase 1.1 plans skip nuxt-purgecss entirely due to this risk.

However, PurgeCSS itself (the core library) is actively maintained and can be used directly as a PostCSS plugin without the nuxt-purgecss wrapper module. This approach bypasses the Nuxt module compatibility issue entirely while still honoring the user's intent of stripping unused CSS.

## Solution

Investigate using PurgeCSS as a direct PostCSS plugin in Nuxt 4:

1. Install `@fullhuman/postcss-purgecss` (the PostCSS plugin, not the Nuxt module)
2. Configure via `postcss.plugins` in nuxt.config.ts or a postcss.config.js file
3. Set up content paths to scan (`app/**/*.vue`, `app/**/*.pug`, etc.)
4. Build a Bulma-aware safelist (dynamic classes like `is-active`, `is-loading`, responsive helpers, `data-theme` selectors)
5. Only enable in production builds (disable in dev for speed)
6. Test that Bulma classes used in templates survive purging
7. Measure bundle size reduction vs full Bulma import

Key questions to answer:
- Does Nuxt 4's PostCSS pipeline support custom plugins via config?
- What's the correct content glob pattern for Pug templates?
- What safelist patterns are needed for Bulma 1.x dynamic classes?
- Is the bundle size reduction meaningful enough to justify the complexity?
