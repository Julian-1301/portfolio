<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '../i18n'
import { sortedProjects } from '../content/projects'
import SectionHead from './SectionHead.vue'
import ProjectCard from './ProjectCard.vue'

const { t, l } = useI18n()
const projects = computed(() => sortedProjects())
const featured = computed(() => projects.value.filter((p) => p.featured))
const more = computed(() => projects.value.filter((p) => !p.featured))
</script>

<template>
  <section id="projects" class="section wrap" aria-labelledby="projects-title">
    <SectionHead
      id="projects-title"
      :title="t('projectsTitle')"
      :note="projects.length ? t('projectsNote') : undefined"
    />

    <div v-if="!projects.length" class="empty">
      <p>{{ t('projectsEmpty') }}</p>
    </div>

    <!-- mixed sizes, staggered like a printed spread, so the grid has rhythm -->
    <ul v-if="featured.length" class="featured grid">
      <li v-for="project in featured" :key="project.slug">
        <ProjectCard :project="project" />
      </li>
    </ul>

    <div v-if="more.length" class="more">
      <h3>{{ t('projectsMore') }}</h3>
      <ul>
        <li v-for="project in more" :key="project.slug">
          <RouterLink :to="{ name: 'project', params: { slug: project.slug } }" class="row">
            <span class="name"
              ><span class="grow-line">{{ project.title }}</span></span
            >
            <span class="context">{{ l(project.context) }}</span>
            <span class="year">{{ project.year }}</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.section {
  padding-top: var(--space-24);
}

.empty {
  padding-top: var(--space-6);
  border-top: 1px solid var(--ink);
}

.empty p {
  max-width: 28ch;
  font-size: var(--step-2);
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: -0.015em;
}

.featured {
  padding-top: var(--space-8);
  border-top: 1px solid var(--ink);
  row-gap: var(--space-16);
}

/* a repeating pattern of four: large, small and dropped, small and inset, large and dropped */
.featured li:nth-child(4n + 1) {
  grid-column: 1 / 8;
}

.featured li:nth-child(4n + 2) {
  grid-column: 9 / 13;
  margin-top: var(--space-32);
}

.featured li:nth-child(4n + 3) {
  grid-column: 2 / 7;
}

.featured li:nth-child(4n + 4) {
  grid-column: 8 / 13;
  margin-top: var(--space-24);
}

/* the project you point at stays, the others step back */
@media (hover: hover) {
  .featured:has(.card:hover) li:not(:hover) {
    opacity: 0.45;
  }

  .featured li {
    transition: opacity var(--dur) var(--ease);
  }
}

.more {
  margin-top: var(--space-24);
}

.more h3 {
  padding-bottom: var(--space-2);
  border-bottom: 1px solid var(--ink);
  color: var(--muted);
  font-size: var(--step--1);
  font-weight: 500;
}

.row {
  display: grid;
  grid-template-columns: 6fr 4fr 2fr;
  gap: var(--col-gap);
  align-items: baseline;
  padding-block: var(--space-4);
  border-bottom: 1px solid var(--line);
  transition: color var(--dur) var(--ease);
}

.name {
  font-size: var(--step-1);
  font-weight: 500;
  transition: font-weight var(--dur) var(--ease);
}

.context,
.year {
  color: var(--muted);
}

.year {
  text-align: right;
}

@media (hover: hover) {
  .more ul:hover .row {
    color: var(--muted);
  }

  .more .row:hover {
    color: var(--ink);
  }

  .more .row:hover .name {
    font-weight: 650;
  }
}

@media (max-width: 860px) {
  .featured li:nth-child(n) {
    grid-column: 1 / -1;
    margin-top: 0;
  }

  .row {
    grid-template-columns: 1fr auto;
  }

  .context {
    display: none;
  }
}
</style>
