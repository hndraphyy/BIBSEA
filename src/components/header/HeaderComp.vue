<template>
  <header class="header">
    <h1 class="title">{{ route.meta.headerText }}</h1>
  </header>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
