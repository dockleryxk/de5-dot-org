# Phase 1: Foundation - Context

**Gathered:** 2025-02-05
**Status:** Ready for planning

<domain>
## Phase Boundary

Establish open-source project infrastructure with proper licensing, documentation, and secure configuration patterns. This includes Nuxt Content v3 scaffolding, development tooling, and SEO foundation.

</domain>

<decisions>
## Implementation Decisions

### README structure
- Setup instructions: Claude determines appropriate depth based on project complexity
- Contribution guidelines: Separate CONTRIBUTING.md file (standard GitHub pattern)
- Project emphasis: Community resource for DE5 owners (not technical showcase)
- Roadmap visibility: Link to .planning/ docs, don't inline roadmap
- Badges: Standard badges (license, Node version, etc.)
- Required sections: Tech stack section, License section (explicit GPL-3.0 explanation)
- Claude/GSD attribution: Dedicated "Built with Claude Code" section
- Target audience: "For Acura Integra Type S (DE5) owners" prominently mentioned near top

### Environment configuration
- Organization: Grouped by purpose with section headers (# Database, # Analytics, etc.)
- Placeholder values: Descriptive (`YOUR_API_KEY_HERE`, `https://your-domain.com`)
- Optional vs required: Noted in inline comments
- Startup validation: Warn only (log warnings but don't block startup)
- Environment separation: Single .env.example for all environments
- Documentation: Brief inline comments + detailed Configuration section in README
- Dev defaults: Pre-fill localhost URLs and other dev-safe defaults
- Initial vars: Claude determines minimal foundation set
- Security: .env gitignored, only .env.example committed

### Project structure
- Directory conventions: Nuxt defaults (pages/, components/, content/, composables/)
- Guiding principle: Prefer conventions for upgrade-friendliness, deviate only with clear benefit
- Content location: Root /content (Nuxt Content v3 convention)
- Planning docs: Committed to repo (transparent open-source development)
- Static assets: public/ for static files, assets/ for processed files (by purpose)
- TypeScript: Yes (Nuxt-first, upgrade-friendly, good tooling)
- Component organization: Claude decides based on component count
- Types location: Dedicated types/ directory at root
- Test location: test/ at root (matches Nuxt core repo pattern)
- Content organization: Type-based folders (content/faqs/) with categories in frontmatter
- Server directory: Add when needed (not in foundation)
- Package manager: yarn
- Node version: Enforced via .nvmrc file
- Path aliases: Nuxt built-in (~/ and @/) only
- .gitignore: Standard Nuxt + IDE configs (.idea/, .vscode/ except shared settings)
- Layouts: Scaffold multiple (default.vue + minimal.vue for errors/special pages)
- Images: public/images/ (simple start, easy migration to CDN/Nuxt Image later)
- Error pages: Scaffold error.vue and 404 page
- Composables: Claude decides organization based on count

### SEO
- Infrastructure: Foundation includes full SEO setup
- Module: @nuxtjs/seo (all-in-one: sitemap, robots, OG tags, schema.org)
- Structured data: FAQPage schema for rich Google results
- Canonical domain: Configure at deployment via NUXT_PUBLIC_SITE_URL
- Social sharing: Auto-generated from content (OG title = question, description = answer excerpt)
- URL structure: /faqs/[slug]
- Slug generation: Filename default, frontmatter override available
- Trailing slashes: No trailing slash
- Rendering: SSG (static site generation) — easy ISR migration if needed later
- Redirects: Handle when needed (not in foundation)
- Performance: Core Web Vitals focus
- Analytics: Integration hooks ready
- Title pattern: Claude decides (recommend: {Question} | DE5.org)

### Favicon/meta images
- Location: public/ root (favicon.ico, og-image.png when ready)
- Initial state: No placeholders — add with branding (Phase 8 or when ready)

### Dev tooling
- Linting: @nuxt/eslint (start with defaults, allow custom rules later)
- Formatting: Prettier
- Git hooks: lint-staged + husky (auto-lint/format on commit)
- TypeScript strictness: Moderate (Nuxt defaults, not strict mode)
- VS Code: .vscode/ with recommended settings and extensions
- Commit conventions: Conventional Commits (feat:, fix:, docs:, etc.)
- Commit validation: commitlint + husky hook (reject non-conforming commits)
- Test setup: Defer to later (add when first tests needed)
- GitHub templates: Both issue and PR templates
- CI: Basic GitHub Actions (lint + type check on PRs)
- Dependency updates: Dependabot (creates PRs, manual merge)
- npm scripts: Convenience scripts (dev, build, generate, preview, lint, lint:fix, format, check, clean)
- Changelog: Auto-generated from conventional commits
- Browser support: Claude decides (modern browsers, no IE)
- Template language: Pug (user preference, accepts contributor trade-off)

### Claude's Discretion
- README setup instruction depth
- Component folder organization (flat vs nested)
- Composables organization (flat vs nested)
- Minimal foundation environment variables
- Page title pattern implementation
- Modern browser support targets (specific versions)

</decisions>

<specifics>
## Specific Ideas

- "Upgrade-friendly" is a guiding principle — prefer Nuxt conventions to minimize migration pain
- Image storage should have easy migration path to CDN (Nuxt Image module) if needed later
- SSG chosen for simplicity, but document ISR switch in config for future reference
- Pug templates despite contributor accessibility trade-off — user productivity prioritized

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-foundation*
*Context gathered: 2025-02-05*
