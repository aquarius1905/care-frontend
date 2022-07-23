import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index';
Vue.use(VueRouter)

import CareManagerLoginView from '../views/CareManagerLoginView.vue'
import CareManagerRegistrationView from '../views/CareManagerRegistrationView.vue'
import CareManagerRegistrationCompleteView from '../views/CareManagerRegistrationCompleteView.vue'
import CareManagerRegistrationConfirmationView from '../views/CareManagerRegistrationConfirmationView.vue'
import CareManagerInfoView from '../views/CareManagerInfoView.vue'
import CareReceiverRegistrationView from '../views/CareReceiverRegistrationView.vue'
import CareReceiverRegistrationConfirmationView from '../views/CareReceiverRegistrationConfirmationView.vue'

const routes = [
  {
    path: '/care-manager/register',
    name: 'CareManagerRegistration',
    component: CareManagerRegistrationView,
    meta: {requiresAuth: false},
  },
  {
    path: '/care-manager/register/confirm',
    name: 'CareManagerRegistrationConfirmation',
    component: CareManagerRegistrationConfirmationView,
    meta: {requiresAuth: false},
  },
  {
    path: '/care-manager/register/complete',
    name: 'CareManagerRegistrationComplete',
    component: CareManagerRegistrationCompleteView,
    meta: {requiresAuth: false},
  },
  {
    path: '/care-manager/info',
    name: 'CareManagerInfo',
    component: CareManagerInfoView,
    meta: {requiresAuth: true},
  },
  {
    path: '/care-receiver/register',
    name: 'CareReceiverRegistration',
    component: CareReceiverRegistrationView,
    meta: {requiresAuth: true},
  },
  {
    path: '/care-receiver/register/confirm',
    name: 'CareReceiverRegistrationConfirmation',
    component: CareReceiverRegistrationConfirmationView,
    meta: {requiresAuth: true},
  },
  {
    path: '/care-manager/login',
    name: 'CareManagerLogin',
    component: CareManagerLoginView,
    meta: {requiresAuth: false},
  },
]

function isCareManagerLoggedIn() {
  return store.getters.isCareManagerLoggedIn;
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (isCareManagerLoggedIn()) {
      next()
    } else {
      next('/care-manager/login')
    }
  } else {
    next()
  }
})

export default router
