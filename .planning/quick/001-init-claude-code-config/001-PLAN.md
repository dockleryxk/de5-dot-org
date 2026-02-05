---
phase: quick
plan: 001
type: execute
wave: 1
depends_on: []
files_modified:
  - CLAUDE.md
  - .gitignore
autonomous: true

must_haves:
  truths:
    - "Any Claude Code session in this repo immediately understands the project stack, conventions, and gotchas"
    - "Claude Code temporary/local files are not tracked by git"
    - "Shared Claude Code config (settings.json) remains tracked"
  artifacts:
    - path: "CLAUDE.md"
      provides: "Project-level Claude Code instructions"
      contains: "nuxt"
    - path: ".gitignore"
      provides: "Git ignore rules including Claude Code entries"
      contains: "settings.local.json"
  key_links:
    - from: "CLAUDE.md"
      to: "nuxt.config.ts"
      via: "references module order constraint"
      pattern: "seo.*before.*content"
---

<objective>
Set up Claude Code configuration for the DE5.org repo so any Claude Code session (GSD or plain) understands the project conventions, architecture, and gotchas without needing to rediscover them.

Purpose: Eliminate repeated context-gathering overhead across sessions and prevent common mistakes (wrong module order, wrong Content API, missing deps).
Output: A CLAUDE.md at project root and updated .gitignore with Claude Code entries.
</objective>

<execution_context>
@/Users/rich/.claude/get-shit-done/workflows/execute-plan.md
@/Users/rich/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@nuxt.config.ts
@package.json
@.prettierrc
@eslint.config.mjs
@commitlint.config.ts
@.gitignore
@.claude/settings.json
</context>

<tasks>

<task type="auto">
  <name>Task 1: Create project-level CLAUDE.md</name>
  <files>CLAUDE.md</files>
  <action>
Create CLAUDE.md at the project root with the following sections. This file serves as persistent instructions for any Claude Code session working in this repo.

**Structure the file with these sections:**

## Project Overview
- DE5.org: Community knowledge hub for Acura Integra Type S (DE5) owners
- Tech stack: Nuxt 4.3.0, @nuxt/content v3.11, @nuxtjs/seo 3.4, Vue 3
- Package manager: Yarn (not npm, not pnpm)
- Templates: Pug (lang="pug" on template blocks)
- License: GPL-3.0
- Node: 22+ (see .nvmrc)

## Architecture
- Nuxt 4 app/ directory structure (app/pages/, app/layouts/, app/components/, etc.)
- Static site generation (nuxi generate)
- Content stored as Markdown in content/ directory (Nuxt Content v3)
- SEO handled by @nuxtjs/seo module suite

## Critical Gotchas
These are hard-won lessons. Do not ignore them.
- Module order in nuxt.config.ts: @nuxtjs/seo MUST come before @nuxt/content. Reversing this breaks SEO metadata.
- Content v3 API: Use queryCollection(), NOT queryContent(). queryContent() is the v2 API and does not exist in v3.
- better-sqlite3 must remain as an explicit dependency in package.json. Nuxt Content v3 uses it for its SQLite adapter. Removing it breaks content queries.
- eslint must be a direct devDependency (peer dep of @nuxt/eslint). Do not remove it even though @nuxt/eslint exists.
- Only the `pug` package is needed for Pug support (no pug-plain-loader — Vite handles it natively).

## Code Style
- Prettier: no semicolons, single quotes, trailing commas (all), 100 char width, LF line endings (see .prettierrc)
- ESLint: flat config via @nuxt/eslint with eslint-config-prettier last (see eslint.config.mjs)
- Vue SFCs: Use `<template lang="pug">` for templates, `<script setup lang="ts">` for logic
- Add a brief comment at the start of each logical code block explaining its purpose
- Include inline comments for non-trivial logic
- Prefer small, focused changes over large refactors

