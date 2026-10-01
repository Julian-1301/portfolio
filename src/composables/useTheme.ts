import { computed, ref, watchEffect } from 'vue'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'
const THEME_COLOR: Record<Theme, string> = { light: '#1d5a41', dark: '#163f2e' }

const theme = ref<Theme>(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')

watchEffect(() => {
  document.documentElement.dataset.theme = theme.value
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', THEME_COLOR[theme.value])
  try {
    localStorage.setItem(STORAGE_KEY, theme.value)
  } catch {
    // Storage blocked: the theme still switches, it just isn't remembered.
  }
})

export function useTheme() {
  return {
    isDark: computed(() => theme.value === 'dark'),
    toggleTheme: () => {
      theme.value = theme.value === 'dark' ? 'light' : 'dark'
    },
  }
}
