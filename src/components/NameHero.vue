<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from '../i18n'
import { site } from '../content/site'
import { leadProject } from '../content/projects'
import WeightText from './WeightText.vue'
import StableText from './StableText.vue'

const { t } = useI18n()

const lines = ref<InstanceType<typeof WeightText>[]>([])
const latest = computed(() => leadProject())

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
          :min="450"
          :reach="1.1"
        />
      </h1>
    </div>

    <!-- what he does on the left, the facts a recruiter scans for in a column on the right -->
    <dl class="facts grid">
      <div class="lead">
        <dt class="visually-hidden">{{ t('factInShort') }}</dt>
        <dd><StableText :text="site.lead" /></dd>
      </div>
      <div v-if="site.availability || site.location" class="practical">
        <div v-if="site.availability" class="fact">
          <dt>{{ t('factAvailable') }}</dt>
          <dd><StableText :text="site.availability" /></dd>
        </div>
        <div v-if="site.location" class="fact">
          <dt>{{ t('factBasedIn') }}</dt>
          <dd><StableText :text="site.location" /></dd>
        </div>
      </div>
      <div class="column">
        <div v-if="latest" class="fact">
          <dt>{{ t('factLatest') }}</dt>
          <dd>
            <RouterLink class="latest" :to="{ name: 'project', params: { slug: latest.slug } }">
              <span class="grow-line">{{ latest.title }}</span> <span aria-hidden="true">→</span>
            </RouterLink>
            <span v-if="latest.teaser" class="teaser"><StableText :text="latest.teaser" /></span>
          </dd>
        </div>
        <div class="fact">
          <dt>{{ t('factStudy') }}</dt>
          <dd><StableText :text="site.study" /></dd>
        </div>
      </div>
    </dl>
  </section>
</template>

<style scoped>
/*
  The name leads, but no longer takes the whole first screen: below it sit what he does and
  a link to the work, so a recruiter on a laptop sees evidence without scrolling. Translations
  reserve the space of the longest version, so switching language never moves the layout.
*/
.hero {
  padding-block: var(--space-12) var(--space-16);
}

.hero > .grid {
  margin-bottom: var(--space-12);
}

.name {
  grid-column: 1 / -1;
  margin-left: -0.05em;
  /* as wide as the grid allows, capped so two lines stay under half the screen height */
  font-size: min(var(--step-hero), 27svh);
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
  padding-top: var(--space-6);
  border-top: 1px solid var(--field-ink);
  row-gap: var(--space-8);
}

.lead {
  grid-column: 1 / 8;
  padding-right: var(--space-8);
  font-size: var(--step-2);
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.015em;
}

.column {
  grid-column: 9 / 13;
  grid-row: 1 / span 2;
  display: grid;
  align-content: start;
  row-gap: var(--space-6);
}

/* the two facts a recruiter filters on, right under what he does */
.practical {
  grid-column: 1 / 8;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4) var(--space-12);
}

.fact dt {
  margin-bottom: var(--space-1);
  color: var(--muted);
  font-size: var(--step--1);
}

.latest {
  font-size: var(--step-1);
  font-weight: 600;
}

.teaser {
  display: block;
  margin-top: var(--space-1);
}

@media (max-width: 860px) {
  .hero {
    padding-block: var(--space-6) var(--space-8);
  }

  .hero > .grid {
    margin-bottom: var(--space-6);
  }

  .facts {
    padding-top: var(--space-4);
    row-gap: var(--space-6);
  }

  .lead,
  .practical,
  .column {
    grid-column: 1 / -1;
    grid-row: auto;
    padding-right: 0;
  }

  .practical {
    gap: var(--space-4) var(--space-8);
  }

  .lead {
    font-size: var(--step-1);
  }

  .column {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: var(--col-gap);
  }
}
</style>
