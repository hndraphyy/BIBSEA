<script setup lang="ts">
import { reactive } from 'vue'
import type { User } from '../users.types'

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', user: User): void
}>()

const form = reactive<User>({
  id: 0,
  username: '',
  email: '',
  status: 'Active',
})

const saveUser = () => {
  if (!form.username || !form.email) return
  emit('save', { ...form })
}
</script>

<template>
  <div class="modal-backdrop">
    <div class="modal">
      <h3>Tambah User</h3>

      <label>Username:</label>
      <input v-model="form.username" type="text" />

      <label>Email:</label>
      <input v-model="form.email" type="email" />

      <label>Status:</label>
      <select v-model="form.status">
        <option value="Active">Active</option>
        <option value="Non Active">Non Active</option>
      </select>

      <div class="modal-actions">
        <button @click="$emit('close')">Cancel</button>
        <button @click="saveUser">Done</button>
      </div>
    </div>
  </div>
</template>
