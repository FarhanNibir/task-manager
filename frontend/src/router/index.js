import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Tasks from '../views/Tasks.vue'
import TaskForm from '../views/TaskForm.vue'
import { useAuthStore } from '../stores/auth'
import Register from '@/views/Register.vue'

const routes = [
  {path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/', component: Tasks, meta: { requiresAuth: true } },
  { path: '/tasks/create', component: TaskForm, meta: { requiresAuth: true } },
  { path: '/tasks/edit/:id', component: TaskForm, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.token) return next('/login')
  next()
})

export default router
