import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import type { User } from './types'

export function useUsersTable() {
  const searchQuery = ref('')
  const statusFilter = ref('')
  const showAddUser = ref(false)
  const showEditUser = ref(false) // untuk modal edit

  // Header untuk EasyDataTable
  const headers = [
    { text: 'No', value: 'no' },
    { text: 'ID', value: 'id', sortable: true },
    { text: 'Username', value: 'username', sortable: true },
    { text: 'Email', value: 'email', sortable: true },
    { text: 'Status', value: 'status', sortable: true },
    { text: 'Action', value: 'action' },
  ]

  const users = ref<User[]>([])
  const selectedUser = ref<User | null>(null) // data user yang sedang diedit

  // Generate ID unik untuk user baru
  const generateUniqueId = (): number => {
    let newId: number
    do {
      newId = Math.floor(100000 + Math.random() * 900000)
    } while (users.value.some((user) => user.id === newId))
    return newId
  }

  // Simpan data ke localStorage
  const saveUsers = () => {
    localStorage.setItem('users', JSON.stringify(users.value))
  }

  // Dummy data awal
  const loadDummyUsers = () => {
    const dummyUserActive: Omit<User, 'id'> = {
      username: 'smith anakecah ndiks',
      email: 'jane@example.com',
      status: 'Active',
    }
    const dummyUserNonActive: Omit<User, 'id'> = {
      username: 'John Doe thethole',
      email: 'john@example.com',
      status: 'Non Active',
    }

    for (let i = 1; i <= 20; i++) {
      const isEven = i % 2 === 0
      users.value.push({
        id: generateUniqueId(),
        ...(isEven ? dummyUserNonActive : dummyUserActive),
      })
    }
    saveUsers()
  }

  // Lifecycle — mount
  onMounted(() => {
    const savedUsers = localStorage.getItem('users')
    if (savedUsers) {
      users.value = JSON.parse(savedUsers)
      // loadDummyUsers()
    } else {
      loadDummyUsers()
    }
    document.addEventListener('click', handleClickOutside)
  })

  // Lifecycle — unmount
  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
  })

  // Filter users berdasarkan search & status
  const filteredUsers = computed(() => {
    return users.value
      .map((user, index) => ({
        no: index + 1,
        ...user,
      }))
      .filter((user) => {
        const matchesStatus = statusFilter.value ? user.status === statusFilter.value : true

        const matchesSearch = searchQuery.value
          ? Object.values(user).some((value) =>
              String(value).toLowerCase().includes(searchQuery.value.toLowerCase()),
            )
          : true

        return matchesStatus && matchesSearch
      })
  })

  // Tambah user baru
  const addUser = (newUser: User) => {
    newUser.id = generateUniqueId()
    users.value.push(newUser)
    saveUsers()
    showAddUser.value = false
  }

  // Edit user — buka modal edit
  function editUser(id: number) {
    const found = users.value.find((u: User) => u.id === id) || null
    selectedUser.value = found
    showEditUser.value = true
  }

  // Update user
  const updateUser = (updatedUser: User) => {
    const index = users.value.findIndex((u) => u.id === updatedUser.id)
    if (index !== -1) {
      users.value[index] = { ...updatedUser }
      saveUsers()
    }
    showEditUser.value = false
  }

  // Hapus user
  const deleteUser = (id: number) => {
    users.value = users.value.filter((u) => u.id !== id)
    saveUsers()
    openMenuId.value = null
  }

  const openMenuId = ref<number | null>(null)

  // Toggle menu action
  const toggleMenu = (id: number) => {
    openMenuId.value = openMenuId.value === id ? null : id
  }

  // Tutup menu kalau klik di luar
  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (!target.closest('.action-menu') && !target.closest('.action-btn')) {
      openMenuId.value = null
    }
  }

  return {
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
  }
}
