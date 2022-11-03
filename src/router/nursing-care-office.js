import NursingCareOfficeLogin from '@/views/NursingCareOffice/Login.vue'
import NursingCareOfficeInput from '@/views/NursingCareOffice/Registration.vue'
import NursingCareOfficeConfirm from '@/views/NursingCareOffice/RegistrationConfirm.vue'
import NursingCareOfficeCompleted from '@/views/Common/RegistrationCompletion.vue'
import NursingCareOfficeDashboard from '@/views/NursingCareOffice/Dashboard.vue'
import NursingCareOfficeUpdate from '@/views/NursingCareOffice/UpdateInfo.vue'
import NursingCareOfficeUpdateCompleted from '@/views/Common/UpdateCompleted.vue'
import DaycareDiaryInput from '@/views/NursingCareOffice/DaycareDiaryInput.vue'
import DaycareDiaryCompleted from '@/views/Common/TextMessage.vue'

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
      path: '/daycare-diary/input',
      name: 'DaycareDiaryInput',
      component: DaycareDiaryInput,
      meta: { requiresAuth: true } 
    },
    {
      path: '/daycare-diary/completed',
      name: 'DaycareDiaryCompleted',
      component: DaycareDiaryCompleted,
      meta: { requiresAuth: true } 
    },
  ]
}