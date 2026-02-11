---
status: diagnosed
phase: 03-faq-display
source: [03-01-SUMMARY.md, 03-02-SUMMARY.md, 03-03-SUMMARY.md]
started: 2026-02-10T17:00:00Z
updated: 2026-02-10T17:15:00Z
---

## Current Test

[testing complete]

## Tests

### 1. FAQ listing page shows all questions
expected: Navigate to /faqs. "Frequently Asked Questions" heading, intro/disclaimer text, 3 FAQ questions as clickable links sorted by most recent, hover highlight on items.
result: pass

### 2. FAQ detail page with breadcrumbs and content
expected: Click any FAQ from the listing. Detail page shows breadcrumbs (Home > FAQs > Question), question heading in primary/brand color, subtle disclaimer text, "Last updated" date, rendered markdown answer, and source attribution.
result: pass

### 3. Multi-answer source attribution
expected: Navigate to /faqs/engine/oil-type-recommendation. Source attribution section shows multiple sources labeled "From @username on IntegraForums" with dates, separated by dividers.
result: issue
reported: "it is functionally correct but doesn't match the style of answers that have one attribution source"
severity: cosmetic

### 4. Single-answer source attribution (legacy)
expected: Navigate to /faqs/engine/break-in-period. Source attribution shows a single source in a box with author name, link, and date (legacy format).
result: pass

### 5. Back-to-FAQs navigation
expected: On any FAQ detail page, a "Back to FAQs" text link with arrow icon is visible. Clicking it navigates back to /faqs listing.
result: pass

### 6. Sticky mobile back button
expected: On a FAQ detail page, resize browser to < 1024px width. A sticky "Back to FAQs" button appears at the bottom of the viewport. At >= 1024px it is hidden.
result: pass

### 7. Navbar with FAQs link and theme toggle
expected: Navbar shows DE5.org brand, always-visible theme toggle (sun/moon icon), and FAQs link. On mobile (< 1024px): theme toggle visible, FAQs link behind hamburger. On desktop: both visible.
result: pass

### 8. Homepage CTA
expected: Navigate to /. Homepage shows a "Browse FAQs" button and a clickable FAQs card. Both link to /faqs.
result: pass

### 9. Terms/disclaimer page
expected: Navigate to /terms. Page shows "Terms & Disclaimer" heading with 5 sections: Disclaimer, Source Attribution, Not Professional Advice, Community Content, Trademarks.
result: pass

### 10. FAQ-specific 404
expected: Navigate to /faqs/nonexistent/path. Shows "FAQ Not Found" message with "Browse All FAQs" button linking to /faqs and a "Go Home" button.
result: issue
reported: "It's all there, but there could be more padding around the button container"
severity: cosmetic

### 11. General 404
expected: Navigate to /nonexistent. Shows standard "Page Not Found" message with "Go back home" link (NOT the FAQ-specific messaging).
result: pass

### 12. Dark mode on FAQ pages
expected: Toggle dark mode via theme toggle. FAQ listing, detail pages, terms page, and error pages all render with warm neutral backgrounds, readable text, and proper contrast.
result: pass

## Summary

total: 12
passed: 10
issues: 2
pending: 0
skipped: 0

## Gaps

- truth: "Multi-answer source attribution matches single-answer styling"
  status: failed
  reason: "User reported: it is functionally correct but doesn't match the style of answers that have one attribution source"
  severity: cosmetic
  test: 3
  root_cause: "Multi-answer sources render as plain p.is-size-7 elements without a .box wrapper, while single-answer uses .box for visual containment"
  artifacts:
    - path: "app/pages/faqs/[...slug].vue"
      issue: "Multi-answer template branch (line 35-45) lacks .box wrapper that single-answer branch (line 48) has"
  missing:
    - "Wrap multi-answer sources in .box to match single-answer styling"
  debug_session: ""

- truth: "FAQ-specific 404 buttons have adequate spacing/padding"
  status: failed
  reason: "User reported: It's all there, but there could be more padding around the button container"
  severity: cosmetic
  test: 10
  root_cause: "Button container p tag at line 11 in error.vue has no spacing class — buttons sit too close to the description text above"
  artifacts:
    - path: "app/error.vue"
      issue: "p tag wrapping buttons (line 11) has no margin-top class"
  missing:
    - "Add mt-5 class to button container paragraph for visual breathing room"
  debug_session: ""
