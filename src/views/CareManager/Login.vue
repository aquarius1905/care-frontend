<template>
  <div>
    <Login
    :form-title="form_ttl"
    :reset-password-link="reset_password_link">
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
      reset_password_link: '/care-manager/reset-password'
    }
  },
  created() {
    this.$store.dispatch('setCareManagerFlg');
  }
}
</script>