## Git Conventions
- Conventional Commits enforced by commitlint (feat:, fix:, docs:, chore:, etc.)
- Husky manages git hooks (commit-msg for commitlint, pre-commit for lint-staged)
- lint-staged runs on commit: ESLint+Prettier for JS/TS/Vue, Prettier only for JSON/MD/YAML/CSS

## Common Commands
- `yarn dev` — Start dev server
- `yarn build` — Build for production
- `yarn generate` — Static site generation
- `yarn lint` / `yarn lint:fix` — Run ESLint
- `yarn format` / `yarn format:check` — Run Prettier
- `yarn typecheck` — Run TypeScript type checking
- `yarn check` — Run lint + format check + typecheck (all at once)
- `yarn clean` — Remove .nuxt, .output, dist, and module cache

## GSD Workflow
This project also uses the GSD (Get Shit Done) planning workflow. Planning docs live in .planning/. When using GSD commands, refer to .planning/STATE.md for current project status and .planning/ROADMAP.md for the phase plan.

**Keep the tone concise and direct.** No filler, no redundancy. Each bullet should be actionable or warn about a specific pitfall. Match the style conventions already established in the codebase (brief top-of-block comments, practical over theoretical).
  </action>
  <verify>
    - File exists at project root: `ls -la CLAUDE.md`
    - Contains all critical gotchas: grep for "queryCollection", "better-sqlite3", "seo.*before.*content" (or equivalent wording)
    - Contains common commands: grep for "yarn dev"
    - No broken references to files that don't exist
  </verify>
  <done>CLAUDE.md exists at project root with project overview, architecture, critical gotchas, code style, git conventions, common commands, and GSD workflow reference. Any Claude Code session reading this file can work in the repo without rediscovering conventions.</done>
</task>

<task type="auto">
  <name>Task 2: Update .gitignore with Claude Code entries</name>
  <files>.gitignore</files>
  <action>
Add a "Claude Code" section to the existing .gitignore file. Append it after the existing "Build artifacts" section (at the end of the file).

Add these entries with a section comment:

```
# Claude Code
.claude/settings.local.json
.claude/todos.json
```

Do NOT add .claude/settings.json (it should remain tracked — it contains shared permission rules).
Do NOT add CLAUDE.md (it should remain tracked — it contains shared project instructions).
Do NOT add .claude/ as a blanket ignore (that would ignore settings.json too).

Verify that the existing .gitignore content is preserved exactly as-is. Only append the new section.
  </action>
  <verify>
    - .gitignore contains "Claude Code" section: `grep -A3 "Claude Code" .gitignore`
    - settings.local.json is ignored: `git check-ignore .claude/settings.local.json` should return the path
    - todos.json is ignored: `git check-ignore .claude/todos.json` should return the path
    - settings.json is NOT ignored: `git check-ignore .claude/settings.json` should return nothing (exit code 1)
    - Existing gitignore entries preserved: `grep "\.nuxt" .gitignore` still works
  </verify>
  <done>.gitignore has a Claude Code section that ignores local-only files (settings.local.json, todos.json) while keeping shared config (settings.json, CLAUDE.md) tracked.</done>
</task>

</tasks>

<verification>
1. `ls -la CLAUDE.md` — file exists at project root
2. `grep -c "queryCollection" CLAUDE.md` — critical gotcha present
3. `grep -c "better-sqlite3" CLAUDE.md` — dependency gotcha present
4. `grep "Claude Code" .gitignore` — section header present
5. `git check-ignore .claude/settings.local.json` — returns path (ignored)
6. `git check-ignore .claude/settings.json` — returns nothing (tracked)
7. `git status` — shows CLAUDE.md and .gitignore as modified/new, settings.local.json not showing
</verification>

<success_criteria>
- CLAUDE.md exists and contains all project conventions, architecture notes, critical gotchas, and workflow instructions
- .gitignore correctly ignores Claude Code local files while keeping shared config tracked
- A new Claude Code session opening this repo would immediately understand the stack, conventions, and pitfalls without needing to explore the codebase
</success_criteria>

<output>
After completion, create `.planning/quick/001-init-claude-code-config/001-SUMMARY.md`
</output>
