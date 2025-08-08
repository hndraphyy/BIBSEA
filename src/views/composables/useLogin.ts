import { ref, reactive } from 'vue'

export function useLogin() {
  const email = ref('')
  const password = ref('')
  const errors = reactive({
    email: '',
    password: '',
  })

  const handleLogin = () => {
    errors.email = ''
    errors.password = ''

    // Validasi email
    if (!email.value) {
      errors.email = 'Email tidak boleh kosong.'
    } else if (!/\S+@\S+\.\S+/.test(email.value)) {
      errors.email = 'Format email tidak valid.'
    }

    // Validasi password
    if (!password.value) {
      errors.password = 'Password tidak boleh kosong.'
    } else if (password.value !== '123456') {
      errors.password = 'Password salah.'
    }

    // Kalau tidak ada error
    if (!errors.email && !errors.password) {
      console.log('Login sukses:', email.value, password.value)
    }
  }

  return {
    email,
    password,
    errors,
    handleLogin,
  }
}
