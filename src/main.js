import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  locale: 'en',
  messages: {}
})

const app = createApp(App)
const pinia = createPinia()

app.use(ElementPlus)
app.use(i18n)
app.use(router)
app.use(pinia)

app.mount('#app')
