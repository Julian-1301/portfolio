<template>
  <div id="app">
    <NavBar />
    <RouterView />
    <CustomCursor />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import CustomCursor from './components/CustomCursor.vue'
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Instrument+Sans:wght@400;500;600&display=swap');

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

* {
  cursor: none;
}

/* But make sure text selection still shows default cursor */
input, textarea, [contenteditable] {
  cursor: text;
}

/* Light mode (default) */
:root {
  --bg: #faf9f6;
  --bg2: #f2f0eb;
  --bg3: #e8e5de;
  --text: #1a1814;
  --text-muted: #7a7670;
  --accent: #f0c640;
  --accent2: #e6b820;
  --accent-light: #fdf3c0;
  --border: rgba(26, 24, 20, 0.1);
  --font-display: 'Fraunces', serif;
  --font-body: 'Instrument Sans', sans-serif;
}

/* Normal Dark Mode */
[data-theme="dark"][data-theme-level="normal"] {
  --bg: #1a1a2e;
  --bg2: #16213e;
  --bg3: #0f3460;
  --text: #eeeeee;
  --text-muted: #a0a0a0;
  --accent: #4a90e2;
  --accent2: #357abd;
  --accent-light: rgba(74, 144, 226, 0.15);
  --border: #2a3a5c;
}

/* Evil Mode (Dark Patterns) */
[data-theme="dark"][data-theme-level="evil"] {
  --bg: #0a0a0a;
  --bg2: #1a1a1a;
  --bg3: #2a2a2a;
  --text: #ffffff;
  --text-muted: #888888;
  --accent: #ff0000;
  --accent2: #ff4444;
  --accent-light: rgba(255, 0, 0, 0.15);
  --border: #ff0000;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.6;
  overflow-x: hidden;
  transition: background-color 0.3s ease, color 0.2s ease;
}

::selection {
  background: var(--accent);
  color: var(--text);
}

::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: var(--bg2);
}

::-webkit-scrollbar-thumb {
  background: var(--accent);
  border-radius: 2px;
}

a {
  color: inherit;
  text-decoration: none;
}

/* Smooth transitions for theme switching */
* {
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.2s ease;
}
</style>