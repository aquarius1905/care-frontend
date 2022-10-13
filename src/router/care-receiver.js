import CareReceiverRegistration from '@/views/CareReceiver/Registration.vue'
import CareReceiverRegistrationConfirm from '@/views/CareReceiver/RegistrationConfirm.vue'
import CareReceiverRegistrationCompletion from '@/views/CareReceiver/RegistrationCompletion.vue'
import CareReceiverUpdate from '@/views/CareReceiver/Update.vue'
import CareReceiverUpdateCompletion from '@/views/Common/UpdateCompletion.vue'
import CareReceiverDetail from '@/views/Common/CareReceiverDetail.vue'
import CareReceiverWeeklyServiceSchedule from '@/views/CareReceiver/WeeklyServiceSchedule.vue'
import CareReceiverLogin from '@/views/CareReceiver/LoginView.vue'
import CareReceiverDashboard from '@/views/CareReceiver/Dashboard.vue'
import CareReceiverMonthlySchedule from '@/views/CareReceiver/MonthlySchedule.vue'
import CareManagerInfo from '@/views/CareReceiver/CareManagerInfo.vue'
import Cancellation from '@/views/CareReceiver/Cancellation.vue'

export default {
  routes: [
    {
      path: '/care-receiver/register',
      name: 'CareReceiverRegistration',
      component: CareReceiverRegistration,
      meta: { requiresAuth: true },
    },
    {
      path: '/care-receiver/register/confirm',
      name: 'CareReceiverRegistrationConfirm',
      component: CareReceiverRegistrationConfirm,
      meta: { requiresAuth: true },
    },
    {
      path: '/care-receiver/register/complete',
      name: 'CareReceiverRegistrationCompletion',
      component: CareReceiverRegistrationCompletion,
      meta: { requiresAuth: false },
    },
    {
      path: '/care-receiver/update',
      name: 'CareReceiverUpdate',
      component: CareReceiverUpdate,
      meta: { requiresAuth: true },
    },
    {
      path: '/care-receiver/update/completion',
      name: 'CareReceiverUpdateCompletion',
      component: CareReceiverUpdateCompletion,
      meta: { requiresAuth: true },
    },
    {
      path: '/care-receiver/detail',
      name: 'CareReceiverDetail',
      component: CareReceiverDetail,
      meta: { requiresAuth: true },
    },
    {
      path: '/care-receiver/weekly-service-schedule',
      name: 'CareReceiverWeeklyServiceSchedule',
      component: CareReceiverWeeklyServiceSchedule,
      meta: { requiresAuth: true },
    },
    {
      path: '/care-receiver/login',
      name: 'CareReceiverLogin',
      component: CareReceiverLogin,
      meta: { requiresAuth: false },
    },
    {
      path: '/care-receiver/dashboard',
      name: 'CareReceiverDashboard',
      component: CareReceiverDashboard,
      meta: { requiresAuth: true },
    },
    {
      path: '/care-receiver/monthly-schedule',
      name: 'CareReceiverMonthlySchedule',
      component: CareReceiverMonthlySchedule,
      meta: { requiresAuth: true },
    },
    {
      path: '/care-receiver/care-manager-info',
      name: 'CareManagerInfo',
      component: CareManagerInfo,
      meta: { requiresAuth: true },
    },
    {
      path: '/care-receiver/cancellation',
      name: 'Cancellation',
      component: Cancellation,
      meta: { requiresAuth: true },
    }
  ]
}