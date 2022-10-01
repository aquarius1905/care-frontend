<template>
  <div id="detail">
    <h2 class="page__ttl">被介護者詳細情報</h2>
    <div class="detail-content">
      <CareReceiverDetail></CareReceiverDetail>
    </div>
  </div>
</template>

<script>
import CareReceiverDetail from "@/components/CareReceiverDetail";
export default {
  components: { CareReceiverDetail },
  created() {
    this.$store.dispatch('setDetailFlg', true);
  }
};
</script>
<style>
.detail-content {
  display: flex;
  justify-content: center;
}
</style>