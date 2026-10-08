<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '../i18n'
import type { CodeExcerpt } from '../content/projects'

/** A verbatim piece of a project's code on the dark mat, with the file it comes from. */
const props = defineProps<{ code: CodeExcerpt }>()

const { l } = useI18n()

// no syntax colouring, only comments step back so the logic reads first
const lines = computed(() =>
  props.code.source
    .replace(/\n+$/, '')
    .split('\n')
    .map((text) => ({
      text,
      comment: /^\s*(\/\/|\/\*)/.test(text),
    })),
)
</script>

<template>
  <figure class="excerpt">
    <!-- long lines scroll sideways instead of wrapping, so the code keeps its real shape -->
    <pre tabindex="0" :aria-label="code.file"><code translate="no"><span
      v-for="(line, i) in lines"
      :key="i"
      :class="{ comment: line.comment }"
    >{{ line.text }}
</span></code></pre>
    <figcaption>
      <span class="file" translate="no">{{ code.file }}</span>
      {{ l(code.caption) }}
    </figcaption>
  </figure>
</template>

<style scoped>
pre {
  margin: 0;
  padding: var(--space-8) var(--space-6);
  overflow-x: auto;
  background: var(--mat);
  color: var(--mat-ink);
  font-family: var(--font-code);
  font-size: var(--step--1);
  line-height: 1.6;
  tab-size: 2;
}

pre:focus-visible {
  outline-color: var(--accent);
}

code {
  font: inherit;
}

.comment {
  color: var(--mat-muted);
}

figcaption {
  max-width: 70ch;
  margin-top: var(--space-2);
  color: var(--muted);
  font-size: var(--step--1);
}

.file {
  margin-right: var(--space-2);
  color: var(--ink);
  font-weight: 600;
}
</style>
