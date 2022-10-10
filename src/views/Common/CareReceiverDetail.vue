<template>
  <div class="care-receiver__detail">
    <h2 class="detail__ttl">{{ page_ttl }}</h2>
    <div class="detail__content box-shadow">
      <h3 class="tbl__sub-ttl">被介護者情報</h3>
      <table class="detail__tbl">
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
          <td>{{ care_receiver.gender === 0 ? "男" : "女" }}</td>
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
      <h3 class="tbl__sub-ttl">キーパーソン情報</h3>
      <table class="detail__tbl">
        <tr>
          <th>氏名</th>
          <td>{{ care_receiver.keyperson_name }}</td>
        </tr>
        <tr>
          <th>フリガナ</th>
          <td>{{ care_receiver.keyperson_name_furigana }}</td>
        </tr>
        <tr>
          <th>続柄</th>
          <td>{{ care_receiver.relationship }}</td>
        </tr>
        <tr>
          <th>メールアドレス</th>
          <td>{{ care_receiver.email }}</td>
        </tr>
        <tr>
          <th>電話番号</th>
          <td>{{ care_receiver.tel }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      care_receiver: null,
      page_ttl: null
    }
  },
  computed: {
    ...mapGetters([
      'isCareManagerLoggedIn',
      'isCareReceiverLoggedIn',
      'getSelectedCareReceiver',
      'getLoggedInCareReceiver',
    ])
  },
  methods: {
    ...mapActions([
      'setCareManagerDetailFlg',
    ]),
  },
  created() {
    if (this.isCareManagerLoggedIn) {
      console.log('isCareManagerLoggedIn');
      this.setCareManagerDetailFlg(true);
      this.care_receiver = this.getSelectedCareReceiver;
      this.page_ttl = '被介護者詳細情報';
    } else if (this.isCareReceiverLoggedIn) {
      console.log('isCareReceiverLoggedIn');
      this.care_receiver = this.getLoggedInCareReceiver;
      this.page_ttl = '登録情報確認';
    }
    console.log(this.care_receiver);
  }
};
</script>