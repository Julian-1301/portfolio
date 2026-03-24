<template>
  <div class="demo-page">
    <div class="page-wrap">

      <div class="page-header">
        <span class="section-tag">live demo</span>
        <h2>IRIS Scanner</h2>
        <p>Pick a mock subject and run the simulated pipeline. No real recognition happens here.</p>
      </div>

      <div class="demo-layout">

        <!-- LEFT: input -->
        <div class="panel input-panel">
          <div class="panel-title">
            <span>Input</span>
            <span class="badge-live"><span class="live-dot" />LIVE FEED</span>
          </div>

          <!-- subject selector -->
          <div class="subject-select">
            <div class="select-label">Select mock subject:</div>
            <div class="subject-tabs">
              <button
                v-for="(p, i) in profiles"
                :key="p.id"
                :class="['subject-tab', { active: activeIndex === i }]"
                @click="selectProfile(i)"
              >
                <span class="tab-name">{{ p.name }}</span>
                <span class="tab-loc">{{ p.shortLocation }}</span>
              </button>
            </div>
          </div>

          <!-- camera box -->
          <div class="camera-box" @click="!ready && loadDemo()">
            <div class="cam-corners">
              <div class="c tl"/><div class="c tr"/>
              <div class="c bl"/><div class="c br"/>
            </div>
            <div v-if="uploadedSrc" class="cam-img-wrap">
              <img :src="uploadedSrc" class="cam-img" />
            </div>
            <div class="cam-placeholder">
              <img :src="activeProfile.photo" class="cam-face-img" />
              <div class="cam-status">{{ ready ? '[ SUBJECT DETECTED ]' : '[ AWAITING SUBJECT ]' }}</div>
            </div>
            <div class="scanline" />
          </div>

          <!-- scan button -->
          <button class="scan-btn" :disabled="scanning" @click="runScan">
            <span v-if="!scanning">▶ run_scan()</span>
            <span v-else class="scanning-label">
              <span class="spinner" />scanning...
            </span>
          </button>
        </div>

        <!-- RIGHT: output -->
        <div class="panel output-panel">
          <div class="panel-title">Output</div>

          <!-- scan log -->
          <div class="scan-log">
            <div class="log-header">scan_log.txt</div>
            <div class="log-body">
              <div v-if="logLines.length === 0" class="log-empty">// waiting for scan...</div>
              <div
                v-for="(line, i) in logLines"
                :key="i"
                class="log-line"
                :class="line.type"
              >
                <span class="log-ts">{{ line.ts }}</span>
                <span class="log-msg">{{ line.msg }}</span>
              </div>
            </div>
          </div>

          <!-- result -->
          <Transition name="slide-up">
            <div v-if="result" class="result-card">
              <div class="result-header">
                <span class="result-match">MATCH FOUND</span>
                <span class="conf-bar-wrap">
                  <span
                    class="conf-bar-fill"
                    :style="{ width: result.confidence + '%' }"
                    :class="result.confidence > 95 ? 'high' : 'med'"
                  />
                  <span class="conf-label">{{ result.confidence }}%</span>
                </span>
              </div>

              <div class="result-body">
                <div class="result-avatar">{{ result.avatar }}</div>
                <div class="result-info">
                  <div class="result-name">{{ result.name }}</div>
                  <div class="result-role">{{ result.role }} @ {{ result.employer }}</div>
                </div>
              </div>

              <div class="result-fields">
                <div v-for="f in result.fields" :key="f.key" class="result-field">
                  <span class="rf-key">{{ f.key }}</span>
                  <span class="rf-val">{{ f.val }}</span>
                </div>
              </div>

              <div class="result-sources">
                <div class="sources-title">sources used:</div>
                <div v-for="s in result.sources" :key="s.name" class="source-item">

                  <span class="src-name">{{ s.name }}</span>
                  <span class="src-detail">{{ s.detail }}</span>
                </div>
              </div>
            </div>
          </Transition>

          <div v-if="!result && !scanning" class="result-empty">
            <span class="mono-hint">// result will appear here after scan</span>
          </div>
        </div>
      </div>

      <div class="bottom-nav">
        <RouterLink to="/how-it-works" class="btn-ghost">← How it works</RouterLink>
        <RouterLink to="/privacy" class="btn-primary">Privacy implications →</RouterLink>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { profiles, scanSteps } from '../data/profiles.js'

const activeIndex  = ref(0)
const ready        = ref(false)
const uploadedSrc  = ref(null)
const scanning     = ref(false)
const result       = ref(null)
const logLines     = ref([])

