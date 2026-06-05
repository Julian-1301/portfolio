<template>
  <section id="hero">
    <div class="content">
      <div class="tag" ref="tagEl">
        <span class="status-dot"></span>
        Available for work
      </div>
      <h1 ref="titleEl">
        <span class="line">Julian</span>
        <span class="line italic">van der Linde</span>
      </h1>
      <div class="typing-wrapper">
        <p class="subtitle warm-target" ref="subtitleEl">
          <span class="static-text">Software Engineering student &amp;</span>
          <span class="typed-text">{{ typedText }}</span>
          <span class="cursor-blink">|</span>
        </p>
      </div>
      <div class="cta" ref="ctaEl">
        <a href="#projects" class="btn-primary">
          View my work
          <span class="btn-icon">→</span>
        </a>
        <a href="#contact" class="btn-ghost">
          Get in touch
          <span class="btn-icon">↗</span>
        </a>
      </div>
    </div>

    <div class="scroll-hint">
      <div class="line-anim"></div>
      <span>scroll</span>
    </div>

    <!-- Floating shapes background -->
    <div class="floating-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const tagEl = ref(null)
const titleEl = ref(null)
const subtitleEl = ref(null)
const ctaEl = ref(null)

const typedText = ref('')
const roles = [' frontend developer', ' problem solver', ' UX enthusiast', ' creative coder']
let roleIndex = 0
let charIndex = 0
let isDeleting = false
let typingTimeout = null

function typeEffect() {
  const currentRole = roles[roleIndex]

  if (isDeleting) {
    typedText.value = currentRole.substring(0, charIndex - 1)
    charIndex--
  } else {
    typedText.value = currentRole.substring(0, charIndex + 1)
    charIndex++
  }

  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true
    typingTimeout = setTimeout(typeEffect, 2000)
    return
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false
    roleIndex = (roleIndex + 1) % roles.length
    typingTimeout = setTimeout(typeEffect, 500)
    return
  }

  const speed = isDeleting ? 50 : 100
  typingTimeout = setTimeout(typeEffect, speed)
}

onMounted(() => {
  const els = [tagEl.value, ...(titleEl.value?.querySelectorAll('.line') || []), subtitleEl.value, ctaEl.value]
  els.forEach((el, i) => {
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(20px)'
    el.style.transition = `opacity 0.7s ease ${i * 0.1}s, transform 0.7s ease ${i * 0.1}s`
    setTimeout(() => {
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
    }, 100)
  })

  typeEffect()
})

onUnmounted(() => {
  if (typingTimeout) clearTimeout(typingTimeout)
})
</script>

<style scoped>
section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8rem 3rem 4rem;
  overflow: hidden;
  background: var(--bg);
}

.content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text);
  background: var(--accent-light);
  border: 1px solid var(--accent);
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  margin-bottom: 2rem;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
  animation: pulse 2s ease infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}

h1 {
  font-family: var(--font-display);
  font-size: clamp(3.5rem, 9vw, 7.5rem);
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: -0.03em;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--text);
}

.italic {
  font-style: italic;
  font-weight: 300;
  color: var(--text-muted);
}

.typing-wrapper {
  margin-bottom: 3rem;
}

.subtitle {
  font-size: 1.05rem;
  color: var(--text-muted);
  line-height: 1.75;
  text-align: center;
}

.static-text {
  color: var(--text-muted);
}

.typed-text {
  color: var(--accent2);
  font-weight: 500;
}

.cursor-blink {
  animation: blink 0.8s infinite;
  margin-left: 2px;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.cta {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.btn-primary, .btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.88rem;
  padding: 0.85rem 2rem;
  border-radius: 4px;
  transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
  position: relative;
  overflow: hidden;
}

.btn-primary {
  background: var(--accent);
  color: var(--text);
  font-weight: 600;
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.btn-primary:hover::before {
  width: 300px;
  height: 300px;
}

.btn-primary:hover {
  background: var(--accent2);
  transform: translateY(-2px);
}

.btn-primary .btn-icon {
  transition: transform 0.3s ease;
}

.btn-primary:hover .btn-icon {
  transform: translateX(4px);
}

.btn-ghost {
  color: var(--text-muted);
  border: 1px solid var(--border);
}

.btn-ghost:hover {
  color: var(--text);
  border-color: rgba(26, 24, 20, 0.25);
  transform: translateY(-2px);
}

.btn-ghost .btn-icon {
  transition: transform 0.3s ease;
}

.btn-ghost:hover .btn-icon {
  transform: translate(3px, -3px);
}

.scroll-hint {
  position: absolute;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  z-index: 2;
}

.scroll-hint span {
  font-size: 0.68rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.line-anim {
  width: 1px;
  height: 50px;
  background: linear-gradient(to bottom, var(--accent), transparent);
  animation: scrollLine 1.8s ease infinite;
}

@keyframes scrollLine {
  0% { transform: scaleY(0); transform-origin: top; }
  50% { transform: scaleY(1); transform-origin: top; }
  51% { transform: scaleY(1); transform-origin: bottom; }
  100% { transform: scaleY(0); transform-origin: bottom; }
}

.floating-shapes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
  pointer-events: none;
}

.shape {
  position: absolute;
  background: radial-gradient(circle, var(--accent-light) 0%, transparent 70%);
  border-radius: 50%;
  opacity: 0.3;
  animation: float 20s infinite ease-in-out;
}

.shape-1 {
  width: 300px;
  height: 300px;
  top: -100px;
  left: -100px;
  animation-delay: 0s;
}

.shape-2 {
  width: 200px;
  height: 200px;
  bottom: -50px;
  right: -50px;
  animation-delay: -5s;
  animation-duration: 25s;
}

.shape-3 {
  width: 150px;
  height: 150px;
  top: 50%;
  right: 10%;
  animation-delay: -10s;
  animation-duration: 18s;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(30px, -30px) rotate(120deg); }
  66% { transform: translate(-20px, 20px) rotate(240deg); }
}

@media (max-width: 768px) {
  .floating-shapes { display: none; }
}
</style>