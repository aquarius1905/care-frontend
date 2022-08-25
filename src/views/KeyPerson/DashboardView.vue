<template>
  <div class="dashboard">
    <CareReceiverDetail v-for="(care_receiver, index) in care_receivers"
    :key="index" 
    :care-receiver="care_receiver">
    </CareReceiverDetail>
  </div>
</template>

<script>
import { api } from "@/http-common";
import { mapGetters } from 'vuex'
import CareReceiverDetail from "@/components/CareReceiverDetail";
export default {
  components: { CareReceiverDetail },
  data: function () {
    return {
      care_receivers: null
    }
  },
  computed: {
    ...mapGetters([
      'getKeyPersonAccessToken',
    ])
  },
  methods: {
    async getCareReceivers() {
      api.defaults.headers.common['Authorization']
        = 'Bearer ' + this.getKeyPersonAccessToken;
      const response = await api.get('/care-receivers');
      if (response.status === 200) {
        this.care_receivers = response.data.data;
      }
    },
  },
  async created() {
    await this.getCareReceivers();
  }
};
</script>