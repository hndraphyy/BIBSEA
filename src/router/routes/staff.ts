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
        meta: { headerText: 'Dashboard', title: 'Staff' },
        component: () => import('@/views/staff/dashboard/DashboardView.vue'),
      },
      {
        path: 'products',
        name: 'StaffProducts',
        meta: { headerText: 'Products', title: 'Staff' },
        component: () => import('@/views/staff/products/ProductsView.vue'),
      },
      {
        path: 'transactions',
        name: 'StaffTransactions',
        meta: { headerText: 'Transactions', title: 'Staff' },
        component: () => import('@/views/staff/transactions/TransactionsView.vue'),
      },
    ],
  },
]

export default staffRoutes
