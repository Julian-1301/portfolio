<template>
  <header>
    <div class="nav-inner">
      <RouterLink to="/" class="logo">
        <span class="logo-bracket">[</span>IRIS<span class="logo-bracket">]</span>
        <span class="logo-sub">facial recog. prototype</span>
      </RouterLink>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/how-it-works">How it works</RouterLink>
        <RouterLink to="/demo">Demo</RouterLink>
        <RouterLink to="/privacy">Privacy</RouterLink>
      </nav>
      <div class="nav-badge">v0.1 — edu only</div>
    </div>
  </header>

  <main>
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>

  <footer>
    <div class="page-wrap footer-inner">
      <span class="footer-mono">IRIS // group project // {{ year }}</span>
      <span class="footer-note">all profiles are fictional. no real recognition occurs.</span>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const menuOpen = ref(false)
useRouter().afterEach(() => { menuOpen.value = false })

const year = new Date().getFullYear()
</script>

<style scoped>
header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--accent);
  border-bottom: 2px solid #000;
}
.nav-inner {
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 32px;
  height: 56px;
  display: flex;
  align-items: center;
  gap: 40px;
}
.logo {
  font-family: var(--mono);
  font-size: 15px;
  font-weight: 700;
  color: var(--bg);
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}
.logo-bracket { color: var(--accent2); }
.logo-sub {
  font-size: 10px;
  font-weight: 400;
  color: #7777aa;
  font-family: var(--mono);
}
nav { display: flex; gap: 4px; flex: 1; }
nav a {
  font-family: var(--mono);
  font-size: 12px;
  color: #7777aa;
  padding: 6px 12px;
  border-radius: 2px;
  transition: background 0.15s, color 0.15s;
}
nav a:hover { background: rgba(255,255,255,0.08); color: #fff; }
nav a.router-link-active { background: var(--accent2); color: #fff; }
.nav-badge { font-family: var(--mono); font-size: 10px; color: #444466; }
main { min-height: calc(100vh - 56px - 52px); }
footer { background: var(--accent); border-top: 2px solid #000; padding: 14px 0; }
.footer-inner { display: flex; justify-content: space-between; align-items: center; }
.footer-mono { font-family: var(--mono); font-size: 11px; color: #444466; }
.footer-note { font-size: 11px; color: #444466; font-style: italic; }

@media (max-width: 860px) {
  .nav-desktop { display: flex; }
  .nav-badge   { display: none; }
  .logo-sub    { display: none; }
}
</style>
