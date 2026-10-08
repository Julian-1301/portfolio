import { onBeforeUnmount, ref } from 'vue'

export type CopyState = 'idle' | 'copied' | 'failed'

/**
 * Copies text to the clipboard and reports how it went for a few seconds, then resets.
 * Falls back to a hidden textarea where the Clipboard API is missing or blocked.
 */
export function useCopy(resetAfter = 2500) {
  const state = ref<CopyState>('idle')
  let timer = 0

  const fallback = (text: string) => {
    const area = document.createElement('textarea')
    area.value = text
    area.setAttribute('readonly', '')
    area.style.position = 'fixed'
    area.style.opacity = '0'
    document.body.append(area)
    area.select()
    const ok = document.execCommand('copy')
    area.remove()
    return ok
  }

  const copy = async (text: string) => {
    let ok = false
    try {
      await navigator.clipboard.writeText(text)
      ok = true
    } catch {
      try {
        ok = fallback(text)
      } catch {
        ok = false
      }
    }
    state.value = ok ? 'copied' : 'failed'
    clearTimeout(timer)
    timer = window.setTimeout(() => (state.value = 'idle'), resetAfter)
  }

  onBeforeUnmount(() => clearTimeout(timer))

  return { state, copy }
}
