<script setup lang="ts">
interface Report {
  id: number
  no?: number
  product: string
  sales: number
  revenue: number
  date: string
}

defineProps<{
  show: boolean
  report: Report | null
}>()

defineEmits<{
  (e: "close"): void
}>()

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value)
</script>

<template>
  <div v-if="show" class="modal">
    <div class="modal-add">
      <!-- Header -->
      <div class="modal-header">
        <h3 class="modal-add__title">
          Detail Report {{ report?.no ? `#${report.no}` : "" }}
        </h3>
        <button @click="$emit('close')" class="icon-x-btn">
          <img src="@/assets/images/icon/iconX.svg" alt="close" />
        </button>
      </div>

      <!-- Body -->
      <div class="modal-add__body" v-if="report">
        <p><b>Product:</b> {{ report.product }}</p>
        <p><b>Sales:</b> {{ report.sales }}</p>
        <p><b>Revenue:</b> {{ formatCurrency(report.revenue) }}</p>
        <p><b>Date:</b> {{ report.date }}</p>
      </div>

      <!-- Footer -->
      <div class="modal-add__actions">
        <button class="cancel" @click="$emit('close')">Close</button>
      </div>
    </div>
  </div>
</template>
