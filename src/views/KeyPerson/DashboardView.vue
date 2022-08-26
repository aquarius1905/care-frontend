<template>
  <div class="dashboard">
    <CareReceiverDetail v-for="(care_receiver, index) in care_receivers"
    :key="index" 
    :care-receiver="care_receiver">
    </CareReceiverDetail>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CareReceiverDetail from "@/components/CareReceiverDetail";
export default {
  components: { CareReceiverDetail },
  computed: {
    ...mapGetters({
      care_receivers: 'getCareReceiversWithKeyPerson',
    })
  },
};
</script>