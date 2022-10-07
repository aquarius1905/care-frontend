<template>
  <div>
    <h2 class="page__ttl">介護事業所情報 確認・更新</h2>
    <p>{{ nursing_care_office }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters({
      nursing_care_office: 'getLoggedInNursingCareOffice'
    })
  },
  methods: {
  },
  created() {
  }
}
</script>