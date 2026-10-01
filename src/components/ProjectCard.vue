<script setup lang="ts">
import { useI18n } from '../i18n'
import type { Project } from '../content/projects'
import MediaGroup from './MediaGroup.vue'

defineProps<{ project: Project }>()

const { l } = useI18n()
</script>

<template>
  <RouterLink :to="{ name: 'project', params: { slug: project.slug } }" class="card">
    <MediaGroup class="cover" :slug="project.slug" :media="project.cover" />
    <div class="caption">
      <h3 class="title">
        <span class="grow-line">{{ project.title }}</span>
      </h3>
      <span class="year">{{ project.year }}</span>
      <p class="summary">{{ l(project.summary) }}</p>
      <p class="meta">{{ l(project.context) }}, {{ l(project.discipline) }}</p>
    </div>
  </RouterLink>
</template>

<style scoped>
.card {
  display: block;
}

.cover :deep(.shot) {
  transition: transform var(--dur-slow) var(--ease);
}

.card:hover .cover :deep(.shot) {
  transform: scale(1.03);
}

.caption {
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: var(--space-4);
  margin-top: var(--space-4);
}

.title {
  font-size: var(--step-2);
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: -0.025em;
  transition: font-weight var(--dur) var(--ease);
}

.card:hover .title,
.card:focus-visible .title {
  font-weight: 650;
}

.year {
  align-self: start;
  margin-top: 0.3em;
  color: var(--muted);
}

.summary {
  grid-column: 1 / -1;
  max-width: 44ch;
  margin-top: var(--space-2);
  color: var(--muted);
}

.meta {
  grid-column: 1 / -1;
  margin-top: var(--space-1);
  color: var(--muted);
  font-size: var(--step--1);
}
</style>
