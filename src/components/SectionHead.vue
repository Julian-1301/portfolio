<script setup lang="ts">
import WeightText from './WeightText.vue'

defineProps<{
  id: string
  title: string
  note?: string
}>()
</script>

<template>
  <div class="head grid" data-weight-area>
    <h2 :id="id">
      <WeightText :text="title" />
    </h2>
    <p v-if="note">{{ note }}</p>
  </div>
</template>

<style scoped>
.head {
  align-items: end;
  padding-bottom: var(--space-6);
}

h2 {
  grid-column: 1 / 9;
  font-size: var(--step-3);
  font-weight: 500;
  line-height: 0.9;
  letter-spacing: -0.04em;
}

p {
  grid-column: 9 / 13;
  color: var(--muted);
  text-align: right;
}

@media (max-width: 860px) {
  h2 {
    grid-column: 1 / -1;
  }

  p {
    display: none;
  }
}
</style>
