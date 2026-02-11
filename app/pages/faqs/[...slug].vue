<template lang="pug">
//- FAQ detail page with breadcrumbs, multi-answer rendering, and back navigation
section.section(v-if="faq")
  .container
    //- Breadcrumbs: Home > FAQs > Question
    nav.breadcrumb.mb-4(aria-label="breadcrumbs")
      ul
        li
          NuxtLink(to="/") Home
        li
          NuxtLink(to="/faqs") FAQs
        li.is-active
          a(aria-current="page") {{ faq.question }}

    //- Question heading -- styled distinctly with brand color
    h1.title.is-3.has-text-primary {{ faq.question }}

    //- Subtle disclaimer text below the question
    p.is-size-7.has-text-grey.mb-5
      | Community-sourced &mdash; not verified or endorsed.
      = ' '
      NuxtLink(to="/terms") Terms

    //- Freshness indicator -- last updated date with calendar icon
    p.is-size-7.has-text-grey.mb-5
      LucideCalendar(:size="14" style="vertical-align: middle;")
      |  Last updated: {{ formatDate(faq.lastUpdated) }}

    //- Rendered markdown content (Bulma .content class for typography)
    .content
      ContentRenderer(:value="faq")

    //- Source attribution -- multi-answer or legacy single-answer fallback
    .answer-sources.mt-5
      template(v-if="faq.answers && faq.answers.length")
        //- Multi-answer: per-answer source attribution with dividers (box matches single-answer style)
        .box
          .answer-source(v-for="(answer, idx) in faq.answers" :key="idx")
            hr.my-3(v-if="idx > 0")
            p.is-size-7.has-text-grey.mb-0
              LucideExternalLink(:size="14" style="vertical-align: middle;")
              |  From
              = ' '
              a(:href="answer.sourceUrl" target="_blank" rel="noopener noreferrer")
                | @{{ answer.sourceAuthor }}
              |  on IntegraForums &middot; {{ formatDate(answer.sourceDate) }}
      template(v-else)
        //- Legacy single-answer source attribution (backward compatible)
        .box
          p.is-size-7.mb-0
            LucideExternalLink(:size="14" style="vertical-align: middle;")
            |  Source:
            = ' '
            a(:href="faq.sourceUrl" target="_blank" rel="noopener noreferrer")
              | {{ faq.sourceAuthor }}
            |  &middot; {{ formatDate(faq.sourceDate) }}

    //- Back to FAQs text link
    .mt-5
      NuxtLink(to="/faqs")
        LucideArrowLeft(:size="16" style="vertical-align: middle;")
        |  Back to FAQs

//- Sticky "Back to FAQs" button on mobile (outside .section for sticky positioning)
.back-to-faqs-mobile(v-if="faq")
  NuxtLink.button.is-primary.is-fullwidth(to="/faqs")
    LucideArrowLeft(:size="16")
    |  Back to FAQs
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

// SEO metadata from FAQ content fields
useHead({ title: faq.value.question })
useSeoMeta({
  ogTitle: faq.value.question,
  ogDescription: faq.value.description || faq.value.question,
})

// Format ISO date string to human-readable (e.g. "February 9, 2026")
const formatDate = (dateStr: string): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateStr))
}
</script>

<style scoped lang="scss">
// Sticky back button -- only visible on mobile (< 1024px)
.back-to-faqs-mobile {
  display: none;

  @media (max-width: 1023px) {
    display: block;
    position: sticky;
    bottom: 0;
    padding: 0.5rem 1rem;
    background: var(--bulma-scheme-main);
    border-top: 1px solid var(--bulma-border);
    z-index: 29; // Below Bulma navbar z-index (30)
  }
}
</style>
