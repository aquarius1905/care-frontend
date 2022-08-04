import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index';
Vue.use(VueRouter)

import HomeView from '../views/HomeView.vue'
import CareManagerInfoView from '../views/CareManagerInfoView.vue'
import CareManagerLoginView from '../views/CareManagerLoginView.vue'
import CareManagerRegistrationView from '../views/CareManagerRegistrationView.vue'
import CareManagerRegistrationCompleteView from '../views/CareManagerRegistrationCompleteView.vue'
import CareManagerRegistrationConfirmationView from '../views/CareManagerRegistrationConfirmationView.vue'
import CareReceiverRegistrationView from '../views/CareReceiverRegistrationView.vue'
import CareReceiverRegistrationConfirmationView from '../views/CareReceiverRegistrationConfirmationView.vue'
import CareReceiverRegistrationCompleteView from '../views/CareReceiverRegistrationCompleteView.vue'
import CareReceiverUpdateView from '../views/CareReceiverUpdateView.vue'
import CareReceiverListView from '../views/CareReceiverListView.vue'
import CareReceiverDetailView from '../views/CareReceiverDetailView.vue'
import KeyPersonLoginView from '../views/KeyPersonLoginView.vue'
import CareGivingOfficeLoginView from '../views/CareGivingOfficeLoginView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {requiresAuth: false},
  },
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
    path: '/care-manager/login',
    name: 'CareManagerLogin',
    component: CareManagerLoginView,
    meta: {requiresAuth: false},
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
    meta: {requiresAuth: true },
  },
  {
    path: '/care-receiver/register/complete',
    name: 'CareReceiverRegistrationComplete',
    component: CareReceiverRegistrationCompleteView,
    meta: { requiresAuth: true },
  },
  {
    path: '/care-receiver/update',
    name: 'CareReceiverUpdate',
    component: CareReceiverUpdateView,
    meta: {requiresAuth: true},
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
  {
    path: '/key-person/login',
    name: 'KeyPersonLogin',
    component: KeyPersonLoginView,
    meta: {requiresAuth: false},
  },
  {
    path: '/care-giving-office/login',
    name: 'CareGivingOfficeLogin',
    component: CareGivingOfficeLoginView,
    meta: {requiresAuth: false},
  }
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
