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
        meta: { headerText: 'Dashboard', title: 'Superadmin' },
        component: () => import('@/views/superadmin/dashboard/DashboardView.vue'),
      },
      {
        path: 'products',
        name: 'SuperadminProducts',
        meta: { headerText: 'Products', title: 'Superadmin' },
        component: () => import('@/views/superadmin/products/ProductsView.vue'),
      },
      {
        path: 'transactions',
        name: 'SuperadminTransactions',
        meta: { headerText: 'Transactions', title: 'Superadmin' },
        component: () => import('@/views/superadmin/transactions/TransactionsView.vue'),
      },
      {
        path: 'reports',
        name: 'Superadminreports',
        meta: { headerText: 'Reports', title: 'Superadmin' },
        component: () => import('@/views/superadmin/reports/ReportsView.vue'),
      },
      {
        path: 'users',
        name: 'Superadminusers',
        meta: { headerText: 'Users', title: 'Superadmin' },
        component: () => import('@/views/superadmin/users/UsersView.vue'),
      },
    ],
  },
]

export default superadminRoutes
