import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/assets/style-variables.scss";
            $font-path: "${env.VITE_FONT_PATH}";
            `
        }
      }
    },
    define: {
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
    },
    postcss: {
      plugins: [require('autoprefixer')]
    }
  }
})
