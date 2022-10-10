<template>
<div class="registration">
</div>
</template>

<script>
import plugin from '@/plugins'
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      needed_support_levels: null,
      needed_care_levels: null,
      care_receiver: {
        last_name: null,
        first_name: null,
        last_name_furigana: null,
        first_name_furigana: null,
        gender: 0,
        birthday: "1940-01-01",
        post_code: null,
        address: null,
        insurer_number: null,
        insured_number: null,
        care_level: {
          id: 0,
          name: null
        },
        keyperson_lastname: null,
        keyperson_firstname: null,
        keyperson_lastname_furigana: null,
        keyperson_firstname_furigana: null,
        relationship: null,
        email: null,
        tel: null,
        password: null,
        password_confirmation: null
      }
    }
  },
  computed: {
    ...mapGetters([
      'emptyCareLevels',
      'getNeededSupportLevels',
      'getNeededCareLevels'
    ]),
  },
  methods: {
    ...mapActions([
      'fetchCareLevels',
      'setCareManagerDetailFlg'
    ]),
    async fetchAddress() {
      this.care_receiver.address = await
        plugin.fetchAddress(
          this.care_receiver.post_code
        );
    },
    async getCareLevels() {
      if (this.emptyCareLevels) {
        await this.fetchCareLevels();
      }

      this.needed_support_levels = this.getNeededSupportLevels;
      this.needed_care_levels = this.getNeededCareLevels;

      if (this.care_receiver.care_level.id === 0) {
        this.care_receiver.care_level.id = this.needed_support_levels[0].id;
        this.care_receiver.care_level.name = this.needed_support_levels[0].name;
      }
    },
    confirmRegistration() {
      this.$router.push({
        name: 'CareReceiverRegistrationConfirm',
        query: { care_receiver: this.care_receiver }
      });
    },
    initialize() {
      if (this.$route.query.care_receiver !== null) {
        this.care_receiver = this.$route.query.care_receiver
      }
      this.setCareManagerDetailFlg(false);
      this.getCareLevels();
    }
  },
  created() {
    this.initialize();
  }
}
</script>