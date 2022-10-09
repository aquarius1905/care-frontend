  import CareReceiverRegistration from '@/views/CareReceiver/Registration.vue'
import CareReceiverRegistrationConfirm from '@/views/CareReceiver/RegistrationConfirm.vue'
import CareReceiverRegistrationCompletion from '@/views/CareReceiver/RegistrationCompletion.vue'
import CareReceiverUpdate from '@/views/CareReceiver/Update.vue'
import CareReceiverUpdateCompletion from '@/views/Common/UpdateCompletion.vue'
import CareReceiverDetailView from '@/views/CareReceiver/DetailView.vue'
import CareReceiverWeeklyServiceScheduleView from '@/views/CareReceiver/WeeklyServiceScheduleView.vue'
import CareReceiverLoginView from '../views/CareReceiver/LoginView.vue'
import CareReceiverDashboard from '../views/CareReceiver/Dashboard.vue'
import CareReceiverMonthlyScheduleView from '../views/CareReceiver/MonthlyScheduleView.vue'

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
      component: CareReceiverDetailView,
      meta: { requiresAuth: true },
    },
    {
      path: '/care-receiver/weekly-service-schedule',
      name: 'CareReceiverWeeklyServiceSchedule',
      component: CareReceiverWeeklyServiceScheduleView,
      meta: { requiresAuth: true },
    },
    {
      path: '/care-receiver/login',
      name: 'CareReceiverLogin',
      component: CareReceiverLoginView,
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
      component: CareReceiverMonthlyScheduleView,
      meta: { requiresAuth: true },
    }
  ]
}