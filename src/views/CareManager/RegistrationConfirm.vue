<template>
  <div class="confirmation">
    <h2 class="confirmation__ttl">ケアマネージャー 登録内容確認</h2>
    <div class="confirmation__content box-shadow">
      <h3 class="tbl__sub-ttl">事業所情報</h3>
      <table class="confirmation__tbl">
        <tr>
          <th>事業所名</th>
          <td>{{ care_manager.office_name }}</td>
        </tr>
        <tr>
          <th>法人名</th>
          <td>{{ care_manager.corporate_name }}</td>
        </tr>
        <tr>
          <th>事業所番号</th>
          <td>{{ care_manager.office_number }}</td>
        </tr>
        <tr>
          <th>郵便番号</th>
          <td>〒 {{ care_manager.office_postcode }}</td>
        </tr>
        <tr>
          <th>住所</th>
          <td>{{ care_manager.office_address }}</td>
        </tr>
      </table>
      <h3 class="tbl__sub-ttl">ケアマネージャー情報</h3>
      <table class="confirmation__tbl">
        <tr>
          <th>氏名</th>
          <td>
            <span class="last_name">{{ care_manager.last_name }}</span><span>{{ care_manager.first_name }}</span>
          </td>
        </tr>
        <tr>
          <th>フリガナ</th>
          <td>
            <span class="last_name_furigana">{{ care_manager.last_name_furigana }}</span><span>{{ care_manager.first_name_furigana }}</span>
          </td>
        </tr>
        <tr>
          <th>介護支援専門員登録番号</th>
          <td>{{ care_manager.registration_number }}</td>
        </tr>
        <tr>
          <th>メールアドレス</th>
          <td>{{ care_manager.email }}</td>
        </tr>
        <tr>
          <th>電話番号</th>
          <td>{{ care_manager.tel }}</td>
        </tr>
        <tr>
          <th>パスワード</th>
          <td>************</td>
        </tr>
      </table>
    </div>
    <div class="btn__wrap">
      <button class="bk__btn btn" @click="back">戻る</button>
      <button class="btn" @click="register">登録</button>
    </div>
  </div>
</template>

<script>
import { api } from "@/plugins/axios";
export default {
  data: function () {
    return {
      care_manager: null
    }
  },
  methods: {
    back() {
      this.$router.push({
        name: 'CareManagerInput',
        query: { care_manager: this.care_manager }
      });
    },
    async register() {
      if (confirm('登録しますか？')) {
        this.makeCareManagerData();

        try {
          const response = await api.post(
            '/care-managers', this.care_manager
          );

          if (response.status === 201) {
            this.$router.push({
              name: 'CancellationCompleted',
              query: { msg: "キャンセルの登録が完了しました" }
            });
          }
        } catch (error) {
          console.log(error);
          alert('登録に失敗しました');
        }
      }
    },
    makeCareManagerData() {
      this.care_manager['name']
        = this.care_manager['last_name'] + '　' + this.care_manager['first_name'];
      this.care_manager['name_furigana']
        = this.care_manager['last_name_furigana'] + '　' + this.care_manager['first_name_furigana'];
    }
  },
  created() {
    this.care_manager = this.$route.query.care_manager;
  }
};
</script>