import { onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue'
import { useRoute } from 'vue-router'

/**
 * True while the bottom edge of `bar` sits over a green .field section,
 * so a sticky bar can switch to the field colors.
 */
export function useOverField(bar: Ref<HTMLElement | null>) {
  const overField = ref(false)
  const route = useRoute()
  let frame = 0

  const measure = () => {
    frame = 0
    const edge = bar.value?.getBoundingClientRect().bottom ?? 0
    overField.value = Array.from(document.querySelectorAll('.field')).some((field) => {
      const r = field.getBoundingClientRect()
      return r.top <= edge + 1 && r.bottom > edge
    })
  }

  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(measure)
  }

  onMounted(() => {
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    schedule()
  })

  // a new page has different sections, so measure again once it has rendered
  watch(
    () => route.fullPath,
    () => requestAnimationFrame(schedule),
    { flush: 'post' },
  )

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)
    cancelAnimationFrame(frame)
  })

  return overField
}
