<template>
  <div>
    <Login 
    :form-title="form_ttl" 
    :forgot-password-link="forgot_password_link"
    :path="path">
    </Login>
  </div>
</template>

<script>
import Login from "@/components/Login";
export default {
  components: { Login },
  data() {
    return {
      form_ttl: '被介護者・キーパーソン',
      forgot_password_link: 'CareReceiverForgotPassword',
      path: '/care-receivers/forgot-password'
    }
  },
  created() {
    this.$store.dispatch('setCareReceiverFlg');
  }
}
</script>