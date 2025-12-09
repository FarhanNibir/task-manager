<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()
const email = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    await auth.login(email.value, password.value)
    router.push('/')
  } catch (err) {
    alert(err.response?.data?.message || 'Login failed')
  }
}
</script>

<template>
  <div class="max-w-sm mx-auto shadow-sm rounded py-6 px-8 mt-10">
    <div class="">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold">Login</h2>
        <p class="text-sm">
          Don't have an account?
          <router-link to="/register" class="text-blue-500 hover:underline">Register</router-link>
        </p>
      </div>
      <form @submit.prevent="handleLogin" class="">
        <div class="mb-3">
          <label for="login-email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            v-model="email"
            id="login-email"
            type="email"
            placeholder="Enter your email"
            class="w-full py-1 px-2 border border-gray-200 placeholder:text-sm outline-0 focus:outline-0 rounded"
          />
        </div>

        <div class="mb-4">
          <label for="login-password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            v-model="password"
            id="login-password"
            type="password"
            placeholder="Enter your password"
            class="w-full py-1 px-2 border border-gray-200 placeholder:text-sm outline-0 focus:outline-0 rounded"
          />
        </div>

        <button
          class="bg-[#112D4E] w-full font-medium px-3 py-2 rounded text-sm transition-all duration-200 text-[#DBE2EF] hover:bg-[#0f2542] focus:outline-none focus:ring-2 focus:ring-[#112D4E] focus:ring-offset-2"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>


