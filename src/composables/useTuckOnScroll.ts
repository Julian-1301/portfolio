import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

/**
 * True while the visitor scrolls down past the top of the page, false as soon as they scroll up.
 * On a phone a sticky bar can then slide away while reading and come back when they look for it.
 * Keyboard focus inside the bar always keeps it out.
 */
export function useTuckOnScroll(bar: Ref<HTMLElement | null>, { threshold = 8 } = {}) {
  const tucked = ref(false)
  let lastY = 0
  let frame = 0

  const update = () => {
    frame = 0
    const y = Math.max(window.scrollY, 0)
    const height = bar.value?.offsetHeight ?? 0
    if (y <= height || bar.value?.contains(document.activeElement)) tucked.value = false
    else if (y - lastY > threshold) tucked.value = true
    else if (lastY - y > threshold) tucked.value = false
    // small jitters don't count, so the reference point only moves on a real scroll
    if (Math.abs(y - lastY) > threshold) lastY = y
  }

  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update)
  }

  const untuck = () => (tucked.value = false)

  onMounted(() => {
    lastY = window.scrollY
    window.addEventListener('scroll', schedule, { passive: true })
    bar.value?.addEventListener('focusin', untuck)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', schedule)
    bar.value?.removeEventListener('focusin', untuck)
    cancelAnimationFrame(frame)
  })

  return tucked
}
