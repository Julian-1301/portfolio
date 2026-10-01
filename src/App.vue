<script setup lang="ts">
import SiteNav from './components/SiteNav.vue'
import { useI18n } from './i18n'

const { t } = useI18n()
</script>

<template>
  <a class="skip-link" href="#main">{{ t('skipToContent') }}</a>
  <SiteNav />
  <RouterView />
</template>
