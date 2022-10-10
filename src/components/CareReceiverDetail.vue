<template>
  <div id="care-receiver-detail">
    <div class="form box-shadow">
      <div class="detail-tbl-wrap">
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      care_receiver: 'getSelectedCareReceiver'
    })
  },
};
</script>