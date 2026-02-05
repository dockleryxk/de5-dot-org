# Architecture Research

**Domain:** Community Knowledge Hub / Content Aggregation
**Researched:** 2026-02-05
**Confidence:** MEDIUM-HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         DATA INGESTION LAYER                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                          │
│  │   XenForo   │  │   Manual    │  │   Future    │                          │
│  │   Scraper   │  │   Curation  │  │   Sources   │                          │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘                          │
│         │                │                │                                  │
│         └────────────────┼────────────────┘                                  │
│                          ▼                                                   │
│              ┌───────────────────────┐                                       │
│              │   Content Processor   │  (normalize, validate, dedupe)        │
│              └───────────┬───────────┘                                       │
├──────────────────────────┼──────────────────────────────────────────────────┤
│                          ▼                                                   │
│                  ENRICHMENT LAYER                                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                          │
│  │    Topic    │  │     AI      │  │    FAQ      │                          │
│  │  Classifier │  │ Summarizer  │  │  Generator  │                          │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘                          │
│         └────────────────┼────────────────┘                                  │
│                          ▼                                                   │
│              ┌───────────────────────┐                                       │
│              │   Markdown Writer     │  (output to content/*)                │
│              └───────────┬───────────┘                                       │
├──────────────────────────┼──────────────────────────────────────────────────┤
│                          ▼                                                   │
│                  CONTENT LAYER (Nuxt Content v3)                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    content/ directory                                │    │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐   │    │
│  │  │  posts/ │  │  faqs/  │  │ guides/ │  │  mods/  │  │ issues/ │   │    │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘  └─────────┘   │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                          │                                                   │
│              ┌───────────┴───────────┐                                       │
│              │  Nuxt Content SQLite  │  (build-time processing)              │
│              └───────────┬───────────┘                                       │
├──────────────────────────┼──────────────────────────────────────────────────┤
│                          ▼                                                   │
│                  PRESENTATION LAYER (Nuxt App)                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Browse    │  │   Search    │  │     FAQ     │  │  AI Chat    │        │
│  │    Pages    │  │   (local)   │  │    Pages    │  │  Interface  │        │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘        │
├─────────────────────────────────────────────────────────────────────────────┤
│                  DEPLOYMENT (Netlify / Serverless)                           │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Static Assets (CDN)  │  Serverless Functions  │  Edge Functions    │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| XenForo Scraper | Extract forum posts, threads, user data | Python script (Scrapy/Playwright), runs offline |
| Manual Curation | Human-added guides, corrections | Direct markdown editing in content/ |
| Content Processor | Normalize formats, deduplicate, validate | Node.js script, pre-build step |
| Topic Classifier | Tag content by category (mods, issues, etc.) | LLM API call or keyword matching |
| AI Summarizer | Create concise summaries from threads | LLM API (Claude/GPT) |
| FAQ Generator | Synthesize Q&A from common discussions | LLM API with clustering |
| Markdown Writer | Convert processed data to Nuxt Content format | Node.js script |
| Nuxt Content | Store/query content via SQLite, generate pages | Framework (build-time) |
| Search | Full-text search across content | Nuxt Content built-in or Meilisearch |
| AI Chat | RAG-based Q&A interface | Serverless function + embedding store |

## Recommended Project Structure

```
de5-dot-org/
├── .planning/                # Project planning (ignored in prod)
│   └── research/
├── content/                  # Nuxt Content source files
│   ├── posts/                # Aggregated forum discussions
│   │   └── [topic]/          # Organized by topic
│   ├── faqs/                 # Generated FAQ content
│   ├── guides/               # Curated how-to guides
│   ├── mods/                 # Modification documentation
│   └── issues/               # Known issues and fixes
├── scripts/                  # Data pipeline scripts
│   ├── scrapers/             # Source-specific scrapers
│   │   └── xenforo/          # XenForo scraper
│   ├── processors/           # Content transformation
│   │   ├── normalize.ts      # Format normalization
│   │   ├── dedupe.ts         # Duplicate detection
│   │   └── enrich.ts         # AI enrichment
│   └── pipeline.ts           # Orchestration script
├── data/                     # Raw scraped data (gitignored)
│   ├── raw/                  # Unprocessed scrape output
│   └── processed/            # Transformed, ready for content/
├── server/                   # Nuxt server routes
│   ├── api/                  # API endpoints
│   │   └── chat.ts           # AI chat endpoint
│   └── utils/                # Server utilities
├── components/               # Vue components
├── pages/                    # Nuxt pages
├── composables/              # Vue composables
├── public/                   # Static assets
├── content.config.ts         # Nuxt Content collections config
├── nuxt.config.ts            # Nuxt configuration
└── package.json
```

### Structure Rationale

- **content/:** Nuxt Content v3 requires content in this directory. Subdirectories become collections. Each collection can have its own schema.
- **scripts/:** Separates data pipeline from web app. Pipeline runs independently, outputs to content/. This decoupling is critical for maintainability.
- **data/:** Gitignored raw data. Keeps repo clean, allows rebuilding from scratch.
- **server/api/:** Serverless functions for dynamic features (AI chat). Nuxt auto-deploys these to Netlify Functions.

## Architectural Patterns

### Pattern 1: Offline Pipeline + Static Output

**What:** Data ingestion and AI processing happens offline (local machine or CI), producing static markdown files. The Nuxt app only consumes the output.

**When to use:** When data sources are scrapeable (not real-time), when AI processing is expensive, when you want maximum control over content quality.

**Trade-offs:**
- Pro: Simple deployment, no runtime costs for processing, content can be reviewed before publish
- Pro: Full SQLite-based search works client-side after initial load
- Con: Content freshness depends on pipeline run frequency
- Con: Manual trigger or scheduled CI job needed

**Example:**
```typescript
// scripts/pipeline.ts
import { scrapeXenForo } from './scrapers/xenforo';
import { normalizeContent } from './processors/normalize';
import { enrichWithAI } from './processors/enrich';
import { writeToContent } from './processors/write';

async function run() {
  // Step 1: Scrape (offline, rate-limited)
  const rawPosts = await scrapeXenForo({
    baseUrl: 'https://forum.example.com',
    categories: ['general', 'mods', 'issues']
  });

  // Step 2: Normalize and dedupe
  const normalized = normalizeContent(rawPosts);

  // Step 3: AI enrichment (summaries, tags, FAQs)
  const enriched = await enrichWithAI(normalized);

  // Step 4: Write to content/ directory
  await writeToContent(enriched, './content');
}

run();
```

### Pattern 2: Content Collections with Schema Validation

**What:** Define typed collections in Nuxt Content v3, each with its own schema. Content is validated at build time.

**When to use:** Always for structured content. Essential for maintaining data quality when aggregating from multiple sources.

**Trade-offs:**
- Pro: TypeScript types generated automatically, catches schema violations early
- Pro: Different content types can have different fields
- Con: Schema changes require content migration

**Example:**
```typescript
// content.config.ts
import { defineCollection, z } from '@nuxt/content';

export const collections = {
  posts: defineCollection({
    type: 'page',
    source: 'posts/**/*.md',
    schema: z.object({
      title: z.string(),
      sourceUrl: z.string().url().optional(),
      sourceType: z.enum(['forum', 'manual', 'aggregated']),
      topics: z.array(z.string()),
      summary: z.string().optional(),
      originalAuthor: z.string().optional(),
      scrapedAt: z.string().datetime().optional(),
    })
  }),

  faqs: defineCollection({
    type: 'page',
    source: 'faqs/**/*.md',
    schema: z.object({
      question: z.string(),
      topics: z.array(z.string()),
      generatedFrom: z.array(z.string()), // source post IDs
      confidence: z.number().min(0).max(1),
    })
  }),
};
```

### Pattern 3: Hybrid Search (Local + Optional External)

**What:** Use Nuxt Content's built-in SQLite search for basic queries. Add Meilisearch only if advanced search features are needed later.

**When to use:** Start with built-in search. Add external search when you need: fuzzy matching beyond built-in, faceted filtering, AI-powered semantic search.

**Trade-offs:**
- Pro: Built-in search requires zero infrastructure, works offline, ships with Nuxt Content
- Pro: Can add Meilisearch later without major refactoring
- Con: Built-in search is simpler (exact/prefix matching), may not handle typos as well
- Con: For semantic search, need vector database anyway

**Example:**
```typescript
// composables/useSearch.ts
export function useSearch() {
  // Start with built-in Nuxt Content search
  const { data: results } = await queryCollectionSearchSections('posts')
    .where({ topics: { $contains: 'exhaust' } })
    .limit(20);

  return results;
}
```

## Data Flow

### Ingestion Flow (Offline)

```
[XenForo Forum]
       │
       │ scrape (rate-limited, respectful)
       ▼
