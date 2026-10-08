<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch, watchEffect } from 'vue'
import { useI18n } from '../i18n'
import { getProject, nextProject } from '../content/projects'
import { site } from '../content/site'
import MediaGroup from '../components/MediaGroup.vue'
import WeightText from '../components/WeightText.vue'
import FigureRow from '../components/FigureRow.vue'
import CodeExcerpt from '../components/CodeExcerpt.vue'
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
          <dt class="visually-hidden">{{ t('projectSummary') }}</dt>
          <dd>{{ l(project.summary) }}</dd>
        </div>
        <div class="fact role">
          <dt>{{ t('projectRole') }}</dt>
          <dd>{{ l(project.role) }}</dd>
        </div>
        <div class="fact context">
          <dt>{{ t('projectContext') }}</dt>
          <dd>{{ l(project.context) }}</dd>
        </div>
        <div class="fact stack">
          <dt>{{ t('projectStack') }}</dt>
          <!-- each tool stays on one line, so names like d3-geo never break at the hyphen -->
          <dd>
            <template v-for="(tool, i) in project.stack" :key="tool">
              <span class="tool-name">{{ tool }}</span
              ><template v-if="i < project.stack.length - 1">, </template>
            </template>
          </dd>
        </div>
        <div class="fact year">
          <dt>{{ t('projectYear') }}</dt>
          <dd>{{ project.year }}</dd>
        </div>
        <!-- engineers look for the code first, so it always has a fact, even before it is public -->
        <div class="fact code">
          <dt>{{ t('projectCode') }}</dt>
          <dd>
            <a v-if="project.links.repo" :href="project.links.repo" target="_blank" rel="noopener">
              <span class="grow-line">{{ t('projectRepo') }}</span> <span aria-hidden="true">↗</span>
              <span class="visually-hidden"> ({{ t('newTab') }})</span>
            </a>
            <span v-else class="soon">{{ t('projectCodeSoon') }}</span>
          </dd>
        </div>
        <div v-if="project.links.live" class="fact site">
          <dt>{{ t('projectSite') }}</dt>
          <dd>
            <a :href="project.links.live" target="_blank" rel="noopener">
              <span class="grow-line">{{ t('projectLive') }}</span> <span aria-hidden="true">↗</span>
              <span class="visually-hidden"> ({{ t('newTab') }})</span>
            </a>
          </dd>
        </div>
      </dl>
    </header>

    <article class="case wrap">
      <!-- the cover overlaps the green block, like a print laid on top of the page -->
      <MediaGroup
        class="cover"
        :slug="project.slug"
        :media="project.hero ?? project.cover"
        matted
        zoomable
        eager
      />

      <!-- the numbers follow the picture, so the work itself is the first thing below the header -->
      <FigureRow v-if="project.figures" class="case-figures" :figures="project.figures" />

      <!-- a map of the case study, so a reader looking for one part (the problems, the reflection) jumps there -->
      <nav class="chapters" :aria-label="t('projectChapters')">
        <ol>
          <!-- plain anchors: RouterLink ignores the hash and would mark every chapter as the current page -->
          <li v-for="(section, i) in project.sections" :key="`toc-${project.slug}-${i}`">
            <RouterLink v-slot="{ href, navigate }" :to="{ hash: `#chapter-${i}` }" custom>
              <a :href="href" @click="navigate">
                <span class="grow-line">{{ l(section.heading) }}</span>
              </a>
            </RouterLink>
          </li>
        </ol>
      </nav>

      <section
        v-for="(section, i) in project.sections"
        :key="`${project.slug}-${i}`"
        class="chapter grid"
        :class="{ ledger: section.notes }"
        :aria-labelledby="`chapter-${i}`"
      >
        <h2 :id="`chapter-${i}`" class="chapter-title" data-weight-area>
          <WeightText :text="l(section.heading)" />
        </h2>
        <div class="text">
          <p v-for="(para, j) in section.paragraphs" :key="j">{{ l(para) }}</p>
        </div>
        <ol v-if="section.notes" class="notes" :aria-label="t('projectNotes')">
          <li v-for="(note, j) in section.notes" :key="j">
            <h3>{{ l(note.title) }}</h3>
            <p>{{ l(note.body) }}</p>
          </li>
        </ol>
        <CodeExcerpt v-if="section.code" class="chapter-code" :code="section.code" />
        <MediaGroup
          v-if="section.media"
          class="chapter-media"
          :slug="project.slug"
          :media="section.media"
          matted
          zoomable
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
  padding-block: var(--space-8) var(--space-24);
}

