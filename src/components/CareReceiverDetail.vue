<template>
  <div class="detail">
    <div class="form box-shadow">
      <h2 class="form-ttl">被介護者詳細情報</h2>
      <div class="detail-tbl-wrap">
        <table class="detail-tbl">
          <tr>
            <th>氏名</th>
            <td>{{ careReceiver.name }}</td>
          </tr>
          <tr>
            <th>フリガナ</th>
            <td>{{ careReceiver.name_furigana }}</td>
          </tr>
          <tr>
            <th>性別</th>
            <td>{{ careReceiver.gender === 1 ? "男" : "女" }}</td>
          </tr>
          <tr>
            <th>生年月日</th>
            <td>{{ $dayjs(careReceiver.birthday).format('YYYY/MM/DD') }}</td>
          </tr>
          <tr>
            <th>郵便番号</th>
            <td>{{ careReceiver.post_code }}</td>
          </tr>
          <tr>
            <th>住所</th>
            <td>{{ careReceiver.address }}</td>
          </tr>
          <tr>
            <th>介護度</th>
            <td>{{ careReceiver.care_level.name }}</td>
          </tr>
          <tr>
            <th>保険者番号</th>
            <td>{{ careReceiver.insurer_number }}</td>
          </tr>
          <tr>
            <th>被保険者番号</th>
            <td>{{ careReceiver.insured_number }}</td>
          </tr>
        </table>
        <fieldset class="fieldset">
          <legend class="legend">次回訪問日時</legend>
          <table class="visit-datetime-tbl">
            <tr>
              <th>日付</th>
              <td>{{ $dayjs(careReceiver.visit_datetime.date).format('YYYY/MM/DD (ddd)') }}</td>
            </tr>
            <tr>
              <th>時間</th>
              <td>{{ $dayjs(careReceiver.visit_datetime.time).format('HH:mm') }}</td>
            </tr>
          </table>
        </fieldset>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    careReceiver: {
      type: Object
    }
  }
};
</script>