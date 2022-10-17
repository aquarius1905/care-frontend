import NursingCareOfficeLogin from '@/views/NursingCareOffice/Login.vue'
import NursingCareOfficeInput from '@/views/NursingCareOffice/Registration.vue'
import NursingCareOfficeConfirm from '@/views/NursingCareOffice/RegistrationConfirm.vue'
import NursingCareOfficeCompleted from '@/views/Common/RegistrationCompletion.vue'
import NursingCareOfficeDashboard from '@/views/NursingCareOffice/Dashboard.vue'
import NursingCareOfficeUpdate from '@/views/NursingCareOffice/Update.vue'
import NursingCareOfficeUpdateCompleted from '@/views/Common/UpdateCompleted.vue'
import DaycareContactBookInput from '@/views/NursingCareOffice/DaycareContactBookInput.vue'

export default {
  routes: [
    {
      path: '/nursing-care-office/login',
      name: 'NursingCareOfficeLogin',
      component: NursingCareOfficeLogin,
      meta: { requiresAuth: false } 
    },
    {
      path: '/nursing-care-office/input',
      name: 'NursingCareOfficeInput',
      component: NursingCareOfficeInput,
      meta: { requiresAuth: false } 
    },
    {
      path: '/nursing-care-office/confirm',
      name: 'NursingCareOfficeConfirm',
      component: NursingCareOfficeConfirm,
      meta: { requiresAuth: false } 
    },
    {
      path: '/nursing-care-office/completed',
      name: 'NursingCareOfficeCompleted',
      component: NursingCareOfficeCompleted,
      meta: { requiresAuth: false } 
    },
    {
      path: '/nursing-care-office/index',
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
    {
      path: '/nursing-care-office/update/completed',
      name: 'NursingCareOfficeUpdateCompleted',
      component: NursingCareOfficeUpdateCompleted,
      meta: { requiresAuth: true } 
    },
    {
      path: '/daycare-diary/contact-book/input',
      name: 'DaycareContactBookInput',
      component: DaycareContactBookInput,
      meta: { requiresAuth: true } 
    },
  ]
}