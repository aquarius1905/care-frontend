import HomeView from '@/views/Home.vue'

export default {
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta: { requiresAuth: false },
    }
  ]
}