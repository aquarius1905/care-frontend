import NursingCareOfficeLoginView from '@/views/NursingCareOffice/LoginView.vue'
import NursingCareOfficeRegistrationView from '@/views/NursingCareOffice/RegistrationView.vue'
import NursingCareOfficeRegistrationConfirmView from '@/views/NursingCareOffice/RegistrationConfirmView.vue'
import NursingCareOfficeRegistrationCompletionView from '@/views/Common/RegistrationCompletionView.vue'

export default {
  routes: [
    {
      path: '/nursing-care-office/login',
      name: 'NursingCareOfficeLogin',
      component: NursingCareOfficeLoginView,
      meta: { requiresAuth: false } 
    },
    {
      path: '/nursing-care-office/register',
      name: 'NursingCareOfficeRegistration',
      component: NursingCareOfficeRegistrationView,
      meta: { requiresAuth: false } 
    },
    {
      path: '/nursing-care-office/register/confirm',
      name: 'NursingCareOfficeRegistrationConfirm',
      component: NursingCareOfficeRegistrationConfirmView,
      meta: { requiresAuth: false } 
    },
    {
      path: '/nursing-care-office/register/complete',
      name: 'NursingCareOfficeRegistrationCompletion',
      component: NursingCareOfficeRegistrationCompletionView,
      meta: { requiresAuth: false } 
    },
  ]
}