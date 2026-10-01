<script setup lang="ts">
import { useI18n } from '../i18n'
import WeightText from '../components/WeightText.vue'

const { t } = useI18n()
</script>

<template>
  <main id="main" class="not-found field wrap" tabindex="-1" data-weight-area>
    <div class="grid">
      <h1><WeightText text="404" :settle="false" :reach="0.8" /></h1>
      <div class="text">
        <h2>{{ t('notFoundTitle') }}</h2>
        <p>{{ t('notFoundBody') }}</p>
        <RouterLink to="/">{{ t('notFoundHome') }} →</RouterLink>
      </div>
    </div>
  </main>
</template>

<style scoped>
.not-found {
  min-height: calc(100svh - 58px);
  padding-block: var(--space-16);
}

h1 {
  grid-column: 1 / -1;
  font-size: var(--step-hero);
  font-weight: 500;
  line-height: 0.86;
  letter-spacing: -0.045em;
}

.text {
  grid-column: 1 / 7;
  margin-top: var(--space-12);
  padding-top: var(--space-4);
  border-top: 1px solid var(--field-ink);
}

h2 {
  font-size: var(--step-2);
  font-weight: 600;
}

p {
  margin-block: var(--space-2) var(--space-8);
  color: var(--muted);
  max-width: var(--measure);
}

a {
  border-bottom: 1px solid currentColor;
}

@media (max-width: 860px) {
  .text {
    grid-column: 1 / -1;
  }
}
</style>
