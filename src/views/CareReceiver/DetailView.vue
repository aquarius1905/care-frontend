<template>
  <div id="detail">
    <CareReceiverDetail :care-receiver="care_receiver"></CareReceiverDetail>
  </div>
</template>

<script>
import CareReceiverDetail from "@/components/CareReceiverDetail";
export default {
  components: { CareReceiverDetail },
  data: function () {
    return {
      care_receiver: null
    }
  },
  created() {
    this.care_receiver = this.$route.query.care_receiver;
  }
};
</script>