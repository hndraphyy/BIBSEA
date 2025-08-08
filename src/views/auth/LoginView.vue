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
          <input id="email" type="email" placeholder="Enter your email" />
        </div>

        <!-- Password -->
        <div class="form-group">
          <label for="password">Password</label>
          <input id="password" type="password" placeholder="Enter your password" />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogin = () => {
  router.push('/superadmin/dashboard')
}
</script>
