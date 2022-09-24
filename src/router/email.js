import EmailAlreadyVerifiedView from '@/views/Email/AlreadyVerifiedView.vue'
import EmailVerifiedView from '@/views/Email/VerifiedView.vue'
import EmailUnverifiedView from '@/views/Email/UnverifiedView.vue'
import EmailVerifyFailureView from '@/views/Email/VerifyFailureView.vue'

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
      path: '/email/verify/failure',
      component: EmailVerifyFailureView
    },
    {
      path: '/email/unverified',
      component: EmailUnverifiedView
    },
  ]
}