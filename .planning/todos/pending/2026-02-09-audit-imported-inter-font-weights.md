---
created: 2026-02-09T15:34:21.449Z
title: Audit imported Inter font weights
area: ui
files:
  - nuxt.config.ts
  - app/assets/scss/_variables.scss
---

## Problem

Phase 1.1 plans configure @nuxt/fonts to download Inter with weights [400, 500, 600, 700]. It's unclear whether all four weights are actually used in the site's styling. Unused font weights add to the bundle size and page load time — each weight is a separate font file downloaded by the browser.

Currently planned usage:
- 400 (regular): body text
- 500 (medium): potentially unused
- 600 (semibold): potentially unused
- 700 (bold): headings via Bulma's `.has-text-weight-bold` and `.title` classes

After Phase 1.1 is implemented and visually verified, audit which weights are actually rendered in the browser (DevTools > Computed > font-weight on various elements) and remove any that aren't needed from the `fonts.defaults.weights` array in nuxt.config.ts.

## Solution

After Phase 1.1 execution:
1. Open DevTools, inspect font-weight on headings, body text, navbar, cards
2. Check which Inter weight files are actually downloaded in Network tab
3. Remove unused weights from `fonts.defaults.weights` in nuxt.config.ts
4. Verify no visual regressions after removal
