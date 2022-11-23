import CareManagerLogin from '@/views/CareManager/Login.vue'
import CareManagerInput from '@/views/CareManager/Registration.vue'
import CareManagerCompleted from '@/views/Common/RegistrationCompletion.vue'
import CareManagerConfirm from '@/views/CareManager/RegistrationConfirm.vue'
import CareManagerUpdate from '@/views/CareManager/UpdateInfo.vue'
import CareManagerUpdateCompleted from '@/views/Common/UpdateCompleted.vue'
import CareManagerVisitDateTime from '@/views/CareManager/VisitDateTime.vue'
import CareManagerResetPassword from '@/views/Common/ResetPassword.vue'
import CareManagerDashboard from '@/views/CareManager/Dashboard.vue'
import CareManagerCareReceiverDetail from '@/views/Common/CareReceiverDetail.vue'
import VisitDateTimeRegistrationCompleted from '@/views/Common/TextMessage.vue'

export default {
  routes: [
    {
      path: '/care-manager/input',
      name: 'CareManagerInput',
      component: CareManagerInput,
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
      path: '/care-manager/index',
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
      component: CareManagerLogin,
      meta: { requiresAuth: false },
    },
    {
      path: '/care-manager/reset-password',
      name: 'CareManagerResetPassword',
      component: CareManagerResetPassword,
      meta: { requiresAuth: false },
    },
    {
      path: '/care-manager/care-receiver/detail',
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