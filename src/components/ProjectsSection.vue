<template>
  <section id="projects" ref="sectionEl">
    <div class="section-label">02 - Projects</div>
    <h2>Things I've <span class="highlight">built.</span></h2>

    <div class="projects-grid" :class="{ visible }">
      <div
          class="project-card"
          v-for="(project, i) in projects"
          :key="project.id"
          @click="goToProject(project.id)"
          @mouseenter="hoveredIndex = i"
          @mouseleave="resetCard(i)"
          @mousemove="handleMouseMove(i, $event)"
          :style="cardStyles[i]"
      >
        <div class="card-image" :style="{ background: project.color || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }">
          <div class="image-inner" :style="imageStyles[i]">
            <img
                v-if="project.screenshot"
                :src="project.screenshot"
                :alt="project.title"
                class="project-screenshot"
            />
          </div>
          <div class="card-tags">
            <span v-for="tag in project.tags.slice(0, 3)" :key="tag">{{ tag }}</span>
          </div>
        </div>
        <div class="card-body">
          <div class="card-top">
            <h3>{{ project.title }}</h3>
            <span class="arrow" :class="{ active: hoveredIndex === i }">→</span>
          </div>
          <p class="warm-target">{{ project.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {ref, reactive, onMounted} from 'vue'
import {useRouter} from 'vue-router'
import {projects as projectsData} from '../data/projects.js'
import { loadProjectImages } from '../utils/imageLoader.js'

const router = useRouter()
const projects = ref([])
const loading = ref(true)

async function loadAllProjectImages() {
  const projectsWithImages = await Promise.all(
      projectsData.map(async (project) => {
        const images = await loadProjectImages(project.title.toLowerCase().replace(/ /g, '-'))
        return {
          ...project,
          screenshot: images.main,
          screenshots: images.screenshots
        }
      })
  )
  projects.value = projectsWithImages
  loading.value = false

  projects.value.forEach((_, i) => {
    cardStyles[i] = {
      transform: 'perspective(1000px)',
      transition: 'transform 0.2s ease',
    }
    imageStyles[i] = {
      transform: 'translate(0px, 0px) scale(1)',
      transition: 'transform 0.1s linear',
    }
  })
}

function goToProject(projectId) {
  router.push(`/project/${projectId}`)
}

const sectionEl = ref(null)
const visible = ref(false)
const hoveredIndex = ref(null)

// reactive transforms per card
const cardStyles = reactive({})
const imageStyles = reactive({})

projects.value.forEach((_, i) => {
  cardStyles[i] = {
    transform: 'perspective(1000px)',
    transition: 'transform 0.2s ease',
  }

  imageStyles[i] = {
    transform: 'translate(0px, 0px) scale(1)',
    transition: 'transform 0.1s linear',
  }
})

function handleMouseMove(index, event) {
  const card = event.currentTarget
  const rect = card.getBoundingClientRect()

  const x = (event.clientX - rect.left) / rect.width - 0.5
  const y = (event.clientY - rect.top) / rect.height - 0.5

  const rotateX = y * -8
  const rotateY = x * 8

  cardStyles[index] = {
    ...cardStyles[index],
    transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`,
  }

  imageStyles[index] = {
    ...imageStyles[index],
    transform: `translate(${x * 20}px, ${y * 20}px) scale(1.05)`,
  }
}

function resetCard(index) {
  cardStyles[index] = {
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
    transition: 'transform 0.3s ease',
  }

  imageStyles[index] = {
    transform: 'translate(0px, 0px) scale(1)',
    transition: 'transform 0.3s ease',
  }

  hoveredIndex.value = null
}

onMounted(() => {
  loadAllProjectImages()

  const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) visible.value = true
      },
      { threshold: 0.1 }
  )

  if (sectionEl.value) observer.observe(sectionEl.value)
})
</script>

<style scoped>
section {
  padding: 8rem 3rem;
  background: var(--bg);
}

.section-label {
  font-size: 0.72rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent2);
  font-weight: 600;
  margin-bottom: 1rem;
}

h2 {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1;
  margin-bottom: 4rem;
  color: var(--text);
  text-align: left;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
}

.highlight {
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  max-width: 1100px;
  margin: 0 auto;
}

.project-card {
  border-radius: 12px;
  overflow: hidden;
  background: var(--bg2);
  border: 1px solid var(--border);
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s;
  cursor: pointer;
  will-change: transform;
}

.projects-grid.visible .project-card {
  opacity: 1;
  transform: translateY(0);
}

.project-card:hover {
  box-shadow: 0 20px 40px rgba(26, 24, 20, 0.15);
}

.card-image {
  position: relative;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.image-inner {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: transform 0.05s linear;
  will-change: transform;
}

.project-screenshot {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-card:hover .project-screenshot {
  transform: scale(1.05);
}

.card-tags {
  position: absolute;
  bottom: 0.75rem;
  left: 0.75rem;
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  z-index: 2;
}

.card-tags span {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  color: #1a1a1a;
  padding: 0.2rem 0.55rem;
  border-radius: 3px;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.card-body {
  padding: 1.5rem;
  background: var(--bg2);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.6rem;
}

h3 {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--text);
}

.arrow {
  font-size: 1rem;
  color: var(--text-muted);
  transition: color 0.2s, transform 0.3s;
}

.arrow.active {
  color: var(--accent2);
  transform: translate(3px, -3px);
}

p {
  font-size: 0.875rem;
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }

  .project-card:hover {
    transform: none !important;
  }

  .card-image {
    height: 160px;
  }
}
</style>

<style>
/* Normal Dark Mode - Project cards */
[data-theme="dark"][data-theme-level="normal"] .project-card {
  background: #16213e;
  border-color: #2a3a5c;
}

[data-theme="dark"][data-theme-level="normal"] .card-body {
  background: #16213e;
}

[data-theme="dark"][data-theme-level="normal"] .card-tags span {
  background: #1a1a2e;
  color: #4a90e2;
  border: 1px solid #2a3a5c;
}

/* Evil Mode - Project cards */
[data-theme="dark"][data-theme-level="evil"] .project-card {
  background: #1a1a1a;
  border-color: #ff0000;
}

[data-theme="dark"][data-theme-level="evil"] .card-body {
  background: #1a1a1a;
}

[data-theme="dark"][data-theme-level="evil"] .card-tags span {
  background: #0a0a0a;
  color: #ff0000;
  border: 1px solid #ff000040;
}

/* Shared dark mode styles */
[data-theme="dark"] .project-card h3 {
  color: var(--text);
}

[data-theme="dark"] .project-card p {
  color: var(--text-muted);
}

[data-theme="dark"] .project-card .arrow.active {
  color: var(--accent);
}
</style>