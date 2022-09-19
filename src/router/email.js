import EmailAlreadyVerifiedView from '@/views/Email/AlreadyVerifiedView.vue'
import EmailVerifiedView from '@/views/Email/VerifiedView.vue'
import EmailUnverifiedView from '@/views/Email/UnverifiedView.vue'

export default {
  routes: [
    {
      path: '/email/already-verified',
      component: EmailAlreadyVerifiedView
    },
    {
      path: '/email/verified',
      component: EmailVerifiedView
    },
    {
      path: '/email/unverified',
      component: EmailUnverifiedView
    },
  ]
}