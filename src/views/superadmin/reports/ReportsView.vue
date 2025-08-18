<script setup lang="ts">
import EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css'
import { useReportsTable } from './composables/useReportsTable'
import ReportDetailModal from './modal/DetailModal.vue'

const {
  searchQuery,
  dateFilter,
  headers,
  filteredReports,
  Delete,
  showReportDetail,
  openMenuId,
  toggleMenu,
  formatCurrency,
  showDetailModal,
  selectedReport,
  closeDetailModal,
} = useReportsTable()
</script>

<template>
  <div class="dashboard data">
    <!-- Filter -->
    <div class="filter filter-two">
      <div class="search">
        <img src="@/assets/images/icon/search.svg" alt="" class="icon-search" />
        <input v-model="searchQuery" class="search-filter" type="text" placeholder="Search ..." />
      </div>
      <input v-model="dateFilter" type="date" class="date-filter" />
    </div>

    <!-- Table -->
    <EasyDataTable
      :headers="headers"
      :items="filteredReports"
      :rows-per-page="10"
      :rows-per-page-options="[10, 20, 50]"
      table-class-name="custom-table"
      pagination-class-name="custom-pagination"
    >
      <template #header-action>
        <div class="header-action">Action</div>
      </template>

      <!-- Format Revenue -->
      <template #item-revenue="{ revenue }">
        {{ formatCurrency(revenue) }}
      </template>

      <!-- Actions -->
      <template #item-action="{ id }">
        <div class="wp-action">
          <button @click.stop="toggleMenu(id)" class="action-btn"><span>...</span></button>
          <div v-if="openMenuId === id" class="wp-actions">
            <button @click="showReportDetail(id)" class="action-menu">Detail</button>
            <button @click="Delete(id)" class="action-menu border">Hapus</button>
          </div>
        </div>
      </template>

      <!-- Kalau data kosong -->
      <template #empty>
        <div>Belum ada data report</div>
      </template>
    </EasyDataTable>

    <!-- Modal Detail -->
    <ReportDetailModal :show="showDetailModal" :report="selectedReport" @close="closeDetailModal" />
  </div>
</template>
