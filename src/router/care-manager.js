import CareManagerLoginView from '@/views/CareManager/LoginView.vue'
import CareManagerRegistrationView from '@/views/CareManager/RegistrationView.vue'
import CareManagerRegistrationCompletionView from '@/views/Common/RegistrationCompletionView.vue'
import CareManagerRegistrationConfirmView from '@/views/CareManager/RegistrationConfirmView.vue'
import CareManagerUpdateView from '@/views/CareManager/UpdateView.vue'
import CareManagerUpdateConfirmView from '@/views/CareManager/UpdateConfirmView.vue'
import CareManagerUpdateCompletionView from '@/views/CareManager/UpdateCompletionView.vue'
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
      component: CareManagerRegistrationCompletionView,
      meta: { requiresAuth: false },
    },
    {
      path: '/care-manager/update',
      name: 'CareManagerUpdate',
      component: CareManagerUpdateView,
      meta: { requiresAuth: true },
    },
    {
      path: '/care-manager/update/confirm',
      name: 'CareManagerUpdateConfirm',
      component: CareManagerUpdateConfirmView,
      meta: { requiresAuth: true },
    },
    {
      path: '/care-manager/update/complete',
      name: 'CareManagerUpdateCompletion',
      component: CareManagerUpdateCompletionView,
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