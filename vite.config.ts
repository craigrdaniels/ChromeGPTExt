import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import legacy from '@vitejs/plugin-legacy'
import babel from 'vite-plugin-babel'
import manifest from './manifest.json'
import tsConfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsConfigPaths(),
    crx({
      manifest,
      contentScripts: {
        injectCss: true,
      },
    }),
    legacy({
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"]
    }),
    babel({
      babelConfig: {
        babelrc: false,
        configFile: false,
        plugins: ["@babel/plugin-transform-runtime"]
      },
    })
  ],
  esbuild: {
    supported: {
      "top-level-await": true,
    }
  }
})
