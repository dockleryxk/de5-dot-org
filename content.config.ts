// content.config.ts
// Nuxt Content v3 collections configuration
// Defines FAQ collection with typed frontmatter and SEO integration
import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import { asSeoCollection } from '@nuxtjs/seo/content'

export default defineContentConfig({
  collections: {
    // FAQ content collection -- type-based folders with frontmatter categories
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

    // General content pages (about, etc.) -- added when needed
    content: defineCollection(
      asSeoCollection({
        type: 'page',
        source: '*.md',
      }),
    ),
  },
})
