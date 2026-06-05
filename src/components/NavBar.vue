<template>
  <nav :class="{ scrolled, 'dark-mode': mode !== 'light', 'evil-mode': mode === 'evil' }">
    <a href="/" class="logo" @click.prevent="navigateToHome">JVL</a>

    <ul>
      <li><a href="/#about" @click.prevent="navigateToSection('about')">About</a></li>
      <li><a href="/#projects" @click.prevent="navigateToSection('projects')">Projects</a></li>
      <li><a href="/#contact" @click.prevent="navigateToSection('contact')">Contact</a></li>
    </ul>

    <div class="nav-right">
      <button class="mode-toggle" @click="cycleMode">
        <span class="toggle-icon">{{ modeIcon }}</span>
        <span class="toggle-text">{{ modeText }}</span>
      </button>
    </div>
  </nav>

  <DarkPatternsManager :active="mode === 'evil'" />
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import DarkPatternsManager from './DarkPatternsManager.vue'

const router = useRouter()
const route = useRoute()

const scrolled = ref(false)
const mode = ref('light')

const modeIcon = computed(() => {
  switch (mode.value) {
    case 'light': return '☀️'
    case 'dark': return '🌙'
    case 'evil': return '💀'
  }
})

const modeText = computed(() => {
  switch (mode.value) {
    case 'light': return 'Light'
    case 'dark': return 'Dark'
    case 'evil': return 'Evil'
  }
})

function onScroll() {
  scrolled.value = window.scrollY > 60
}

function navigateToHome() {
  if (route.path !== '/') {
    router.push('/')
  }
}

function navigateToSection(sectionId) {
  if (route.path !== '/') {
    // If not on home page, navigate to home first, then scroll after navigation
    router.push('/').then(() => {
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    })
  } else {
    // Already on home page, just scroll
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

function cycleMode() {
  switch (mode.value) {
    case 'light':
      mode.value = 'dark'
      document.documentElement.setAttribute('data-theme', 'dark')
      document.documentElement.setAttribute('data-theme-level', 'normal')
      break
    case 'dark':
      mode.value = 'evil'
      document.documentElement.setAttribute('data-theme', 'dark')
      document.documentElement.setAttribute('data-theme-level', 'evil')
      break
    case 'evil':
      mode.value = 'light'
      document.documentElement.removeAttribute('data-theme')
      document.documentElement.removeAttribute('data-theme-level')
      break
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 3rem;
  transition: all 0.4s ease;
  background: transparent;
}

nav.scrolled {
  background: rgba(250, 249, 246, 0.95);
  backdrop-filter: blur(12px);
  padding: 1rem 3rem;
  border-bottom: 1px solid var(--border);
}

nav.dark-mode.scrolled {
  background: rgba(26, 26, 46, 0.95);
  border-bottom-color: var(--border);
}

nav.evil-mode.scrolled {
  background: rgba(10, 10, 10, 0.95);
  border-bottom-color: #ff0000;
}

.logo {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.02em;
  transition: opacity 0.2s;
  cursor: pointer;
}

.logo:hover { opacity: 0.6; }

ul {
  list-style: none;
  display: flex;
  gap: 2.5rem;
}

ul a {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-muted);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transition: color 0.2s;
  position: relative;
  cursor: pointer;
}

ul a::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--accent);
  transition: width 0.3s ease;
}

ul a:hover { color: var(--text); }
ul a:hover::after { width: 100%; }

.nav-right {
  position: relative;
}

.mode-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 999px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text);
  transition: all 0.2s;
}

.mode-toggle:hover {
  border-color: var(--accent);
  transform: scale(1.02);
}

@media (max-width: 768px) {
  nav {
    padding: 1rem;
  }

  nav.scrolled {
    padding: 0.75rem 1rem;
  }

  ul {
    gap: 1rem;
  }

  .toggle-text {
    display: none;
  }

  .mode-toggle {
    padding: 0.5rem;
  }
}
</style>