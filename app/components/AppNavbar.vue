<template lang="pug">
//- Site navigation bar (fixed to top)
nav.navbar.is-fixed-top(role="navigation" aria-label="main navigation")
  .container
    .navbar-brand
      //- Site name link
      NuxtLink.navbar-item.has-text-weight-bold(to="/") DE5.org
      //- Theme toggle in navbar-brand = always visible at all viewport sizes
      .navbar-item
        ThemeToggle
      //- Mobile hamburger toggle (must be last child of navbar-brand)
      a.navbar-burger(
        role="button"
        aria-label="menu"
        :aria-expanded="menuOpen"
        :class="{ 'is-active': menuOpen }"
        @click="menuOpen = !menuOpen"
      )
        span(aria-hidden="true")
        span(aria-hidden="true")
        span(aria-hidden="true")
        span(aria-hidden="true")
    //- Collapsible navbar menu (desktop: visible, mobile: toggle via hamburger)
    .navbar-menu(:class="{ 'is-active': menuOpen }")
      .navbar-end
        //- FAQ listing link
        NuxtLink.navbar-item(to="/faqs") FAQs
</template>

<script setup lang="ts">
// Mobile menu toggle state
const menuOpen = ref(false)

// Close mobile menu when route changes (prevents menu staying open after navigation)
const route = useRoute()
watch(
  () => route.path,
  () => {
    menuOpen.value = false
  },
)
</script>
