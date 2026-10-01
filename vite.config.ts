import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

// GitHub Pages serves 404.html for unknown paths. Copying index.html to
// 404.html lets deep links like /portfolio/project/iris load the app.
function spaFallback(): Plugin {
  let outDir = 'docs'
  return {
    name: 'spa-404-fallback',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir
    },
    closeBundle() {
      const index = resolve(outDir, 'index.html')
      if (existsSync(index)) copyFileSync(index, resolve(outDir, '404.html'))
    },
  }
}

export default defineConfig({
  plugins: [vue(), spaFallback()],
  base: '/portfolio/',
  build: {
    // GitHub Pages serves the /docs folder of the main branch
    outDir: 'docs',
    emptyOutDir: true,
  },
})
