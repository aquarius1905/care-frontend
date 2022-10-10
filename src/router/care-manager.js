import CareManagerLoginView from '@/views/CareManager/LoginView.vue'
import CareManagerRegistrationView from '@/views/CareManager/Registration.vue'
import CareManagerRegistrationCompletion from '@/views/Common/RegistrationCompletion.vue'
import CareManagerRegistrationConfirm from '@/views/CareManager/RegistrationConfirm.vue'
import CareManagerUpdate from '@/views/CareManager/Update.vue'
import CareManagerUpdateCompletion from '@/views/Common/UpdateCompletion.vue'
import CareManagerVisitDateTime from '@/views/CareManager/VisitDateTime.vue'
import CareManagerForgotPasswordView from '@/views/CareManager/ForgotPassword.vue'
import CareManagerDashboard from '@/views/CareManager/Dashboard.vue'
import CareManagerCareReceiverDetail from '@/views/Common/CareReceiverDetail.vue'
import VisitDateTimeRegistrationComplete from '@/views/Common/TextMessage.vue'


export default {
  routes: [
    {
      path: '/care-manager/register',
      name: 'CareManagerRegistration',
      component: CareManagerRegistrationView,
      meta: { requiresAuth: false } 
    },
    {
      path: '/care-manager/register/confirm',
      name: 'CareManagerRegistrationConfirm',
      component: CareManagerRegistrationConfirm,
      meta: { requiresAuth: false },
    },
    {
      path: '/care-manager/register/complete',
      name: 'CareManagerRegistrationCompletion',
      component: CareManagerRegistrationCompletion,
      meta: { requiresAuth: false },
    },
    {
      path: '/care-manager/update',
      name: 'CareManagerUpdate',
      component: CareManagerUpdate,
      meta: { requiresAuth: true },
    },
    {
      path: '/care-manager/update/completion',
      name: 'CareManagerUpdateCompletion',
      component: CareManagerUpdateCompletion,
      meta: { requiresAuth: true },
    },
    {
      path: '/care-manager/dashboard',
      name: 'CareManagerDashboard',
      component: CareManagerDashboard,
      meta: { requiresAuth: true },
    },
    {
      path: '/care-manager/visit-date-time',
      name: 'CareManagerVisitDateTime',
      component: CareManagerVisitDateTime,
      meta: { requiresAuth: true },
    },
    {
      path: '/care-manager/login',
      name: 'CareManagerLogin',
      component: CareManagerLoginView,
      meta: { requiresAuth: false },
    },
    {
      path: '/care-manager/forgot-password',
      name: 'CareManagerForgotPassword',
      component: CareManagerForgotPasswordView,
      meta: { requiresAuth: false },
    },
    {
      path: '/care-manager/care-receiver/detail',
      name: 'CareManagerCareReceiverDetail',
      component: CareManagerCareReceiverDetail,
      meta: { requiresAuth: true },
    },
    {
      path: '/care-manager/visit-datetime/register/complete',
      name: 'VisitDateTimeRegistrationComplete',
      component: VisitDateTimeRegistrationComplete,
      meta: { requiresAuth: true },
    }
  ]
}