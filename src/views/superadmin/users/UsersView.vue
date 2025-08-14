<script setup lang="ts">
import AddUser from './modal/AddUser.vue'
import EditUser from './modal/EditModal.vue'
import EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css'
import { useUsersTable } from './composables/useUserTable'

const {
  searchQuery,
  statusFilter,
  showAddUser,
  showEditUser,
  headers,
  filteredUsers,
  addUser,
  editUser,
  updateUser,
  deleteUser,
  openMenuId,
  toggleMenu,
  selectedUser,
} = useUsersTable()
</script>

<template>
  <div class="dashboard data">
    <!-- Filter -->
    <div class="filter">
      <div class="search">
        <img src="@/assets/images/icon/search.svg" alt="" class="icon-search" />
        <input v-model="searchQuery" class="search-filter" type="text" placeholder="Search ..." />
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
      <template #header-action>
        <div class="header-action">Action</div>
      </template>

      <template #item-status="{ status }">
        <span :class="status === 'Active' ? 'status active' : 'status nonactive'">
          {{ status }}
        </span>
      </template>

      <template #item-action="{ id }">
        <div class="wp-action">
          <button class="action-btn" @click.stop="toggleMenu(id)">
            <span>...</span>
          </button>

          <div v-if="openMenuId === id">
            <div class="wp-actions">
              <button @click="editUser(id)" class="action-menu">Edit</button>
              <button @click="deleteUser(id)" class="action-menu border">Hapus</button>
            </div>
          </div>
        </div>
      </template>
    </EasyDataTable>

    <!-- Modals -->
    <AddUser v-if="showAddUser" @close="showAddUser = false" @save="addUser" />

    <EditUser
      v-if="showEditUser"
      :user="selectedUser"
      @close="showEditUser = false"
      @save="updateUser"
    />
  </div>
</template>
