import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CareManagerRegistrationView from '../views/CareManagerRegistrationView.vue'
import CareManagerLoginView from '../views/CareManagerLoginView.vue'
import CareManagerRegistrationCompleteView from '../views/CareManagerRegistrationCompleteView.vue'
import CareManagerRegistrationConfirmationView from '../views/CareManagerRegistrationConfirmationView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/care-manager/register',
    name: 'CareManagerRegistration',
    component: CareManagerRegistrationView
  },
  {
    path: '/care-manager/register/confirm',
    name: 'CareManagerRegistrationConfirmation',
    component: CareManagerRegistrationConfirmationView
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
