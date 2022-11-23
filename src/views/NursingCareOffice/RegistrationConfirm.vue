<template>
  <div class="confirmation">
    <h2 class="confirmation__ttl">介護事業所 登録内容確認</h2>
    <div class="confirmation__content box-shadow">
      <h3 class="tbl__sub-ttl">事業所情報</h3>
      <table class="confirmation__tbl">
        <tr>
          <th>事業所名</th>
          <td>{{ nursing_care_office.office_name }}</td>
        </tr>
        <tr>
          <th>法人名</th>
          <td>{{ nursing_care_office.corporate_name }}</td>
        </tr>
        <tr>
          <th>サービス種別</th>
          <td>{{ nursing_care_office.service_type.name }}</td>
        </tr>
        <tr>
          <th>事業所番号</th>
          <td>{{ nursing_care_office.office_number }}</td>
        </tr>
        <tr>
          <th>郵便番号</th>
          <td>〒 {{ nursing_care_office.post_code }}</td>
        </tr>
        <tr>
          <th>住所</th>
          <td>{{ nursing_care_office.address }}</td>
        </tr>
      </table>
      <h3 class="tbl__sub-ttl">担当者情報</h3>
      <table class="confirmation__tbl">
        <tr>
          <th>氏名</th>
          <td>
            <span class="last_name">{{ nursing_care_office.last_name }}</span><span>{{ nursing_care_office.first_name }}</span>
          </td>
        </tr>
        <tr>
          <th>フリガナ</th>
          <td>
            <span class="last_name_furigana">{{ nursing_care_office.last_name_furigana }}</span><span>{{ nursing_care_office.first_name_furigana }}</span>
          </td>
        </tr>
        <tr>
          <th>メールアドレス</th>
          <td>{{ nursing_care_office.email }}</td>
        </tr>
        <tr>
          <th>電話番号</th>
          <td>{{ nursing_care_office.tel }}</td>
        </tr>
        <tr>
          <th>パスワード</th>
          <td>**********</td>
        </tr>
      </table>
    </div>
    <div class="btn__wrap">
      <button class="bk__btn btn" @click="back">戻る</button>
      <button class="btn" @click="register">登録</button>
    </div>
    <Spinner v-show="spinner_flg"></Spinner>
  </div>
</template>

<script>
import Spinner from "@/components/Spinner"
import { api } from "@/plugins/axios";
export default {
  components: { Spinner },
  data() {
    return {
      nursing_care_office: null,
      spinner_flg: false
    }
  },
  methods: {
    back() {
      this.$router.push({
        name: 'NursingCareOfficeRegistration',
        query: { nursing_care_office: this.nursing_care_office }
      });
    },
    async register() {
      if (confirm('登録しますか？')) {
        this.makeNursingCareOfficeData();

        try {
          this.spinner_flg = true;
          const response = await api.post(
            '/nursing-care-offices',
            this.nursing_care_office
          );

          if (response.status === 201) {
            this.spinner_flg = false;
            this.$router.push({
              name: 'NursingCareOfficeCompleted'
            });
          }
        } catch (error) {
          this.spinner_flg = false;
          console.log(error);
          alert('登録に失敗しました');
        }
      }
    },
    makeNursingCareOfficeData() {
      this.nursing_care_office.name
        = this.nursing_care_office.last_name + '　' + this.nursing_care_office.first_name;
      this.nursing_care_office.name_furigana
        = this.nursing_care_office.last_name_furigana + '　' + this.nursing_care_office.first_name_furigana;
      this.nursing_care_office.service_type_id
        = this.nursing_care_office.service_type.id;
    }
  },
  created() {
    this.nursing_care_office
      = this.$route.query.nursing_care_office;
  }
};
</script>
<style scoped>
.confirmation__tbl th {
  width: 30%;
}
</style>
