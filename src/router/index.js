import { createRouter, createWebHistory } from 'vue-router'
import landingView from '../views/landing.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: landingView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/signUp.vue'),
    },
      {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue'),
    },
     {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/dashBoard.vue'),
    },
  ],
})

export default router
