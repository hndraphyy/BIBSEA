import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      meta: {
        title: 'Login',
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const baseTitle = 'BIBSEA'
  const pageTitle = to.meta.title ? `${to.meta.title} - ${baseTitle}` : baseTitle
  document.title = pageTitle
  next()
})

export default router
