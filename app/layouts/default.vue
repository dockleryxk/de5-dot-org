<template lang="pug">
div
  //- Site navigation bar
  AppNavbar

  //- Page content (slot for page components)
  main
    slot

  //- Site footer
  footer.footer
    .content.has-text-centered
      p &copy; {{ new Date().getFullYear() }} DE5.org — For Acura Integra Type S (DE5) owners
</template>
