// content.config.ts
// Nuxt Content v3 collections configuration
// Defines FAQ collection with typed frontmatter and SEO integration
import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'
import { asSeoCollection } from '@nuxtjs/seo/content'

export default defineContentConfig({
  collections: {
    // FAQ content collection -- type-based folders with frontmatter categories
    faqs: defineCollection(
      asSeoCollection({
        type: 'page',
        source: 'faqs/**/*.md',
        schema: z.object({
          // FAQ display field
          question: z.string(),
          // Category for filtering (matches directory structure)
          category: z.string(),
          // Source attribution (required for transparency)
          sourceUrl: z.string(),
          sourceAuthor: z.string(),
          // Dates stored as ISO strings (z.string() not z.date() -- avoids YAML parsing issues)
          sourceDate: z.string(),
          // Freshness tracking (manual -- git dates unreliable in SSG)
          lastUpdated: z.string(),
        }),
      }),
    ),

    // General content pages (about, etc.) -- added when needed
    content: defineCollection(
      asSeoCollection({
        type: 'page',
        source: '*.md',
      }),
    ),
  },
})
