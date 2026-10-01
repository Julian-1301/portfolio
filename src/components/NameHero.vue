<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from '../i18n'
import { site } from '../content/site'
import WeightText from './WeightText.vue'
import StableText from './StableText.vue'

const { t } = useI18n()

const lines = ref<InstanceType<typeof WeightText>[]>([])

// On load a wave runs once through the name, so visitors see that the type reacts.
onMounted(() => {
  lines.value.forEach((line, i) => setTimeout(() => line.sweep(1500), 250 + i * 180))
})
</script>

<template>
  <section class="hero field wrap" data-weight-area aria-labelledby="hero-name">
    <div class="grid">
      <h1 id="hero-name" class="name">
        <WeightText
          v-for="line in site.nameLines"
          :key="line"
          ref="lines"
          :text="line"
          class="line"
          :settle="false"
          :reach="0.8"
        />
      </h1>
    </div>

    <dl class="facts grid">
      <div class="fact lead">
        <dt class="visually-hidden">{{ site.name }}</dt>
        <dd><StableText :text="site.lead" /></dd>
      </div>
      <div class="fact study">
        <dt>{{ t('factStudy') }}</dt>
        <dd><StableText :text="site.study" /></dd>
      </div>
    </dl>
  </section>
</template>

<style scoped>
/*
  Fills exactly one screen below the nav, in every language. The facts sit at the bottom and
  reserve the space of the longest translation, so the line above them never moves.
*/
.hero {
  display: flex;
  flex-direction: column;
  min-height: calc(100svh - var(--nav-h));
  padding-block: var(--space-8);
}

.hero > .grid {
  margin-bottom: var(--space-8);
}

.name {
  grid-column: 1 / -1;
  margin-left: -0.05em;
  /* as wide as the grid allows, but never so tall that the hero spills past one screen */
  font-size: min(var(--step-hero), 35svh);
  font-weight: 500;
  line-height: 0.86;
  letter-spacing: -0.045em;
  user-select: none;
}

.line {
  display: block;
  white-space: nowrap;
}

.facts {
  margin-top: auto;
  padding-top: var(--space-4);
  border-top: 1px solid var(--field-ink);
  row-gap: var(--space-6);
}

.fact dt {
  margin-bottom: var(--space-1);
  color: var(--muted);
  font-size: var(--step--1);
}

.lead {
  grid-column: 1 / 7;
  padding-right: var(--space-8);
  font-size: var(--step-1);
  line-height: 1.35;
}

.study {
  grid-column: 9 / 13;
}

@media (max-width: 860px) {
  .hero {
    padding-top: var(--space-12);
  }

  .lead,
  .study {
    grid-column: 1 / -1;
    padding-right: 0;
  }
}
</style>