const activeProfile = computed(() => profiles[activeIndex.value])

function selectProfile(i) {
  activeIndex.value = i
  ready.value = false
  uploadedSrc.value = null
  result.value = null
  logLines.value = []
}

function loadDemo() {
  ready.value = true
}

function loadImage(e) {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (ev) => {
    uploadedSrc.value = ev.target.result
    ready.value = true
    result.value = null
    logLines.value = []
  }
  reader.readAsDataURL(file)
}

function ts() {
  return new Date().toLocaleTimeString('en', { hour12: false })
}

function addLog(msg, type = 'info') {
  logLines.value.push({ ts: ts(), msg, type })
}

function runScan() {
  if (!ready.value) loadDemo()
  scanning.value = true
  result.value = null
  logLines.value = []

  addLog('initializing iris pipeline...', 'info')

  scanSteps.forEach((step, i) => {
    setTimeout(() => {
      addLog(step, 'step')
      if (i === scanSteps.length - 1) {
        setTimeout(() => {
          addLog(`match found: ${activeProfile.value.name} (${activeProfile.value.confidence}% confidence)`, 'success')
          addLog(`${activeProfile.value.sources.length} sources aggregated.`, 'success')
          scanning.value = false
          result.value = activeProfile.value
        }, 400)
      }
    }, i * 600 + 200)
  })
}
</script>

<style scoped>
.demo-page { padding: 60px 0 80px; }

.page-header {
  margin-bottom: 36px;
  padding-bottom: 28px;
  border-bottom: 1.5px solid var(--border);
}
.page-header h2 { font-size: 28px; margin: 8px 0 8px; }
.page-header p { color: var(--muted); font-size: 14px; }

.demo-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 40px;
}

.panel {
  background: var(--surface2);
  border: 1.5px solid var(--border-dark);
  border-radius: 2px;
  overflow: hidden;
}

.panel-title {
  background: var(--surface);
  padding: 10px 16px;
  border-bottom: 1.5px solid var(--border);
  font-family: var(--mono);
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.badge-live {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  color: #2a9d8f;
  font-weight: 400;
}
.live-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #2a9d8f;
  animation: blink 1.5s infinite;
}
@keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }

/* subject selector */
.subject-select { padding: 16px; border-bottom: 1px solid var(--border); }
.select-label { font-family: var(--mono); font-size: 10px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px; }

