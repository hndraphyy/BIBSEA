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
        meta: { headerText: 'Dashboard' },
        component: () => import('@/views/superadmin/dashboard/DashboardView.vue'),
      },
      {
        path: 'products',
        name: 'SuperadminProducts',
        meta: { headerText: 'Products' },
        component: () => import('@/views/superadmin/products/ProductsView.vue'),
      },
      {
        path: 'transactions',
        name: 'SuperadminTransactions',
        meta: { headerText: 'Transactions' },
        component: () => import('@/views/superadmin/transactions/TransactionsView.vue'),
      },
      {
        path: 'reports',
        name: 'Superadminreports',
        meta: { headerText: 'Reports' },
        component: () => import('@/views/superadmin/reports/ReportsView.vue'),
      },
      {
        path: 'users',
        name: 'Superadminusers',
        meta: { headerText: 'Users' },
        component: () => import('@/views/superadmin/users/UsersView.vue'),
      },
    ],
  },
]

export default superadminRoutes
