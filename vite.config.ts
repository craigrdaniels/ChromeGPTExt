import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json'
import tsConfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': {},
    'process.version': JSON.stringify(''),
  },
  plugins: [
    react(),
    nodePolyfills(),
    tsConfigPaths(),
    crx({
      manifest,
      contentScripts: {
        injectCss: true,
      },
    })
  ]
})
