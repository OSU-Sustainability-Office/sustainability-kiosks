import { createRouter, createWebHistory } from 'vue-router'
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
  history: createWebHistory(),
  routes
})

export default router
