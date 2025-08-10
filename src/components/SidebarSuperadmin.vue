<template>
  <div class="fixed">
    <aside class="sidebar">
      <div class="brand">
        <img src="@/assets/images/icon/iconLogo.svg" alt="Logo" />
      </div>

      <div class="menu">
        <RouterLink
          to="/superadmin/dashboard"
          class="menu-list"
          :class="{ active: isActive('/superadmin/dashboard') }"
          @mouseover="hoverMenu = 'dashboard'"
          @mouseleave="hoverMenu = ''"
        >
          <img
            :src="
              hoverMenu === 'dashboard' || isActive('/superadmin/dashboard')
                ? dashboardActive
                : dashboard
            "
            class="icon-menu"
            alt="Dashboard Icon"
          />
          Dashboard
        </RouterLink>

        <RouterLink
          to="/superadmin/products"
          class="menu-list"
          :class="{ active: isActive('/superadmin/products') }"
          @mouseover="hoverMenu = 'products'"
          @mouseleave="hoverMenu = ''"
        >
          <img
            :src="
              hoverMenu === 'products' || isActive('/superadmin/products')
                ? productsActive
                : products
            "
            class="icon-menu"
            alt="Products Icon"
          />
          Products
        </RouterLink>

        <RouterLink
          to="/superadmin/transactions"
          class="menu-list"
          :class="{ active: isActive('/superadmin/transactions') }"
          @mouseover="hoverMenu = 'transactions'"
          @mouseleave="hoverMenu = ''"
        >
          <img
            :src="
              hoverMenu === 'transactions' || isActive('/superadmin/transactions')
                ? transactionActive
                : transaction
            "
            class="icon-menu"
            alt="Transactions Icon"
          />
          Transactions
        </RouterLink>
        <button class="btn-logout" @click="handleLogout">Logout</button>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'

// ICON IMPORT
import dashboard from '@/assets/images/icon/dashboard.svg'
import dashboardActive from '@/assets/images/icon/dashboardActive.svg'
import products from '@/assets/images/icon/products.svg'
import productsActive from '@/assets/images/icon/productsActive.svg'
import transaction from '@/assets/images/icon/transaction.svg'
import transactionActive from '@/assets/images/icon/transactionActive.svg'

const hoverMenu = ref('')
const route = useRoute()
const router = useRouter()

const isActive = (path: string) => route.path === path

const handleLogout = () => {
  // Hapus token atau data login
  localStorage.removeItem('token')

  // Opsional: Hapus data user lain kalau ada
  // localStorage.clear()

  // Pindah ke login dan ganti history biar gak bisa back
  router.push({ path: '/login', replace: true })
}
</script>
