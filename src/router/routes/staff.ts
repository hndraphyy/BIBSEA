import type { RouteRecordRaw } from 'vue-router'

const staffRoutes: RouteRecordRaw[] = [
  {
    path: '/staff',
    component: () => import('@/views/staff/dashboard/DashboardView.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'StaffDashboard',
        component: () => import('@/views/superadmin/dashboard/DashboardView.vue'),
        meta: { title: 'Dashboard' },
      },
    ],
  },
]

export default staffRoutes
