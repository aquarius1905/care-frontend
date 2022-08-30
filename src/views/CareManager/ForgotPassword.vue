<template>
  <div>
    <ForgotPassword
    :form-title="form_ttl"
    >
    </ForgotPassword>
  </div>
</template>

<script>
import ForgotPassword from "@/components/ForgotPassword";
export default {
  components: { ForgotPassword },
  data() {
    return {
      form_ttl: '（ケアマネージャー）'
    }
  }
}
</script>