.subject-tabs { display: flex; flex-direction: column; gap: 6px; }
.subject-tab {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: 2px;
  cursor: pointer;
  font-family: var(--sans);
  text-align: left;
  transition: all 0.1s;
}
.subject-tab:hover { border-color: var(--border-dark); }
.subject-tab.active { border-color: var(--accent); background: #fff; }

.tab-avatar { font-size: 20px; flex-shrink: 0; }
.tab-name { font-size: 13px; font-weight: 600; flex: 1; }
.tab-loc { font-family: var(--mono); font-size: 10px; color: var(--muted); }

/* camera box */
.camera-box {
  margin: 16px;
  background: #0f0f17;
  aspect-ratio: 4/3;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.c {
  position: absolute;
  width: 16px; height: 16px;
  border-color: #e63946;
  border-style: solid;
}
.tl { top: 8px;    left: 8px;    border-width: 2px 0 0 2px; }
.tr { top: 8px;    right: 8px;   border-width: 2px 2px 0 0; }
.bl { bottom: 8px; left: 8px;    border-width: 0 0 2px 2px; }
.br { bottom: 8px; right: 8px;   border-width: 0 2px 2px 0; }

.cam-corners { position: absolute; inset: 0; pointer-events: none; z-index: 2; }

.cam-img-wrap { position: absolute; inset: 0; }
.cam-img { width: 100%; height: 100%; object-fit: cover; }

.cam-placeholder { display: flex; flex-direction: column; align-items: center; gap: 8px; z-index: 1; }
.cam-face { font-size: 64px; line-height: 1; }
.cam-status {
  font-family: var(--mono);
  font-size: 10px;
  color: #4af;
  letter-spacing: 0.1em;
}

.scanline {
  position: absolute;
  left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #e63946, transparent);
  top: 0;
  animation: scandown 2s linear infinite;
  opacity: 0.6;
  z-index: 3;
}
@keyframes scandown {
  from { top: 0%; }
  to   { top: 100%; }
}

/* upload */
.upload-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 16px 12px;
  padding: 8px 12px;
  background: var(--surface);
  border: 1px dashed var(--border);
  cursor: pointer;
  font-size: 12px;
  color: var(--muted);
  transition: border-color 0.15s;
}
.upload-row:hover { border-color: var(--border-dark); color: var(--text); }
.upload-row input { display: none; }
.upload-icon { font-size: 14px; }

/* scan button */
.scan-btn {
  display: block;
  width: calc(100% - 32px);
  margin: 0 16px 16px;
  padding: 12px;
  background: var(--accent);
  color: var(--bg);
  border: none;
  font-family: var(--mono);
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  letter-spacing: 0.05em;
  transition: background 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.scan-btn:hover:not(:disabled) { background: #e63946; }
.scan-btn:disabled { opacity: 0.5; cursor: not-allowed; }

.scanning-label { display: flex; align-items: center; gap: 8px; }
.spinner {
  width: 12px; height: 12px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* output panel */
.output-panel { display: flex; flex-direction: column; }

/* scan log */
.scan-log {
  border-bottom: 1.5px solid var(--border);
  flex-shrink: 0;
}
.log-header {
  font-family: var(--mono);
  font-size: 10px;
  color: #556;
  background: #0f0f17;
  padding: 6px 14px;
  border-bottom: 1px solid #1a1a2a;
}
.log-body {
  background: #0f0f17;
  padding: 12px 14px;
  min-height: 130px;
  max-height: 160px;
  overflow-y: auto;
}
.log-empty { font-family: var(--mono); font-size: 11px; color: #334; }
.log-line {
  display: flex;
  gap: 10px;
  font-family: var(--mono);
  font-size: 11px;
  line-height: 1.8;
}
.log-ts  { color: #334; flex-shrink: 0; }
.log-line.info    .log-msg { color: #7788aa; }
.log-line.step    .log-msg { color: #4af; }
.log-line.success .log-msg { color: #2a9d8f; }

/* result card */
.result-card {
  margin: 16px;
  border: 1.5px solid var(--border);
  border-radius: 2px;
  overflow: hidden;
  background: var(--surface2);
}

.result-header {
  padding: 10px 16px;
  background: #e8f5ee;
  border-bottom: 1px solid #b6dfc8;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.result-match {
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 700;
  color: #1e6b35;
  letter-spacing: 0.08em;
}
.conf-bar-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}
.conf-bar-fill {
  display: block;
  height: 6px;
  border-radius: 2px;
  transition: width 0.8s ease;
}
.conf-bar-fill.high { background: #2a9d8f; }
.conf-bar-fill.med  { background: #f4a261; }
.conf-label { font-family: var(--mono); font-size: 11px; color: var(--muted); }

.result-body {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-bottom: 1px solid var(--border);
}
.result-avatar { font-size: 36px; }
.result-name { font-family: var(--mono); font-size: 16px; font-weight: 700; margin-bottom: 2px; }
.result-role { font-size: 12px; color: var(--muted); }

.result-fields {
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.result-field { display: flex; gap: 12px; font-size: 12px; }
.rf-key {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  width: 72px;
  flex-shrink: 0;
  padding-top: 1px;
}
.rf-val { color: var(--text); font-weight: 400; }

.result-sources { padding: 10px 16px; }
.sources-title {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--muted);
  text-transform: uppercase;
  margin-bottom: 6px;
}
.source-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  padding: 3px 0;
  border-bottom: 1px solid var(--border);
}
.source-item:last-child { border-bottom: none; }
.src-name { font-weight: 600; width: 130px; flex-shrink: 0; }
.src-detail { color: var(--muted); font-size: 11px; }

.result-empty {
  padding: 40px 16px;
  text-align: center;
}
.mono-hint { font-family: var(--mono); font-size: 12px; color: var(--border-dark); }

/* transition */
.slide-up-enter-active { transition: all 0.3s ease; }
.slide-up-enter-from   { opacity: 0; transform: translateY(10px); }

/* bottom nav */
.bottom-nav {
  display: flex;
  gap: 12px;
  padding-top: 28px;
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

@media (max-width: 860px) {
  .demo-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .demo-page { padding: 32px 0 60px; }

  .page-header h2 { font-size: 24px; }

  .subject-tabs {
    flex-direction: row;
    overflow-x: auto;
    gap: 8px;
    padding-bottom: 4px;
  }
  .subject-tab {
    flex-direction: column;
    align-items: flex-start;
    flex-shrink: 0;
    width: 140px;
  }

  .src-detail { display: none; }
  .src-name { width: auto; }

  .bottom-nav { flex-direction: column; }
  .bottom-nav a { text-align: center; }
}
</style>
