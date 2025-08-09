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
import SidebarComp from '@/components/SidebarComp.vue';
import HeaderComp from '@/components/HeaderComp.vue';

const menu = [
  { name: 'Dashboard', path: '/superadmin/dashboard' },
  { name: 'Products', path: '/superadmin/products' },
  { name: 'Reports', path: '/superadmin/reports' },
  { name: 'Transactions', path: '/superadmin/transactions' },
  { name: 'Users', path: '/superadmin/users' },
]
</script>
