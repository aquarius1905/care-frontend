<template>
  <div class="dashboard">
    <CareReceiverDetail v-for="(care_receiver, index) in care_receivers"
    :key="index" 
    :care-receiver="care_receiver">
    </CareReceiverDetail>
  </div>
</template>

<script>
import axios from "axios";
import CareReceiverDetail from "@/components/CareReceiverDetail";
export default {
  components: { CareReceiverDetail },
  data: function () {
    return {
      care_receivers: null
    }
  },
  methods: {
    async getCareReceivers() {
      const { data } = await axios.get(`${process.env.VUE_APP_API_ORIGIN}/care-receivers`, {
        headers: {
          Authorization: `Bearer ${this.$store.getters.getKeyPersonAccessToken}`,
        }
      });
      this.care_receivers = data.data;
    },
  },
  created() {
    this.getCareReceivers();
  }
};
</script>