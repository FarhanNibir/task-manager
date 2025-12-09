<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')

const handleRegister = async () => {
  try {
    await auth.register(name.value, email.value, password.value, password_confirmation.value)
    router.push('/') // redirect to task list after auto-login
  } catch (err) {
    alert(err.response?.data?.message || 'Registration failed')
  }
}
</script>

<template>
  <div class="max-w-sm mx-auto shadow-sm rounded py-6 px-8 mt-10">
    <div>
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold">Register</h2>
        <p class="text-sm">
          Already have an account?
          <router-link to="/login" class="text-blue-500 hover:underline">Login</router-link>
        </p>
      </div>
      <form @submit.prevent="handleRegister" class="">
        <div class="mb-3">
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            v-model="name"
            id="name"
            type="text"
            placeholder="Enter your name"
            class="w-full py-1 px-2 border border-gray-200 placeholder:text-sm outline-0 focus:outline-0 rounded"
          />
        </div>

        <div class="mb-3">
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            v-model="email"
            id="email"
            type="email"
            placeholder="Enter your email"
            class="w-full py-1 px-2 border border-gray-200 placeholder:text-sm outline-0 focus:outline-0 rounded"
          />
        </div>

        <div class="mb-3">
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            v-model="password"
            id="password"
            type="password"
            placeholder="Enter your password"
            class="w-full py-1 px-2 border border-gray-200 placeholder:text-sm outline-0 focus:outline-0 rounded"
          />
        </div>

        <div class="mb-4">
          <label for="password_confirmation" class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input
            v-model="password_confirmation"
            id="password_confirmation"
            type="password"
            placeholder="Confirm your password"
            class="w-full py-1 px-2 border border-gray-200 placeholder:text-sm outline-0 focus:outline-0 rounded"
          />
        </div>

        <button
          class="bg-[#112D4E] w-full font-medium px-3 py-2 rounded text-sm transition-all duration-200 text-[#DBE2EF] hover:bg-[#0f2542] focus:outline-none focus:ring-2 focus:ring-[#112D4E] focus:ring-offset-2"
        >
          Register
        </button>
      </form>
    </div>
  </div>
</template>
