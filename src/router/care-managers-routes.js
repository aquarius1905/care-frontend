import CareManagerLoginView from '../views/care-manager/CareManagerLoginView.vue'
import CareManagerRegistrationView from '../views/care-manager/CareManagerRegistrationView.vue'
import CareManagerRegistrationCompleteView from '../views/care-manager/CareManagerRegistrationCompleteView.vue'
import CareManagerRegistrationConfirmationView from '../views/care-manager/CareManagerRegistrationConfirmationView.vue'
import CareManagerUpdateView from '../views/care-manager/CareManagerUpdateView.vue'
import CareManagerUpdateConfirmationView from '../views/care-manager/CareManagerUpdateConfirmationView.vue'
import CareManagerUpdateCompleteView from '../views/care-manager/CareManagerUpdateCompleteView.vue'
import CareManagerVisitDateTimeView from '../views/care-manager/CareManagerVisitDateTimeView.vue'

export default {
  routes: [
    {
      path: '/care-manager/registration',
      name: 'CareManagerRegistration',
      component: CareManagerRegistrationView,
      meta: { requiresAuth: false } 
    },
    {
      path: '/care-manager/registration/confirm',
      name: 'CareManagerRegistrationConfirmation',
      component: CareManagerRegistrationConfirmationView,
      meta: { requiresAuth: false },
    },
    {
      path: '/care-manager/registration/complete',
      name: 'CareManagerRegistrationComplete',
      component: CareManagerRegistrationCompleteView,
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
      name: 'CareManagerUpdateConfirmation',
      component: CareManagerUpdateConfirmationView,
      meta: { requiresAuth: true },
    },
    {
      path: '/care-manager/update/complete',
      name: 'CareManagerUpdateComplete',
      component: CareManagerUpdateCompleteView,
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
  ]
}