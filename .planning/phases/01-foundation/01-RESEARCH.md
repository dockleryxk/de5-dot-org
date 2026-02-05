# Phase 1: Foundation - Research

**Researched:** 2026-02-05
**Domain:** Nuxt 4 + Nuxt Content v3 project scaffolding, dev tooling, SEO infrastructure
**Confidence:** HIGH

## Summary

This phase establishes a greenfield Nuxt project with Nuxt Content v3 for an FAQ-focused community site. The research covers project scaffolding with Nuxt 4 (current stable), Nuxt Content v3 collections system, SEO infrastructure via @nuxtjs/seo, development tooling (ESLint, Prettier, Husky, commitlint), and Pug template support.

Key finding: Nuxt 4 is now the current stable version (released July 2025, currently at v4.2-4.3), and Nuxt Content v3 (currently v3.11.x) fully supports it since v3.7.0. Since the user's guiding principle is "upgrade-friendly," this project should scaffold on Nuxt 4 rather than Nuxt 3 (which reaches EOL July 2026). The original decision of "Nuxt Content v3" refers to the @nuxt/content module version, which is the correct module regardless of whether the Nuxt framework is v3 or v4.

**Primary recommendation:** Use Nuxt 4 + @nuxt/content v3.11+ + @nuxtjs/seo with the new `app/` directory structure. Scaffold with `yarn create nuxt` and add modules incrementally.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- README structure: Community resource emphasis, separate CONTRIBUTING.md, standard badges, tech stack section, license section, "Built with Claude Code" section, "For Acura Integra Type S (DE5) owners" near top, link to .planning/ for roadmap
- Environment configuration: Grouped by purpose, descriptive placeholders, inline comments for optional/required, warn-only startup validation, single .env.example, dev defaults pre-filled, .env gitignored
- Project structure: Nuxt defaults, root /content, planning docs committed, public/ for static + assets/ for processed, TypeScript (Nuxt-first), types/ at root, test/ at root, content/faqs/ type-based folders with frontmatter categories, no server directory yet, yarn package manager, .nvmrc for Node version, Nuxt built-in path aliases only, standard .gitignore, default.vue + minimal.vue layouts, public/images/, error.vue + 404 page
- SEO: Full SEO setup in foundation, @nuxtjs/seo module, FAQPage schema, NUXT_PUBLIC_SITE_URL for canonical domain, auto-generated social sharing from content, /faqs/[slug] URL structure, filename-based slugs with frontmatter override, no trailing slashes, SSG rendering, Core Web Vitals focus
- Favicon/meta images: No placeholders, add with branding later
- Dev tooling: @nuxt/eslint (defaults), Prettier, lint-staged + husky, moderate TypeScript, .vscode/ with settings, Conventional Commits, commitlint + husky, both issue and PR GitHub templates, basic GitHub Actions (lint + type check), Dependabot, convenience npm scripts, auto-generated changelog, Pug template language
- Template language: Pug (user preference, accepts contributor trade-off)

### Claude's Discretion
- README setup instruction depth
- Component folder organization (flat vs nested)
- Composables organization (flat vs nested)
- Minimal foundation environment variables
- Page title pattern implementation
- Modern browser support targets (specific versions)

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| nuxt | ^4.x (latest) | Framework | Current stable; Nuxt 3 EOL July 2026. Upgrade-friendly choice. |
| @nuxt/content | ^3.11 | Content management (Nuxt Content v3) | SQL-based storage, collections system, SSG support. Confirmed Nuxt 4 compatible since v3.7.0. |
| @nuxtjs/seo | ^2.x | All-in-one SEO (sitemap, robots, schema.org, OG images, link checker, seo-utils) | Single install covers all SEO needs; includes 6 sub-modules. |
| @nuxt/eslint | latest | ESLint integration | Official Nuxt module; generates project-aware flat config. |
| pug | latest | Template language | Only `pug` package needed with Vite (no `pug-plain-loader` required). |
| typescript | (bundled) | Type safety | Bundled with Nuxt; no separate install needed. |

