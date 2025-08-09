<template>
  <div class="layout">
    <SidebarComp :menu="menu" />
    <div class="content">
      <HeaderComp />
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import SidebarComp from '@/components/SidebarComp.vue'
import HeaderComp from '@/components/HeaderComp.vue'

const menu = [
  { name: 'Dashboard', path: '/staff/dashboard' },
  { name: 'Products', path: '/staff/products' },
  { name: 'Profile', path: '/staff/profile' },
  { name: 'Transactions', path: '/staff/transactions' },
]
</script>
