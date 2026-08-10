import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const rootDir = dirname(fileURLToPath(import.meta.url))
const nm = (...parts: string[]) => resolve(rootDir, 'node_modules', ...parts)

export default defineConfig({
  plugins: [react()],

  // file:../PWA-Base can nest its own React; force a single copy for production builds.
  // Charts still import workspace name @platform/animation — map via thin shim for sibling installs.
  // Preview peers install in the consumer; map so source exports resolve outside the monorepo.
  resolve: {
    dedupe: [
      'react',
      'react-dom',
      'react-router-dom',
      'motion',
      'dexie',
      'lottie-react',
      '@rive-app/react-canvas',
      'gsap',
      '@tsparticles/react',
      '@tsparticles/slim',
      '@dimforge/rapier2d-compat',
      'matter-js',
      'planck',
      'cannon-es',
      'react-webcam',
      'tone',
      'howler',
      'idb',
      'localforage',
    ],
    alias: {
      react: nm('react'),
      'react-dom': nm('react-dom'),
      'react-router-dom': nm('react-router-dom'),
      motion: nm('motion'),
      dexie: nm('dexie'),
      'lottie-react': nm('lottie-react'),
      '@rive-app/react-canvas': nm('@rive-app/react-canvas'),
      gsap: nm('gsap'),
      '@tsparticles/react': nm('@tsparticles/react'),
      '@tsparticles/slim': nm('@tsparticles/slim'),
      '@dimforge/rapier2d-compat': nm('@dimforge/rapier2d-compat'),
      'matter-js': nm('matter-js'),
      planck: nm('planck'),
      'cannon-es': nm('cannon-es'),
      'react-webcam': nm('react-webcam'),
      tone: nm('tone'),
      howler: nm('howler'),
      idb: nm('idb'),
      localforage: nm('localforage'),
      '@platform/animation': resolve(rootDir, 'src/shims/platform-animation.ts'),
    },
  },

  server: {
    host: true,
    port: 5302,
    strictPort: true,
    allowedHosts: ['.dev.songara.uk', 'test.dev.songara.uk'],
  },
})
