import { computed, ref, watchEffect } from 'vue'
import { messages, type MessageKey } from './messages'

export type Locale = 'en' | 'nl'

/** Text that exists in both languages. */
export type Localized = Record<Locale, string>

const STORAGE_KEY = 'locale'

function readStoredLocale(): Locale {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'nl' ? 'nl' : 'en'
  } catch {
    return 'en'
  }
}

const locale = ref<Locale>(readStoredLocale())

watchEffect(() => {
  document.documentElement.lang = locale.value
  try {
    localStorage.setItem(STORAGE_KEY, locale.value)
  } catch {
    // Private mode or blocked storage: the choice simply isn't remembered.
  }
})

export function useI18n() {
  const t = (key: MessageKey): string => messages[locale.value][key]
  const l = (text: Localized): string => text[locale.value]
  const toggleLocale = () => {
    locale.value = locale.value === 'en' ? 'nl' : 'en'
  }

  return {
    locale: computed(() => locale.value),
    t,
    l,
    toggleLocale,
  }
}
