<template>
  <div class="layout">
    <SidebarSuperadmin />
    <div class="content">
      <HeaderComp />
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import SidebarSuperadmin from '@/components/SidebarSuperadmin.vue'
import HeaderComp from '@/components/header/HeaderComp.vue'
</script>
