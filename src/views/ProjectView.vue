<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch, watchEffect } from 'vue'
import { useI18n } from '../i18n'
import { getProject, nextProject } from '../content/projects'
import { site } from '../content/site'
import MediaGroup from '../components/MediaGroup.vue'
import WeightText from '../components/WeightText.vue'
import ContactSection from '../components/ContactSection.vue'
import NotFoundView from './NotFoundView.vue'

const props = defineProps<{ slug: string }>()

const { t, l } = useI18n()
const project = computed(() => getProject(props.slug))
const next = computed(() => nextProject(props.slug))

watchEffect(() => {
  document.title = project.value ? `${project.value.title}, ${site.name}` : site.name
})

// same entrance as the homepage: one ink stroke through the title
const title = ref<InstanceType<typeof WeightText> | null>(null)
const strokeTitle = () => setTimeout(() => title.value?.sweep(1400), 250)
onMounted(strokeTitle)
watch(
  () => props.slug,
  () => nextTick(strokeTitle),
)
</script>

<template>
  <NotFoundView v-if="!project" />

  <main v-else id="main" tabindex="-1">
    <header class="intro field wrap" data-weight-area>
      <RouterLink class="back" :to="{ path: '/', hash: '#projects' }">
        ← <span class="grow-line">{{ t('projectBack') }}</span>
      </RouterLink>

      <div class="grid">
        <h1 class="title">
          <WeightText ref="title" :key="project.slug" :text="project.title" :settle="false" />
        </h1>
      </div>

      <dl class="facts grid">
        <div class="summary">
          <dt class="visually-hidden">{{ project.title }}</dt>
          <dd>{{ l(project.summary) }}</dd>
        </div>
        <div class="fact role">
          <dt>{{ t('projectRole') }}</dt>
          <dd>{{ l(project.role) }}</dd>
        </div>
        <div class="fact">
          <dt>{{ t('projectContext') }}</dt>
          <dd>{{ l(project.context) }}</dd>
        </div>
        <div class="fact">
          <dt>{{ t('projectStack') }}</dt>
          <dd>{{ project.stack.join(', ') }}</dd>
        </div>
        <div class="fact year">
          <dt>{{ t('projectYear') }}</dt>
          <dd>{{ project.year }}</dd>
        </div>
        <div v-if="project.links.live || project.links.repo" class="links">
          <a v-if="project.links.live" :href="project.links.live" target="_blank" rel="noopener">
            <span class="grow-line">{{ t('projectLive') }}</span> ↗
          </a>
          <a v-if="project.links.repo" :href="project.links.repo" target="_blank" rel="noopener">
            <span class="grow-line">{{ t('projectRepo') }}</span> ↗
          </a>
        </div>
      </dl>
    </header>

    <article class="case wrap">
      <!-- the cover overlaps the green block, like a print laid on top of the page -->
      <MediaGroup class="cover" :slug="project.slug" :media="project.cover" eager />

      <section
        v-for="(section, i) in project.sections"
        :key="`${project.slug}-${i}`"
        class="chapter grid"
        :aria-labelledby="`chapter-${i}`"
      >
        <h2 :id="`chapter-${i}`" class="chapter-title" data-weight-area>
          <WeightText :text="l(section.heading)" />
        </h2>
        <div class="text">
          <p v-for="(para, j) in section.paragraphs" :key="j">{{ l(para) }}</p>
        </div>
        <MediaGroup
          v-if="section.media"
          class="chapter-media"
          :slug="project.slug"
          :media="section.media"
        />
      </section>

      <RouterLink
        v-if="next"
        class="next"
        :to="{ name: 'project', params: { slug: next.slug } }"
        data-weight-area
      >
        <span class="next-label">{{ t('projectNext') }}</span>
        <span class="next-title">
          <WeightText :key="next.slug" :text="next.title" />
          <span aria-hidden="true"> →</span>
        </span>
      </RouterLink>
    </article>

    <ContactSection />
  </main>
</template>

<style scoped>
.intro {
  padding-block: var(--space-8) var(--space-32);
}

.back {
  display: inline-block;
  color: var(--muted);
  transition: color var(--dur-fast) var(--ease);
}

.back:hover,
.back:focus-visible {
  color: var(--field-ink);
}

.title {
  grid-column: 1 / -1;
  margin-top: var(--space-12);
  margin-left: -0.04em;
  font-size: clamp(3rem, 11vw, 11rem);
  font-weight: 500;
  line-height: 0.9;
  letter-spacing: -0.045em;
}

.facts {
  margin-top: var(--space-8);
  padding-top: var(--space-4);
  border-top: 1px solid var(--field-ink);
  row-gap: var(--space-6);
}

.facts dt {
  margin-bottom: var(--space-1);
  color: var(--muted);
  font-size: var(--step--1);
}

.summary {
  grid-column: 1 / 5;
  padding-right: var(--space-8);
  font-size: var(--step-1);
  line-height: 1.35;
}

.fact {
  grid-column: span 2;
}

.role {
  grid-column: 6 / 8;
}

.year {
  grid-column: 12 / 13;
}

.links {
  grid-column: 6 / 13;
  display: flex;
  gap: var(--space-6);
}

.case {
  padding-bottom: var(--space-24);
}

.cover {
  margin-top: calc(var(--space-24) * -1);
}

.chapter {
  margin-top: var(--space-24);
  padding-top: var(--space-4);
  border-top: 1px solid var(--ink);
  row-gap: var(--space-8);
}

.chapter-title {
  grid-column: 1 / 6;
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.035em;
}

.text {
  grid-column: 7 / 12;
}

.text p {
  max-width: 62ch;
  font-size: var(--step-1);
  line-height: 1.5;
}

.text p + p {
  margin-top: var(--space-4);
}

.chapter-media {
  grid-column: 1 / -1;
}

.next {
  display: block;
  margin-top: var(--space-32);
  padding-top: var(--space-4);
  border-top: 1px solid var(--ink);
}

.next-label {
  display: block;
  color: var(--muted);
}

.next-title {
  display: block;
  margin-top: var(--space-4);
  font-size: var(--step-3);
  font-weight: 500;
  line-height: 0.95;
  letter-spacing: -0.04em;
}

@media (max-width: 860px) {
  .summary,
  .role,
  .year,
  .links,
  .chapter-title,
  .text {
    grid-column: 1 / -1;
    padding-right: 0;
  }

  .fact {
    grid-column: span 6;
  }

  .intro {
    padding-bottom: var(--space-24);
  }

  .cover {
    margin-top: calc(var(--space-16) * -1);
  }
}
</style>
