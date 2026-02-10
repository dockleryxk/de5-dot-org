<template lang="pug">
//- Global error page with FAQ-specific 404 handling
NuxtLayout(name="minimal")
  .container
    .column.is-half.is-offset-one-quarter.has-text-centered
      //- FAQ-specific 404: contextual message with link back to /faqs
      template(v-if="error?.statusCode === 404 && isFaqRoute")
        h1 FAQ Not Found
        p This FAQ doesn't exist or may have been removed.
        p
          NuxtLink.button.is-primary.mr-2(to="/faqs") Browse All FAQs
          NuxtLink.button.is-light(to="/") Go Home
      //- General 404: standard page not found message
      template(v-else-if="error?.statusCode === 404")
        h1 Page Not Found
        p The page you are looking for does not exist.
        NuxtLink(to="/") Go back home
      //- Non-404 errors: generic error message
      template(v-else)
        h1 Something Went Wrong
        p An unexpected error occurred.
        NuxtLink(to="/") Go back home
</template>

<script setup lang="ts">
// Global error handler
// Renders FAQ-specific 404s, general 404s, and unexpected errors
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

// Determine if the errored URL is a FAQ route (/faqs/...)
// error.url may be a full URL (http://...) or a path; extract pathname for reliable matching
const isFaqRoute = computed(() => {
  const errorUrl = props.error?.url
  if (errorUrl) {
    try {
      // Handle full URLs (e.g., "http://localhost:3001/faqs/...")
      return new URL(errorUrl).pathname.startsWith('/faqs')
    } catch {
      // Handle bare paths (e.g., "/faqs/...")
      return errorUrl.startsWith('/faqs')
    }
  }
  // Fallback: check the request URL directly
  return useRequestURL().pathname.startsWith('/faqs')
})
</script>
