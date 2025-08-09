<template>
  <div class="wrapper-login">
    <div class="left">
      <img src="@/assets/images/icon/iconLogo.svg" alt="..." />
    </div>

    <div class="right">
      <form @submit.prevent="handleLogin">
        <!-- Email -->
        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="email" id="email" type="email" placeholder="Enter your email" />
        </div>

        <!-- Password -->
        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="password"
            id="password"
            type="password"
            placeholder="Enter your password"
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')

const handleLogin = () => {
  // Dummy role check
  if (email.value === '1test@m') {
    localStorage.setItem('token', 'dummy-token')
    localStorage.setItem('role', 'superadmin')
    router.push('/superadmin/dashboard')
  } else if (email.value === 'test@m') {
    localStorage.setItem('token', 'dummy-token')
    localStorage.setItem('role', 'staff')
    router.push('/staff/dashboard')
  } else {
    alert('Invalid credentials')
  }
}
</script>
