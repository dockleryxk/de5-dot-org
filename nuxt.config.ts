// nuxt.config.ts
// Foundation configuration for DE5.org
// Module order: @nuxtjs/seo MUST come before @nuxt/content
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/seo', // MUST come before @nuxt/content (project constraint)
    '@nuxt/content', // Content system
    '@nuxt/fonts', // Font self-hosting (auto-detects Inter from CSS)
    '@nuxtjs/color-mode', // Dark mode toggle with localStorage persistence
    'nuxt-lucide-icons', // Icon auto-imports
    '@nuxt/eslint', // Linting
  ],

  // Global SCSS entry point (loads Bulma with overrides + custom styles)
  css: ['~/assets/scss/main.scss'],

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

  // Dark mode: defaults to system preference, user can override via toggle
  colorMode: {
    preference: 'system',
    fallback: 'light',
    dataValue: 'theme',
    classSuffix: '',
    storage: 'localStorage',
    storageKey: 'de5-color-mode',
  },

  // Inter font: auto-detected from CSS, downloaded at build time, served locally
  fonts: {
    defaults: {
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
    },
  },

  // Lucide icons: auto-imported as <LucideSun />, <LucideMoon />, etc.
  lucide: {
    namePrefix: 'Lucide',
  },

  // Make SCSS design tokens available in all Vue SFC style blocks
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/variables" as vars;',
        },
      },
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
