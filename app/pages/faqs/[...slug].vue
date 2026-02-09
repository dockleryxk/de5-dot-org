<template lang="pug">
//- FAQ detail page with content rendering and source attribution
section.section(v-if="faq")
  .container
    //- FAQ question as page heading
    h1.title {{ faq.question }}

    //- Freshness indicator -- last updated date
    p.is-size-7.has-text-grey.mb-5
      LucideCalendar(:size="14" style="vertical-align: middle;")
      |  Last updated: {{ formatDate(faq.lastUpdated) }}

    //- Rendered markdown content (Bulma .content class for typography)
    .content
      ContentRenderer(:value="faq")

    //- Source attribution box with external link
    .box.mt-5
      p.is-size-7.mb-0
        LucideExternalLink(:size="14" style="vertical-align: middle;")
        |  Source:
        = ' '
        a(:href="faq.sourceUrl" target="_blank" rel="noopener noreferrer")
          | {{ faq.sourceAuthor }}
        |  &middot; {{ formatDate(faq.sourceDate) }}
</template>

<script setup lang="ts">
// Fetch FAQ content matching the current route path
const route = useRoute()
const { data: faq } = await useAsyncData(route.path, () => {
  return queryCollection('faqs').path(route.path).first()
})

// 404 if FAQ not found
if (!faq.value) {
  throw createError({ statusCode: 404, statusMessage: 'FAQ not found' })
}

// SEO metadata from frontmatter question field
useHead({ title: faq.value.question })

// Format ISO date string (e.g. "2026-02-09") to human-readable (e.g. "February 9, 2026")
const formatDate = (dateStr: string): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateStr))
}
</script>
