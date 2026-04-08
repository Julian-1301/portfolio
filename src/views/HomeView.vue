<template>
  <div class="home">
    <div class="page-wrap">

      <!-- hero -->
      <section class="hero">
        <div class="hero-left">
          <div class="tag-row">
            <span class="section-tag">group project</span>
            <span class="section-tag tag-red">edu use only</span>
          </div>
          <h1>A face.<br>A full profile.<br><span class="red">In seconds.</span></h1>
          <p class="hero-desc">
            IRIS shows how combining smart glasses footage with public photo databases
            can expose someone's name, employer, age, and location. All without their knowledge.
            This is a prototype. The technology is real.
          </p>
          <div class="cta-row">
            <RouterLink to="/demo" class="btn-primary">Try the demo →</RouterLink>
            <RouterLink to="/how-it-works" class="btn-ghost">How it works</RouterLink>
          </div>
        </div>

        <div class="hero-right">
          <div class="mock-scan">
            <div class="mock-header">
              <span class="mono-sm">iris_scan.exe</span>
              <span class="dots"><span /><span /><span /></span>
            </div>
            <div class="mock-face">
              <div class="face-box">
                <div class="corner tl"/><div class="corner tr"/>
                <div class="corner bl"/><div class="corner br"/>
                <img src="https://randomuser.me/api/portraits/men/32.jpg" class="face-img" />
              </div>
              <div class="scan-bar-wrap">
                <div class="scan-bar-fill" />
              </div>
            </div>
            <div class="mock-output">
              <div v-for="line in outputLines" :key="line" class="output-line">
                <span class="prompt">&gt;</span> {{ line }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- divider -->
      <div class="divider"><span>what this demo shows</span></div>

      <!-- feature cards -->
      <section class="features">
        <div v-for="f in features" :key="f.title" class="feature-card">
          <div class="feature-num">{{ f.num }}</div>
          <h3>{{ f.title }}</h3>
          <p>{{ f.desc }}</p>
        </div>
      </section>

      <!-- disclaimer -->
      <div class="disclaimer">
        <span class="mono-sm">⚠ note:</span>
        No actual facial recognition is performed. All matched profiles are fictional mock data.
        This prototype exists to illustrate a privacy concern, not to enable one.
        <RouterLink to="/privacy" class="inline-link">Read our full privacy discussion →</RouterLink>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const outputLines = ref([])
const allLines = [
  'loading face model...',
  'detecting landmarks [68pts]',
  'embedding: [0.23, -0.87, 0.41 ...]',
  'querying db... 847ms',
  'match found: 98.2% confidence',
  'aggregating sources...',
  'profile ready.',
]

onMounted(() => {
  allLines.forEach((line, i) => {
    setTimeout(() => outputLines.value.push(line), i * 420)
  })
})

const features = [
  { num: '01', title: 'Passive capture', desc: 'Meta Ray-Ban glasses record without visible indication. No consent, no notification, no opt-out.' },
  {
    num: '02',
    title: 'Face extraction',
    desc: 'The face is cropped and aligned into a clean image, ready to be used for reverse image search.'
  },
  { num: '03', title: 'Cross-platform matching', desc: 'LinkedIn, Instagram, GitHub, public registries. All scraped and indexed. Your public photos are the database.' },
  { num: '04', title: 'Profile aggregation', desc: 'Name, age, employer, email, home city. Assembled from fragments across a dozen sources in under a second.' },
]
</script>

<style scoped>
.home { padding: 60px 0 80px; }

.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  padding: 40px 0 60px;
  border-bottom: 1.5px solid var(--border-dark);
}

.tag-row { display: flex; gap: 8px; margin-bottom: 20px; }
.tag-red { background: var(--accent2) !important; }

h1 {
  font-size: clamp(32px, 4vw, 52px);
  line-height: 1.1;
  margin-bottom: 20px;
  letter-spacing: -0.03em;
}
.red { color: var(--accent2); }

.hero-desc {
  color: var(--muted);
  font-size: 15px;
  line-height: 1.75;
  margin-bottom: 32px;
  max-width: 440px;
}

.cta-row { display: flex; gap: 12px; align-items: center; }

