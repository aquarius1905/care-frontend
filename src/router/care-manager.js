import CareManagerLogin from '@/views/CareManager/Login.vue'
import CareManagerRegister from '@/views/CareManager/Register.vue'
import CareManagerConfirm from '@/views/CareManager/Confirm.vue'
import CareManagerCompleted from '@/views/Common/RegistrationCompletion.vue'
import CareManagerUpdate from '@/views/CareManager/UpdateInfo.vue'
import CareManagerUpdateCompleted from '@/views/Common/UpdateCompleted.vue'
import CareManagerVisitDateTime from '@/views/CareManager/VisitDateTime.vue'
import CareManagerResetPassword from '@/views/Common/ResetPassword.vue'
import CareManagerForgotPassword from '@/views/Common/ForgotPassword.vue'
import CareManagerForgotPasswordCompleted from '@/views/Common/TextMessage.vue'
import CareReceiversList from '@/views/CareManager/CareReceiversList.vue'
import CareManagerCareReceiverDetail from '@/views/Common/CareReceiverDetail.vue'
import VisitDateTimeRegistrationCompleted from '@/views/Common/TextMessage.vue'

export default {
  routes: [
    {
      path: '/care-manager/register',
      name: 'CareManagerRegister',
      component: CareManagerRegister,
      meta: { requiresAuth: false }
    },
    {
      path: '/care-manager/confirm',
      name: 'CareManagerConfirm',
      component: CareManagerConfirm,
      meta: { requiresAuth: false },
    },
    {
      path: '/care-manager/completed',
      name: 'CareManagerCompleted',
      component: CareManagerCompleted,
      meta: { requiresAuth: false },
    },
    {
      path: '/care-manager/update',
      name: 'CareManagerUpdate',
      component: CareManagerUpdate,
      meta: { requiresAuth: true },
    },
    {
      path: '/care-manager/update/completed',
      name: 'CareManagerUpdateCompleted',
      component: CareManagerUpdateCompleted,
      meta: { requiresAuth: true },
    },
    {
      path: '/care-manager/care-receivers-list',
      name: 'CareReceiversList',
      component: CareReceiversList,
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
      component: CareManagerLogin,
      meta: { requiresAuth: false },
    },
    {
      path: '/care-manager/forgot-password',
      name: 'CareManagerForgotPassword',
      component: CareManagerForgotPassword,
      meta: { requiresAuth: false },
    },
    {
      path: '/care-manager/forgot-password/completed',
      name: 'CareManagerForgotPasswordCompleted',
      component: CareManagerForgotPasswordCompleted,
      meta: { requiresAuth: false },
    },
    {
      path: '/care-manager/reset-password',
      name: 'CareManagerResetPassword',
      component: CareManagerResetPassword,
      meta: { requiresAuth: false },
    },
    {
      path: '/care-manager/care-receiver-details',
      name: 'CareManagerCareReceiverDetail',
      component: CareManagerCareReceiverDetail,
      meta: { requiresAuth: true },
    },
    {
      path: '/care-manager/visit-datetime/register/completed',
      name: 'VisitDateTimeRegistrationCompleted',
      component: VisitDateTimeRegistrationCompleted,
      meta: { requiresAuth: true },
    }
  ]
}