<script setup>
import { useAuthStore } from './stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const logout = () => {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <div>
    <!-- Navbar -->
     <header class="bg-[#DBE2EF] text-[#112D4E]">
      <nav class="max-w-[700px] mx-auto p-4 flex justify-between items-center">
        <div class="font-bold text-lg"><router-link to="/">Task <span class=" font-light">Manager</span></router-link></div>
        
        <div class="flex items-center space-x-4">
      <!-- Show when user is authenticated -->
      <div v-if="auth.user" class="flex items-center space-x-4">
        <span class="font-medium">{{ auth.user.name }}</span>
        <button 
          @click="logout" 
          class="bg-[#112D4E] font-medium px-3 py-1.5 rounded text-sm flex gap-2 items-center transition-all duration-200 text-[#DBE2EF]"
        >
            Logout
          </button>
      </div>
      
      <!-- Show when user is NOT authenticated -->
      <div v-else class="flex items-center space-x-4">
        <router-link 
          to="/login" 
          class="bg-[#112D4E] border-2 border-[#112D4E] font-medium px-3 py-1.5 rounded text-sm flex gap-2 items-center transition-all duration-200 text-[#DBE2EF]"
        >
          Login
        </router-link>
        <router-link 
          to="/register" 
          class="border-[#112D4E] border-2 font-medium px-3 py-1.5 rounded text-sm flex gap-2 items-center transition-all duration-200 text-[#112D4E]"
        >
          Register
        </router-link>
      </div>
    </div>
      </nav>
     </header>
    

    <!-- Page Content -->
    <main class="">
      <section class="max-w-[700px] mx-auto">
        <router-view />
      </section>
    </main>
  </div>
</template>
