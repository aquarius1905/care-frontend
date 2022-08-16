import KeyPersonLoginView from '../views/KeyPerson/LoginView.vue'
import KeyPersonDashboardView from '../views/KeyPerson/DashboardView.vue'


export default {
  routes: [
    {
      path: '/key-person/login',
      name: 'KeyPersonLogin',
      component: KeyPersonLoginView,
      meta: { requiresAuth: false },
    },
    {
      path: '/key-person/dashboard',
      name: 'KeyPersonDashboard',
      component: KeyPersonDashboardView,
      meta: { requiresAuth: true },
    }
  ]
}