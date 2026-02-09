---
status: diagnosed
phase: 02-content-system
source: [02-01-SUMMARY.md, 02-02-SUMMARY.md]
started: 2026-02-09T20:15:00Z
updated: 2026-02-09T20:25:00Z
---

## Current Test

[testing complete]

## Tests

### 1. FAQ page renders content
expected: Navigate to /faqs/engine/oil-type-recommendation. Page shows "What oil type does the Integra Type S require?" as heading, rendered markdown with subheadings, lists, and bold text.
result: pass

### 2. Freshness date display
expected: On the FAQ page, a "Last updated" line appears with a calendar icon and a human-readable date (e.g., "February 9, 2026"), not a raw ISO string.
result: issue
reported: "the dates are wrong due to time zone - they are shown as a day behind what is in the markdown files"
severity: major

### 3. Source attribution link
expected: At the bottom of the FAQ page, a box shows "Source: ForumUser123" where "ForumUser123" is a clickable link. Clicking it opens the forum URL in a new browser tab.
result: pass

### 4. Non-existent FAQ returns 404
expected: Navigate to /faqs/nonexistent. Page shows a 404 error instead of blank content or a crash.
result: pass

### 5. Page title reflects FAQ question
expected: On the oil-type FAQ page, the browser tab title contains "What oil type does the Integra Type S require?"
result: pass

### 6. Second category renders correctly
expected: Navigate to /faqs/general/warranty-coverage. Page renders with "What does the Integra Type S warranty cover?" heading, warranty coverage periods, and source attribution showing "Acura" as author.
result: pass

## Summary

total: 6
passed: 5
issues: 1
pending: 0
skipped: 0

## Gaps

- truth: "Last updated date displays correctly matching the date in frontmatter"
  status: failed
  reason: "User reported: the dates are wrong due to time zone - they are shown as a day behind what is in the markdown files"
  severity: major
  test: 2
  root_cause: "new Date('2026-02-09') parses date-only strings as UTC midnight; US timezones display previous day"
  artifacts:
    - path: "content/faqs/engine/oil-type-recommendation.md"
      issue: "Date strings missing T00:00:00 suffix"
    - path: "content/faqs/engine/break-in-period.md"
      issue: "Date strings missing T00:00:00 suffix"
    - path: "content/faqs/general/warranty-coverage.md"
      issue: "Date strings missing T00:00:00 suffix"
  missing: []
  debug_session: ""
  resolution: "Fixed in 16a02a6 — added T00:00:00 suffix to all frontmatter date strings"
