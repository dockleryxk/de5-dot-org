# DE5.org

## Project Overview

- Community knowledge hub for Acura Integra Type S (DE5) owners
- Tech stack: Nuxt 4.3.0, @nuxt/content v3.11, @nuxtjs/seo 3.4, Vue 3
- Package manager: Yarn (not npm, not pnpm)
- Templates: Pug (`lang="pug"` on template blocks)
- License: GPL-3.0
- Node: 22+ (see .nvmrc)

## Architecture

- Nuxt 4 `app/` directory structure (app/pages/, app/layouts/, app/components/, etc.)
- Static site generation (`nuxi generate`)
- Content stored as Markdown in `content/` directory (Nuxt Content v3)
- SEO handled by @nuxtjs/seo module suite

## Critical Gotchas

These are hard-won lessons. Do not ignore them.

- **Module order in nuxt.config.ts:** @nuxtjs/seo MUST come before @nuxt/content. Reversing this breaks SEO metadata.
- **Content v3 API:** Use `queryCollection()`, NOT `queryContent()`. `queryContent()` is the v2 API and does not exist in v3.
- **better-sqlite3** must remain as an explicit dependency in package.json. Nuxt Content v3 uses it for its SQLite adapter. Removing it breaks content queries.
- **eslint** must be a direct devDependency (peer dep of @nuxt/eslint). Do not remove it even though @nuxt/eslint exists.
- **Pug support:** Only the `pug` package is needed (no pug-plain-loader -- Vite handles it natively).

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

- `yarn dev` -- Start dev server
- `yarn build` -- Build for production
- `yarn generate` -- Static site generation
- `yarn lint` / `yarn lint:fix` -- Run ESLint
- `yarn format` / `yarn format:check` -- Run Prettier
- `yarn typecheck` -- Run TypeScript type checking
- `yarn check` -- Run lint + format check + typecheck (all at once)
- `yarn clean` -- Remove .nuxt, .output, dist, and module cache

## GSD Workflow

This project uses the GSD (Get Shit Done) planning workflow. Planning docs live in `.planning/`. When using GSD commands, refer to `.planning/STATE.md` for current project status and `.planning/ROADMAP.md` for the phase plan.
