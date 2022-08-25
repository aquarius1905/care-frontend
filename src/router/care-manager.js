import CareManagerLoginView from '../views/CareManager/LoginView.vue'
import CareManagerRegistrationView from '../views/CareManager/RegistrationView.vue'
import CareManagerRegistrationCompletionView from '../views/CareManager/RegistrationCompletionView.vue'
import CareManagerRegistrationConfirmationView from '../views/CareManager/RegistrationConfirmView.vue'
import CareManagerUpdateView from '../views/CareManager/UpdateView.vue'
import CareManagerUpdateConfirmationView from '../views/CareManager/UpdateConfirmView.vue'
import CareManagerUpdateCompletionView from '../views/CareManager/UpdateCompletionView.vue'
import CareManagerVisitDateTimeView from '../views/CareManager/VisitDateTimeView.vue'

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
      name: 'CareManagerUpdateConfirmation',
      component: CareManagerUpdateConfirmationView,
      meta: { requiresAuth: true },
    },
    {
      path: '/care-manager/update/complete',
      name: 'CareManagerUpdateCompletion',
      component: CareManagerUpdateCompletionView,
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