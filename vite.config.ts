import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const rootDir = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],

  // file:../PWA-Base can nest its own React; force a single copy for production builds.
  // Charts still import workspace name @platform/animation — map via thin shim for sibling installs.
  // Preview peers (`motion`, `dexie`, `lottie-react`) install in the consumer; map so source exports resolve outside the monorepo.
  resolve: {
    dedupe: [
      'react',
      'react-dom',
      'react-router-dom',
      'motion',
      'dexie',
      'lottie-react',
    ],
    alias: {
      react: resolve(rootDir, 'node_modules/react'),
      'react-dom': resolve(rootDir, 'node_modules/react-dom'),
      'react-router-dom': resolve(rootDir, 'node_modules/react-router-dom'),
      motion: resolve(rootDir, 'node_modules/motion'),
      dexie: resolve(rootDir, 'node_modules/dexie'),
      // lottie-react CJS default breaks under Vite (SongaraLottie renders an object).
      // Force the ESM build so `import Lottie from 'lottie-react'` is a component.
      'lottie-react': resolve(
        rootDir,
        'node_modules/lottie-react/build/index.es.js',
      ),
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
