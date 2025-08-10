import type { RouteRecordRaw } from 'vue-router'
import StaffLayout from '@/layouts/StaffLayout.vue'

const staffRoutes: RouteRecordRaw[] = [
  {
    path: '/staff',
    component: StaffLayout,
    meta: { role: 'staff' },
    children: [
      {
        path: 'dashboard',
        name: 'StaffDashboard',
        component: () => import('@/views/staff/dashboard/DashboardView.vue'),
        meta: { title: 'Dashboard', role: 'staff' },
      },
    ],
  },
]

export default staffRoutes
