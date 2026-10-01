<script setup lang="ts">
import { useI18n, type Localized, type Locale } from '../i18n'

/**
 * Shows text in the current language, but reserves the space of the longest translation.
 * Both versions sit in the same grid cell and only the active one is visible, so switching
 * language never makes the layout jump.
 */
defineProps<{ text: Localized }>()

const { locale } = useI18n()
const locales: Locale[] = ['en', 'nl']
</script>

<template>
  <span class="stable">
    <span
      v-for="code in locales"
      :key="code"
      :class="{ hidden: code !== locale }"
      :aria-hidden="code !== locale"
      :lang="code"
    >
      {{ text[code] }}
    </span>
  </span>
</template>

<style scoped>
.stable {
  display: inline-grid;
  width: 100%;
}

.stable > span {
  grid-area: 1 / 1;
}

.hidden {
  visibility: hidden;
}
</style>
