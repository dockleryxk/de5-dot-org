<template lang="pug">
div
  //- Site navigation bar (fixed to top)
  nav.navbar.is-fixed-top(role="navigation" aria-label="main navigation")
    .container
      .navbar-brand
        //- Site name link
        NuxtLink.navbar-item.has-text-weight-bold(to="/") DE5.org
        //- Mobile hamburger toggle
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
      //- Collapsible navbar menu
      .navbar-menu(:class="{ 'is-active': menuOpen }")
        .navbar-end
          //- Dark mode toggle
          .navbar-item
            ThemeToggle

  //- Page content (slot for page components)
  main
    slot

  //- Site footer
  footer.footer
    .content.has-text-centered
      p &copy; {{ new Date().getFullYear() }} DE5.org — For Acura Integra Type S (DE5) owners
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
