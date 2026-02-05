# Stack Research

**Domain:** Community Knowledge Hub / Content Aggregation
**Project:** de5.org - Acura Integra Type S Knowledge Hub
**Researched:** 2026-02-05
**Confidence:** MEDIUM (Facebook data access is the major uncertainty)

## Executive Summary

The recommended stack centers on **Nuxt Content v3** (user preference, well-suited) with **MiniSearch** for client-side search. The critical finding is that **Facebook Groups API was deprecated April 2024** - there is no official API access to Facebook group content. This fundamentally shapes the data ingestion strategy: manual curation or third-party scrapers with significant risk.

For a solo developer on a budget, prioritize simplicity: static generation with Nuxt Content, client-side search with MiniSearch, and Umami for analytics. Defer AI chat features until the content foundation is solid.

---

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why Recommended | Confidence |
|------------|---------|---------|-----------------|------------|
| Nuxt | 4.3.x | Full-stack Vue framework | User preference, excellent DX, static generation support, server routes for ingestion scripts | HIGH |
| Nuxt Content | 3.11.x | Content management | SQL-based storage (new in v3), collections, TypeScript support, built-in search utilities | HIGH |
| Vue | 3.5.x | UI framework | Comes with Nuxt, reactive, composition API | HIGH |

**Rationale:** Nuxt Content v3 (released January 16, 2025) brings SQL-based storage instead of file-based, making it significantly better for querying larger content datasets. Collections provide structured organization perfect for FAQs, posts by source, etc.

### Data Storage

| Technology | Version | Purpose | Why Recommended | Confidence |
|------------|---------|---------|-----------------|------------|
| SQLite (via Nuxt Content) | Built-in | Content storage | Zero config, included with Nuxt Content v3, queries run client-side after initial load | HIGH |
| Markdown/YAML files | N/A | Content source | Human-readable, git-versioned, easy to edit manually | HIGH |

**Rationale:** Nuxt Content v3 compiles markdown/YAML to SQLite at build time. In production, the database is downloaded to the browser on first query, then all subsequent queries run locally. No external database needed.

### Search

| Technology | Version | Purpose | Why Recommended | Confidence |
|------------|---------|---------|-----------------|------------|
| MiniSearch | 7.2.x | Full-text search | Lightweight (8KB), client-side, fuzzy matching, prefix search, integrates with Nuxt Content's `queryCollectionSearchSections` | HIGH |

**Rationale:** Nuxt Content v3 exposes `queryCollectionSearchSections()` utility that breaks content into searchable segments. MiniSearch consumes this directly. For a knowledge hub with hundreds of FAQs (not millions), client-side search is faster and simpler than Algolia.

**Alternative considered:** Algolia - more powerful but adds external dependency, API keys, and potential costs. Overkill for this scale.

### Data Ingestion / Scraping

| Technology | Version | Purpose | Why Recommended | Confidence |
|------------|---------|---------|-----------------|------------|
| Cheerio | 1.2.x | HTML parsing | Fast, lightweight, jQuery-like API, perfect for parsing static HTML | HIGH |
| Puppeteer | 24.x | Browser automation | For JavaScript-rendered content, login flows, or anti-scraping bypass | MEDIUM |

**Critical Warning:** These tools are for the XenForo forum only. Facebook scraping is legally and technically risky (see Data Sources section below).

### Analytics

| Technology | Version | Purpose | Why Recommended | Confidence |
|------------|---------|---------|-----------------|------------|
| Umami | 2.x | Privacy-focused analytics | Free self-hosted, no cookies needed, simple setup, GDPR-compliant | HIGH |

**Hosting options:**
- Self-host on DigitalOcean droplet (~$4-6/mo) with Docker Compose
- Use Umami Cloud free tier (10K pageviews/mo)

### Hosting

| Technology | Tier | Purpose | Why Recommended | Confidence |
|------------|------|---------|-----------------|------------|
| Netlify | Free/Pro | Static hosting | Zero-config Nuxt deployment, global CDN, generous free tier | HIGH |
| Sherpa.sh | Free/Starter | Alternative hosting | 80% cheaper than Vercel, supports Nuxt, good for hobby projects | MEDIUM |
| DigitalOcean | Basic | Umami + optional services | Affordable VPS for self-hosted analytics | HIGH |

**Recommendation:** Start with Netlify free tier. Sherpa.sh is interesting but newer - less community documentation. DigitalOcean only if self-hosting Umami.

---

## Data Sources - Critical Analysis

### Facebook Groups: BLOCKED

**Status:** API deprecated April 22, 2024. No official programmatic access.

