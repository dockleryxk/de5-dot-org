<template lang="pug">
//- FAQ listing page -- shows all curated questions sorted by most recent
section.section
  .container
    //- Page heading
    h1.title Frequently Asked Questions

    //- Intro paragraph doubling as listing-level disclaimer
    p.subtitle.has-text-grey
      | Community-sourced answers for Acura Integra Type S (DE5) owners.
      | Information is aggregated from forums and owner experiences
      | &mdash; it is not verified, endorsed, or guaranteed. See our
      = ' '
      NuxtLink(to="/terms") full disclaimer
      | .

    //- FAQ list -- flat, sorted by most recent, with dividers
    template(v-if="faqs && faqs.length")
      .faq-list
        NuxtLink.faq-list-item(
          v-for="faq in faqs"
          :key="faq.path"
          :to="faq.path"
        )
          span.faq-question {{ faq.question }}

    //- Empty state when no FAQs exist
    template(v-else)
      p.has-text-grey No FAQs yet. Check back soon.
</template>

<script setup lang="ts">
// Fetch all FAQs sorted by most recently updated
const { data: faqs } = await useAsyncData('faq-list', () => {
  return queryCollection('faqs')
    .select('path', 'question', 'lastUpdated')
    .order('lastUpdated', 'DESC')
    .all()
})

// Page SEO metadata
useHead({ title: 'Frequently Asked Questions' })
useSeoMeta({
  ogTitle: 'Frequently Asked Questions | DE5.org',
  ogDescription: 'Community-sourced answers to common Acura Integra Type S questions.',
})
</script>

<style scoped lang="scss">
@use '~/assets/scss/variables' as vars;

// FAQ list item -- block link with subtle hover highlight and bottom border
.faq-list-item {
  display: block;
  padding: vars.$spacing-md vars.$spacing-sm;
  border-bottom: 1px solid var(--bulma-border);
  text-decoration: none;
  color: inherit;
  transition: background-color vars.$transition-fast;

  &:hover {
    background-color: var(--bulma-scheme-main-bis);
  }

  &:last-child {
    border-bottom: none;
  }
}

// FAQ question text -- medium weight for readable emphasis
.faq-question {
  font-weight: 500;
}
</style>
