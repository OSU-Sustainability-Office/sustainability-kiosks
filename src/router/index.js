import { createRouter, createWebHashHistory } from 'vue-router'
import main from '@/components/main.vue'
import sec from '@/components/sec.vue'
import carousel from '@/components/carousel.vue'

const routes = [
  {
    path: '/',
    component: main
  },
  {
    path: '/sec',
    component: sec
  },
  {
    path: '/carousel',
    name: 'Carousel',
    component: carousel
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_HOST_ADDRESS),
  routes
})

export default router
