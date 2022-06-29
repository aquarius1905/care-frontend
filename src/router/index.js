import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CareManagerRegisterationView from '../views/CareManagerRegisterationView.vue'
import CareManagerLoginView from '../views/CareManagerLoginView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/care-manager/register',
    name: 'care_manager_register',
    component: CareManagerRegisterationView
  },
  {
    path: '/care-manager/login',
    name: 'care_manager_login',
    component: CareManagerLoginView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