[Raw JSON in data/raw/]
       │
       │ normalize (strip HTML, extract metadata)
       ▼
[Normalized JSON in data/processed/]
       │
       │ deduplicate (hash-based, fuzzy matching)
       ▼
[Unique content]
       │
       │ AI enrich (topic classification, summarization)
       ▼
[Enriched content]
       │
       │ generate FAQs (cluster similar questions, synthesize)
       ▼
[FAQ content]
       │
       │ write markdown (frontmatter + body)
       ▼
[content/*.md files]
       │
       │ git commit + push (or local build)
       ▼
[Nuxt build triggered]
```

### Request Flow (Runtime)

```
[User visits page]
       │
       ▼
[Netlify CDN] ─── static page ──→ [Browser]
       │                               │
       │                               │ client navigation
       │                               ▼
       │                        [SQLite WASM]
       │                               │
       │                               │ local query
       │                               ▼
       │                        [Search results]
       │
       │ (for AI chat only)
       ▼
[Netlify Function]
       │
       │ serverless API call
       ▼
[LLM API + optional vector store]
       │
       ▼
[AI response to browser]
```

### Key Data Flows

1. **Scraping to Content:** XenForo scraper extracts threads/posts → normalize/dedupe → write to content/ as markdown with frontmatter. Runs locally or in CI, not at runtime.

2. **Content to Browser:** Nuxt Content processes markdown at build time → generates SQLite dump → dumps included in static build → browser loads dump via WASM → all queries run locally.

3. **AI Chat (Optional):** User query hits serverless function → function queries embedded content (or uses full content as context for small sites) → LLM generates response → streams back to browser.

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-1k pages | Monolith is fine. Built-in search works. SQLite WASM handles all queries client-side. No external services needed. |
| 1k-10k pages | Consider Meilisearch if search quality matters. SQLite WASM may have initial load delay. Lazy-load search index. |
| 10k+ pages | Split content into sections with separate SQLite dumps. Implement server-side search. Consider dedicated search service. |

### Scaling Priorities

1. **First bottleneck:** Initial page load time as content grows. SQLite dump gets larger. Solution: Lazy-load search index, split collections.

2. **Second bottleneck:** AI chat costs and latency. Solution: Cache common queries, use cheaper models for classification, expensive models for generation.

3. **Not a bottleneck:** Static page serving. CDN handles this infinitely. Build time grows but is a one-time cost.

## Anti-Patterns

### Anti-Pattern 1: Real-Time Scraping

**What people do:** Scrape content on-demand when users request it.

**Why it's wrong:** Rate limits, latency, legal issues, source unavailability breaks your site.

**Do this instead:** Scrape offline, store processed content in git. Your site never depends on external availability.

### Anti-Pattern 2: Database for Content Storage

**What people do:** Store aggregated content in PostgreSQL/MongoDB, query at runtime.

**Why it's wrong:** Adds infrastructure complexity, costs money, introduces failure points. For a content site, you don't need a database server.

**Do this instead:** Nuxt Content + SQLite gives you database features (queries, relations) with static site simplicity. Content lives in git, deploys anywhere.

### Anti-Pattern 3: Over-Engineering AI Features

**What people do:** Build complex RAG pipelines, vector databases, embedding stores before validating if users need AI chat.

**Why it's wrong:** Significant complexity and cost for unclear value. Solo maintainer overhead.

**Do this instead:** Start with good search and well-organized content. AI chat can be added later as a serverless function if users want it. For small content sets (<1M tokens), context stuffing beats RAG anyway.

### Anti-Pattern 4: Mixing Concerns in Pipeline

**What people do:** Single script that scrapes, processes, enriches, and deploys all at once.

**Why it's wrong:** Can't re-run individual steps, hard to debug, can't review intermediate output.

**Do this instead:** Separate pipeline stages with file-based intermediate output. `scrape` writes to `data/raw/`, `process` reads raw and writes to `data/processed/`, `enrich` reads processed and writes to `content/`.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| XenForo Forum | Offline scraping (Playwright/Scrapy) | Respect robots.txt, rate limit, store raw data locally |
| Facebook Groups | Manual curation only | API restricted, scraping violates ToS, use screenshots/quotes sparingly |
| LLM API (Claude/GPT) | Offline enrichment + optional runtime chat | Batch processing for content, streaming for chat |
| Meilisearch (optional) | Self-hosted or cloud, sync at build time | Add only if built-in search insufficient |
| Netlify | Zero-config Nuxt deployment | Static + serverless functions out of the box |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Pipeline → Content | File system (markdown) | Pipeline writes to content/, completely decoupled from Nuxt |
| Content → Nuxt | Nuxt Content module | Framework handles parsing, SQLite, queries |
| Nuxt → Search | Composables | `queryCollectionSearchSections()` for built-in, API call for external |
| Nuxt → AI Chat | Server route | `/api/chat` serverless function, called from component |

## Build Order Implications

Based on component dependencies, suggested implementation order:

1. **Phase 1: Foundation**
   - Nuxt project setup with Content v3
   - Basic content structure (manual content in content/)
   - Simple pages that display content
   - *No scraping yet* — validate the display layer works

2. **Phase 2: Pipeline (Scraping)**
   - XenForo scraper (offline script)
   - Normalization and deduplication
   - Write to content/ directory
   - *No AI yet* — validate raw content flows through

3. **Phase 3: Search**
   - Built-in Nuxt Content search
   - Search UI component
   - Topic/category filtering
   - *Evaluate if external search needed*

4. **Phase 4: Enrichment**
   - AI summarization (offline)
   - Topic classification
   - FAQ generation
   - *Run on existing content*

5. **Phase 5: AI Chat (Optional)**
   - Serverless function for chat
   - Simple context-stuffing approach
   - Evaluate if RAG needed based on content size

**Rationale:** Each phase produces usable output. You can ship after Phase 1 with manual content. Phase 2 adds automation. Later phases add polish.

## Sources

- [Nuxt Content v3 Documentation](https://content.nuxt.com/docs/getting-started) - HIGH confidence
- [Nuxt Content Database Architecture](https://content.nuxt.com/docs/advanced/database) - HIGH confidence
- [Netlify Nuxt Deployment](https://docs.netlify.com/build/frameworks/framework-setup-guides/nuxt/) - HIGH confidence
- [JAMstack Architecture Patterns](https://profiletree.com/jamstack-architecture/) - MEDIUM confidence
- [Web Scraping Best Practices 2026](https://brightdata.com/blog/web-data/web-scraping-roadmap) - MEDIUM confidence
- [XenForo Scraper Projects](https://github.com/qjroberts/xenforo-scraper) - MEDIUM confidence (implementation reference)
- [Meilisearch vs Algolia Comparison](https://www.meilisearch.com/blog/meilisearch-vs-algolia) - MEDIUM confidence
- [RAG Architecture Evolution 2026](https://ucstrategies.com/news/standard-rag-is-dead-why-ai-architecture-split-in-2026/) - MEDIUM confidence
- [Facebook Scraping Legal Considerations](https://webscrapingsite.com/guide/scrape-facebook-groups-data/) - MEDIUM confidence

---
*Architecture research for: de5.org Community Knowledge Hub*
*Researched: 2026-02-05*
