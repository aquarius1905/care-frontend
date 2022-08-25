<template>
  <div id="detail">
    <h2 class="page-ttl">被介護者詳細情報</h2>
    <div class="detail-content">
      <CareReceiverDetail></CareReceiverDetail>
      <DetailMenu class="detail-menu"></DetailMenu>
    </div>
  </div>
</template>

<script>
import CareReceiverDetail from "@/components/CareReceiverDetail";
import DetailMenu from "@/components/DetailMenu";
export default {
  components: { CareReceiverDetail, DetailMenu },
};
</script>
<style>
.detail-content {
  display: flex;
  justify-content: center;
}
</style>