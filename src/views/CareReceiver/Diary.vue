<template>
  <div class="care-manager__info">
    <h2 class="info__ttl">日誌</h2>
    <DaycareDiary :diary="diary"/>
  </div>
</template>

<script>
import DaycareDiary from "@/components/DaycareDiary";
export default {
  components: { DaycareDiary },
  data() {
    return {
      diary: {}
    }
  },
  created() {
    this.diary = this.$route.query.diary;
  }
};
</script>