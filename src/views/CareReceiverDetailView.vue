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
            <th>性別</th>
            <td>{{ care_receiver.gender === 1 ? "男" : "女" }}</td>
          </tr>
          <tr>
            <th>生年月日</th>
            <td>{{ $dayjs(care_receiver.birthday).format('YYYY/MM/DD') }}</td>
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      care_receiver: null,
    }
  },
  methods: {
  },
  created() {
    this.care_receiver = this.$route.query.care_receiver
    console.log(this.care_receiver);
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
.fieldset {
  border: 1px solid #555;
  padding: 20px 10px 0;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 20px;
}
.legend {
  font-weight: bold;
}
</style>
