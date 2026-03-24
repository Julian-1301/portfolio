<template>
  <div class="hiw-page">
    <div class="page-wrap">

      <div class="page-header">
        <span class="section-tag">technical breakdown</span>
        <h2>How IRIS works</h2>
        <p>A quick walkthrough of the pipeline — from a photo to a full profile.</p>
      </div>

      <!-- pipeline steps -->
      <div class="pipeline">
        <div v-for="(step, i) in steps" :key="i" class="step-row">
          <div class="step-left">
            <div class="step-num">{{ String(i+1).padStart(2,'0') }}</div>
            <div v-if="i < steps.length - 1" class="step-line" />
          </div>
          <div class="step-body">
            <div class="step-header">
              <h3>{{ step.title }}</h3>
              <span class="step-badge">{{ step.badge }}</span>
            </div>
            <p class="step-desc">{{ step.desc }}</p>
            <div class="step-detail card">
              <div class="detail-label">{{ step.detailLabel }}</div>
              <div class="detail-content" v-html="step.detail" />
            </div>
          </div>
        </div>
      </div>

      <!-- data sources table -->
      <div class="sources-section">
        <span class="section-tag">data sources</span>
        <h3>Where the data comes from</h3>
        <p class="sources-desc">All of these sources are publicly accessible. None require a data breach.</p>
        <table class="sources-table">
          <thead>
            <tr>
              <th>Source</th>
              <th>What it provides</th>
              <th>Scraping difficulty</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="s in sources" :key="s.name">
              <td class="src-name">{{ s.name }}</td>
              <td>{{ s.provides }}</td>
              <td><span class="diff-badge" :class="s.diffClass">{{ s.diff }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="bottom-nav">
        <RouterLink to="/" class="btn-ghost">← Back</RouterLink>
        <RouterLink to="/demo" class="btn-primary">Try the demo →</RouterLink>
      </div>

    </div>
  </div>
</template>

<script setup>
const steps = [
  {
    title: 'Capture',
    badge: 'input layer',
    desc: 'A photo or video frame is captured passively — via Meta Ray-Ban glasses, a phone, or any camera. The subject has no idea.',
    detailLabel: 'Hardware used in real deployments',
    detail: `<span class="mono-chip">Meta Ray-Ban Smart Glasses</span>
             <span class="mono-chip">iPhone / Android</span>
             <span class="mono-chip">CCTV feed</span>
             <span class="mono-chip">Laptop webcam</span>`,
  },
  {
    title: 'Face detection & vectorization',
    badge: 'ML layer',
    desc: 'A face detection model (like MTCNN or MediaPipe) locates the face in the frame, aligns it, and feeds it through a recognition network (FaceNet, ArcFace, etc.) that outputs a 128-float embedding vector.',
    detailLabel: 'Example embedding (truncated)',
    detail: `<span class="code-line">[ 0.231, -0.874, 0.412, 0.099, -0.553, 0.787, ... ]</span>
             <span class="code-note">// 128 values. this is the face's unique fingerprint.</span>`,
  },
  {
    title: 'Database matching',
    badge: 'search layer',
    desc: 'The embedding is compared against a pre-built index of embeddings scraped from public profile photos. Similarity is measured with cosine distance. A match above ~0.6 is considered the same person.',
    detailLabel: 'Cosine similarity threshold',
    detail: `<span class="code-line">similarity(a, b) = dot(a,b) / (||a|| × ||b||)</span>
             <span class="code-note">// threshold > 0.6 → match confirmed</span>`,
  },
  {
    title: 'Profile aggregation',
    badge: 'output layer',
    desc: 'Once a face is matched to a name, a crawler pulls all associated public data — LinkedIn, employer site, GitHub, government registries — and assembles it into a single profile object.',
    detailLabel: 'Example output object',
    detail: `<span class="code-line">{ name: "Sophie de Vries",</span>
             <span class="code-line">&nbsp;&nbsp;age: 31, employer: "Booking.com",</span>
             <span class="code-line">&nbsp;&nbsp;email: "s.devries@booking.com",</span>
             <span class="code-line">&nbsp;&nbsp;location: "Amsterdam-Noord" }</span>`,
  },
]

const sources = [
  { name: 'LinkedIn',               provides: 'Name, employer, job title, headshot',     diff: 'Medium',  diffClass: 'med' },
  { name: 'Instagram (public)',      provides: 'Photos, location tags, tagged names',     diff: 'Easy',    diffClass: 'easy' },
  { name: 'Facebook (public)',       provides: 'Photos, hometown, employer, family',      diff: 'Medium',  diffClass: 'med' },
  { name: 'GitHub',                  provides: 'Username, email, employer, avatar',       diff: 'Easy',    diffClass: 'easy' },
  { name: 'Company / uni websites',  provides: 'Name, role, headshot, contact',           diff: 'Easy',    diffClass: 'easy' },
  { name: 'KVK / business registries', provides: 'Address, company name, directors',     diff: 'Easy',    diffClass: 'easy' },
  { name: 'News / press releases',   provides: 'Name, affiliation, sometimes photo',     diff: 'Easy',    diffClass: 'easy' },
  { name: 'Court / govt records',    provides: 'Name, address, date of birth',           diff: 'Hard',    diffClass: 'hard' },
]
</script>

<style scoped>
.hiw-page { padding: 60px 0 80px; }

.page-header {
  margin-bottom: 48px;
  padding-bottom: 32px;
  border-bottom: 1.5px solid var(--border);
}
.page-header h2 { font-size: 32px; margin: 8px 0 12px; }
.page-header p { color: var(--muted); font-size: 15px; }

/* pipeline */
.pipeline { margin-bottom: 64px; }

.step-row {
  display: grid;
  grid-template-columns: 56px 1fr;
  gap: 24px;
  margin-bottom: 0;
}

.step-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 4px;
}

