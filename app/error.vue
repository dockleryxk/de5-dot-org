<template lang="pug">
NuxtLayout(name="minimal")
  div
    h1 {{ error?.statusCode === 404 ? 'Page Not Found' : 'Something Went Wrong' }}
    p {{ error?.statusCode === 404 ? 'The page you are looking for does not exist.' : 'An unexpected error occurred.' }}
    NuxtLink(to="/") Go back home
</template>

<script setup lang="ts">
// Global error handler
// Renders for both 404s and unexpected errors
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError
}>()
</script>
