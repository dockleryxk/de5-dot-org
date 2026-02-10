<template lang="pug">
//- Homepage with FAQ call-to-action and feature cards
section.section
  .container
    //- Page heading
    h1.title DE5.org
    h2.subtitle Community knowledge hub for Acura Integra Type S (DE5) owners

    //- Intro text and primary CTA
    .content
      p.
        Curated FAQs, maintenance guides, and community knowledge
        for the Acura Integra Type S — all in one place.

      //- Call-to-action linking to FAQ listing
      NuxtLink.button.is-primary.is-medium(to="/faqs") Browse FAQs

    //- Feature cards highlighting key content areas
    .columns.is-multiline.mt-4
      .column.is-one-third
        //- FAQs card links to the FAQ listing page
        NuxtLink.box(to="/faqs" style="display: block;")
          h3.title.is-5 FAQs
          p Common questions answered with sources.
      .column.is-one-third
        .box
          h3.title.is-5 Guides
          p Maintenance and modification guides.
      .column.is-one-third
        .box
          h3.title.is-5 Community
          p Knowledge from forums and owners.
</template>

<script setup lang="ts">
// Homepage metadata
useHead({
  title: 'Home',
})
</script>
