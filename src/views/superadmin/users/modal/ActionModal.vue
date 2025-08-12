<script setup lang="ts">
defineProps<{
  message: string
}>()

defineEmits<{
  (e: 'close'): void
  (e: 'confirm'): void
}>()
</script>

<template>
  <div class="modal-backdrop">
    <div class="modal">
      <p>{{ message }}</p>
      <div class="modal-actions">
        <button @click="$emit('close')">Cancel</button>
        <button @click="$emit('confirm')">Confirm</button>
      </div>
    </div>
  </div>
</template>
