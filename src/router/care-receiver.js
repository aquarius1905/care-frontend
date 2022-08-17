import CareReceiverRegistrationView from '../views/CareReceiver/RegistrationView.vue'
import CareReceiverRegistrationConfirmationView from '../views/CareReceiver/RegistrationConfirmationView.vue'
import CareReceiverRegistrationCompletionView from '../views/CareReceiver/RegistrationCompletionView.vue'
import CareReceiverUpdateView from '../views/CareReceiver/UpdateView.vue'
import CareReceiverUpdateConfirmationView from '../views/CareReceiver/UpdateConfirmationView.vue'
import CareReceiverListView from '../views/CareReceiver/ListView.vue'
import CareReceiverDetailView from '../views/CareReceiver/DetailView.vue'

export default {
  routes: [
    {
      path: '/care-receiver/registration',
      name: 'CareReceiverRegistration',
      component: CareReceiverRegistrationView,
      meta: { requiresAuth: true },
    },
    {
      path: '/care-receiver/registration/confirm',
      name: 'CareReceiverRegistrationConfirmation',
      component: CareReceiverRegistrationConfirmationView,
      meta: { requiresAuth: true },
    },
    {
      path: '/care-receiver/registration/complete',
      name: 'CareReceiverRegistrationCompletion',
      component: CareReceiverRegistrationCompletionView,
      meta: { requiresAuth: true },
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
      component: CareReceiverUpdateConfirmationView,
      meta: { requiresAuth: true },
    },
    {
      path: '/care-receiver/list',
      name: 'CareReceiverList',
      component: CareReceiverListView,
      meta: { requiresAuth: true },
    },
    {
      path: '/care-receiver/detail',
      name: 'CareReceiverDetail',
      component: CareReceiverDetailView,
      meta: { requiresAuth: true },
    },
  ]
}