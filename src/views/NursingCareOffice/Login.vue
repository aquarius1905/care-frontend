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
      form_ttl: '介護事業者',
      forgot_password_link: 'NursingCareOfficeForgotPassword',
      path: '/nursing-care-offices/forgot-password'
    }
  },
  created() {
    this.$store.dispatch('setNursingCareOfficeFlg');
  }
}
</script>