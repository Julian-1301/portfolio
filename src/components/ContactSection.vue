<template>
  <section id="contact" ref="sectionEl">
    <div class="section-label">03 — Contact</div>
    <div class="inner" :class="{ visible }">
      <div class="left">
        <h2>Let's work <em>together.</em></h2>
        <p>
          I'm open to internships, freelance projects, and collaborations.
          Feel free to reach out. I usually respond within a few days.
        </p>
        <a href="mailto:j.van.der.linde@outlook.com" class="email-link">
          j.van.der.linde@outlook.com
          <span class="email-arrow">→</span>
        </a>
      </div>

      <div class="right">
        <a href="https://www.linkedin.com/in/julianvdlinde" target="_blank" class="contact-card">
          <div class="contact-card-inner">
            <span class="contact-label">LinkedIn</span>
            <span class="contact-handle warm-target">julianvdlinde</span>
          </div>
          <span class="contact-icon">↗</span>
        </a>
        <a href="mailto:j.van.der.linde@outlook.com" class="contact-card">
          <div class="contact-card-inner">
            <span class="contact-label">Email</span>
            <span class="contact-handle warm-target">j.van.der.linde@outlook.com</span>
          </div>
          <span class="contact-icon">↗</span>
        </a>
        <div class="contact-card static">
          <div class="contact-card-inner">
            <span class="contact-label">Location</span>
            <span class="contact-handle warm-target">Purmerend, Netherlands</span>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <span>© {{ new Date().getFullYear() }} Julian van der Linde</span>
      <span>Built with Vue 3</span>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const sectionEl = ref(null)
const visible = ref(false)

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
  padding: 8rem 3rem 4rem;
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
  margin-bottom: 6rem;
}

.left {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.inner.visible .left { opacity: 1; transform: translateY(0); }

h2 {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.03em;
  margin-bottom: 1.5rem;
  color: var(--text);
}

h2 em {
  font-style: italic;
  font-weight: 300;
  color: var(--text-muted);
}

p {
  color: var(--text-muted);
  line-height: 1.75;
  font-size: 0.95rem;
  margin-bottom: 2rem;
  max-width: 380px;
}

.email-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 600;
  color: var(--text);
  border-bottom: 2px solid var(--accent);
  padding-bottom: 0.2rem;
  transition: border-color 0.2s;
}

.email-link:hover { border-color: var(--accent2); }
.email-arrow { transition: transform 0.2s; }
.email-link:hover .email-arrow { transform: translateX(4px); }

.right {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;
}

.inner.visible .right { opacity: 1; transform: translateY(0); }

.contact-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg);
  transition: border-color 0.2s, transform 0.2s;
}

.contact-card:not(.static):hover {
  border-color: var(--accent);
  transform: translateX(6px);
}

.contact-card-inner { display: flex; flex-direction: column; gap: 0.2rem; }

.contact-label {
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
  font-weight: 500;
}

.contact-handle {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text);
}

.contact-icon {
  font-size: 1rem;
  color: var(--text-muted);
  transition: color 0.2s, transform 0.3s;
}

.contact-card:hover .contact-icon {
  color: var(--accent2);
  transform: translate(3px, -3px);
}

.footer {
  display: flex;
  justify-content: space-between;
  padding-top: 2rem;
  border-top: 1px solid var(--border);
  max-width: 1100px;
  margin: 0 auto;
  font-size: 0.78rem;
  color: var(--text-muted);
}

@media (max-width: 768px) {
  .inner { grid-template-columns: 1fr; gap: 3rem; }
}

:global([data-theme="dark"]) .contact-card {
  background: #242424;
  border-color: #3a3a3a;
}

:global([data-theme="dark"]) .contact-handle {
  color: #f0f0f0;
}

:global([data-theme="dark"]) .footer {
  border-top-color: #3a3a3a;
}
</style>