### Dev Tooling

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| prettier | latest | Code formatting | Format on save + pre-commit hook |
| eslint-config-prettier | latest | Disable ESLint rules conflicting with Prettier | Must be last in ESLint config chain |
| husky | ^9.x | Git hooks | pre-commit (lint-staged) + commit-msg (commitlint) |
| lint-staged | latest | Run linters on staged files only | Pre-commit hook |
| @commitlint/cli | latest | Validate commit messages | commit-msg hook |
| @commitlint/config-conventional | latest | Conventional Commits ruleset | commitlint config |
| conventional-changelog-cli | latest | Auto-generate CHANGELOG.md | npm script for changelog generation |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Nuxt 4 | Nuxt 3 | Nuxt 3 EOL July 2026; user principle is "upgrade-friendly" so Nuxt 4 is clearly better |
| @nuxtjs/seo | Individual SEO modules | More setup, more config; @nuxtjs/seo is the official all-in-one recommended approach |
| conventional-changelog-cli | semantic-release | semantic-release is CI-focused, heavier; changelog-cli is simpler for manual releases |
| eslint-config-prettier | eslint-plugin-prettier | eslint-config-prettier is lighter (just disables rules); plugin adds Prettier errors to ESLint output which creates noise |

**Installation:**
```bash
# Scaffold project
yarn create nuxt de5-dot-org

# Core modules (add via nuxi for auto nuxt.config.ts registration)
npx nuxi module add @nuxtjs/seo
npx nuxi module add @nuxt/content

# Pug template support (only pug needed with Vite, NOT pug-plain-loader)
yarn add --dev pug

# ESLint + Prettier
# @nuxt/eslint is added via nuxi module add
npx nuxi module add @nuxt/eslint
yarn add --dev prettier eslint-config-prettier

# Git hooks + commit linting
yarn add --dev husky lint-staged @commitlint/cli @commitlint/config-conventional

# Changelog
yarn add --dev conventional-changelog-cli
```

## Architecture Patterns

### Nuxt 4 Project Structure (Recommended)

**CRITICAL:** Nuxt 4 uses a new `app/` directory structure. Application code lives in `app/`, while content, server, and config remain at root.

```
de5-dot-org/
├── app/                     # Application code (Nuxt 4 convention)
│   ├── app.vue              # Root component
│   ├── error.vue            # Error page
│   ├── assets/              # Build-processed assets (CSS, etc.)
│   ├── components/          # Vue components (flat -- few components in foundation)
│   ├── composables/         # Vue composables (flat -- few composables in foundation)
│   ├── layouts/             # Page layouts
│   │   ├── default.vue      # Standard layout
│   │   └── minimal.vue      # Minimal layout for error/special pages
│   ├── pages/               # File-based routing
│   │   ├── index.vue        # Homepage
│   │   └── faqs/            # FAQ pages (added in later phases)
│   └── plugins/             # Nuxt plugins (when needed)
├── content/                 # Nuxt Content v3 (root level, NOT inside app/)
│   └── faqs/                # FAQ content (type-based folders)
├── public/                  # Static files (root level)
│   └── images/              # Static images
├── shared/                  # Code shared between app and server (Nuxt 4)
├── types/                   # TypeScript type definitions
├── test/                    # Tests (when added)
├── .github/                 # GitHub templates, workflows, dependabot
│   ├── workflows/
│   │   └── ci.yml           # Lint + type-check on PRs
│   ├── dependabot.yml
│   ├── ISSUE_TEMPLATE/
│   └── PULL_REQUEST_TEMPLATE.md
├── .husky/                  # Git hooks
│   ├── pre-commit           # lint-staged
│   └── commit-msg           # commitlint
├── .vscode/                 # VS Code settings
│   ├── settings.json        # Editor settings
│   └── extensions.json      # Recommended extensions
├── .planning/               # Project planning docs (committed)
├── content.config.ts        # Nuxt Content collections config
├── nuxt.config.ts           # Nuxt configuration
├── eslint.config.mjs        # ESLint flat config (generated by @nuxt/eslint)
├── .prettierrc              # Prettier config
├── .prettierignore          # Prettier ignore patterns
├── commitlint.config.ts     # Commitlint config
├── .env.example             # Environment variable documentation
├── .nvmrc                   # Node version (22)
├── .gitignore               # Git ignore rules
├── package.json             # Dependencies and scripts
├── yarn.lock                # Yarn lockfile
├── LICENSE                  # GPL-3.0
├── README.md                # Project documentation
└── CONTRIBUTING.md          # Contribution guidelines
```

