<script setup lang="ts">
import { useI18n } from '../i18n'
import type { Figure } from '../content/projects'

/** A project's hard numbers in a row, large and tabular, with a short label under each. */
defineProps<{ figures: Figure[] }>()

const { l, locale } = useI18n()

// 11,934 in English, 11.934 in Dutch
const format = (value: number) => value.toLocaleString(locale.value === 'nl' ? 'nl-NL' : 'en-GB')
</script>

<template>
  <ul class="figures">
    <li v-for="figure in figures" :key="figure.value">
      <span class="value">{{ format(figure.value) }}</span>
      <span class="label">{{ l(figure.label) }}</span>
    </li>
  </ul>
</template>

<style scoped>
.figures {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  column-gap: var(--col-gap);
  row-gap: var(--space-6);
}

li {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding-top: var(--space-3);
  border-top: 1px solid var(--line);
}

.value {
  font-size: clamp(2rem, 4.4vw, 4rem);
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  line-height: 1;
  letter-spacing: -0.04em;
}

.label {
  max-width: 18ch;
  color: var(--muted);
  font-size: var(--step--1);
}
</style>
