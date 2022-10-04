  import CareReceiverRegistrationView from '@/views/CareReceiver/RegistrationView.vue'
import CareReceiverRegistrationConfirmView from '@/views/CareReceiver/RegistrationConfirmView.vue'
import CareReceiverRegistrationCompletionView from '@/views/CareReceiver/RegistrationCompletionView.vue'
import CareReceiverUpdateView from '@/views/CareReceiver/UpdateView.vue'
import CareReceiverUpdateConfirmView from '@/views/CareReceiver/UpdateConfirmView.vue'
import CareReceiverDetailView from '@/views/CareReceiver/DetailView.vue'
import CareReceiverWeeklyServiceScheduleView from '@/views/CareReceiver/WeeklyServiceScheduleView.vue'
import CareReceiverLoginView from '../views/CareReceiver/LoginView.vue'
import CareReceiverDashboardView from '../views/CareReceiver/DashboardView.vue'
import CareReceiverMonthlyScheduleView from '../views/CareReceiver/MonthlyScheduleView.vue'

export default {
  routes: [
    {
      path: '/care-receiver/register',
      name: 'CareReceiverRegistration',
      component: CareReceiverRegistrationView,
      meta: { requiresAuth: true },
    },
    {
      path: '/care-receiver/register/confirm',
      name: 'CareReceiverRegistrationConfirm',
      component: CareReceiverRegistrationConfirmView,
      meta: { requiresAuth: true },
    },
    {
      path: '/care-receiver/register/complete',
      name: 'CareReceiverRegistrationCompletion',
      component: CareReceiverRegistrationCompletionView,
      meta: { requiresAuth: false },
    },
    {
      path: '/care-receiver/update',
      name: 'CareReceiverUpdate',
      component: CareReceiverUpdateView,
      meta: { requiresAuth: true },
    },
    {
      path: '/care-receiver/update/confirm',
      name: 'CareReceiverUpdateConfirmation',
      component: CareReceiverUpdateConfirmView,
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
      component: CareReceiverDashboardView,
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