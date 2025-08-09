import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import superadminRoutes from '@/router/routes/superadmin'
import staffRoutes from '@/router/routes/staff'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: { title: 'Login' },
  },
  ...superadminRoutes,
  ...staffRoutes,
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  // Auth check
  if (!token && to.path !== '/login') {
    return next('/login')
  }
  if (token && to.path === '/login') {
    return next(`/${role}/dashboard`)
  }

  // Role check: Kalau bukan rolenya → lempar ke login
  if (token && to.meta.role && role !== to.meta.role) {
    return next('/login')
  }

  // Title update
  const baseTitle = 'BIBSEA'
  document.title = to.meta.title ? `${to.meta.title} - ${baseTitle}` : baseTitle

  next()
})

export default router
