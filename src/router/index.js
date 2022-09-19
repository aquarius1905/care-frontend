import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index';
import CareManagerRoutes from './care-manager.js'
import CareReceiverRoutes from './care-receiver.js'
import CommonRoutes from './common.js'
import EmailRoutes from './email.js'
import KeyPsersonRoutes from './key-person.js'
import NursingCareOfficeRoutes from './nursing-care-office.js'

Vue.use(VueRouter)

const routes = [

  ...CareManagerRoutes.routes,
  ...CareReceiverRoutes.routes,
  ...CommonRoutes.routes,
  ...EmailRoutes.routes,
  ...KeyPsersonRoutes.routes,
  ...NursingCareOfficeRoutes.routes
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (
      store.getters.isCareManagerLoggedIn ||
      store.getters.isNursingCareOfficeLoggedIn ||
      store.getters.isKeyPersonLoggedIn) {
      next()
    } else {
      next('/care-manager/login')
    }
  } else {
    next()
  }
})

export default router