### Pattern 1: Nuxt Content v3 Collections with Zod Schema

**What:** Define content collections with typed frontmatter using Zod
**When to use:** Any content type that needs consistent structure
**Example:**
```typescript
// content.config.ts
// Source: https://content.nuxt.com/docs/collections/define
import { defineCollection, defineContentConfig } from '@nuxt/content'
import { asSeoCollection } from '@nuxtjs/seo/content'
import { z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    faqs: defineCollection(
      asSeoCollection({
        type: 'page',
        source: 'faqs/**/*.md',
        schema: z.object({
          question: z.string(),
          category: z.string(),
          sourceUrl: z.string().optional(),
          sourceAuthor: z.string().optional(),
          sourceDate: z.string().optional(),
        }),
      }),
    ),
  },
})
```
**Confidence:** HIGH -- verified from official Nuxt Content docs + Nuxt SEO integration guide.

### Pattern 2: @nuxtjs/seo Module Order (CRITICAL)

**What:** Module registration order matters for correct SEO + Content integration
**When to use:** Always when using both @nuxtjs/seo and @nuxt/content
**Example:**
```typescript
// nuxt.config.ts
// Source: https://nuxtseo.com/docs/nuxt-seo/guides/nuxt-content
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/seo',     // MUST come before @nuxt/content
    '@nuxt/content',
    '@nuxt/eslint',
  ],

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    name: 'DE5.org',
    description: 'Community knowledge hub for Acura Integra Type S (DE5) owners',
  },

  content: {
    // Nuxt Content v3 uses SQL-based storage
    // No special config needed for basic setup
  },

  // SSG configuration
  nitro: {
    prerender: {
      // Nuxt auto-crawls pages; customize if needed
      routes: ['/'],
    },
  },

  // No trailing slashes (per user decision)
  router: {
    options: {
      strict: true,
    },
  },
})
```
**Confidence:** HIGH -- explicitly stated in official Nuxt SEO docs: "@nuxtjs/seo must come before @nuxt/content in your modules array."

### Pattern 3: ESLint Flat Config + Prettier Integration

**What:** Use @nuxt/eslint generated config with Prettier conflict resolution
**When to use:** Always for this project
**Example:**
```javascript
// eslint.config.mjs
// Source: https://eslint.nuxt.com/packages/module
import withNuxt from './.nuxt/eslint.config.mjs'
import eslintConfigPrettier from 'eslint-config-prettier'

export default withNuxt(
  eslintConfigPrettier, // Must be last to disable conflicting rules
)
```
**Confidence:** HIGH -- standard pattern from official @nuxt/eslint + eslint-config-prettier docs.

### Pattern 4: Pug Templates in Vue SFCs

**What:** Use Pug as template language in Vue single-file components
**When to use:** All Vue component templates (user preference)
**Example:**
```vue
<template lang="pug">
div
  h1 {{ page.title }}
  ContentRenderer(:value="page")
</template>

<script setup lang="ts">
// Component logic here
</script>
```
**Confidence:** HIGH -- only `pug` package needed with Vite/Nuxt 4 (no loader required). Verified from Vite docs and community templates.

### Pattern 5: Environment Variable Validation (Warn-Only)

