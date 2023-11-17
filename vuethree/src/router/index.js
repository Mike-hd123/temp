import { createRouter, createWebHistory } from 'vue-router'
import coinView from '../views/coinView.vue'
import propertyView from '../views/propertyView.vue'

const router = createRouter({
  history: createWebHistory('#'),
  routes: [
    {
      path: '/',
      name: 'coin',
      component: coinView
    }, {
      path: '/property',
      name: 'property',
      component: propertyView
    }
  ]
})

export default router
