<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import type { User } from './users.types'
import AddUser from './modal/AddUser.vue'
import EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css'

const searchQuery = ref('')
const statusFilter = ref('')
const showAddUser = ref(false)

const headers = [
  { text: 'ID', value: 'id', sortable: true },
  { text: 'Username', value: 'username', sortable: true },
  { text: 'Email', value: 'email', sortable: true },
  { text: 'Status', value: 'status', sortable: true },
  { text: 'Action', value: 'action' },
]

const users = ref<User[]>([
  { id: 1, username: 'John Doe', email: 'john@example.com', status: 'Active' },
  { id: 2, username: 'Jane Smith', email: 'jane@example.com', status: 'Non Active' },
])

const filteredUsers = computed(() => {
  return users.value.filter((user) => {
    const matchesStatus = statusFilter.value ? user.status === statusFilter.value : true
    const matchesSearch = searchQuery.value
      ? user.username.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
      : true
    return matchesStatus && matchesSearch
  })
})

const addUser = (newUser: User) => {
  newUser.id = users.value.length + 1
  users.value.push(newUser)
  showAddUser.value = false
}

const deleteUser = (id: number) => {
  users.value = users.value.filter((u) => u.id !== id)
  openMenuId.value = null
}

// --- Dropdown Menu Logic ---
const openMenuId = ref<number | null>(null)

const toggleMenu = (id: number) => {
  openMenuId.value = openMenuId.value === id ? null : id
}

// Close menu if click outside
const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!target.closest('.action-menu') && !target.closest('.action-btn')) {
    openMenuId.value = null
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="dashboard data">
    <!-- Filter -->
    <div class="filter">
      <input v-model="searchQuery" class="search-filter" type="text" placeholder="Cari user..." />
      <select v-model="statusFilter" class="status-filter">
        <option value="">Status</option>
        <option value="Active">Active</option>
        <option value="Non Active">Non Active</option>
      </select>
      <button class="user-dashboard__add-btn" @click="showAddUser = true">+ Add User</button>
    </div>

    <!-- Table -->
    <EasyDataTable
      :headers="headers"
      :items="filteredUsers"
      :rows-per-page="10"
      :rows-per-page-options="[10, 20, 50]"
      table-class-name="custom-table"
      pagination-class-name="custom-pagination"
    >
      <template #item-status="{ status }">
        <span :class="status === 'Active' ? 'status-active' : 'status-nonactive'">
          {{ status }}
        </span>
      </template>

      <template #item-action="{ id }">
        <div style="position: relative">
          <button class="action-btn" @click.stop="toggleMenu(id)">⋮</button>

          <!-- Dropdown Menu -->
          <div v-if="openMenuId === id" class="action-menu">
            <button @click="deleteUser(id)">Hapus</button>
          </div>
        </div>
      </template>
    </EasyDataTable>

    <!-- Modal Add User -->
    <AddUser v-if="showAddUser" @close="showAddUser = false" @save="addUser" />
  </div>
</template>
