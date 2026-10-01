<script setup lang="ts">
import { useI18n } from '../i18n'
import { site } from '../content/site'

const { t } = useI18n()
</script>

<template>
  <section id="contact" class="contact field wrap" aria-labelledby="contact-title">
    <div class="grid">
      <h2 id="contact-title" class="ask">{{ t('contactAsk') }}</h2>
      <a class="mail" :href="`mailto:${site.email}`" translate="no">
        <span class="grow-line">{{ site.email }}</span>
      </a>
      <a
        v-if="site.linkedin"
        class="elsewhere"
        :href="site.linkedin"
        target="_blank"
        rel="noopener"
      >
        <span class="grow-line">LinkedIn</span> <span aria-hidden="true">↗</span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.contact {
  padding-block: var(--space-16) var(--space-12);
}

.ask {
  grid-column: 1 / 8;
  font-size: var(--step-2);
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.mail {
  grid-column: 1 / -1;
  width: fit-content;
  margin-top: var(--space-12);
  font-size: clamp(1.25rem, 6.2vw, 7rem);
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: -0.04em;
  white-space: nowrap;
}

/* the line sits under the descender of the j and grows from the left */
.mail .grow-line {
  --grow-gap: 0;
  --grow-lift: 0.045em;
  --grow-size: max(3px, 0.04em);
}

.elsewhere {
  grid-column: 1 / -1;
  width: fit-content;
  margin-top: var(--space-8);
  font-size: var(--step-1);
  color: var(--muted);
  transition: color var(--dur-fast) var(--ease);
}

.elsewhere:hover,
.elsewhere:focus-visible {
  color: var(--field-ink);
}

@media (max-width: 860px) {
  .ask {
    grid-column: 1 / -1;
    font-size: var(--step-1);
  }
}
</style>
