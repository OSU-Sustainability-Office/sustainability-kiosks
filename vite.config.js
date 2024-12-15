import { defineConfig, loadEnv } from 'vite'
import { createVuePlugin as vue } from 'vite-plugin-vue2'
import path from 'path'

const env = loadEnv(process.cwd(), '')

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
        "@": path.resolve(__dirname, "./src"),
        },
    },
    css: {
        preprocessorOptions: {
        scss: {
            additionalData: `
            @import "@/assets/style-variables.scss";
            $font-path: "${env.VITE_FONT_PATH}";
            `,
        },
        },
    postcss: {
        plugins: [
        require('autoprefixer')
        ],
    },
    },
});