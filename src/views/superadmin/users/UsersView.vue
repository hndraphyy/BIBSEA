<script setup lang="ts">
import AddUser from './modal/AddUser.vue'
import EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css'

import { useUsersTable } from './composables/useUserTable'

const {
  searchQuery,
  statusFilter,
  showAddUser,
  headers,
  filteredUsers,
  addUser,
  deleteUser,
  openMenuId,
  toggleMenu,
} = useUsersTable()
</script>

<template>
  <div class="dashboard data">
    <!-- Filter -->
    <div class="filter">
      <div class="search">
        <img src="@/assets/images/icon/search.svg" alt="" class="icon-search" />
        <input v-model="searchQuery" class="search-filter" type="text" placeholder="Cari user..." />
      </div>
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
          <button class="action-btn" @click.stop="toggleMenu(id)">...</button>
          <div v-if="openMenuId === id">
            <button @click="deleteUser(id)" class="action-menu">Hapus</button>
          </div>
        </div>
      </template>
    </EasyDataTable>

    <AddUser v-if="showAddUser" @close="showAddUser = false" @save="addUser" />
  </div>
</template>
