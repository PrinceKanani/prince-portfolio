import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // GitHub Pages serves the site from /<repo-name>/ — the deploy workflow sets
  // VITE_BASE from the repository name; override locally if needed. `||` so an
  // empty-string env var still falls back.
  const base = env.VITE_BASE || (mode === 'production' ? '/prince-portfolio/' : '/')

  return {
    base,
    plugins: [react(), tailwindcss()],
    build: {
      target: 'es2022',
      // The three.js chunk is ~1.1MB minified but loads lazily via Suspense,
      // never blocking first paint.
      chunkSizeWarningLimit: 1200,
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (!id.includes('node_modules')) return undefined
            // React runtime must be pinned to its own chunk BEFORE the three
            // test: rolldown otherwise folds react-dom (a shared static dep of
            // main.tsx and @react-three/fiber) into the 'three' chunk, turning
            // the ~1.1MB chunk into a static import that blocks first render.
            if (/[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return 'react'
            if (/[\\/](three|@react-three|three-stdlib)[\\/]/.test(id)) return 'three'
            if (/[\\/](motion|framer-motion|motion-dom|motion-utils)[\\/]/.test(id)) return 'motion'
            return undefined
          },
        },
      },
    },
  }
})
