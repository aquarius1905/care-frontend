import CareReceiverInput from '@/views/CareReceiver/Registration.vue'
import CareReceiverConfirm from '@/views/CareReceiver/RegistrationConfirm.vue'
import CareReceiverCompleted from '@/views/Common/TextMessage.vue'
import CareReceiverUpdate from '@/views/CareReceiver/UpdateInfo.vue'
import CareReceiverUpdateCompleted from '@/views/Common/TextMessage.vue'
import CareReceiverDetail from '@/views/Common/CareReceiverDetail.vue'
import CareReceiverWeeklyServiceSchedule from '@/views/CareReceiver/WeeklyServiceSchedule.vue'
import CareReceiverLogin from '@/views/CareReceiver/LoginView.vue'
import CareReceiverDashboard from '@/views/CareReceiver/Dashboard.vue'
import CareReceiverMonthlySchedule from '@/views/CareReceiver/MonthlySchedule.vue'
import CareManagerInfo from '@/views/CareReceiver/CareManagerInfo.vue'
import Cancellation from '@/views/CareReceiver/Cancellation.vue'
import CancellationCompleted from '@/views/Common/TextMessage.vue'
import CareReceiverDiary from '@/views/CareReceiver/Diary.vue'
import CareReceiverDiaryUpdateCompleted from '@/views/Common/TextMessage.vue'

export default {
  routes: [
    {
      path: '/care-receiver/input',
      name: 'CareReceiverInput',
      component: CareReceiverInput,
      meta: { requiresAuth: true },
    },
    {
      path: '/care-receiver/confirm',
      name: 'CareReceiverConfirm',
      component: CareReceiverConfirm,
      meta: { requiresAuth: true },
    },
    {
      path: '/care-receiver/completed',
      name: 'CareReceiverCompleted',
      component: CareReceiverCompleted,
      meta: { requiresAuth: true },
    },
    {
      path: '/care-receiver/update',
      name: 'CareReceiverUpdate',
      component: CareReceiverUpdate,
      meta: { requiresAuth: true },
    },
    {
      path: '/care-receiver/update/completed',
      name: 'CareReceiverUpdateCompleted',
      component: CareReceiverUpdateCompleted,
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
      path: '/care-receiver/index',
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
      path: '/care-receiver/cancel',
      name: 'Cancellation',
      component: Cancellation,
      meta: { requiresAuth: true },
    },
    {
      path: '/care-receiver/cancel/completed',
      name: 'CancellationCompleted',
      component: CancellationCompleted,
      meta: { requiresAuth: true },
    },
    {
      path: '/care-receiver/diary',
      name: 'CareReceiverDiary',
      component: CareReceiverDiary,
      meta: { requiresAuth: true }
    },
    {
      path: '/care-receiver/diary-update/completed',
      name: 'CareReceiverDiaryUpdateCompleted',
      component: CareReceiverDiaryUpdateCompleted,
      meta: { requiresAuth: true }
    }
  ]
}