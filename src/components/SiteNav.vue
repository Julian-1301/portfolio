<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from '../i18n'
import { useTheme } from '../composables/useTheme'
import { useOverField } from '../composables/useOverField'
import { site } from '../content/site'

const { t, locale, toggleLocale } = useI18n()
const { isDark, toggleTheme } = useTheme()

const bar = ref<HTMLElement | null>(null)
const overField = useOverField(bar)

// share the nav height, so the hero can fill exactly one screen below it
let observer: ResizeObserver | undefined
onMounted(() => {
  if (!bar.value) return
  observer = new ResizeObserver(([entry]) => {
    document.documentElement.style.setProperty(
      '--nav-h',
      `${entry.target.getBoundingClientRect().height}px`,
    )
  })
  observer.observe(bar.value)
})
onBeforeUnmount(() => observer?.disconnect())

const links = [
  { hash: '#projects', key: 'navProjects' },
  { hash: '#about', key: 'navAbout' },
  { hash: '#contact', key: 'navContact' },
] as const
</script>

<template>
  <header ref="bar" class="nav wrap" :class="{ 'on-field': overField }">
    <div class="bar">
      <RouterLink class="who swell" to="/" :data-label="site.name" translate="no">
        <span>{{ site.name }}</span>
      </RouterLink>

      <nav class="links" :aria-label="t('navMain')">
        <RouterLink
          v-for="link in links"
          :key="link.hash"
          class="swell"
          :to="{ path: '/', hash: link.hash }"
          :data-label="t(link.key)"
        >
          <span>{{ t(link.key) }}</span>
        </RouterLink>
      </nav>

      <div class="tools">
        <button
          type="button"
          class="tool lang"
          :aria-label="t('switchLanguage')"
          @click="toggleLocale"
        >
          <span :class="{ on: locale === 'en' }">EN</span> /
          <span :class="{ on: locale === 'nl' }">NL</span>
        </button>
        <button
          type="button"
          class="tool"
          :aria-pressed="isDark"
          :aria-label="isDark ? t('themeLabelLight') : t('themeLabel')"
          @click="toggleTheme"
        >
          {{ isDark ? t('themeLight') : t('themeDark') }}
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 40;
  background: color-mix(in srgb, var(--bg) 92%, transparent);
  backdrop-filter: blur(8px);
  color: var(--ink);
  transition:
    background-color var(--dur) var(--ease),
    color var(--dur) var(--ease);
}

.nav.on-field {
  background: var(--field);
  color: var(--field-ink);
}

/* three columns: name left, links in the true center of the page, tools right */
.bar {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  column-gap: var(--col-gap);
  align-items: center;
  padding-block: var(--space-4);
  border-bottom: 1px solid color-mix(in srgb, currentColor 18%, transparent);
}

.who {
  justify-self: start;
  font-weight: 600;
}

/*
  Links get heavier on hover, like the big type. A hidden bold copy of the label
  reserves the width, so the links next to it don't shift.
*/
.swell {
  display: inline-grid;
  transition: font-weight var(--dur) var(--ease);
}

.swell > span,
.swell::before {
  grid-area: 1 / 1;
}

.swell::before {
  content: attr(data-label);
  visibility: hidden;
  font-weight: 700;
}

.links .swell:hover,
.links .swell:focus-visible {
  font-weight: 650;
}

.who:hover,
.who:focus-visible {
  font-weight: 700;
}

.links {
  display: flex;
  gap: var(--space-6);
}

.links a {
  position: relative;
}

.links a::after {
  content: '';
  position: absolute;
  inset: auto 0 -2px;
  height: 2px;
  background: var(--pop);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--dur) var(--ease);
}

.links a:hover::after {
  transform: scaleX(1);
}

.tools {
  justify-self: end;
  display: flex;
  justify-content: flex-end;
  gap: var(--space-4);
}

.tool {
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
  opacity: 0.65;
  transition: opacity var(--dur-fast) var(--ease);
}

.tool:hover {
  opacity: 1;
}

.tool span {
  opacity: 0.65;
}

.tool span.on {
  opacity: 1;
}

.lang {
  opacity: 1;
}

@media (max-width: 860px) {
  .bar {
    grid-template-columns: 1fr auto;
    row-gap: var(--space-2);
  }

  .links {
    grid-column: 1 / -1;
    grid-row: 2;
    gap: var(--space-4);
  }
}
</style>
