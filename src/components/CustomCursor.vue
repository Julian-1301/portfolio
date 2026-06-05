<template>
  <div class="custom-cursor" :class="{ hovering, active }" :style="cursorStyle">
    <div class="cursor-dot"></div>
    <div class="cursor-ring"></div>
  </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted, watch} from 'vue'
import {useMouse} from '../composables/useMouse'

const {x, y} = useMouse()
const hovering = ref(false)
const active = ref(false)
const cursorStyle = ref({})

// Position cursor exactly where the mouse is (no offset)
watch([x, y], () => {
  cursorStyle.value = {
    transform: `translate3d(${x.value}px, ${y.value}px, 0)`
  }
})

function handleMouseOver() {
  hovering.value = true
}

function handleMouseOut() {
  hovering.value = false
}

function handleMouseDown() {
  active.value = true
}

function handleMouseUp() {
  active.value = false
}

onMounted(() => {
  setTimeout(() => {
    // Hide default cursor on everything
    const style = document.createElement('style')
    style.id = 'custom-cursor-style'
    style.textContent = `
      * {
        cursor: none !important;
      }
      input, textarea, [contenteditable] {
        cursor: text !important;
      }
    `
    document.head.appendChild(style)

    // Also set body cursor
    document.body.style.cursor = 'none'

    const hoverable = document.querySelectorAll('a, button, .project-card, .btn-primary, .btn-ghost, .contact-card, nav a, .logo, .mode-toggle, [role="button"]')
    const clickable = document.querySelectorAll('a, button, .project-card, .contact-card, nav a, .logo, .mode-toggle')

    hoverable.forEach(el => {
      el.addEventListener('mouseenter', handleMouseOver)
      el.addEventListener('mouseleave', handleMouseOut)
    })

    clickable.forEach(el => {
      el.addEventListener('mousedown', handleMouseDown)
      el.addEventListener('mouseup', handleMouseUp)
    })
  }, 100)
})

onUnmounted(() => {
  const style = document.getElementById('custom-cursor-style')
  if (style) style.remove()

  document.body.style.cursor = ''

  const hoverable = document.querySelectorAll('a, button, .project-card, .btn-primary, .btn-ghost, .contact-card, nav a, .logo, .mode-toggle')
  const clickable = document.querySelectorAll('a, button, .project-card, .contact-card, nav a, .logo, .mode-toggle')

  hoverable.forEach(el => {
    el.removeEventListener('mouseenter', handleMouseOver)
    el.removeEventListener('mouseleave', handleMouseOut)
  })

  clickable.forEach(el => {
    el.removeEventListener('mousedown', handleMouseDown)
    el.removeEventListener('mouseup', handleMouseUp)
  })
})
</script>

<style scoped>
.custom-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  pointer-events: none;
  z-index: 99999;
  will-change: transform;
}

.cursor-dot {
  position: absolute;
  width: 8px;
  height: 8px;
  background: var(--accent2);
  border-radius: 50%;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
  transition: all 0.15s cubic-bezier(0.2, 0.9, 0.4, 1.1);
}

.cursor-ring {
  position: absolute;
  width: 32px;
  height: 32px;
  border: 2px solid var(--accent);
  border-radius: 50%;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
  transition: all 0.2s cubic-bezier(0.2, 0.9, 0.4, 1.1);
  opacity: 0.6;
}

.custom-cursor.hovering .cursor-dot {
  transform: translate(-50%, -50%) scale(1.5);
  background: var(--accent);
}

.custom-cursor.hovering .cursor-ring {
  width: 48px;
  height: 48px;
  border-color: var(--accent2);
  opacity: 1;
}

.custom-cursor.active .cursor-dot {
  transform: translate(-50%, -50%) scale(0.6);
}

.custom-cursor.active .cursor-ring {
  transform: translate(-50%, -50%) scale(0.8);
  border-color: var(--accent2);
}

@media (max-width: 768px) {
  .custom-cursor {
    display: none;
  }
}
</style>