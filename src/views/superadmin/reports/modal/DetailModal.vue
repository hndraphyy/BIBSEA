<script setup lang="ts">
interface Report {
  id: number
  no?: number
  product: string
  sales: number
  revenue: number
  date: string
  contribution?: number // % kontribusi ke total report
  trend?: "up" | "down" | "stable"
  notes?: string
}

defineProps<{
  show: boolean
  report: Report | null
}>()

defineEmits<{
  (e: 'close'): void
}>()

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value)

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
</script>

<template>
  <div v-if="show" class="modal">
    <div class="modal-detail">
      <!-- Header -->
      <div class="modal-header">
        <h3 class="modal-detail__title">
          Report Detail {{ report?.no ? `#${report.no}` : '' }}
        </h3>
        <button @click="$emit('close')" class="icon-x-btn">
          <img src="@/assets/images/icon/iconX.svg" alt="close" />
        </button>
      </div>

      <!-- Body -->
      <div class="modal-detail__body" v-if="report">
        <p><span class="modal-label">ID Report:</span> <b>{{ report.id }}</b></p>
        <p><span class="modal-label">Product:</span> <b>{{ report.product }}</b></p>
        <p><span class="modal-label">Total Sales:</span> <b>{{ report.sales }}</b></p>
        <p><span class="modal-label">Total Revenue:</span> <b>{{ formatCurrency(report.revenue) }}</b></p>
        <p>
          <span class="modal-label">Average Price / Unit:</span>
          <b>{{ report.sales ? formatCurrency(report.revenue / report.sales) : '-' }}</b>
        </p>
        <p>
          <span class="modal-label">Contribution:</span>
          <b>{{ report.contribution ? report.contribution + '%' : '-' }}</b>
        </p>
        <p>
          <span class="modal-label">Trend:</span>
          <b>{{ report.trend || '-' }}</b>
        </p>
        <p><span class="modal-label">Date:</span> <b>{{ formatDate(report.date) }}</b></p>
        <p><span class="modal-label">Notes:</span> <b>{{ report.notes || 'No notes' }}</b></p>
      </div>

      <!-- Footer -->
      <div class="modal-detail__actions">
        <button class="cancel" @click="$emit('close')">Close</button>
      </div>
    </div>
  </div>
</template>
