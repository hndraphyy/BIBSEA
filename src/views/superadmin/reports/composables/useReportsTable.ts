import { ref, computed } from "vue"

interface Report {
  id: number
  product: string
  sales: number
  revenue: number
  date: string
}

const reports = ref<Report[]>([
  { id: 1, product: "BIBSEA Premium Oil 1L", sales: 120, revenue: 2400000, date: "2025-08-01" },
  { id: 2, product: "BIBSEA Shampoo Herbal", sales: 80, revenue: 1600000, date: "2025-08-03" },
  { id: 3, product: "BIBSEA Conditioner Smooth", sales: 60, revenue: 1500000, date: "2025-08-05" },
])

export function useReportsTable() {
  const searchQuery = ref("")
  const dateFilter = ref("")
  const openMenuId = ref<number | null>(null)

  const showDetailModal = ref(false)
  const selectedReport = ref<Report & { no?: number } | null>(null)

  const headers = [
    { text: "No", value: "no" },
    { text: "Product", value: "product" },
    { text: "Sales", value: "sales" },
    { text: "Revenue", value: "revenue" },
    { text: "Date", value: "date" },
    { text: "Action", value: "action" },
  ]

  const filteredReports = computed(() =>
    reports.value
      .filter((r) => {
        const matchSearch =
          r.product.toLowerCase().includes(searchQuery.value.toLowerCase())
        const matchDate = dateFilter.value ? r.date === dateFilter.value : true
        return matchSearch && matchDate
      })
      .map((r, index) => ({
        ...r,
        no: index + 1, // auto nomor urut
      }))
  )

  const toggleMenu = (id: number) => {
    openMenuId.value = openMenuId.value === id ? null : id
  }

  const detailReport = (id: number) => {
    selectedReport.value = filteredReports.value.find((r) => r.id === id) || null
    showDetailModal.value = true
    openMenuId.value = null
  }

  const deleteReport = (id: number) => {
    reports.value = reports.value.filter((r) => r.id !== id)
    openMenuId.value = null
  }

  const closeDetailModal = () => {
    showDetailModal.value = false
    selectedReport.value = null
  }

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value)

  return {
    searchQuery,
    dateFilter,
    headers,
    filteredReports,
    deleteReport,
    detailReport,
    openMenuId,
    toggleMenu,
    formatCurrency,
    showDetailModal,
    selectedReport,
    closeDetailModal,
  }
}
