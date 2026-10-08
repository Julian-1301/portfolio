<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '../i18n'
import { imageUrl, type Media } from '../content/projects'

const props = defineProps<{
  slug: string
  media: Media
  /** Load right away (for images in the first screen). */
  eager?: boolean
  /** Put the screens on the dark mat, so they read as pictures of a site and not as part of this page. */
  matted?: boolean
  /** Each screen links to its full-size image, so it can be opened and zoomed. Not inside another link. */
  zoomable?: boolean
}>()

const { t, l } = useI18n()

// small screens get the phone version of a screen when every image in the group has one
const hasMobile = computed(() => props.media.images.every((image) => image.mobile))
// on a phone, a row of phone screens becomes a strip you swipe through
const isStrip = computed(() => props.media.layout === 'phones')
</script>

<template>
  <figure
    class="media"
    :class="[`layout-${media.layout}`, { matted, 'has-mobile': hasMobile }]"
  >
    <div
      class="frame"
      :tabindex="isStrip ? 0 : undefined"
      :role="isStrip ? 'group' : undefined"
      :aria-label="isStrip ? t('mediaStrip') : undefined"
    >
      <component
        :is="zoomable ? 'a' : 'div'"
        v-for="(image, i) in media.images"
        :key="image.file"
        :class="['shot', `shot-${i + 1}`]"
        :href="zoomable ? imageUrl(slug, image.file) : undefined"
        :target="zoomable ? '_blank' : undefined"
        :rel="zoomable ? 'noopener' : undefined"
        :aria-label="zoomable ? `${t('mediaOpen')}: ${l(image.alt)} (${t('newTab')})` : undefined"
      >
        <picture>
          <source
            v-if="image.mobile"
            media="(max-width: 600px)"
            :srcset="imageUrl(slug, image.mobile)"
          />
          <img
            :src="imageUrl(slug, image.file)"
            :alt="l(image.alt)"
            :loading="eager ? 'eager' : 'lazy'"
            decoding="async"
          />
        </picture>
      </component>
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

/* .shot is the box a screen sits in; the image fills it and is cropped from the top */
.shot {
  display: block;
  width: 100%;
}

picture {
  display: contents;
}

.shot img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}

a.shot {
  position: relative;
  cursor: zoom-in;
}

/*
  The frame clips anything outside it, so a focused screen gets its ring drawn inside, in two
  layers: light against the dark mat, dark against the screenshot. One always stands out.
*/
a.shot:focus-visible {
  outline: none;
}

a.shot:focus-visible::after {
  content: '';
  position: absolute;
  inset: 0;
  box-shadow:
    inset 0 0 0 3px var(--mat-ink),
    inset 0 0 0 6px var(--mat);
  pointer-events: none;
}

/* one wide image */
.layout-single .frame {
  aspect-ratio: 16 / 10;
}

.layout-single .shot {
  height: 100%;
}

/* on the mat the screen gets a margin of dark around it, and is cut off at the bottom like a crop */
.matted .frame {
  background: var(--mat);
}

.matted.layout-single .frame {
  padding: 5% 5% 0;
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
  border: 1px solid var(--line);
  border-bottom: 0;
}

/* phone screens in a row, the middle one raised so the row isn't a flat strip */
.layout-phones .frame {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(0, 1fr);
  align-items: start;
  gap: 5%;
  padding: 7% 12% 0;
  aspect-ratio: 16 / 9;
}

.layout-phones .shot {
  aspect-ratio: 9 / 19.5;
}

.layout-phones .shot:nth-child(even) {
  margin-top: -4%;
}

/*
  On a phone a desktop screenshot shrinks to unreadable text, so each layout shows phone screens
  instead, rising from the bottom of a portrait frame at a size that can be read.
*/
@media (max-width: 600px) {
  .layout-single.has-mobile .frame,
  .layout-device .frame {
    aspect-ratio: 4 / 5;
    padding: 8% 10% 0;
  }

  .layout-device .shot-1 {
    display: none;
  }

  .layout-device .shot-2 {
    position: static;
    width: 100%;
    height: 100%;
    aspect-ratio: auto;
    border-color: var(--ink);
  }

  /* the row of phones turns into a strip that snaps from screen to screen */
  .layout-phones .frame {
    display: flex;
    gap: var(--space-4);
    padding: 8% 10% 0;
    aspect-ratio: auto;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-padding-inline: 10%;
    overscroll-behavior-x: contain;
  }

  .layout-phones .shot {
    flex: 0 0 80%;
    aspect-ratio: 9 / 14;
    scroll-snap-align: start;
  }

  .layout-phones .shot:nth-child(even) {
    margin-top: 0;
  }
}

figcaption {
  margin-top: var(--space-2);
  color: var(--muted);
  font-size: var(--step--1);
}
</style>
