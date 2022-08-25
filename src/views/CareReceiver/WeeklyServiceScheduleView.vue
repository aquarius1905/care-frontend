<template>
  <div id="weekly-schedule">
    <div class="page-header">
      <h2 class="page-ttl">週間サービス計画表</h2>
      <p>{{ care_receiver_name }}&emsp;様</p>
    </div>
    <div class="page-content">
      <div>
        <table>
          <th></th>
        </table>
      </div>
      <DetailMenu class="detail-menu"></DetailMenu>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DetailMenu from "@/components/DetailMenu";
export default {
  components: { DetailMenu },
  computed: {
    ...mapGetters({
      care_receiver_name: 'getCurrentCareReceiverName'
    })
  },
};
</script>
<style scoped>
.content {
  display: flex;
  justify-content: center;
}
.page-header {
  display: flex;
  align-items: center;
  padding: 20px;
}
.page-ttl {
  padding: 0;
  margin-right: 40px;
}
</style>