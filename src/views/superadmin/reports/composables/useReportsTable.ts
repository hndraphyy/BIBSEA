import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

/**
 * Struktur data laporan penjualan.
 */
interface Report {
  id: number
  product: string
  sales: number
  revenue: number
  date: string
}

/** State utama untuk menampung laporan */
const reports = ref<Report[]>([])

/** Produk dasar untuk generate data dummy */
const baseProducts = [
  { product: 'BIBSEA Premium Oil 1L', sales: 120, revenue: 2_400_000 },
  { product: 'BIBSEA Shampoo Herbal', sales: 80, revenue: 1_600_000 },
]

/**
 * Generate laporan dummy
 */
const generateReports = (loopCount: number) => {
  let id = 1
  for (let i = 0; i < loopCount; i++) {
    for (const prod of baseProducts) {
      reports.value.push({
        id: id++,
        product: prod.product,
        sales: prod.sales + i * 5,
        revenue: prod.revenue + i * 10_000,
        date: `2025-08-${String((i % 30) + 1).padStart(2, '0')}`,
      })
    }
  }
}

/** Load dari localStorage, jika kosong generate dummy */
const savedData = localStorage.getItem('reports')
if (savedData) {
  reports.value = JSON.parse(savedData)
  // generateReports(1)
} else {
  generateReports(1)
}

/** Auto-save ke localStorage */
watch(reports, (newVal) => localStorage.setItem('reports', JSON.stringify(newVal)), { deep: true })

/**
 * Composable utama untuk tabel laporan
 */
export function useReportsTable() {
  // State
  const searchQuery = ref('')
  const dateFilter = ref('')
  const openMenuId = ref<number | null>(null)
  const showDetailModal = ref(false)
  const selectedReport = ref<(Report & { no?: number }) | null>(null)

  // Header tabel
  const headers = [
    { text: 'No', value: 'no' },
    { text: 'Product', value: 'product' },
    { text: 'Sales', value: 'sales' },
    { text: 'Revenue', value: 'revenue' },
    { text: 'Date', value: 'date' },
    { text: 'Action', value: 'action' },
  ]

  // Data laporan terfilter + nomor urut
  const filteredReports = computed(() =>
    reports.value
      .filter((r) => {
        const matchSearch = r.product.toLowerCase().includes(searchQuery.value.toLowerCase())
        const matchDate = dateFilter.value ? r.date === dateFilter.value : true
        return matchSearch && matchDate
      })
      .map((r, index) => ({
        ...r,
        no: index + 1,
      })),
  )

  // Toggle menu aksi
  const toggleMenu = (id: number) => {
    openMenuId.value = openMenuId.value === id ? null : id
  }

  // Tutup menu jika klik di luar elemen
  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (!target.closest('.wp-action')) {
      openMenuId.value = null
    }
  }

  // Pasang/hapus listener global
  onMounted(() => document.addEventListener('click', handleClickOutside))
  onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))

  // Buka detail laporan
  const showReportDetail = (id: number) => {
    selectedReport.value = filteredReports.value.find((r) => r.id === id) || null
    showDetailModal.value = true
    openMenuId.value = null
  }

  // Hapus laporan
  const Delete = (id: number) => {
    reports.value = reports.value.filter((r) => r.id !== id)
    openMenuId.value = null
  }

  // Tutup modal detail
  const closeDetailModal = () => {
    showDetailModal.value = false
    selectedReport.value = null
  }

  // Format angka ke mata uang IDR
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value)

  return {
    searchQuery,
    dateFilter,
    headers,
    filteredReports,
    openMenuId,
    toggleMenu,
    showDetailModal,
    selectedReport,
    showReportDetail,
    Delete,
    closeDetailModal,
    formatCurrency,
  }
}
