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
      form_ttl: '介護事業者',
      reset_password_link: '/nursing-care-office/reset-password'
    }
  },
  created() {
    this.$store.dispatch('setNursingCareOfficeFlg');
  }
}
</script>