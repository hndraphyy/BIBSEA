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
        <div class="form-group password-wrapper">
          <label for="password">Password</label>
          <div class="input-icon">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              id="password"
              placeholder="Enter your password"
            />
            <button type="button" class="eye-btn" @click="togglePassword">
              <img
                v-if="showPassword"
                src="../../assets/images/icon/icon-eye-off.svg"
                alt="Hide password"
              />
              <img v-else src="../../assets/images/icon/icon-eye.svg" alt="Show password" />
            </button>
          </div>
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
const showPassword = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleLogin = () => {
  if (email.value === '') {
    localStorage.setItem('token', 'dummy-token')
    localStorage.setItem('role', 'superadmin')
    router.push('/superadmin/dashboard')
  } else if (email.value === '1@1') {
    localStorage.setItem('token', 'dummy-token')
    localStorage.setItem('role', 'staff')
    router.push('/staff/dashboard')
  } else {
    alert('Invalid credentials')
  }
}
</script>
