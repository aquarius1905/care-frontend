import HomeCareServiceProviderLoginView from '@/views/HomeCareServiceProvider/LoginView.vue'
import HomeCareServiceProviderRegistrationView from '@/views/HomeCareServiceProvider/RegistrationView.vue'
import HomeCareServiceProviderRegistrationConfirmView from '@/views/HomeCareServiceProvider/ConfirmView.vue'

export default {
  routes: [
    {
      path: '/home-care-service-provider/login',
      name: 'HomeCareServiceProviderLogin',
      component: HomeCareServiceProviderLoginView,
      meta: { requiresAuth: false } 
    },
    {
      path: '/home-care-service-provider/registration',
      name: 'HomeCareServiceProviderRegistration',
      component: HomeCareServiceProviderRegistrationView,
      meta: { requiresAuth: false } 
    },
    {
      path: '/home-care-service-provider/registration/confirm',
      name: 'HomeCareServiceProviderRegistrationConfirm',
      component: HomeCareServiceProviderRegistrationConfirmView,
      meta: { requiresAuth: false } 
    },
  ]
}