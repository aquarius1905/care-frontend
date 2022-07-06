<template>
  <div class="care-manager-form">
    <router-view :senddata.sync="senddata">
    </router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      senddata: {
        last_name: null,
        first_name: null,
        last_name_furigana: null,
        first_name_furigana: null,
        support_office: null,
        registration_number: null,
        email: null,
        tel: null,
        password: null
      }
    }
  }
}
</script>