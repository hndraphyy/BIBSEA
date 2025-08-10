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
    ],
  },
]

export default superadminRoutes
