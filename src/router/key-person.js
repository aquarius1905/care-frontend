import KeyPersonLoginView from '../views/KeyPerson/LoginView.vue'
import KeyPersonDashboardView from '../views/KeyPerson/DashboardView.vue'
import KeyPersonRegistrationView from '../views/KeyPerson/RegistrationView.vue'


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
    },
    {
      path: '/key-person/registration',
      name: 'KeyPersonRegistration',
      component: KeyPersonRegistrationView,
      meta: { requiresAuth: true },
    }
  ]
}