| Approach | Feasibility | Risk | Recommendation |
|----------|-------------|------|----------------|
| Official Graph API | IMPOSSIBLE | N/A | Groups API removed from all versions as of April 2024 |
| Manual curation | VIABLE | Low | Copy/paste valuable posts into markdown. Labor-intensive but legal. |
| PhantomBuster | POSSIBLE | HIGH | Third-party scraper, $69/mo minimum, violates Facebook ToS, account ban risk |
| Bright Data | POSSIBLE | HIGH | Expensive ($500+/mo for Facebook), ToS violation risk |
| Browser extension scraping | POSSIBLE | MEDIUM | Your own account, smaller scale, still ToS gray area |

**Recommended approach:** Manual curation with community help.
1. Identify the 50-100 most valuable/repeated questions from the Facebook group
2. Create markdown files with proper attribution
3. Ask group admins for blessing (community goodwill)
4. Encourage community members to submit FAQ suggestions

**Why not automate:** Facebook has aggressive anti-bot systems. Getting banned would cut off your ability to even view the group. The legal risk isn't worth it for a hobby project.

### XenForo Forum: VIABLE

| Approach | Feasibility | Risk | Tools |
|----------|-------------|------|-------|
| Web scraping | VIABLE | Low-Medium | Cheerio (static) or Puppeteer (if login required) |
| RSS feeds | CHECK | Low | Many XenForo forums expose RSS - check target forum |
| Official API | CHECK | Low | XenForo 2.2+ has optional REST API - forum admin must enable |

**Recommended approach:**
1. First, check if the forum has RSS feeds or API enabled
2. If not, use Cheerio for public thread scraping
3. Respect robots.txt and rate limiting
4. Store in markdown files with source attribution

**Existing tools:** `xenforo-scraper` (bash), `xenforo-dl` (Node.js) - review before building custom.

---

## Search vs Chat Interface Comparison

| Criterion | Search (MiniSearch) | AI Chat (RAG) |
|-----------|---------------------|---------------|
| Setup complexity | LOW - built into Nuxt Content | HIGH - needs embeddings, vector DB, LLM API |
| Ongoing cost | $0 | $10-100+/mo (API calls) |
| Maintenance | Minimal | Moderate (prompt tuning, context management) |
| User experience | Familiar, predictable | Novel, can feel magical or frustrating |
| Accuracy | Shows actual content | Can hallucinate or misinterpret |
| Solo dev friendliness | Excellent | Challenging |

**Recommendation:** Start with search. Add chat later as enhancement.

**Rationale:** For a knowledge hub, users want to find specific, accurate information quickly. Search delivers this reliably. AI chat adds complexity and cost while introducing hallucination risk for technical car information where accuracy matters.

**If you add chat later:**
- Vercel AI SDK 6.x (`ai` npm package) - unified API for OpenAI/Anthropic/etc
- Claude API with 200K context window - can fit substantial FAQ content without RAG complexity
- Simple approach: Load relevant FAQ content into context, no vector DB needed for small datasets

---

## Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @nuxt/image | 1.x | Image optimization | When adding user-submitted images |
| nuxt-cron | Latest | Scheduled tasks | If automating periodic forum scraping |
| @vueuse/core | 13.x | Vue utilities | Composition utilities as needed |
| zod | 3.x | Schema validation | Validating scraped data before storage |

---

## Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| TypeScript | Type safety | Nuxt Content v3 provides strong typing for collections |
| ESLint + @nuxt/eslint | Linting | Nuxt's official ESLint config |
| Prettier | Formatting | Personal preference |

---

## Installation

```bash
# Initialize Nuxt project
npx nuxi@latest init de5-dot-org
cd de5-dot-org

# Core dependencies
npm install @nuxt/content minisearch

# Scraping tools (for forum ingestion)
npm install cheerio

# Optional: browser automation if needed
npm install puppeteer

# Dev dependencies
npm install -D typescript @nuxt/eslint eslint
```

### nuxt.config.ts

```typescript
export default defineNuxtConfig({
  modules: ['@nuxt/content'],
  content: {
    // v3 uses collections defined in content.config.ts
  }
})
```

### content.config.ts (Nuxt Content v3)

```typescript
import { defineCollection, z } from '@nuxt/content'

export default {
  collections: {
    faqs: defineCollection({
      source: 'faqs/**/*.md',
      schema: z.object({
        title: z.string(),
        category: z.string(),
        source: z.enum(['facebook', 'forum', 'manual']),
        sourceUrl: z.string().optional(),
        dateAdded: z.string()
      })
    }),
    posts: defineCollection({
      source: 'posts/**/*.md',
      schema: z.object({
        title: z.string(),
        author: z.string().optional(),
        originalDate: z.string().optional(),
        source: z.string()
      })
    })
  }
}
```

