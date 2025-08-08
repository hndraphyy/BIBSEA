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
          <input id="email" v-model="email" type="email" placeholder="Enter your email" />
          <span class="login-failed" v-if="errors.email">{{ errors.email }}</span>
        </div>

        <!-- Password -->
        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Enter your password"
          />
          <span class="login-failed" v-if="errors.password">{{ errors.password }}</span>
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLogin } from '../composables/useLogin'

const { email, password, errors, handleLogin } = useLogin()
</script>
