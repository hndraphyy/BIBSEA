<template>
  <h1>Admin Dashboard</h1>
  <button @click="handleLogout">Logout</button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogout = () => {
  localStorage.removeItem('token') // hapus token
  router.push('/login') // pindah ke login
}
</script>
