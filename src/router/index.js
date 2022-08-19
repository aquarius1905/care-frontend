import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index';
import CareManagerRoutes from './care-manager.js'
import CareReceiverRoutes from './care-receiver.js'
import KeyPsersonRoutes from './key-person.js'
Vue.use(VueRouter)

import HomeView from '../views/HomeView.vue'
import CareGivingOfficeLoginView from '../views/CareGivingOfficeLoginView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { requiresAuth: false },
  },
  {
    path: '/care-giving-office/login',
    name: 'CareGivingOfficeLogin',
    component: CareGivingOfficeLoginView,
    meta: { requiresAuth: false },
  },
  ...CareManagerRoutes.routes,
  ...CareReceiverRoutes.routes,
  ...KeyPsersonRoutes.routes
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isCareManagerLoggedIn) {
      next()  
    } else {
      next('/care-manager/login')
    }
  } else {
    next()
  }
})

export default router