.btn-primary {
  font-family: var(--mono);
  font-size: 13px;
  background: var(--accent);
  color: var(--bg);
  padding: 10px 20px;
  border: 1.5px solid var(--accent);
  transition: all 0.15s;
}
.btn-primary:hover { background: var(--accent2); border-color: var(--accent2); }

.btn-ghost {
  font-family: var(--mono);
  font-size: 13px;
  color: var(--muted);
  padding: 10px 20px;
  border: 1.5px solid var(--border-dark);
  transition: all 0.15s;
}
.btn-ghost:hover { color: var(--text); border-color: var(--accent); }

/* mock scan widget */
.mock-scan {
  background: #0f0f17;
  border: 1.5px solid #2a2a3a;
  border-radius: 4px;
  overflow: hidden;
  font-family: var(--mono);
}

.mock-header {
  background: #1a1a2a;
  padding: 8px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #2a2a3a;
}
.mono-sm { font-family: var(--mono); font-size: 11px; color: #556; }
.dots { display: flex; gap: 5px; }
.dots span {
  width: 10px; height: 10px;
  border-radius: 50%;
  background: #333;
}
.dots span:first-child { background: #e63946; }
.dots span:nth-child(2) { background: #f4a261; }
.dots span:last-child { background: #2a9d8f; }

.mock-face {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid #1a1a2a;
}

.face-box {
  width: 100px; height: 110px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.face-img {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 2px;
  filter: grayscale(30%);
}
.corner {
  position: absolute;
  width: 14px; height: 14px;
  border-color: #e63946;
  border-style: solid;
}
.tl { top: 0; left: 0; border-width: 2px 0 0 2px; }
.tr { top: 0; right: 0; border-width: 2px 2px 0 0; }
.bl { bottom: 0; left: 0; border-width: 0 0 2px 2px; }
.br { bottom: 0; right: 0; border-width: 0 2px 2px 0; }

.scan-bar-wrap {
  width: 100%;
  height: 3px;
  background: #1a1a2a;
  border-radius: 2px;
  overflow: hidden;
}
.scan-bar-fill {
  height: 100%;
  background: #e63946;
  animation: fill 3s ease forwards;
}
@keyframes fill { from { width: 0; } to { width: 100%; } }

.mock-output { padding: 12px 14px; min-height: 130px; }
.output-line {
  font-size: 11px;
  color: #4af;
  line-height: 1.8;
  animation: appear 0.1s ease;
}
@keyframes appear { from { opacity: 0; } to { opacity: 1; } }
.prompt { color: #e63946; margin-right: 4px; }

/* features */
.divider {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 48px 0 40px;
  font-family: var(--mono);
  font-size: 11px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.divider::before, .divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border);
}

.features {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 40px;
}

.feature-card {
  background: var(--surface2);
  border: 1.5px solid var(--border);
  padding: 20px;
  border-radius: 2px;
  transition: border-color 0.15s;
}
.feature-card:hover { border-color: var(--border-dark); }

.feature-num {
  font-family: var(--mono);
  font-size: 28px;
  font-weight: 700;
  color: var(--border);
  line-height: 1;
  margin-bottom: 12px;
}

.feature-card h3 {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 8px;
  letter-spacing: -0.01em;
}
.feature-card p { font-size: 13px; color: var(--muted); line-height: 1.6; }

/* disclaimer */
.disclaimer {
  background: #fff8e1;
  border: 1.5px solid #e6c84a;
  padding: 14px 18px;
  font-size: 13px;
  color: #5a4a00;
  line-height: 1.6;
}
.inline-link {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--accent2);
  text-decoration: underline;
  margin-left: 6px;
}

/* tablet */
@media (max-width: 860px) {
  .features {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* mobile */
@media (max-width: 600px) {
  .home { padding: 32px 0 60px; }

  .hero {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 24px 0 40px;
  }

  .hero-right { order: -1; } /* terminal widget above text on mobile */

  h1 { font-size: 32px; }

  .hero-desc { max-width: 100%; }

  .cta-row { flex-direction: column; align-items: flex-start; }

  .features {
    grid-template-columns: 1fr;
  }

  .divider { margin: 32px 0 24px; }
}
</style>
