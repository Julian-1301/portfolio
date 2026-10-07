<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SiteNav from './components/SiteNav.vue'
import { useI18n } from './i18n'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

// the title in index.html is the homepage title; project pages set their own
const homeTitle = document.title
const announcement = ref('')

// the first route is the page load itself: no focus move or announcement for that one
let ready = false
router.isReady().then(() => (ready = true))

/*
  A client-side page change doesn't move focus or tell a screen reader anything, so do it here:
  start keyboard focus at the new page (or the section a #link points to) and announce its title.
*/
watch(
  () => route.fullPath,
  async () => {
    if (route.name !== 'project') document.title = homeTitle
    if (!ready) return
    await nextTick()

    const target = route.hash ? document.querySelector<HTMLElement>(route.hash) : null
    const focusable = target ?? document.getElementById('main')
    if (focusable) {
      if (!focusable.hasAttribute('tabindex')) focusable.setAttribute('tabindex', '-1')
      focusable.focus({ preventScroll: true })
    }
    announcement.value = document.title
  },
)
</script>

<template>
  <a class="skip-link" href="#main">{{ t('skipToContent') }}</a>
  <SiteNav />
  <RouterView />
  <p class="visually-hidden" aria-live="polite">{{ announcement }}</p>
</template>
