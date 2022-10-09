import CareManagerLoginView from '@/views/CareManager/LoginView.vue'
import CareManagerRegistrationView from '@/views/CareManager/Registration.vue'
import CareManagerRegistrationCompletion from '@/views/Common/RegistrationCompletion.vue'
import CareManagerRegistrationConfirmView from '@/views/CareManager/RegistrationConfirmView.vue'
import CareManagerUpdate from '@/views/CareManager/Update.vue'
import CareManagerUpdateCompletion from '@/views/Common/UpdateCompletion.vue'
import CareManagerVisitDateTimeView from '@/views/CareManager/VisitDateTimeView.vue'
import CareManagerForgotPasswordView from '@/views/CareManager/ForgotPassword.vue'
import CareManagerDashboardView from '@/views/CareManager/DashboardView.vue'

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
      component: CareManagerRegistrationConfirmView,
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
      component: CareManagerDashboardView,
      meta: { requiresAuth: true },
    },
    {
      path: '/care-manager/visit-date-time',
      name: 'CareManagerVisitDateTime',
      component: CareManagerVisitDateTimeView,
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
  ]
}