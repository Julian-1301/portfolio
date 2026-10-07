<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '../i18n'
import { site } from '../content/site'
import SectionHead from './SectionHead.vue'

const { t, l } = useI18n()
const base = import.meta.env.BASE_URL

const tables = computed(() => [
  {
    title: t('experience'),
    rows: site.experience.map((e) => ({ main: l(e.role), sub: e.place, end: l(e.year) })),
  },
  {
    title: t('education'),
    rows: site.education.map((e) => ({ main: l(e.role), sub: e.place, end: l(e.year) })),
  },
  {
    title: t('languages'),
    rows: site.languages.map((lang) => ({
      main: l(lang.name),
      sub: l(lang.level),
      end: lang.cefr,
    })),
  },
])
</script>

<template>
  <section id="about" class="section tinted wrap" aria-labelledby="about-title">
    <SectionHead id="about-title" :title="t('aboutTitle')" />

    <div class="intro grid">
      <div class="bio">
        <p v-for="(para, i) in site.bio" :key="i">{{ l(para) }}</p>
        <a v-if="site.cv" class="cv" :href="base + site.cv" download>{{ t('downloadCv') }}</a>
      </div>
      <img
        v-if="site.photo"
        class="photo"
        :src="base + site.photo"
        :alt="t('portraitAlt')"
        width="800"
        height="1000"
        loading="lazy"
      />
    </div>

    <!-- modular grid: three short lists side by side -->
    <div class="tables grid">
      <div v-for="table in tables" :key="table.title" class="table">
        <h3>{{ table.title }}</h3>
        <ul>
          <li v-for="(row, i) in table.rows" :key="i">
            <span class="main">{{ row.main }}</span>
            <span class="end num">{{ row.end }}</span>
            <span class="sub">{{ row.sub }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section {
  margin-top: var(--space-24);
  padding-block: var(--space-16) var(--space-32);
}

.intro {
  padding-top: var(--space-6);
  border-top: 1px solid var(--ink);
}

.bio {
  grid-column: 1 / 9;
}

.bio p {
  max-width: 34ch;
  font-family: var(--font-read);
  font-size: var(--step-2);
  font-weight: 400;
  line-height: 1.3;
  letter-spacing: -0.01em;
}

.bio p + p {
  margin-top: var(--space-6);
  color: var(--muted);
}

.photo {
  grid-column: 9 / 13;
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  background: var(--surface);
}

.cv {
  display: inline-block;
  margin-top: var(--space-8);
  padding: var(--space-3) var(--space-6);
  background: var(--pop);
  color: var(--pop-ink);
  font-weight: 500;
  transition: transform var(--dur-fast) var(--ease);
}

.cv:hover {
  transform: translateY(-2px);
}

.tables {
  margin-top: var(--space-24);
  row-gap: var(--space-12);
}

.table {
  grid-column: span 4;
}

.table h3 {
  padding-bottom: var(--space-2);
  border-bottom: 1px solid var(--ink);
  color: var(--muted);
  font-size: var(--step--1);
  font-weight: 500;
}

.table li {
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: var(--space-4);
  padding-block: var(--space-3);
  border-bottom: 1px solid var(--line);
  transition: color var(--dur) var(--ease);
}

.main {
  font-weight: 500;
  transition: font-weight var(--dur) var(--ease);
}

.end,
.sub {
  color: var(--muted);
}

.sub {
  grid-column: 1 / -1;
  font-size: var(--step--1);
}

/* weight follows attention: the hovered row gets heavier, the rest step back */
@media (hover: hover) {
  .table ul:hover li {
    color: var(--muted);
  }

  .table ul li:hover {
    color: var(--ink);
  }

  .table ul li:hover .main {
    font-weight: 650;
  }
}

@media (max-width: 860px) {
  .bio,
  .photo,
  .table {
    grid-column: 1 / -1;
  }

  .photo {
    margin-top: var(--space-8);
    max-width: 66%;
  }

  .bio p {
    font-size: var(--step-1);
  }
}
</style>
