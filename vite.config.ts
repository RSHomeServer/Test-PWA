import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const rootDir = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],

  // file:../PWA-Base can nest its own React; force a single copy for production builds.
  // Charts still import workspace name @platform/animation — map via thin shim for sibling installs.
  resolve: {
    dedupe: ['react', 'react-dom', 'react-router-dom'],
    alias: {
      react: resolve(rootDir, 'node_modules/react'),
      'react-dom': resolve(rootDir, 'node_modules/react-dom'),
      'react-router-dom': resolve(rootDir, 'node_modules/react-router-dom'),
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
