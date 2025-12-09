import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  withCredentials: false, // Important for token-based auth
  headers: {
    Accept: 'application/json', // default Accept header
  },
})

// Add Bearer token dynamically
api.interceptors.request.use((config) => {
  const authStore = useAuthStore()
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

export default api
