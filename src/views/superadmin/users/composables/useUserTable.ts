import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import type { User } from './types'

export function useUsersTable() {
  const searchQuery = ref('')
  const statusFilter = ref('')
  const showAddUser = ref(false)

  const headers = [
    { text: 'No', value: 'no' },
    { text: 'ID', value: 'id', sortable: true },
    { text: 'Username', value: 'username', sortable: true },
    { text: 'Email', value: 'email', sortable: true },
    { text: 'Status', value: 'status', sortable: true },
    { text: 'Action', value: 'action' },
  ]

  const users = ref<User[]>([])

  const generateUniqueId = (): number => {
    let newId: number
    do {
      newId = Math.floor(100000 + Math.random() * 900000)
    } while (users.value.some((user) => user.id === newId))
    return newId
  }

  const saveUsers = () => {
    localStorage.setItem('users', JSON.stringify(users.value))
  }

  onMounted(() => {
    const savedUsers = localStorage.getItem('users')
    if (savedUsers) {
      users.value = JSON.parse(savedUsers)
    } else {
      const dummyUser: Omit<User, 'id'> = {
        username: 'Jane Smith',
        email: 'jane@example.com',
        status: 'Non Active',
      }
      for (let i = 1; i <= 20; i++) {
        users.value.push({
          id: generateUniqueId(),
          username: dummyUser.username,
          email: dummyUser.email,
          status: i === 6 ? 'Active' : dummyUser.status,
        })
      }
      saveUsers()
    }
    document.addEventListener('click', handleClickOutside)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
  })

  const filteredUsers = computed(() => {
    return users.value
      .filter((user) => {
        const matchesStatus = statusFilter.value ? user.status === statusFilter.value : true
        const matchesSearch = searchQuery.value
          ? user.username.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
          : true
        return matchesStatus && matchesSearch
      })
      .map((user, index) => ({
        no: index + 1,
        ...user,
      }))
  })

  const addUser = (newUser: User) => {
    newUser.id = generateUniqueId()
    users.value.push(newUser)
    saveUsers()
    showAddUser.value = false
  }

  const deleteUser = (id: number) => {
    users.value = users.value.filter((u) => u.id !== id)
    saveUsers()
    openMenuId.value = null
  }

  const openMenuId = ref<number | null>(null)

  const toggleMenu = (id: number) => {
    openMenuId.value = openMenuId.value === id ? null : id
  }

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
    headers,
    users,
    filteredUsers,
    addUser,
    deleteUser,
    openMenuId,
    toggleMenu,
  }
}
