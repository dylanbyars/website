import react from '@vitejs/plugin-react-swc'
import { resolve, } from 'path'
import { defineConfig, } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/periodic-table/', // Match your serving path
  build: {
    outDir: resolve(__dirname, '../../public/periodic-table',),
    emptyOutDir: true, // This will clear the output directory before each build
  },
  plugins: [react(),],
},)
