<template lang="pug">
div
  //- Site header
  header
    nav
      NuxtLink(to="/") DE5.org

  //- Page content
  main
    slot

  //- Site footer
  footer
    p &copy; {{ new Date().getFullYear() }} DE5.org — For Acura Integra Type S (DE5) owners
</template>
