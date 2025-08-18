import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import type { User } from './types'

export function useUsersTable() {
  const searchQuery = ref('')
  const statusFilter = ref('')
  const showAddUser = ref(false)
  const showEditUser = ref(false)
  const openMenuId = ref<number | null>(null)
  const selectedUser = ref<User | null>(null)

  const users = ref<User[]>([])

  const headers = [
    { text: 'No', value: 'no' },
    { text: 'ID', value: 'id', sortable: true },
    { text: 'Username', value: 'username', sortable: true },
    { text: 'Email', value: 'email', sortable: true },
    { text: 'Status', value: 'status', sortable: true },
    { text: 'Action', value: 'action' },
  ]

  // Generate unique ID untuk user
  const generateUniqueId = (): number => {
    let newId: number
    do {
      newId = Math.floor(100000 + Math.random() * 900000)
    } while (users.value.some((user) => user.id === newId))
    return newId
  }

  const saveUsers = (): void => {
    localStorage.setItem('users', JSON.stringify(users.value))
  }

  // Dummy user
  const createDummyUser = (isActive: boolean): Omit<User, 'id'> => ({
    username: isActive ? 'Jane Smith' : 'John Doe',
    email: isActive ? 'jane@example.com' : 'john@example.com',
    status: isActive ? 'Active' : 'Non Active',
  })

  const loadDummyUsers = (): void => {
    for (let i = 1; i <= 20; i++) {
      users.value.push({
        id: generateUniqueId(),
        ...createDummyUser(i % 2 !== 0),
      })
    }
    saveUsers()
  }

  // Lifecycle
  onMounted(() => {
    const savedUsers = localStorage.getItem('users')
    if (savedUsers) {
      users.value = JSON.parse(savedUsers)
    } else {
      loadDummyUsers()
    }

    document.addEventListener('click', handleClickOutside)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
  })

  // Filtering user
  const filteredUsers = computed(() =>
    users.value
      .map((user, index) => ({ no: index + 1, ...user }))
      .filter((user) => {
        const matchStatus = statusFilter.value ? user.status === statusFilter.value : true
        const matchSearch = searchQuery.value
          ? Object.values(user).some((value) =>
              String(value).toLowerCase().includes(searchQuery.value.toLowerCase()),
            )
          : true
        return matchStatus && matchSearch
      }),
  )

  // CRUD
  const addUser = (newUser: User): void => {
    newUser.id = generateUniqueId()
    users.value.push(newUser)
    saveUsers()
    showAddUser.value = false
  }

  const updateUser = (updatedUser: User): void => {
    const index = users.value.findIndex((u) => u.id === updatedUser.id)
    if (index !== -1) {
      users.value[index] = { ...updatedUser }
      saveUsers()
    }
    showEditUser.value = false
  }

  const editUser = (id: number): void => {
    selectedUser.value = users.value.find((u) => u.id === id) || null
    showEditUser.value = true
    openMenuId.value = null
  }

  const deleteUser = (id: number): void => {
    users.value = users.value.filter((u) => u.id !== id)
    saveUsers()
    openMenuId.value = null
  }

  // Menu toggle
  const toggleMenu = (id: number): void => {
    openMenuId.value = openMenuId.value === id ? null : id
  }

  const handleClickOutside = (e: MouseEvent): void => {
    const target = e.target as HTMLElement
    if (target.closest('.wp-actions')) return
    if (target.closest('.action-btn')) return

    openMenuId.value = null
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
