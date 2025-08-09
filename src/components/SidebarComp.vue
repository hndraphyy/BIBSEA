<template>
  <aside class="sidebar">
    <ul>
      <li v-for="item in filteredMenu" :key="item.path">
        <router-link :to="item.path">{{ item.name }}</router-link>
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type MenuItem = { name: string; path: string; roles: string[] }

const props = defineProps<{
  menu: MenuItem[]
}>()

// sementara role ambil dari localStorage
// nanti ganti dari API
const userRole = localStorage.getItem('role') || 'staff'

// filter menu sesuai role
const filteredMenu = computed(() => {
  return props.menu.filter(item => item.roles.includes(userRole))
})
</script>
