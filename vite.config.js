import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {},
  plugins: [vue()],
  resolve: {
    alias : [
      { find: '@', replacement:  fileURLToPath(new URL("./src", import.meta.url)) }
    ]
  }
})
