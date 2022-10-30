<template>
  <div class="diary">
    <h2 class="diary__ttl">日誌</h2>
    <DaycareDiary :send-data="send_data"/>
  </div>
</template>

<script>
import DaycareDiary from "@/components/DaycareDiary";
export default {
  components: { DaycareDiary },
  data() {
    return {
      send_data: {}
    }
  },
  created() {
    this.send_data = this.$route.query.send_data;
  }
};
</script>