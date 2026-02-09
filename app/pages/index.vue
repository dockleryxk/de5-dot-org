<template lang="pug">
//- Homepage with styled placeholder content
section.section
  .container
    //- Page heading
    h1.title DE5.org
    h2.subtitle Community knowledge hub for Acura Integra Type S (DE5) owners

    //- Content block demonstrating Bulma .content auto-styling
    .content
      p.
        Curated FAQs, maintenance guides, and community knowledge
        for the Acura Integra Type S — all in one place.
      p
        em Coming soon — curated FAQs, search, and community knowledge.

    //- Sample cards demonstrating Bulma box/columns styling
    .columns.is-multiline
      .column.is-one-third
        .box
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
