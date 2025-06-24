import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/BorrowView.vue'
import Book from '../views/BookView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/borrow',
      name: 'borrow',
      component: () => import('../views/BorrowView.vue'),
    },
    {
      path: '/book',
      name: 'book',
      component: () => import('../views/BookView.vue'),
    },
    {
      path: '/category',
      name: 'category',
      component: () => import('../views/CategoryView.vue'),
    },
    {
      path: '/member',
      name: 'member',
      component: () => import('../views/MemberView.vue'),
    }

   

  ],
})

export default router
