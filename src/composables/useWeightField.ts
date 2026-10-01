import { onBeforeUnmount, onMounted, type Ref } from 'vue'

export interface WeightFieldOptions {
  /** Weight at rest. Must match the resting CSS weight. */
  min?: number
  /** Weight of a fully "inked" letter. */
  max?: number
  /** How far the pointer's influence spreads, in em of the text's own font size. */
  reach?: number
  /** How long a letter takes to dry back to rest, in ms. */
  dry?: number
}

/**
 * Ink trail: letters inside `root` (marked with data-weight-char) soak up weight when the pointer
 * passes nearby, then slowly dry back to rest. Each letter keeps its own "heat" between 0 and 1,
 * which rises smoothly towards the pointer's influence and decays over time when it leaves.

 * The pointer is tracked over the nearest ancestor with data-weight-area, or `root` itself.
 */
export function useWeightField(root: Ref<HTMLElement | null>, options: WeightFieldOptions = {}) {
  const { min = 500, max = 700, reach = 1.2, dry = 1400 } = options
  const heat = new WeakMap<HTMLElement, number>()
  let area: HTMLElement | null = null
  let frame = 0
  let last = 0
  let pointer: { x: number; y: number } | null = null
  let sweeping = false

  const chars = () =>
    Array.from(root.value?.querySelectorAll<HTMLElement>('[data-weight-char]') ?? [])

  const spread = () => parseFloat(getComputedStyle(root.value ?? document.body).fontSize) * reach

  const tick = (now: number) => {
    const dt = last ? Math.min(64, now - last) : 16
    last = now
    const sigma = spread()
    // how much of the gap to the target is closed this frame (soft rise, not instant)
    const rise = 1 - Math.exp(-dt / 120)
    // how much heat is lost this frame when the pointer has moved on
    const decay = Math.exp(-dt / (dry / 3))
    let active = false

    for (const ch of chars()) {
      let target = 0
      if (pointer) {
        const r = ch.getBoundingClientRect()
        const d = Math.hypot(pointer.x - (r.left + r.width / 2), pointer.y - (r.top + r.height / 2))
        target = Math.exp(-((d / sigma) ** 2))
      }
      const current = heat.get(ch) ?? 0
      const next =
        target > current ? current + (target - current) * rise : Math.max(target, current * decay)
      const settled = next < 0.002 ? 0 : next
      heat.set(ch, settled)

      if (settled === 0) {
        ch.style.removeProperty('font-variation-settings')
      } else {
        active = true
        ch.style.fontVariationSettings = `'wght' ${Math.round(min + (max - min) * settled)}`
      }
    }

    frame = active || pointer ? requestAnimationFrame(tick) : 0
    if (!frame) last = 0
  }

  const run = () => {
    if (!frame) frame = requestAnimationFrame(tick)
  }

  const onMove = (e: PointerEvent) => {
    sweeping = false
    pointer = { x: e.clientX, y: e.clientY }
    run()
  }

  const onLeave = () => {
    pointer = null
    run()
  }

  const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches

  /** Draws one ink stroke from left to right through the text. Stops when the real pointer moves. */
  const sweep = (duration = 1600) => {
    const el = root.value
    if (!el || reduceMotion()) return
    const start = performance.now()
    sweeping = true
    const step = (now: number) => {
      if (!sweeping) return
      const box = el.getBoundingClientRect()
      const t = Math.min(1, (now - start) / duration)
      const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2
      pointer = t < 1 ? { x: box.left + box.width * eased, y: box.top + box.height / 2 } : null
      run()
      if (t < 1) requestAnimationFrame(step)
      else sweeping = false
    }
    requestAnimationFrame(step)
  }

  onMounted(() => {
    const el = root.value
    const canHover = matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!el || !canHover || reduceMotion()) return

    area = el.closest<HTMLElement>('[data-weight-area]') ?? el
    area.addEventListener('pointermove', onMove)
    area.addEventListener('pointerleave', onLeave)
  })

  onBeforeUnmount(() => {
    area?.removeEventListener('pointermove', onMove)
    area?.removeEventListener('pointerleave', onLeave)
    cancelAnimationFrame(frame)
    sweeping = false
  })

  return { sweep }
}
