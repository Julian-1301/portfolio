<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '../i18n'
import { site } from '../content/site'
import { useCopy } from '../composables/useCopy'

const { t } = useI18n()

// a mailto link does nothing on a computer without a mail app, so the address can also be copied
const { state, copy } = useCopy()
const copied = computed(() => state.value === 'copied')
</script>

<template>
  <section id="contact" class="contact field wrap" aria-labelledby="contact-title">
    <div class="grid">
      <h2 id="contact-title" class="ask">{{ t('contactAsk') }}</h2>
      <a class="mail" :href="`mailto:${site.email}`" translate="no">
        <span class="grow-line">{{ site.email }}</span>
      </a>

      <div class="actions">
        <!-- both labels share one cell, so the button keeps its width when it says "Copied" -->
        <button type="button" class="copy" :data-state="state" @click="copy(site.email)">
          <span :class="{ hidden: copied }" :aria-hidden="copied">{{ t('contactCopy') }}</span>
          <span :class="{ hidden: !copied }" :aria-hidden="!copied">{{ t('contactCopied') }}</span>
        </button>
        <a
          v-if="site.linkedin"
          class="elsewhere"
          :href="site.linkedin"
          target="_blank"
          rel="noopener"
        >
          <span class="grow-line">LinkedIn</span> <span aria-hidden="true">↗</span>
          <span class="visually-hidden"> ({{ t('newTab') }})</span>
        </a>
      </div>

      <!-- the result is said out loud, and shown when copying didn't work -->
      <p class="status" aria-live="polite">
        <template v-if="state === 'copied'">{{ t('contactCopiedLong') }}</template>
        <template v-else-if="state === 'failed'">{{ t('contactCopyFailed') }}</template>
      </p>
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

.actions {
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-4) var(--space-8);
  margin-top: var(--space-8);
}

.copy {
  display: inline-grid;
  place-items: center;
  min-height: 44px;
  padding: var(--space-2) var(--space-6);
  border: 1px solid var(--field-ink);
  background: transparent;
  color: var(--field-ink);
  font-size: var(--step-0);
  font-weight: 500;
  cursor: pointer;
  transition:
    background-color var(--dur-fast) var(--ease),
    color var(--dur-fast) var(--ease);
}

.copy > span {
  grid-area: 1 / 1;
}

.copy .hidden {
  visibility: hidden;
}

@media (hover: hover) {
  .copy:hover {
    background: var(--field-ink);
    color: var(--field);
  }
}

.copy[data-state='copied'] {
  background: var(--field-ink);
  color: var(--field);
}

.elsewhere {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  font-size: var(--step-1);
}

.status {
  grid-column: 1 / -1;
  min-height: 1.5em;
  margin-top: var(--space-3);
  color: var(--muted);
  font-size: var(--step--1);
}

@media (max-width: 860px) {
  .ask {
    grid-column: 1 / -1;
    font-size: var(--step-1);
  }
}
</style>
