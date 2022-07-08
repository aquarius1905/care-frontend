import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import HomeView from '../views/HomeView.vue'
import CareManagerFormView from '../views/CareManagerFormView.vue'
import CareManagerLoginView from '../views/CareManagerLoginView.vue'
import CareManagerRegistrationView from '../views/CareManagerRegistrationView.vue'
import CareManagerRegistrationCompleteView from '../views/CareManagerRegistrationCompleteView.vue'
import CareManagerRegistrationConfirmationView from '../views/CareManagerRegistrationConfirmationView.vue'
import CareReceiverRegistrationView from '../views/CareReceiverRegistrationView.vue'
import CareReceiverFormView from '../views/CareReceiverFormView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/care-manager/register',
    name: 'CareManagerForm',
    component: CareManagerFormView,
    children: [
      {
        path: '/care-manager/register',
        name: 'CareManagerRegistration',
        component: CareManagerRegistrationView
      },
      {
        path: '/care-manager/register/confirm',
        name: 'CareManagerRegistrationConfirmation',
        component: CareManagerRegistrationConfirmationView,
        meta: {
          isConfirm: true
        }
      }
    ]
  },
  {
    path: '/care-receiver/register',
    name: 'CareReceiverForm',
    component: CareReceiverFormView,
    children: [
      {
        path: '/care-receiver/register',
        name: 'CareReceiverRegistration',
        component: CareReceiverRegistrationView
      },
      // {
      //   path: '/care-receiver/register/confirm',
      //   name: 'CareReceiverRegistrationConfirmation',
      //   component: CareReceiverRegistrationConfirmationView,
      //   meta: {
      //     isConfirm: true
      //   }
      // }
    ]
  },
  {
    path: '/care-manager/register/complete',
    name: 'CareManagerRegistrationComplete',
    component: CareManagerRegistrationCompleteView
  },
  {
    path: '/care-manager/login',
    name: 'CareManagerLogin',
    component: CareManagerLoginView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
