<template>
  <div class="care-manager__info">
    <h2 class="info__ttl">担当ケアマネージャー</h2>
    <div class="detail__content box-shadow">
      <h3 class="tbl__sub-ttl">ケアマネージャー情報</h3>
      <table class="detail__tbl">
        <tr>
          <th>氏名</th>
          <td>{{ care_manager.name }}</td>
        </tr>
        <tr>
          <th>フリガナ</th>
          <td>{{ care_manager.name_furigana }}</td>
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
      <h3 class="tbl__sub-ttl">居宅介護事業所情報</h3>
      <table class="detail__tbl">
        <tr>
          <th>事業所名</th>
          <td>{{ care_manager.office_name }}</td>
        </tr>
        <tr>
          <th>郵便番号</th>
          <td>〒{{ care_manager.office_postcode }}</td>
        </tr>
        <tr>
          <th>住所</th>
          <td>{{ care_manager.office_address }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      care_manager: 'getCareManagerInCharge',
    })
  }
};
</script>