**What:** Validate environment variables at startup, warn but don't block
**When to use:** In a Nuxt plugin that runs on server init
**Example:**
```typescript
// app/plugins/env-check.server.ts
// Warn-only validation of environment variables at startup
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  // Check public vars
  if (!config.public.siteUrl || config.public.siteUrl === 'http://localhost:3000') {
    console.warn('[env] NUXT_PUBLIC_SITE_URL not set -- using localhost default')
  }
})
```
**Confidence:** MEDIUM -- pattern is standard Nuxt practice; exact implementation is a recommendation.

### Anti-Patterns to Avoid

- **Don't use Nuxt 3 directory structure:** Nuxt 4 uses `app/` folder. Putting pages/ and components/ at root level is the old way and will cause confusion.
- **Don't install pug-plain-loader:** Only needed for webpack; Vite (used by Nuxt 4) natively compiles Pug with just the `pug` package.
- **Don't put @nuxt/content before @nuxtjs/seo in modules:** This causes silent SEO frontmatter processing failures.
- **Don't use `ssr: false` with `nuxi generate`:** This produces empty HTML shells that harm SEO. Use full SSG (default behavior) for pre-rendered HTML.
- **Don't use queryContent():** This is the Nuxt Content v2 API. Use `queryCollection()` in v3.
- **Don't use document-driven mode:** Removed in Nuxt Content v3.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Sitemap generation | Custom sitemap route | @nuxtjs/seo (includes @nuxtjs/sitemap) | Auto-generates from routes, handles dynamic content |
| robots.txt | Manual robots.txt file | @nuxtjs/seo (includes @nuxtjs/robots) | Configurable, environment-aware (block staging) |
| Schema.org/JSON-LD | Manual script tags | @nuxtjs/seo (includes nuxt-schema-org) | Type-safe, auto-generates WebSite/WebPage, has defineFaqPage() |
| OG meta tags | Manual useSeoMeta everywhere | @nuxtjs/seo (includes nuxt-seo-utils) | Auto-detects from content, consistent across pages |
| ESLint config | Manual rules from scratch | @nuxt/eslint module | Generates project-aware config, includes JS/TS/Vue rules |
| Changelog | Manual CHANGELOG.md editing | conventional-changelog-cli | Parses conventional commits, generates formatted changelog |
| Commit validation | Custom git hook scripts | commitlint + @commitlint/config-conventional | Battle-tested, standard conventional commits ruleset |

**Key insight:** The Nuxt ecosystem has mature, official modules for nearly every foundation concern. Hand-rolling any of these leads to maintenance burden and missed edge cases (e.g., sitemap generation needs to handle dynamic routes, trailing slashes, i18n).

## Common Pitfalls

### Pitfall 1: Nuxt 4 Directory Structure Confusion
**What goes wrong:** Placing pages/, components/, layouts/ at project root instead of inside app/
**Why it happens:** Most tutorials and examples online still show Nuxt 3 structure; Nuxt 4 is relatively new (July 2025)
**How to avoid:** Use `yarn create nuxt` which scaffolds the correct Nuxt 4 structure with app/ directory
**Warning signs:** "pages/ directory not found" warnings, routes not auto-registering

### Pitfall 2: Module Order Causing Silent SEO Failures
**What goes wrong:** SEO frontmatter (ogImage, sitemap, robots, schemaOrg) silently ignored
**Why it happens:** @nuxt/content registered before @nuxtjs/seo in modules array
**How to avoid:** Always list @nuxtjs/seo FIRST, then @nuxt/content in nuxt.config.ts modules
**Warning signs:** No errors, but meta tags missing from rendered pages; check view-source

