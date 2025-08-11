<template>
  <div class="fixed">
    <aside class="sidebar">
      <div class="brand">
        <img src="@/assets/images/icon/iconLogo.svg" alt="Logo" />
      </div>

      <div class="menu">
        <RouterLink
          v-for="item in filteredMenu"
          :key="item.name"
          :to="item.path"
          class="menu-list"
          :class="{ active: isActive(item.path) }"
          @mouseover="hoverMenu = item.name"
          @mouseleave="hoverMenu = ''"
        >
          <img
            :src="hoverMenu === item.name || isActive(item.path) ? item.iconActive : item.icon"
            class="icon-menu"
            :alt="`${item.name} Icon`"
          />
          {{ item.name }}
        </RouterLink>

        <button class="btn-logout" @click="handleLogout">Logout</button>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'

const userRole = 'staff'

const menuItems = [
  {
    name: 'Dashboard',
    path: '/staff/dashboard',
    icon: new URL('@/assets/images/icon/dashboard.svg', import.meta.url).href,
    iconActive: new URL('@/assets/images/icon/dashboardActive.svg', import.meta.url).href,
    roles: ['staff'],
  },
  {
    name: 'Products',
    path: '/staff/products',
    icon: new URL('@/assets/images/icon/products.svg', import.meta.url).href,
    iconActive: new URL('@/assets/images/icon/productsActive.svg', import.meta.url).href,
    roles: ['staff'],
  },
  {
    name: 'Transactions',
    path: '/staff/transactions',
    icon: new URL('@/assets/images/icon/transactions.svg', import.meta.url).href,
    iconActive: new URL('@/assets/images/icon/transactionsActive.svg', import.meta.url).href,
    roles: ['staff'],
  },
]

// Filter menu sesuai role
const filteredMenu = computed(() => menuItems.filter((item) => item.roles.includes(userRole)))

const hoverMenu = ref('')
const route = useRoute()
const router = useRouter()

const isActive = (path: string) => route.path === path

const handleLogout = () => {
  localStorage.removeItem('token')
  router.push({ path: '/login', replace: true })
}
</script>
