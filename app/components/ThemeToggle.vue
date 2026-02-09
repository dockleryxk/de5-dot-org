<template lang="pug">
//- Dark mode toggle button
button.theme-toggle(
  @click="toggle"
  :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  type="button"
)
  //- Sun icon in dark mode (click to go light), moon icon in light mode (click to go dark)
  LucideSun(v-if="isDark" :size="20")
  LucideMoon(v-else :size="20")
</template>

<script setup lang="ts">
// Dark mode toggle using @nuxtjs/color-mode
const colorMode = useColorMode()

// Reactive dark mode state
const isDark = computed(() => colorMode.value === 'dark')

// Toggle between light and dark
const toggle = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<style lang="scss" scoped>
// Toggle button -- minimal, accessible, touch-friendly
.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: vars.$spacing-sm;
  color: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
  border-radius: vars.$radius-default;
  transition: background-color vars.$transition-fast;

  &:hover {
    background-color: rgba(128, 128, 128, 0.1);
  }
}
</style>
