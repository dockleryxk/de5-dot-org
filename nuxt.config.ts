// nuxt.config.ts
// Foundation configuration for DE5.org
// Module order: @nuxtjs/seo MUST come before @nuxt/content
export default defineNuxtConfig({
  modules: ['@nuxtjs/seo', '@nuxt/content', '@nuxt/eslint'],

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

  // SEO title pattern and HTML attributes
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

  // ESLint dev server checker disabled (run lint manually or in CI)
  eslint: {
    checker: false,
  },

  // Future-proofing: compatibility date for stable behavior across updates
  compatibilityDate: '2025-01-01',
})
