<template>
  <div class="detail">
    <DetailMenu></DetailMenu>
    <div class="form box-shadow">
      <h2 class="form-ttl">被介護者登録情報</h2>
      <div class="content">
        <table class="tbl">
          <tr>
            <th>氏名</th>
            <td>{{ care_receiver.name }}</td>
          </tr>
          <tr>
            <th>フリガナ</th>
            <td>{{ care_receiver.name_furigana }}</td>
          </tr>
          <tr>
            <th>生年月日</th>
            <td>{{ care_receiver.birthday }}</td>
          </tr>
          <tr>
            <th>郵便番号</th>
            <td>{{ care_receiver.post_code }}</td>
          </tr>
          <tr>
            <th>住所</th>
            <td>{{ care_receiver.address }}</td>
          </tr>
          <tr>
            <th>介護度</th>
            <td>{{ care_receiver.care_level.name }}</td>
          </tr>
          <tr>
            <th>保険者番号</th>
            <td>{{ care_receiver.insurer_number }}</td>
          </tr>
          <tr>
            <th>被保険者番号</th>
            <td>{{ care_receiver.insured_number }}</td>
          </tr>
        </table>
        <fieldset class="fieldset">
          <legend class="legend">キーパーソン</legend>
          <table class="tbl">
            <tr>
              <th>氏名</th>
              <td>{{ care_receiver.key_person.name }}</td>
            </tr>
            <tr>
              <th>フリガナ</th>
              <td>{{ care_receiver.key_person.name_furigana }}</td>
            </tr>
            <tr>
              <th>続柄</th>
              <td>{{ care_receiver.key_person.relationship }}</td>
            </tr>
            <tr>
              <th>メールアドレス</th>
              <td>{{ care_receiver.key_person.email }}</td>
            </tr>
            <tr>
              <th>電話番号</th>
              <td>{{ care_receiver.key_person.tel }}</td>
            </tr>
          </table>
        </fieldset>
      </div>
    </div>
  </div>
</template>

<script>
import DetailMenu from "../components/DetailMenu";
export default {
  components: { DetailMenu },
  data: function () {
    return {
      care_receiver: null,
    }
  },
  methods: {
  },
  created() {
    this.care_receiver = this.$route.query.care_receiver
  }
};
</script>

<style scoped>
.detail {
  display: flex;
}
.tbl {
  table-layout: fixed;
  width: 100%;
}
.tbl th {
  text-align: left;
  height: 50px;
  width: 30%;
}
.tbl td {
  width: 90%;
}
</style>
