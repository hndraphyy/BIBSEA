import type { RouteRecordRaw } from 'vue-router'
import SuperadminLayout from '@/layouts/SuperadminLayout.vue'

const superadminRoutes: RouteRecordRaw[] = [
  {
    path: '/superadmin',
    component: SuperadminLayout,
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
