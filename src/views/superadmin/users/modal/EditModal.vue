<script setup lang="ts">
import { ref, watch } from 'vue'
import type { User } from '../composables/types'

// Props
const props = defineProps<{
  user: User | null
}>()

// Emit events ke parent
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', user: User): void
}>()

// Form — default value
const form = ref<User>({
  id: 0,
  username: '',
  email: '',
  status: 'Active',
})

// Sync props.user ke form
watch(
  () => props.user,
  (newVal) => {
    if (newVal) {
      form.value = { ...newVal }
    }
  },
  { immediate: true },
)

// Simpan perubahan
function save() {
  emit('save', form.value)
}
</script>

<template>
  <div class="modal">
    <div class="modal-add">
      <div class="modal-header">
        <h3 class="modal-add__title">Edit User</h3>
        <button @click="$emit('close')" class="icon-x-btn">
          <img src="@/assets/images/icon/iconX.svg" alt="" />
        </button>
      </div>

      <label class="modal-add__label">Username :</label>
      <input v-model="form.username" class="input-add" placeholder="Username" type="text" />

      <label class="modal-add__label">Email :</label>
      <input v-model="form.email" class="input-add" type="email" placeholder="Email" />

      <label class="modal-add__label">Status :</label>
      <select v-model="form.status" class="status-filter add">
        <option value="Active">Active</option>
        <option value="Non Active">Non Active</option>
      </select>

      <div class="modal-add__actions">
        <button class="cancel" @click="$emit('close')">Cancel</button>
        <button class="done" @click="save">Done</button>
      </div>
    </div>
  </div>
</template>