### Pitfall 3: Pug + Lazy Hydration Incompatibility
**What goes wrong:** Lazy hydration directives (hydrate-never, hydrate-on-visible) don't work in Pug templates
**Why it happens:** Nuxt uses ultrahtml to parse templates for lazy hydration conversion; it only handles HTML, not Pug
**How to avoid:** Avoid lazy hydration directives in Pug templates; use HTML templates for components that need lazy hydration
**Warning signs:** Components always hydrate immediately regardless of directives
**Confidence:** HIGH -- confirmed open issue (nuxt/nuxt#31604), p2-nice-to-have priority, unresolved

### Pitfall 4: Nuxt Content v3 API Changes from v2
**What goes wrong:** Using queryContent() (v2 API) instead of queryCollection() (v3 API)
**Why it happens:** Most online resources still reference v2; v3 is a major rewrite
**How to avoid:** Only reference official v3 docs at content.nuxt.com; ignore any queryContent references
**Warning signs:** "queryContent is not defined" errors; collections not returning data

### Pitfall 5: ESLint + Prettier Formatting Conflicts
**What goes wrong:** ESLint and Prettier fight over formatting (semicolons, quotes, indentation)
**Why it happens:** @nuxt/eslint includes stylistic rules that overlap with Prettier
**How to avoid:** Add eslint-config-prettier as the LAST item in ESLint config to disable all conflicting rules
**Warning signs:** Auto-fix loops, different formatting between "lint --fix" and "format"

### Pitfall 6: Missing SQLite Dependencies for Nuxt Content v3
**What goes wrong:** Build fails with SQLite-related errors
**Why it happens:** Nuxt Content v3 uses SQL-based storage; needs a database connector package
**How to avoid:** The module auto-prompts for connector selection on first run; for Node.js, `better-sqlite3` is the default. Native SQLite requires Node.js 22.5.0+.
**Warning signs:** "Cannot find module 'better-sqlite3'" or similar database errors at build time

### Pitfall 7: Husky Init with Yarn
**What goes wrong:** `npx husky init` may not work correctly with Yarn
**Why it happens:** Husky docs note "specific caveats" with Yarn and recommend checking the How To section
**How to avoid:** After installing husky, manually run `npx husky init` or configure prepare script and create hooks manually
**Warning signs:** .husky/ directory not created, hooks not firing on commit

## Code Examples

### Nuxt Config (Complete Foundation)
```typescript
// nuxt.config.ts
// Source: official docs + Nuxt SEO integration guide
export default defineNuxtConfig({
  // Module order matters: SEO must precede Content
  modules: [
    '@nuxtjs/seo',
    '@nuxt/content',
    '@nuxt/eslint',
  ],

  // Site identity for SEO modules
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    name: 'DE5.org',
    description: 'Community knowledge hub for Acura Integra Type S (DE5) owners',
  },

  // SSG (static site generation) -- default behavior with nuxi generate
  // ISR migration: add routeRules with swr option when needed
  nitro: {
    prerender: {
      routes: ['/'],
    },
  },

  // SEO title pattern
  app: {
    head: {
      titleTemplate: '%s | DE5.org',
      htmlAttrs: { lang: 'en' },
    },
  },

  // TypeScript: moderate strictness (Nuxt defaults)
  typescript: {
    strict: false,
    typeCheck: false, // Enable in CI via nuxi typecheck
  },

  // ESLint dev server checker (optional, can be noisy)
  eslint: {
    checker: false, // Run lint manually or in CI
  },

  // No trailing slashes
  routeRules: {
    // Can add per-route rules later
  },
})
```

### Content Config with SEO Integration
```typescript
// content.config.ts
// Source: https://content.nuxt.com/docs/collections/define
// Source: https://nuxtseo.com/docs/nuxt-seo/guides/nuxt-content
import { defineCollection, defineContentConfig } from '@nuxt/content'
import { asSeoCollection } from '@nuxtjs/seo/content'
import { z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    // FAQ content collection with SEO integration
    faqs: defineCollection(
      asSeoCollection({
        type: 'page',
        source: 'faqs/**/*.md',
        schema: z.object({
          question: z.string(),
          category: z.string(),
          sourceUrl: z.string().optional(),
          sourceAuthor: z.string().optional(),
          sourceDate: z.string().optional(),
        }),
      }),
    ),

    // General content pages (about, etc.)
    content: defineCollection(
      asSeoCollection({
        type: 'page',
        source: '*.md',
      }),
    ),
  },
})
```

### Husky + lint-staged + commitlint Setup
```json
// package.json (relevant sections)
{
  "scripts": {
    "dev": "nuxi dev",
    "build": "nuxi build",
    "generate": "nuxi generate",
    "preview": "nuxi preview",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "typecheck": "nuxi typecheck",
    "check": "yarn lint && yarn format:check && yarn typecheck",
    "clean": "rm -rf .nuxt .output dist node_modules/.cache",
    "changelog": "conventional-changelog -p conventionalcommits -i CHANGELOG.md -s",
    "prepare": "husky"
  },
  "lint-staged": {
    "*.{js,ts,mjs,vue}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md,yml,yaml,css}": [
      "prettier --write"
    ],
    "*.pug": [
      "prettier --write"
    ]
  }
}
```

```bash
# .husky/pre-commit
yarn lint-staged
```

```bash
# .husky/commit-msg
npx --no -- commitlint --edit "$1"
```

```typescript
// commitlint.config.ts
export default {
  extends: ['@commitlint/config-conventional'],
}
```

### .env.example (Foundation Variables)
```bash
# =============================================================================
# DE5.org Environment Configuration
# =============================================================================
# Copy this file to .env and fill in your values.
# See README.md Configuration section for details.

# -----------------------------------------------------------------------------
# Site
# -----------------------------------------------------------------------------
# Public URL of the site (used for canonical URLs, sitemaps, OG tags)
# Required for production; defaults to localhost for development
NUXT_PUBLIC_SITE_URL=http://localhost:3000

# -----------------------------------------------------------------------------
# Analytics (Phase 6 -- not needed yet)
# -----------------------------------------------------------------------------
# NUXT_PUBLIC_ANALYTICS_ID=YOUR_ANALYTICS_ID_HERE
```

### GitHub Actions CI Workflow
```yaml
# .github/workflows/ci.yml
name: CI

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  lint-and-typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version-file: '.nvmrc'
          cache: 'yarn'

      - name: Install dependencies
        run: yarn install --frozen-lockfile

      - name: Lint
        run: yarn lint

      - name: Format check
        run: yarn format:check

      - name: Type check
        run: yarn typecheck
```

### Dependabot Configuration
```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    groups:
      nuxt:
        patterns:
          - "nuxt*"
          - "@nuxt/*"
          - "@nuxtjs/*"
      dev-tools:
        patterns:
          - "eslint*"
          - "prettier*"
          - "husky"
          - "lint-staged"
          - "@commitlint/*"

  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
```

### VS Code Settings
```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "eslint.useFlatConfig": true,
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

```json
// .vscode/extensions.json
{
  "recommendations": [
    "vue.volar",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss"
  ]
}
```

### Prettier Configuration
```json
// .prettierrc
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "arrowParens": "always",
  "endOfLine": "lf",
  "pugSingleQuote": false
}
```

```
# .prettierignore
.nuxt
.output
dist
node_modules
*.min.*
CHANGELOG.md
yarn.lock
.planning/
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Nuxt 3 with root-level pages/ | Nuxt 4 with app/ directory | July 2025 | All application code in app/ subdirectory |
| queryContent() (Content v2) | queryCollection() (Content v3) | Jan 2025 | SQL-based storage, typed collections, Zod schemas |
| fetchContentNavigation() | queryCollectionNavigation() | Jan 2025 | New API name, same purpose |
| Document-driven mode | Manual page rendering | Jan 2025 | Removed from Content v3; use explicit page queries |
| File-based content storage | SQL-based content storage | Jan 2025 | Better performance, WASM SQLite in browser for SSG |
| ESLint legacy config (.eslintrc) | ESLint flat config (eslint.config.mjs) | 2024 | @nuxt/eslint generates flat config by default |
| pug + pug-plain-loader (webpack) | pug only (Vite) | 2022+ | Vite natively handles Pug with just the pug package |
| Nuxt SEO Kit | @nuxtjs/seo v2 | 2024 | Unified package, runtime support (no prerender required) |

