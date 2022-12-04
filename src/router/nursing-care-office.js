import NursingCareOfficeLogin from '@/views/NursingCareOffice/Login.vue'
import NursingCareOfficeRegister from '@/views/NursingCareOffice/Register.vue'
import NursingCareOfficeConfirm from '@/views/NursingCareOffice/Confirm.vue'
import NursingCareOfficeCompleted from '@/views/Common/RegistrationCompletion.vue'
import NursingCareOfficeDashboard from '@/views/NursingCareOffice/Dashboard.vue'
import NursingCareOfficeUpdate from '@/views/NursingCareOffice/UpdateInfo.vue'
import NursingCareOfficeUpdateCompleted from '@/views/Common/UpdateCompleted.vue'
import NursingCareOfficeResetPassword from '@/views/Common/ResetPassword.vue'
import NursingCareOfficeForgotPassword from '@/views/Common/ForgotPassword.vue'
import NursingCareOfficeForgotPasswordCompleted from '@/views/Common/TextMessage.vue'
import DaycareDiaryRegister from '@/views/NursingCareOffice/DaycareDiaryRegister.vue'
import DaycareDiaryCompleted from '@/views/Common/TextMessage.vue'

export default {
  routes: [
    {
      path: '/nursing-care-office/register',
      name: 'NursingCareOfficeRegister',
      component: NursingCareOfficeRegister,
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
      path: '/nursing-care-office/login',
      name: 'NursingCareOfficeLogin',
      component: NursingCareOfficeLogin,
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
      path: '/nursing-care-office/reset-password',
      name: 'NursingCareOfficeResetPassword',
      component: NursingCareOfficeResetPassword,
      meta: { requiresAuth: false }
    },
    {
      path: '/nursing-care-office/forgot-password',
      name: 'NursingCareOfficeForgotPassword',
      component: NursingCareOfficeForgotPassword,
      meta: { requiresAuth: false }
    },
    {
      path: '/nursing-care-office/forgot-password/completed',
      name: 'NursingCareOfficeForgotPasswordCompleted',
      component: NursingCareOfficeForgotPasswordCompleted,
      meta: { requiresAuth: false }
    },
    {
      path: '/daycare-diary/register',
      name: 'DaycareDiaryRegister',
      component: DaycareDiaryRegister,
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