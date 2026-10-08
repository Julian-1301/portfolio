<script setup lang="ts">
import { watchEffect } from 'vue'
import { useI18n } from '../i18n'
import { site } from '../content/site'
import WeightText from '../components/WeightText.vue'

const { t } = useI18n()

// the tab says what happened, also when a project link is wrong (ProjectView renders this page)
watchEffect(() => {
  document.title = `${t('notFoundTitle')}, ${site.name}`
})
</script>

<template>
  <main id="main" class="not-found field wrap" tabindex="-1" data-weight-area>
    <div class="grid">
      <h1><WeightText text="404" :settle="false" :min="450" :reach="1.1" /></h1>
      <div class="text">
        <h2>{{ t('notFoundTitle') }}</h2>
        <p>{{ t('notFoundBody') }}</p>
        <RouterLink to="/">
          <span class="grow-line">{{ t('notFoundHome') }}</span> <span aria-hidden="true">→</span>
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<style scoped>
.not-found {
  min-height: calc(100svh - var(--nav-h));
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

/* the same growing coral underline as every other link on the site */
a {
  font-weight: 500;
}

@media (max-width: 860px) {
  .text {
    grid-column: 1 / -1;
  }
}
</style>