**Deprecated/outdated:**
- `queryContent()`: Replaced by `queryCollection()` in Nuxt Content v3
- `fetchContentNavigation()`: Replaced by `queryCollectionNavigation()`
- Document-driven mode: Removed entirely in Content v3
- `pug-plain-loader`: Not needed with Vite-based Nuxt 4
- Nuxt 3 root-level directory structure: Still works but is legacy pattern

## Discretion Recommendations

### Component Organization: Flat
**Recommendation:** Start with flat `app/components/` directory. In foundation phase, there will be very few components (maybe a layout header, footer, and a content renderer wrapper). Nest into subdirectories only when component count exceeds ~15-20.
**Confidence:** HIGH -- standard Nuxt recommendation for small projects.

### Composables Organization: Flat
**Recommendation:** Start with flat `app/composables/` directory. Foundation phase may have 0-2 composables. Organize when needed.
**Confidence:** HIGH -- same rationale as components.

### Minimal Foundation Environment Variables
**Recommendation:** Only one variable needed in foundation:
- `NUXT_PUBLIC_SITE_URL` -- Used by @nuxtjs/seo for canonical URLs, sitemaps, OG tags. Defaults to localhost for dev. Required for production.
All other variables (analytics, scraper credentials) should be added in their respective phases as comments showing future placeholders.
**Confidence:** HIGH -- @nuxtjs/seo needs site URL; no other modules in foundation need env vars.

