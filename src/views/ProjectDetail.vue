<template>
  <div class="project-detail">
    <div class="container">
      <button class="back-btn" @click="$router.push('/')">← Back to Portfolio</button>

      <div v-if="project" class="project-content">
        <div class="project-header">
          <h1>{{ project.title }}</h1>
          <div class="tags">
            <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
          </div>
        </div>

        <div class="project-gallery">
          <div class="main-image">
            <img :src="currentImage || project.screenshot" :alt="project.title">
          </div>
          <div class="thumbnail-grid" v-if="allImages.length > 1">
            <img
                v-for="(img, idx) in allImages"
                :key="idx"
                :src="img"
                @click="currentImage = img"
                :class="{ active: currentImage === img }"
            >
          </div>
        </div>

        <div class="project-info">
          <div class="description">
            <h2>About this project</h2>
            <p>{{ project.fullDescription || project.description }}</p>
          </div>

          <div class="project-links">
            <a :href="project.github" target="_blank" rel="noopener noreferrer" class="btn-open">
              Open →
            </a>
          </div>

          <div class="project-details" v-if="project.details">
            <h3>Details</h3>
            <ul>
              <li v-for="(detail, idx) in project.details" :key="idx">{{ detail }}</li>
            </ul>
          </div>
        </div>
      </div>

      <div v-else class="loading">
        <p>Loading project...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { projects } from '../data/projects.js'
import { loadProjectImages } from '../utils/imageLoader.js'

const route = useRoute()
const project = ref(null)
const allImages = ref([])
const currentImage = ref(null)

onMounted(async () => {
  const projectId = parseInt(route.params.id)
  const foundProject = projects.find(p => p.id === projectId)

  if (foundProject) {
    // Load images dynamically
    const projectFolder = foundProject.title.toLowerCase().replace(/ /g, '-')
    const images = await loadProjectImages(projectFolder)

    project.value = {
      ...foundProject,
      screenshot: images.main,
      screenshots: images.screenshots
    }

    // Combine main and screenshots for thumbnail navigation
    allImages.value = [images.main, ...images.screenshots].filter(Boolean)
    currentImage.value = images.main
  }
})
</script>

<style scoped>
.project-detail {
  min-height: 100vh;
  background: var(--bg);
  padding: 120px 3rem 4rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.back-btn {
  background: transparent;
  border: 1px solid var(--border);
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  color: var(--text);
  margin-bottom: 2rem;
  transition: all 0.2s;
}

.back-btn:hover {
  border-color: var(--accent);
  transform: translateX(-4px);
}

.project-header {
  margin-bottom: 2rem;
}

h1 {
  font-family: var(--font-display);
  font-size: 3rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 1rem;
}

.tags {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.tags span {
  background: var(--accent-light);
  color: var(--accent2);
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
}

.project-gallery {
  margin-bottom: 3rem;
}

.main-image {
  width: 100%;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 1rem;
  background: var(--bg2);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.thumbnail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1rem;
}

.thumbnail-grid img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s;
}

.thumbnail-grid img:hover {
  transform: scale(1.05);
  border-color: var(--accent);
}

.thumbnail-grid img.active {
  border-color: var(--accent);
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.project-info {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
}

.description h2 {
  font-family: var(--font-display);
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text);
}

.description p {
  color: var(--text-muted);
  line-height: 1.8;
}

.project-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.btn-open {
  display: inline-block;
  padding: 0.85rem 1.5rem;
  text-align: center;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  color: white;
}

.btn-open:hover {
  transform: translateY(-2px);
  filter: brightness(1.05);
}

.project-details {
  margin-top: 1rem;
}

.project-details h3 {
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
  color: var(--text);
}

.project-details ul {
  list-style: none;
  padding: 0;
}

.project-details li {
  color: var(--text-muted);
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--border);
  font-size: 0.9rem;
}

.loading {
  text-align: center;
  padding: 4rem;
  color: var(--text-muted);
}

@media (max-width: 768px) {
  .project-detail {
    padding: 100px 1.5rem 3rem;
  }

  h1 {
    font-size: 2rem;
  }

  .project-info {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .main-image {
    height: 250px;
  }
}
</style>