<script setup lang="ts">
import { reactive } from 'vue'
import type { User } from '../composables/types'

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
  <div class="modal">
    <div class="modal-add">
      <h3 class="modal-add__title">Add User</h3>

      <label class="modal-add__label">Username:</label>
      <input v-model="form.username" type="text" class="input-add" placeholder="user123" />

      <label class="modal-add__label">Email:</label>
      <input v-model="form.email" type="email" class="input-add" placeholder="user@user.com" />

      <label class="modal-add__label">Status:</label>
      <select v-model="form.status" class="status-filter add">
        <option value="Active">Active</option>
        <option value="Non Active">Non Active</option>
      </select>

      <div class="modal-add__actions">
        <button class="cancel" @click="$emit('close')">Cancel</button>
        <button class="done" @click="saveUser">Done</button>
      </div>
    </div>
  </div>
</template>