### Page Title Pattern
**Recommendation:** Use `%s | DE5.org` template via `app.head.titleTemplate` in nuxt.config.ts. Individual pages set their title via `useHead({ title: 'Page Title' })` or content frontmatter. The %s placeholder is replaced by the page-specific title.
**Confidence:** HIGH -- standard Nuxt pattern, documented in official docs.

### Modern Browser Support Targets
**Recommendation:** Use Nuxt/Vite defaults (ES2020+ / modern browsers). This covers:
- Chrome 87+ (Dec 2020)
- Firefox 78+ (Jun 2020)
- Safari 14+ (Sep 2020)
- Edge 88+ (Jan 2021)
No explicit browserslist config needed -- Vite defaults are appropriate for a 2026 project targeting car enthusiasts (who overwhelmingly use modern mobile browsers).
**Confidence:** MEDIUM -- based on Vite defaults; exact versions are approximate.

### README Setup Instruction Depth
**Recommendation:** Medium depth. Include:
1. Prerequisites (Node.js version, yarn)
2. Clone + install (3-4 commands)
3. Environment setup (copy .env.example)
4. Run dev server
5. Build/generate commands
Keep it concise -- this is an open-source hobby project, not enterprise software. Link to CONTRIBUTING.md for deeper dev workflow docs.
**Confidence:** HIGH -- matches standard open-source project patterns.

## Open Questions

1. **Node.js version for .nvmrc**
   - What we know: Nuxt 4 requires Node.js 20+. Node.js 22 is the current LTS (active until April 2027). Nuxt Content v3 has optional native SQLite support requiring Node.js 22.5.0+.
   - Recommendation: Use `22` in .nvmrc. It is the active LTS, works with all Nuxt 4 features, and enables native SQLite if desired.

2. **Prettier + Pug formatting**
   - What we know: Prettier has a community plugin (`@prettier/plugin-pug`) for formatting Pug templates. Without it, Prettier ignores `<template lang="pug">` content.
   - What's unclear: Whether the plugin is fully compatible with Vue 3 SFC Pug templates in 2026.
   - Recommendation: Install `@prettier/plugin-pug` and test. If issues arise, exclude Pug from Prettier and rely on manual formatting.

