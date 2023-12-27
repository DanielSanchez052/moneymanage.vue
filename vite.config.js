import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { splitVendorChunkPlugin } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    origin: "https://originalcoin.online"
  },
  plugins: [vue(), splitVendorChunkPlugin()],
  resolve: {
    alias : [
      { find: '@', replacement:  fileURLToPath(new URL("./src", import.meta.url)) }
    ]
  }
})
