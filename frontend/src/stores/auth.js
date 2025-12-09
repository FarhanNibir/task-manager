import { defineStore } from 'pinia'
import api from '../api/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user'))||null,
    token: localStorage.getItem('token') || null,
  }),
  actions: {
    async register(name, email, password){
        const res = await api.post('/register', {name, email, password, password_confirmation: password})
        this.token = res.data.token
        this.user = res.data.user
        console.log('User registered:', this.user)
        localStorage.setItem('token', this.token)
        localStorage.setItem('user',  JSON.stringify(this.user))
    },
    async login(email, password) {
      const res = await api.post('/login', { email, password })
      this.token = res.data.token
      this.user = res.data.user
       console.log('User registered:', this.user)
      localStorage.setItem('token', this.token)
      localStorage.setItem('user',  JSON.stringify(this.user))
    },
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
        localStorage.removeItem('user')
    }
  }
})
