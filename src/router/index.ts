import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Schedule from '../views/TheSchedule.vue'
import ToDoList from '../views/ToDoList.vue'
import Statistics from '../views/TheStatistics.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/schedule'
  },
  {
    path: '/schedule',
    name: 'schedule',
    component: Schedule
  },
  {
    path: '/todolist/:date',
    name: 'todolist',
    component: ToDoList
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: Statistics
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
