<template>
  <div class="detail">
    <div class="form box-shadow">
      <h2 class="form-ttl">被介護者詳細情報</h2>
      <div class="detail-tbl-wrap">
        <table class="detail-tbl">
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
        <fieldset class="fieldset">
          <legend class="legend">次回訪問日時</legend>
          <table class="visit-datetime-tbl">
            <tr>
              <th>日付</th>
              <td>{{ $dayjs(care_receiver.visit_datetime.date).format('YYYY/MM/DD (ddd)') }}</td>
            </tr>
            <tr>
              <th>時間</th>
              <td>{{ $dayjs(care_receiver.visit_datetime.time).format('HH:mm') }}</td>
            </tr>
          </table>
        </fieldset>
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
    this.care_receiver = this.$route.query.care_receiver;
  }
};
</script>