<template>
  <section id="about" ref="sectionEl">
    <div class="section-label">01 — About</div>
    <div class="inner">
      <div class="left" :class="{ visible }">
        <h2>Passionate about building things that matter.</h2>
        <p class="warm-target">
          I'm Julian, a Software Engineering student at the Hogeschool van Amsterdam with a background
          spanning frontend development, backend systems, and IT support. I did an exchange semester
          at the University of Michigan's School of Information, where I broadened my perspective on
          technology, people, and design.
        </p>
        <p class="warm-target">
          I've worked as a software developer intern at Effytool, supported healthcare staff at Dijklander
          Ziekenhuis and de Zorgcirkel, and built full-stack projects on the side. I like clean code,
          thoughtful interfaces, and solving problems that actually mean something.
        </p>
        <div class="langs">
          <div class="lang-item" v-for="lang in languages" :key="lang.name">
            <span class="lang-name warm-target">{{ lang.name }}</span>
            <span class="lang-level">{{ lang.level }}</span>
          </div>
        </div>
      </div>

      <div class="right" :class="{ visible }">
        <div class="section-header">
          <span class="section-subtitle">Experience</span>
        </div>
        <div class="card" v-for="(item, i) in experience" :key="'exp-' + i">
          <div class="card-top">
            <span class="role">{{ item.role }}</span>
            <span class="year">{{ item.year }}</span>
          </div>
          <span class="company warm-target">{{ item.company }}</span>
        </div>

        <div class="section-header education-header">
          <span class="section-subtitle">Education</span>
        </div>
        <div class="card" v-for="(item, i) in education" :key="'edu-' + i">
          <div class="card-top">
            <span class="role">{{ item.role }}</span>
            <span class="year">{{ item.year }}</span>
          </div>
          <span class="company warm-target">{{ item.company }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const sectionEl = ref(null)
const visible = ref(false)

const languages = [
  { name: 'Dutch', level: 'C2' },
  { name: 'English', level: 'C2' },
  { name: 'German', level: 'B2' },
]

const experience = [
  { role: 'Intern Software Developer', company: 'Effytool', year: '2025' },
  { role: 'IT Infrastructure Management', company: 'Dijklander Hospital', year: '2023' },
  { role: 'Technical Support Staff', company: 'De Zorgcirkel', year: '2022' },
]

const education = [
  { role: 'Exchange Semester', company: 'University of Michigan', year: '2025' },
  { role: 'HBO-ICT', company: 'Amsterdam University of Applied Sciences', year: '2023 - Present' },
]

onMounted(() => {
  const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) visible.value = true },
      { threshold: 0.15 }
  )
  if (sectionEl.value) observer.observe(sectionEl.value)
})
</script>

<style scoped>
section {
  padding: 8rem 3rem;
  background: var(--bg2);
}

.section-label {
  font-size: 0.72rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent2);
  font-weight: 600;
  margin-bottom: 3rem;
}

.inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  max-width: 1100px;
  margin: 0 auto;
}

.left {
  opacity: 0;
  transform: translateX(-30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.left.visible { opacity: 1; transform: translateX(0); }

h2 {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin-bottom: 1.5rem;
  color: var(--text);
}

p {
  color: var(--text-muted);
  line-height: 1.75;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.langs {
  margin-top: 2rem;
  border-top: 1px solid var(--border);
  padding-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.lang-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
}

.lang-name { color: var(--text-muted); }

.lang-level {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.75rem;
  color: var(--text);
  background: var(--accent);
  padding: 0.15rem 0.55rem;
  border-radius: 3px;
}

.right {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  opacity: 0;
  transform: translateX(30px);
  transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;
}

.right.visible { opacity: 1; transform: translateX(0); }

.section-header {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.section-header:first-of-type {
  margin-top: 0;
}

.section-subtitle {
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent2);
  font-weight: 600;
}

.education-header {
  margin-top: 1.5rem;
}

.card {
  border: 1px solid var(--border);
  padding: 1.25rem 1.5rem;
  border-radius: 8px;
  background: var(--bg);
  transition: border-color 0.2s, transform 0.2s;
}

.card:hover {
  border-color: var(--accent);
  transform: translateX(4px);
}

.card-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.2rem;
}

.role {
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text);
}

.year {
  font-size: 0.75rem;
  color: var(--accent2);
  font-weight: 600;
}

.company {
  font-size: 0.8rem;
  color: var(--text-muted);
}

@media (max-width: 768px) {
  .inner { grid-template-columns: 1fr; gap: 3rem; }
}
</style>