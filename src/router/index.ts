import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import AdminDashboard from '@/views/staff/dashboard/DashboardView.vue'
import StaffDashboard from '@/views/superadmin/dashboard/DashboardView.vue'

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
      meta: { title: 'Login' },
    },
    {
      path: '/superadmin/dashboard',
      name: 'SuperadminDashboard',
      component: AdminDashboard,
      meta: { title: 'Dashboard Superadmin' },
    },
    {
      path: '/staff/dashboard',
      name: 'StaffDashboard',
      component: StaffDashboard,
      meta: { title: 'Dashboard Staff' },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const baseTitle = 'BIBSEA'
  document.title = to.meta.title ? `${to.meta.title} - ${baseTitle}` : baseTitle
  next()
})

export default router
