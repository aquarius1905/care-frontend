<template>
  <div>
    <Login :form-title="form_ttl"></Login>
  </div>
</template>

<script>
import Login from "@/components/Login";
export default {
  components: { Login },
  data() {
    return {
      form_ttl: '被介護者・キーパーソン'
    }
  },
  created() {
    this.$store.dispatch('setCareReceiverFlg');
  }
}
</script>