<script setup lang="ts">
import { computed, ref } from 'vue'
import { useWeightField } from '../composables/useWeightField'

/**
 * Display text with an ink trail: letters get heavier where the pointer passes and slowly dry back.
 * Put data-weight-area on a parent to track the pointer over that whole block.
 * On touch screens the text settles from light to its resting weight while scrolling into view.
 */
const props = withDefaults(
  defineProps<{
    text: string
    as?: string
    min?: number
    max?: number
    /** How far the pointer's influence spreads, in em. */
    reach?: number
    /** How long a letter takes to dry back to rest, in ms. */
    dry?: number
    /** Settle from light to resting weight on scroll (touch screens only). */
    settle?: boolean
  }>(),
  { as: 'span', min: 500, max: 700, reach: 1, dry: 1600, settle: true },
)

const root = ref<HTMLElement | null>(null)
const words = computed(() => props.text.split(' '))
const { sweep } = useWeightField(root, {
  min: props.min,
  max: props.max,
  reach: props.reach,
  dry: props.dry,
})

defineExpose({ sweep })
</script>

<template>
  <component
    :is="as"
    ref="root"
    class="weight-text"
    :class="{ settle }"
    :style="{ '--rest': min }"
    translate="no"
  >
    <span class="visually-hidden">{{ text }}</span>
    <span aria-hidden="true">
      <template v-for="(word, w) in words" :key="`${text}-${w}`">
        <span class="word">
          <span v-for="(char, i) in word" :key="i" class="char" data-weight-char>{{ char }}</span>
        </span>
        <template v-if="w < words.length - 1">{{ ' ' }}</template>
      </template>
    </span>
  </component>
</template>

<style scoped>
.word {
  white-space: nowrap;
}

.char {
  display: inline-block;
  font-weight: var(--rest);
}

/* touch screens have no pointer, so the type settles as it scrolls into view instead */
@supports (animation-timeline: view()) {
  @media (hover: none) and (prefers-reduced-motion: no-preference) {
    .settle .char {
      animation: settle linear both;
      animation-timeline: view();
      animation-range: entry 10% cover 45%;
    }
  }
}

@keyframes settle {
  from {
    font-variation-settings: 'wght' 400;
  }

  to {
    font-variation-settings: 'wght' var(--rest);
  }
}
</style>
