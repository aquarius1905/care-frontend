<template>
  <div>
    <Login
    :form-title="form_ttl"
    :forgot-password-link="forgot_password_link">
  </Login>
  </div>
</template>

<script>
import Login from "@/components/Login";
export default {
  components: { Login },
  data() {
    return {
      form_ttl: 'ケアマネージャー',
      forgot_password_link: '/care-manager/forgot-password'
    }
  },
  created() {
    this.$store.dispatch('setCareManagerFlg');
  }
}
</script>