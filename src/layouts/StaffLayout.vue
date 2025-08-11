<template>
  <div class="layout">
    <SidebarStaff />
    <div class="content">
      <HeaderComp />
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import SidebarStaff from '@/components/SidebarStaff.vue'
import HeaderComp from '@/components/header/HeaderComp.vue'
</script>
