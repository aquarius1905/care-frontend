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
      form_ttl: '被介護者・キーパーソン',
      reset_password_link: '/care-receiver/reset-password'
    }
  },
  created() {
    this.$store.dispatch('setCareReceiverFlg');
  }
}
</script>