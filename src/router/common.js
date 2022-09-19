import HomeView from '@/views/HomeView.vue'

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