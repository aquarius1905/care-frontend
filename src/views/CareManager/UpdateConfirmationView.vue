<template>
  <div class="care-manager-update-confirmation">
    <div class="form confirm-form box-shadow">
      <h2 class="form-ttl">ケアマネージャー更新内容確認</h2>
      <div class="confirm-content">
        <table class="confirm-tbl">
          <tr>
            <th>氏名</th>
            <td>{{ care_manager.last_name }}&emsp;{{ care_manager.first_name }}</td>
          </tr>
          <tr>
            <th>フリガナ</th>
            <td>{{ care_manager.last_name_furigana }}&emsp;{{ care_manager.first_name_furigana }}</td>
          </tr>
          <tr>
            <th>介護支援専門員登録番号</th>
            <td>{{ care_manager.registration_number }}</td>
          </tr>
          <tr>
            <th>所属居宅介護支援事業所</th>
            <td>{{ care_manager.home_care_support_office.name }}</td>
          </tr>
          <tr>
            <th>メールアドレス</th>
            <td>{{ care_manager.email }}</td>
          </tr>
          <tr>
            <th>電話番号</th>
            <td>{{ care_manager.tel }}</td>
          </tr>
        </table>
        <div class="register-btn-wrap">
          <button class="bk-btn btn" @click="back">戻る</button>
          <button class="btn" @click="update">更新</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { careManagerApi } from "@/http-common"
export default {
  data: function () {
    return {
      care_manager: null
    }
  },
  methods: {
    back() {
      this.$router.push({
        name: 'CareManagerUpdate',
        query: { care_manager: this.care_manager }
      });
    },
    async update() {
      if (confirm('更新しますか？')) {
        this.makeCareManagerData();
        await this.updateCareManagerData();
      }
    },
    makeCareManagerData() {
      this.care_manager['home_care_support_office_id'] = this.care_manager['home_care_support_office']['id'];
      this.care_manager['name']
        = this.care_manager['last_name'] + '　' + this.care_manager['first_name'];
      this.care_manager['name_furigana']
        = this.care_manager['last_name_furigana'] + '　' + this.care_manager['first_name_furigana'];
    },
    async updateCareManagerData() {
      try {
        careManagerApi.defaults.headers.common['Authorization']
          = 'Bearer ' + this.$store.getters.getCareManagerAccessToken;
        const response = await careManagerApi.put(
          `/care-managers/${this.care_manager.id}`, this.care_manager
        );

        if (response.status === 200) {
          this.$store.dispatch('setCareManager', this.care_manager);
          this.$router.push({
            name: 'CareManagerUpdateCompletion'
          });
      }
      } catch (error) {
        console.log(error);
      }

    }
  },
  created() {
    this.care_manager = this.$route.query.care_manager;
  }
};
</script>

<style scoped>
.confirm-tbl th {
  width: 40%;
}
</style>