---

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Nuxt Content | Astro + MDX | If you prefer React/Preact, or need islands architecture |
| MiniSearch | Algolia | If search volume exceeds thousands of queries/day or need typo tolerance tuning |
| MiniSearch | Fuse.js | If you need more fuzzy matching control, but MiniSearch is faster |
| Umami | Plausible | If you prefer hosted-only ($9/mo) with slightly nicer UI |
| Umami | Google Analytics | If you need advanced funnels/goals - but privacy tradeoff |
| Cheerio | Playwright | If target site requires multi-browser testing or complex interactions |
| Markdown files | Database (Postgres) | If content exceeds ~10K items or needs real-time user submissions |

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Facebook Graph API for Groups | Deprecated April 2024, completely removed | Manual curation |
| Headless CMS (Contentful, Sanity) | Overkill for solo dev, adds complexity and potential costs | Nuxt Content with markdown |
| Vector database for small dataset | Unnecessary complexity when Claude's 200K context fits your FAQs | Direct context injection or skip AI |
| Nuxt Content v2 | v3 has major improvements (SQL storage, collections, TypeScript) | Nuxt Content v3 |
| Server-side rendering for content site | Static generation is faster, cheaper, simpler | `nuxt generate` for static |
| Complex RAG pipeline | Needs embedding generation, vector DB, retrieval tuning | Simple search first, Claude with context if AI needed |

---

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| Nuxt 4.3.x | Nuxt Content 3.11.x | Both released Jan 2025, designed together |
| Nuxt Content 3.x | Vue 3.5.x | Via Nuxt 4 |
| MiniSearch 7.x | Node 18+ | ES modules, modern JavaScript |
| Cheerio 1.2.x | Node 18+ | Dropped older Node support in recent versions |
| Puppeteer 24.x | Node 18+ | Bundled Chromium |

**Node.js version:** Use Node 20 LTS (or 22 LTS) for best compatibility.

---

## Deployment Checklist

### Netlify (Recommended)

```toml
# netlify.toml
[build]
  command = "npm run generate"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"
```

### Environment Variables

```bash
# .env (do NOT commit)
# Only needed if adding AI chat later
ANTHROPIC_API_KEY=sk-ant-...

# Umami (if self-hosted)
UMAMI_WEBSITE_ID=...
```

---

## Phase Recommendations for Roadmap

Based on this stack research:

1. **Phase 1: Foundation** - Nuxt + Nuxt Content v3 + basic styling
2. **Phase 2: Content Structure** - Define collections, create initial FAQ content manually
3. **Phase 3: Search** - Implement MiniSearch with Nuxt Content integration
4. **Phase 4: Forum Ingestion** - Build scraper for XenForo forum
5. **Phase 5: Analytics** - Add Umami tracking
6. **Phase 6 (Optional):** AI chat enhancement with Claude API

---

## Sources

### HIGH Confidence (Official Documentation)

- [Nuxt Content v3 Announcement](https://content.nuxt.com/blog/v3) - January 16, 2025
- [Nuxt Content Full-Text Search](https://content.nuxt.com/docs/advanced/fulltext-search)
- [Nuxt Content Database](https://content.nuxt.com/docs/advanced/database)
- [Nuxt v4.3.0 Release](https://github.com/nuxt/nuxt/releases) - January 22, 2025
- [Nuxt Content v3.11.2 Release](https://github.com/nuxt/content/releases) - February 5, 2025
- [MiniSearch Documentation](https://lucaong.github.io/minisearch/)
- [Netlify Nuxt Deployment](https://docs.netlify.com/build/frameworks/framework-setup-guides/nuxt/)
- [Claude Context Windows](https://docs.anthropic.com/en/docs/build-with-claude/context-windows)

### MEDIUM Confidence (Verified via Multiple Sources)

- [Meta Deprecates Facebook Groups API](https://www.sprinklr.com/help/articles/getting-started/meta-deprecates-facebook-groups-api/66229eb25f9dd9599d632712) - Confirmed April 22, 2024 deprecation
- [Sherpa.sh Platform](https://www.sherpa.sh/) - Newer platform, less community validation
- [Umami on DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-deploy-your-own-web-analytics-software-with-umami-on-digitalocean-s-app-platform)
- [XenForo Scraping Tools](https://github.com/patrickkfkan/xenforo-dl)

### LOW Confidence (Needs Validation)

- Facebook scraping tool pricing and capabilities - based on vendor marketing
- XenForo target forum's specific API/RSS availability - must verify with actual forum

---

## Open Questions for Project Owner

1. **Forum details:** What's the specific XenForo forum URL? Need to check if it has API/RSS enabled.
2. **Facebook approach:** Are you comfortable with manual curation, or do you want to explore (risky) automated options?
3. **AI chat priority:** Is this a "nice to have" or core feature? Affects complexity significantly.
4. **Hosting preference:** Netlify is simplest, but do you have existing DigitalOcean or Sherpa.sh accounts?
5. **Content volume estimate:** How many FAQs/posts do you expect initially? (Affects search approach validation)

---

*Stack research for: de5.org Community Knowledge Hub*
*Researched: 2026-02-05*
