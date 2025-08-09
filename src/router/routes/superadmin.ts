import type { RouteRecordRaw } from 'vue-router'

const superadminRoutes: RouteRecordRaw[] = [
  {
    path: '/superadmin',
    component: () => import('@/views/superadmin/dashboard/DashboardView.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'SuperadminDashboard',
        component: () => import('@/views/superadmin/dashboard/DashboardView.vue'),
        meta: { title: 'Dashboard' },
      },
    ],
  },
]

export default superadminRoutes
