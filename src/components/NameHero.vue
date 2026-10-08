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
    <div class="top grid">
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

      <!-- the work, next to the name on wide screens where the name leaves room on the right -->
      <dl v-if="latest" class="latest-block">
        <div>
          <dt>{{ t('factLatest') }}</dt>
          <dd>
            <RouterLink class="latest" :to="{ name: 'project', params: { slug: latest.slug } }">
              <span class="grow-line">{{ latest.title }}</span> <span aria-hidden="true">→</span>
            </RouterLink>
            <span v-if="latest.teaser" class="teaser"><StableText :text="latest.teaser" /></span>
          </dd>
        </div>
      </dl>
    </div>

    <!-- what he does, then the facts a recruiter scans for; each fact is placed on the grid -->
    <dl class="facts grid">
      <div class="lead">
        <dt class="visually-hidden">{{ t('factInShort') }}</dt>
        <dd><StableText :text="site.lead" /></dd>
      </div>
      <div v-if="site.availability" class="fact available">
        <dt>{{ t('factAvailable') }}</dt>
        <dd><StableText :text="site.availability" /></dd>
      </div>
      <div v-if="site.location" class="fact based">
        <dt>{{ t('factBasedIn') }}</dt>
        <dd><StableText :text="site.location" /></dd>
      </div>
      <!-- the way to reach him, without scrolling to the end -->
      <div class="fact email-fact">
        <dt>{{ t('factEmail') }}</dt>
        <dd>
          <a class="email" :href="`mailto:${site.email}`" translate="no">
            <span class="grow-line">{{ site.email }}</span>
          </a>
        </dd>
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
  The name leads, but doesn't take the whole first screen: below it sit what he does and the facts,
  and the latest project sits beside the name where there is room. Translations reserve the space
  of the longest version, so switching language never moves the layout.
*/
.hero {
  padding-block: var(--space-12) var(--space-16);
}

.top {
  margin-bottom: var(--space-12);
}

.name {
  grid-column: 1 / -1;
  grid-row: 1;
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

/* by default the latest project sits under the name */
.latest-block {
  grid-column: 1 / -1;
  margin-top: var(--space-8);
}

/*
  On wide screens the name is capped by the screen height and stops at about two thirds of the
  width, so the latest project moves into that space, level with the bottom of the name.
*/
@media (min-width: 1100px) and (min-aspect-ratio: 3 / 2) {
  .latest-block {
    grid-column: 10 / 13;
    grid-row: 1;
    align-self: end;
    margin-top: 0;
    padding-top: var(--space-4);
    border-top: 1px solid var(--field-line);
  }
}

.latest-block dt,
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

.facts {
  padding-top: var(--space-6);
  border-top: 1px solid var(--field-ink);
  row-gap: var(--space-6);
}

.lead {
  grid-column: 1 / 8;
  grid-row: 1;
  padding-right: var(--space-8);
  font-size: var(--step-2);
  font-weight: 500;
  line-height: 1.3;
  letter-spacing: -0.015em;
}

.study {
  grid-column: 10 / 13;
  grid-row: 1;
}

/* the facts a recruiter filters on, in one row right under what he does */
.available {
  grid-column: 1 / 4;
  grid-row: 2;
}

.based {
  grid-column: 4 / 6;
  grid-row: 2;
}

.email {
  display: inline-block;
  padding-block: var(--hit);
  margin-block: calc(var(--hit) * -1);
}

.email-fact {
  grid-column: 6 / 9;
  grid-row: 2;
}

@media (max-width: 860px) {
  .hero {
    padding-block: var(--space-6) var(--space-8);
  }

  .top {
    margin-bottom: var(--space-6);
  }

  .latest-block {
    margin-top: var(--space-6);
  }

  .facts {
    padding-top: var(--space-4);
  }

  .lead,
  .study,
  .email-fact {
    grid-column: 1 / -1;
    grid-row: auto;
    padding-right: 0;
  }

  .lead {
    font-size: var(--step-1);
  }

  .available,
  .based {
    grid-column: span 6;
    grid-row: auto;
  }
}
</style>
