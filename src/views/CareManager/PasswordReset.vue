<template>
  <div>
    <PasswordReset
    :form-title="form_ttl"
    >
    </PasswordReset>
  </div>
</template>

<script>
import PasswordReset from "@/components/PasswordReset";
export default {
  components: { PasswordReset },
  data() {
    return {
      form_ttl: '（ケアマネージャー）'
    }
  }
}
</script>