.step-num {
  font-family: var(--mono);
  font-size: 13px;
  font-weight: 700;
  background: var(--accent);
  color: var(--bg);
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.step-line {
  flex: 1;
  width: 2px;
  background: var(--border);
  margin: 8px 0;
  min-height: 40px;
}

.step-body {
  padding-bottom: 40px;
}

.step-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.step-header h3 { font-size: 18px; letter-spacing: -0.02em; }

.step-badge {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--muted);
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 2px 8px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.step-desc {
  color: var(--muted);
  font-size: 14px;
  line-height: 1.7;
  margin-bottom: 16px;
  max-width: 600px;
}

.step-detail {
  padding: 16px 20px;
  background: #0f0f17;
  border-color: #2a2a3a;
  max-width: 560px;
}

.detail-label {
  font-family: var(--mono);
  font-size: 10px;
  color: #556;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 10px;
}

:deep(.mono-chip) {
  display: inline-block;
  font-family: var(--mono);
  font-size: 11px;
  background: #1a1a2a;
  color: #aac;
  border: 1px solid #2a2a3a;
  padding: 3px 8px;
  margin: 2px 4px 2px 0;
  border-radius: 2px;
}

:deep(.code-line) {
  display: block;
  font-family: var(--mono);
  font-size: 12px;
  color: #4af;
  line-height: 1.7;
}
:deep(.code-note) {
  display: block;
  font-family: var(--mono);
  font-size: 11px;
  color: #446;
  line-height: 1.7;
}

/* sources table */
.sources-section { margin-bottom: 48px; }
.sources-section h3 { font-size: 22px; margin: 10px 0 8px; }
.sources-desc { color: var(--muted); font-size: 14px; margin-bottom: 24px; }

.sources-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.sources-table th {
  font-family: var(--mono);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--muted);
  text-align: left;
  padding: 10px 14px;
  background: var(--surface);
  border: 1.5px solid var(--border);
}
.sources-table td {
  padding: 10px 14px;
  border: 1px solid var(--border);
  color: var(--text);
  vertical-align: middle;
}
.sources-table tr:hover td { background: var(--surface); }
.src-name { font-family: var(--mono); font-size: 12px; font-weight: 700; }

.diff-badge {
  font-family: var(--mono);
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 2px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.easy { background: #e6f4ea; color: #1e6b35; border: 1px solid #a8d5b5; }
.med  { background: #fff3cd; color: #7a5400; border: 1px solid #ffd97d; }
.hard { background: #fde8e8; color: #9b1c1c; border: 1px solid #f5aaaa; }

/* nav */
.bottom-nav {
  display: flex;
  gap: 12px;
  padding-top: 32px;
  border-top: 1.5px solid var(--border);
}
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

@media (max-width: 600px) {
  .hiw-page { padding: 32px 0 60px; }

  .page-header h2 { font-size: 24px; }

  .step-row {
    grid-template-columns: 36px 1fr;
    gap: 12px;
  }

  .step-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }

  .step-header h3 { font-size: 16px; }

  .step-detail { max-width: 100%; }

  .sources-section { overflow-x: auto; }
  .sources-table { min-width: 480px; }

  .bottom-nav { flex-direction: column; }
  .bottom-nav a { text-align: center; }
}
</style>
