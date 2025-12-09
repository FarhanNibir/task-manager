<template>
  <div class="max-w-2xl mx-auto px-4 py-8">
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-xl font-bold">Task Manager</h1>
      <div class="space-x-2">
        <button 
          @click="fetchTasks" 
          :disabled="loading"
          class="text-sm text-blue-500 hover:underline disabled:opacity-50"
        >
          Refresh Tasks
        </button>
        <router-link 
          to="/tasks/create"
          class="text-sm bg-[#112D4E] text-[#DBE2EF] px-3 py-1 rounded hover:bg-[#0f2542] transition-all"
        >
          + New Task
        </router-link>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="taskStore.error" class="mb-4 bg-red-50 border border-red-200 rounded p-3">
      <div class="flex items-center text-sm text-red-700">
        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
        </svg>
        <span>{{ taskStore.error }}</span>
        <button @click="taskStore.error = null" class="ml-auto text-red-500 hover:text-red-700">×</button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <div class="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-[#112D4E]"></div>
      <p class="mt-2 text-sm text-gray-600">Loading tasks...</p>
    </div>

    <!-- No Tasks State -->
    <div v-else-if="tasks.length === 0" class="text-center py-8 bg-gray-50 rounded">
      <p class="text-gray-500 mb-3">No tasks found</p>
      <router-link 
        to="/tasks/create"
        class="text-sm bg-[#112D4E] text-[#DBE2EF] px-4 py-2 rounded hover:bg-[#0f2542] transition-all inline-block"
      >
        Create Your First Task
      </router-link>
    </div>

    <!-- Tasks List -->
    <div v-else class="space-y-3">
      <div 
        v-for="task in tasks" 
        :key="task.id"
        class="bg-white border border-gray-200 rounded p-4 hover:border-gray-300 transition-all"
      >
        <div class="flex items-start">
          <!-- Checkbox -->
          <div class="mr-3 mt-1">
            <input
              type="checkbox"
              :checked="task.status === 'completed'"
              @change="toggleTaskStatus(task)"
              :disabled="loading"
              class="h-4 w-4 text-[#112D4E] focus:ring-[#112D4E] rounded"
            />
          </div>
          
          <!-- Task Content -->
          <div class="flex-1">
            <div class="flex justify-between items-start">
              <h3 
                class="text-sm font-medium text-gray-800"
                :class="{ 'line-through text-gray-500': task.status === 'completed' }"
              >
                {{ task.title }}
              </h3>
              <span 
                class="text-xs px-2 py-0.5 rounded-full font-medium ml-2"
                :class="{
                  'bg-green-100 text-green-800': task.status === 'completed',
                  'bg-gray-100 text-gray-800': task.status === 'pending'
                }"
              >
                {{ task.status }}
              </span>
            </div>
            
            <p 
              class="text-sm text-gray-600 mb-3"
              :class="{ 'line-through text-gray-400': task.status === 'completed' }"
            >
              {{ task.description || 'No description' }}
            </p>
            
            <div class="flex justify-between items-center">
              <span class="text-xs text-gray-500">
                <!-- ID: {{ task.id }} -->
              </span>
              <div class="space-x-2">
                <router-link 
                  :to="`/tasks/edit/${task.id}`"
                  class="text-xs text-blue-500 hover:underline"
                >
                  Edit
                </router-link>
                <button 
                  @click="confirmDelete(task.id)"
                  class="text-xs text-red-500 hover:underline"
                  :disabled="loading"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg p-6 max-w-sm w-full border border-gray-200">
        <h3 class="text-sm font-semibold mb-3">Confirm Delete</h3>
        <p class="text-sm text-gray-600 mb-4">Are you sure you want to delete this task? This action cannot be undone.</p>
        <div class="flex justify-end space-x-3">
          <button 
            @click="showDeleteModal = false; taskToDelete = null"
            class="text-sm px-3 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            @click="handleDelete"
            class="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            :disabled="loading"
          >
            {{ loading ? 'Deleting...' : 'Delete' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useTaskStore } from '@/stores/task'
import { useRouter } from 'vue-router'

const taskStore = useTaskStore()
const router = useRouter()

const showDeleteModal = ref(false)
const taskToDelete = ref(null)

const tasks = computed(() => taskStore.tasks)
const loading = computed(() => taskStore.loading)

onMounted(async () => {
  await taskStore.fetchTasks()
})

const fetchTasks = async () => {
  await taskStore.fetchTasks()
}

const toggleTaskStatus = async (task) => {
  try {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed'
    await taskStore.updateTask(task.id, { status: newStatus })
  } catch (error) {
    console.error('Error toggling task status:', error)
  }
}

const confirmDelete = (id) => {
  taskToDelete.value = id
  showDeleteModal.value = true
}

const handleDelete = async () => {
  if (!taskToDelete.value) return
  
  try {
    await taskStore.deleteTask(taskToDelete.value)
    showDeleteModal.value = false
    taskToDelete.value = null
  } catch (error) {
    console.error('Delete error:', error)
  }
}
</script>

<style scoped>
.line-through {
  text-decoration-line: line-through;
}
</style>