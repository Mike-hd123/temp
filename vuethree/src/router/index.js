import { createRouter, createWebHistory } from 'vue-router'
import coinView from '../views/coinView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: coinView
    }
  ]
})

export default router
