<script setup lang="ts">
import { useI18n } from '../i18n'
import type { Project } from '../content/projects'
import MediaGroup from './MediaGroup.vue'
import WeightText from './WeightText.vue'
import FigureRow from './FigureRow.vue'

/** The strongest project, as a full spread: big screen on the left, the story on the right, numbers below. */
defineProps<{ project: Project }>()

const { t, l } = useI18n()
</script>

<template>
  <article class="lead grid" :aria-labelledby="`lead-${project.slug}`">
    <RouterLink
      class="cover"
      :to="{ name: 'project', params: { slug: project.slug } }"
      tabindex="-1"
      aria-hidden="true"
    >
      <MediaGroup :slug="project.slug" :media="project.cover" matted />
    </RouterLink>

    <div class="text">
      <p class="meta">{{ project.year }}, {{ l(project.context) }}</p>
      <h3 :id="`lead-${project.slug}`" class="title" data-weight-area>
        <RouterLink :to="{ name: 'project', params: { slug: project.slug } }">
          <WeightText :text="project.title" />
        </RouterLink>
      </h3>
      <p class="summary">{{ l(project.summary) }}</p>
      <p class="stack">{{ project.stack.join(', ') }}</p>
      <RouterLink class="read" :to="{ name: 'project', params: { slug: project.slug } }">
        <span class="grow-line">{{ t('projectRead') }}</span> <span aria-hidden="true">→</span>
      </RouterLink>
    </div>

    <FigureRow v-if="project.figures" class="figures" :figures="project.figures" />
  </article>
</template>

<style scoped>
.lead {
  padding-top: var(--space-8);
  border-top: 1px solid var(--ink);
  row-gap: var(--space-12);
}

.cover {
  grid-column: 1 / 9;
}

.cover :deep(.shot) {
  transition: transform var(--dur-slow) var(--ease);
}

@media (hover: hover) {
  .cover:hover :deep(.shot-1) {
    transform: scale(1.02);
  }
}

.text {
  grid-column: 9 / 13;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.meta,
.stack {
  color: var(--muted);
  font-size: var(--step--1);
}

.title {
  margin-top: var(--space-3);
  font-size: clamp(2.25rem, 4.4vw, 4.25rem);
  font-weight: 500;
  line-height: 0.95;
  letter-spacing: -0.04em;
}

.summary {
  max-width: 34ch;
  margin-top: var(--space-6);
  font-family: var(--font-read);
  font-size: var(--step-1);
  line-height: 1.45;
}

.stack {
  margin-block: var(--space-4) var(--space-8);
}

/* pushed to the bottom with margin, not padding, so the focus ring fits the link itself */
.read {
  margin-top: auto;
  font-weight: 500;
}

.figures {
  grid-column: 1 / -1;
}

@media (max-width: 860px) {
  .cover,
  .text {
    grid-column: 1 / -1;
  }

  .lead {
    padding-top: var(--space-4);
    row-gap: var(--space-8);
  }
}
</style>
