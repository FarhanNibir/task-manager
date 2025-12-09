import { defineStore } from 'pinia'
import api from '@/api/axios'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
    loading: false,
    error: null,
    currentTask: null // For editing
  }),

  actions: {
    // Fetch all tasks
    async fetchTasks() {
      this.loading = true
      this.error = null
      try {
        const res = await api.get('/tasks')
        this.tasks = res.data.data || res.data
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to fetch tasks'
        console.error('Fetch tasks error:', err)
      } finally {
        this.loading = false
      }
    },

    // Create new task
    async createTask(taskData) {
      this.loading = true
      this.error = null
      try {
        const res = await api.post('/tasks', taskData)
        this.tasks.push(res.data.data || res.data)
        return res.data
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to create task'
        throw err
      } finally {
        this.loading = false
      }
    },

    // Update existing task
    async updateTask(id, taskData) {
    //   this.loading = true
    //   this.error = null
      try {
        const res = await api.put(`/tasks/${id}`, taskData)
        const index = this.tasks.findIndex(t => t.id === Number(id) || t.id === id)
        if (index !== -1) {
          this.tasks[index] = { ...this.tasks[index], ...taskData }
        }
        return res.data
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to update task'
        throw err
      } finally {
        this.loading = false
      }
    },

    // Delete task
    async deleteTask(id) {
      this.loading = true
      this.error = null
      try {
        await api.delete(`/tasks/${id}`)
        this.tasks = this.tasks.filter(t => t.id !== Number(id) && t.id !== id)
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to delete task'
        throw err
      } finally {
        this.loading = false
      }
    },

    // Set current task for editing
    setCurrentTask(task) {
      this.currentTask = task
    },

    // Clear current task
    clearCurrentTask() {
      this.currentTask = null
    }
  },

  getters: {
    // Get task by ID
    getTaskById: (state) => (id) => {
      return state.tasks.find(t => t.id === Number(id) || t.id === id)
    }
  }
})