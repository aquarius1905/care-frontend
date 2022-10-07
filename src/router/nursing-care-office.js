import NursingCareOfficeLogin from '@/views/NursingCareOffice/Login.vue'
import NursingCareOfficeRegistration from '@/views/NursingCareOffice/Registration.vue'
import NursingCareOfficeRegistrationConfirm from '@/views/NursingCareOffice/RegistrationConfirm.vue'
import NursingCareOfficeRegistrationCompletionView from '@/views/Common/RegistrationCompletionView.vue'
import NursingCareOfficeDashboard from '@/views/NursingCareOffice/Dashboard.vue'
import NursingCareOfficeUpdate from '@/views/NursingCareOffice/Update.vue'

export default {
  routes: [
    {
      path: '/nursing-care-office/login',
      name: 'NursingCareOfficeLogin',
      component: NursingCareOfficeLogin,
      meta: { requiresAuth: false } 
    },
    {
      path: '/nursing-care-office/register',
      name: 'NursingCareOfficeRegistration',
      component: NursingCareOfficeRegistration,
      meta: { requiresAuth: false } 
    },
    {
      path: '/nursing-care-office/register/confirm',
      name: 'NursingCareOfficeRegistrationConfirm',
      component: NursingCareOfficeRegistrationConfirm,
      meta: { requiresAuth: false } 
    },
    {
      path: '/nursing-care-office/register/complete',
      name: 'NursingCareOfficeRegistrationCompletion',
      component: NursingCareOfficeRegistrationCompletionView,
      meta: { requiresAuth: false } 
    },
    {
      path: '/nursing-care-office/dashboard',
      name: 'NursingCareOfficeDashboard',
      component: NursingCareOfficeDashboard,
      meta: { requiresAuth: true } 
    },
    {
      path: '/nursing-care-office/update',
      name: 'NursingCareOfficeUpdate',
      component: NursingCareOfficeUpdate,
      meta: { requiresAuth: true } 
    },
  ]
}