.back {
  display: inline-block;
  padding-block: var(--hit);
  margin-block: calc(var(--hit) * -1);
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
  font-family: var(--font-read);
  font-size: var(--step-1);
  line-height: 1.35;
}

/*
  The facts sit in a fixed block beside the summary: who, for what and when on the first row,
  what it is built with and where the code is on the second. Every fact has its own cell.
*/
.summary {
  grid-row: 1 / span 3;
}

.role {
  grid-column: 6 / 9;
  grid-row: 1;
}

.context {
  grid-column: 9 / 11;
  grid-row: 1;
}

.year {
  grid-column: 11 / 13;
  grid-row: 1;
}

.stack {
  grid-column: 6 / 9;
  grid-row: 2;
}

.code {
  grid-column: 9 / 13;
  grid-row: 2;
}

.site {
  grid-column: 9 / 13;
  grid-row: 3;
}

.tool-name {
  white-space: nowrap;
}

.soon {
  color: var(--muted);
}

.case-figures {
  margin-top: var(--space-12);
}

.case {
  padding-bottom: var(--space-24);
}

.cover {
  margin-top: calc(var(--space-16) * -1);
}

.chapters {
  margin-top: var(--space-16);
  padding-top: var(--space-2);
  border-top: 1px solid var(--line);
}

.chapters ol {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2) var(--space-6);
  padding: 0;
  list-style: none;
}

.chapters a {
  display: inline-block;
  padding-block: var(--space-2);
  font-weight: 500;
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
  max-width: 60ch;
  font-family: var(--font-read);
  font-size: var(--step-1);
  line-height: 1.55;
}

.text p + p {
  margin-top: var(--space-4);
}

/*
  The chapter with numbered problems breaks the rhythm on purpose: a full-width pale green band
  where the problems sit side by side like a ledger, the number in the margin of each.
*/
.ledger {
  margin-inline: calc(var(--gutter) * -1);
  padding: var(--space-4) var(--gutter) var(--space-16);
  border-top: 0;
  background: var(--tint);
  --line: var(--tint-line);
}

.notes {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: var(--col-gap);
  counter-reset: note;
}

.notes li {
  counter-increment: note;
  display: grid;
  grid-template-columns: 2.5rem 1fr;
  column-gap: var(--space-4);
  align-content: start;
  padding-block: var(--space-6) var(--space-8);
  border-top: 1px solid var(--ink);
}

.notes li::before {
  content: counter(note, decimal-leading-zero);
  grid-row: span 2;
  color: var(--accent);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  line-height: 1.6;
}

.notes h3 {
  font-size: var(--step-1);
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.01em;
}

.notes p {
  max-width: 52ch;
  margin-top: var(--space-2);
  font-family: var(--font-read);
  line-height: 1.55;
}

.chapter-code {
  grid-column: 1 / -1;
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
  .chapter-title,
  .text {
    grid-column: 1 / -1;
    padding-right: 0;
  }

  .summary,
  .fact {
    grid-row: auto;
  }

  .fact {
    grid-column: span 6;
  }

  /* the long facts get the full width on a phone; the two short ones (context, year) pair up */
  .facts {
    grid-auto-flow: row dense;
  }

  .role,
  .stack,
  .code,
  .site {
    grid-column: 1 / -1;
  }

  .notes {
    grid-template-columns: 1fr;
  }

  .intro {
    padding-bottom: var(--space-24);
  }

  .cover {
    margin-top: calc(var(--space-16) * -1);
  }
}
</style>
