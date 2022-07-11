<template>
  <div class="care-receiver-form">
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
        post_code: null,
        address: null,
        care_level: 0
      }
    }
  }
}
</script>