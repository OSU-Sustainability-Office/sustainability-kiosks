import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url'
import path from 'path'
import autoprefixer from 'autoprefixer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/style-variables.scss" as *;
            $font-path: "${env.VITE_FONT_PATH}";
            `
        }
      }
    },
    define: {
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
    },
    postcss: {
      plugins: [autoprefixer()]
    },
    server: {
      port: 3000
    }
  }
})
