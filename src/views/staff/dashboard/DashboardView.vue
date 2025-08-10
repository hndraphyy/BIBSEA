<template>
  <div>
    <h1>Staff Dashboard</h1>
    <button @click="handleLogout">Logout</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogout = () => {
  

  localStorage.removeItem('token') // hapus token
  router.push('/login') // pindah ke login
}
</script>
