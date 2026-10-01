<script setup lang="ts">
import { useI18n } from '../i18n'
import { imageUrl, type Media } from '../content/projects'

defineProps<{
  slug: string
  media: Media
  /** Load right away (for images in the first screen). */
  eager?: boolean
}>()

const { l } = useI18n()
</script>

<template>
  <figure class="media" :class="`layout-${media.layout}`">
    <div class="frame">
      <img
        v-for="(image, i) in media.images"
        :key="image.file"
        :class="['shot', `shot-${i + 1}`]"
        :src="imageUrl(slug, image.file)"
        :alt="l(image.alt)"
        :loading="eager ? 'eager' : 'lazy'"
        decoding="async"
      />
    </div>
    <figcaption v-if="media.caption">{{ l(media.caption) }}</figcaption>
  </figure>
</template>

<style scoped>
.frame {
  position: relative;
  overflow: hidden;
  background: var(--surface);
}

.shot {
  width: 100%;
  object-fit: cover;
  object-position: top;
}

/* one wide image */
.layout-single .frame {
  aspect-ratio: 16 / 10;
}

.layout-single .shot {
  height: 100%;
}

/* two images side by side on a tinted ground */
.layout-pair .frame {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4%;
  padding: 6%;
  aspect-ratio: 16 / 10;
}

.layout-pair .shot {
  height: 100%;
}

/* desktop screen with a phone screen overlapping its lower right corner */
.layout-device .frame {
  aspect-ratio: 16 / 10;
  padding: 6% 18% 0 6%;
}

.layout-device .shot-1 {
  height: 100%;
}

.layout-device .shot-2 {
  position: absolute;
  right: 6%;
  bottom: 0;
  width: 22%;
  aspect-ratio: 9 / 19.5;
  height: auto;
  border: 1px solid var(--line);
  border-bottom: 0;
}

figcaption {
  margin-top: var(--space-2);
  color: var(--muted);
  font-size: var(--step--1);
}
</style>
