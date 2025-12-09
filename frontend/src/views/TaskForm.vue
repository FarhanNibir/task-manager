<template>
  <div class="max-w-md mx-auto shadow-sm rounded py-6 px-8 mt-10">
    <div>
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold">{{ isEdit ? 'Edit Task' : 'Create New Task' }}</h2>
        <button 
          @click="router.back()"
          class="text-sm text-blue-500 hover:underline"
        >
          Back to Tasks
        </button>
      </div>

      <!-- Error Message -->
      <div v-if="taskStore.error" class="mb-4 bg-red-50 border border-red-200 rounded p-3">
        <div class="flex items-center text-sm text-red-700">
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
          </svg>
          <span>{{ taskStore.error }}</span>
        </div>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Title -->
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700 mb-1">
            Task Title <span class="text-red-500">*</span>
          </label>
          <input
            v-model="form.title"
            id="title"
            type="text"
            placeholder="Enter task title"
            required
            class="w-full py-1 px-2 border border-gray-200 placeholder:text-sm outline-0 focus:outline-0 rounded transition-all"
            :disabled="loading"
          />
        </div>

        <!-- Description -->
        <div>
          <label for="description" class="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            v-model="form.description"
            id="description"
            placeholder="Describe your task..."
            rows="4"
            class="w-full py-1 px-2 border border-gray-200 placeholder:text-sm outline-0 focus:outline-0 rounded transition-all resize-none"
            :disabled="loading"
          ></textarea>
        </div>

        <!-- Status -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <div class="flex space-x-4">
            <label class="flex items-center">
              <input
                type="radio"
                v-model="form.status"
                value="pending"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500"
                :disabled="loading"
              />
              <span class="ml-2 text-sm text-gray-700">Pending</span>
            </label>
            <label class="flex items-center">
              <input
                type="radio"
                v-model="form.status"
                value="completed"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500"
                :disabled="loading"
              />
              <span class="ml-2 text-sm text-gray-700">Completed</span>
            </label>
          </div>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="loading"
          class="bg-[#112D4E] w-full font-medium px-3 py-2 rounded text-sm transition-all duration-200 text-[#DBE2EF] hover:bg-[#0f2542] focus:outline-none focus:ring-2 focus:ring-[#112D4E] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="loading" class="flex items-center justify-center">
            <svg class="animate-spin h-4 w-4 mr-2 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            {{ isEdit ? 'Updating...' : 'Creating...' }}
          </span>
          <span v-else>
            {{ isEdit ? 'Update Task' : 'Create Task' }}
          </span>
        </button>

        <!-- Cancel Button -->
        <button
          type="button"
          @click="router.back()"
          :disabled="loading"
          class="w-full py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 transition-all font-medium"
        >
          Cancel
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTaskStore } from '@/stores/task'

const taskStore = useTaskStore()
const router = useRouter()
const route = useRoute()

const form = reactive({
  title: '',
  description: '',
  status: 'pending'
})

const loading = computed(() => taskStore.loading)
const isEdit = ref(false)
const taskId = ref(null)

// Check if we're in edit mode
onMounted(() => {
  if (route.params.id) {
    isEdit.value = true
    taskId.value = route.params.id
    loadTaskData()
  }
})

// Watch for route changes
watch(() => route.params.id, (newId) => {
  if (newId) {
    isEdit.value = true
    taskId.value = newId
    loadTaskData()
  } else {
    isEdit.value = false
    resetForm()
  }
})

const loadTaskData = async () => {
  // First check if task exists in store
  const task = taskStore.getTaskById(taskId.value)
  
  if (task) {
    form.title = task.title
    form.description = task.description || ''
    form.status = task.status
  } else {
    // If not in store, fetch from API
    try {
      const response = await taskStore.fetchTasks()
      const fetchedTask = taskStore.getTaskById(taskId.value)
      if (fetchedTask) {
        form.title = fetchedTask.title
        form.description = fetchedTask.description || ''
        form.status = fetchedTask.status
      } else {
        router.push('/')
      }
    } catch (error) {
      console.error('Error loading task:', error)
      router.push('/')
    }
  }
}

const resetForm = () => {
  form.title = ''
  form.description = ''
  form.status = 'pending'
}

const handleSubmit = async () => {
  try {
    if (isEdit.value) {
      await taskStore.updateTask(taskId.value, { ...form })
    } else {
      await taskStore.createTask({ ...form })
    }
    router.push('/')
  } catch (error) {
    // Error is already handled in the store
    console.error('Form submission error:', error)
  }
}
</script>