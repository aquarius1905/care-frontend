<template>
  <div id="detail">
    <CareReceiverDetail></CareReceiverDetail>
    <DetailMenu class="detail-menu"></DetailMenu>
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
#detail {
  display: flex;
  justify-content: center;
}
.detail-menu {
  margin: 20px 0 0 50px;
}
</style>