3. **Yarn classic vs Yarn Berry**
   - What we know: User specified "yarn" as package manager. Yarn classic (1.x) and Yarn Berry (3.x/4.x) have different behaviors. Nuxt ecosystem has historically had issues with Yarn Berry's PnP mode.
   - Recommendation: Use Yarn classic (1.x) for maximum compatibility with Nuxt ecosystem. If already using Yarn Berry, use `nodeLinker: node-modules` in .yarnrc.yml to avoid PnP issues.

## Sources

### Primary (HIGH confidence)
- [Nuxt Content v3 Installation](https://content.nuxt.com/docs/getting-started/installation) -- installation commands, collections setup
- [Nuxt Content v3 Collections](https://content.nuxt.com/docs/collections/define) -- defineCollection API, schema with Zod
- [Nuxt Content v3 Static Hosting](https://content.nuxt.com/docs/deploy/static) -- SSG with nuxi generate
- [Nuxt Content v3 Configuration](https://content.nuxt.com/docs/getting-started/configuration) -- all config options
- [Nuxt Content v3 Announcement](https://content.nuxt.com/blog/v3) -- v3 changes, SQL storage, new APIs
- [Nuxt SEO Installation](https://nuxtseo.com/docs/nuxt-seo/getting-started/installation) -- setup commands, site config
- [Nuxt SEO + Content Integration](https://nuxtseo.com/docs/nuxt-seo/guides/nuxt-content) -- asSeoCollection, module order, frontmatter
- [Nuxt SEO Schema.org](https://nuxtseo.com/docs/schema-org/api/use-schema-org) -- useSchemaOrg, defineFaqPage
- [Nuxt SEO Module List](https://nuxtseo.com/docs/nuxt-seo/guides/using-the-modules) -- all 6 sub-modules with versions
- [Nuxt 4 Installation](https://nuxt.com/docs/getting-started/installation) -- Node.js 20+, create commands
- [Nuxt 4 Directory Structure](https://nuxt.com/docs/4.x/directory-structure) -- app/ convention, all directories
- [Nuxt 4 Announcement](https://nuxt.com/blog/v4) -- breaking changes, migration, new features
- [Nuxt ESLint Module](https://eslint.nuxt.com/packages/module) -- flat config, module setup
- [@nuxt/content releases](https://github.com/nuxt/content/releases) -- v3.11.2 latest, Nuxt 4 support since v3.7.0
- [Husky Get Started](https://typicode.github.io/husky/get-started.html) -- v9 setup, yarn caveats

### Secondary (MEDIUM confidence)
- [Nuxt + ESLint 9 + Prettier Guide](https://dev.to/jeanjavi/nuxt-eslint-9-typescript-prettier-configuration-guide-2024-4h2c) -- eslint-config-prettier integration pattern
- [Prettier Pre-commit](https://prettier.io/docs/precommit) -- lint-staged setup
- [Pug lazy hydration issue](https://github.com/nuxt/nuxt/issues/31604) -- confirmed limitation with Pug templates
- [GitHub Dependabot docs](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuring-dependabot-version-updates) -- configuration format

### Tertiary (LOW confidence)
- Pug + Vite setup (community templates and old issues -- verified that only `pug` package is needed, but lazy hydration limitation is a confirmed gotcha)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- all packages verified via official docs and npm releases
- Architecture (Nuxt 4 structure): HIGH -- verified from official Nuxt 4 directory structure docs
- SEO integration: HIGH -- verified from official Nuxt SEO + Content integration guide
- Dev tooling: HIGH -- standard packages with well-documented setup
- Pitfalls: HIGH -- verified from official issues and documentation
- Pug support: MEDIUM -- works but has known lazy hydration limitation (open issue)

**Research date:** 2026-02-05
**Valid until:** 2026-03-05 (stable ecosystem, 30-day validity)
