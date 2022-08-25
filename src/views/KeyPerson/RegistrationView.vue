<template>
  <div>
    <h2 class="main-ttl">キーパーソン 登録</h2>
    <div class="form box-shadow">
      <validation-observer v-slot="{ invalid }">
        <div class="form-content">
          <div class="form-item">
            <div class="form-item">
              <div class="form-item-wrap">
                <div class="form-item-name-wrap">
                  <validation-provider v-slot="{ errors }" rules="required|max:127">
                    <label for="last_name" class="form-item-lbl">姓</label>
                    <input type="text" id="last_name" class="name-input" v-model="key_person.last_name" name="姓"
                      placeholder="山田">
                    <div class="error">{{ errors[0] }}</div>
                  </validation-provider>
                </div>
                <div class="form-item-name-wrap">
                  <validation-provider v-slot="{ errors }" rules="required|max:127">
                    <label for="first_name" class="form-item-lbl">名</label>
                    <input type="text" id="first_name" class="name-input" v-model="key_person.first_name" name="名"
                      placeholder="花子">
                    <div class="error">{{ errors[0] }}</div>
                  </validation-provider>
                </div>
              </div>
            </div>
            <div class="form-item">
              <div class="form-item-wrap">
                <div class="form-item-name-wrap">
                  <validation-provider v-slot="{ errors }" rules="required|max:127|full_sized_katakana">
                    <label for="last_name_furigana" class="form-item-lbl">セイ</label>
                    <input type="text" id="last_name_furigana" class="name-input"
                      v-model="key_person.last_name_furigana" placeholder="ヤマダ" required>
                    <div class="error">{{ errors[0] }}</div>
                  </validation-provider>
                </div>
                <div class="form-item-name-wrap">
                  <validation-provider v-slot="{ errors }" rules="required|max:127|full_sized_katakana">
                    <label for="first_name_furigana" class="form-item-lbl">メイ</label>
                    <input type="text" id="first_name_furigana" class="name-input"
                      v-model="key_person.first_name_furigana" placeholder="ハナコ" required>
                    <div class="error">{{ errors[0] }}</div>
                  </validation-provider>
                </div>
              </div>
            </div>
            <div class="form-item">
              <validation-provider v-slot="{ errors }" rules="required|max:10">
                <label class="form-item-lbl" for="relationship">続柄</label>
                <input type="text" id="relationship" class="input" v-model="key_person.relationship" placeholder="妻"
                  required>
                <div class="error">{{ errors[0] }}</div>
              </validation-provider>
            </div>
            <div class="form-item">
              <ValidationProvider v-slot="{ errors }" rules="required|email">
                <label class="form-item-lbl" for="email">メールアドレス</label>
                <input type="email" id="email" class="input" v-model="key_person.email"
                  placeholder="taro_yamada@sample.com" required>
                <div class="error">{{ errors[0] }}</div>
              </ValidationProvider>
            </div>
            <div class="form-item">
              <validation-provider v-slot="{ errors }" rules="required|numeric|min:10|max:11">
                <label class="form-item-lbl" for="tel">電話番号</label>
                <input type="text" id="tel" class="input" v-model="key_person.tel" placeholder="09012345678" required>
                <div class="error">{{ errors[0] }}</div>
              </validation-provider>
            </div>
            <div class="form-item">
              <validation-provider v-slot="{ errors }" rules="required|password_rule">
                <label class="form-item-lbl" for="password">パスワード</label>
                <input type="password" id="password" class="input" v-model="key_person.password" required>
                <div class="error">{{ errors[0] }}</div>
              </validation-provider>
            </div>
          </div>
        </div>
        <div class="form-btn-wrap">
          <button class="bk-btn btn">戻る</button>
          <button class="btn" @click="confirmRegistration()" :disabled="invalid">登録内容確認</button>
        </div>
      </validation-observer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      care_receiver: {},
      key_person: {
        last_name: null,
        first_name: null,
        last_name_furigana: null,
        first_name_furigana: null,
        relationship: null,
        email: null,
        tel: null,
        password: null
      },
    }
  },
  methods: {
    confirmRegistration() {
      this.$router.push({
        name: 'CareReceiverRegistrationConfirm',
        query: { care_receiver: this.care_receiver, key_person: this.key_person }
      });
    },
  },
  created() {
    this.care_receiver = this.$route.query.care_receiver

    if (this.$route.query.key_person !== null) {
      this.key_person = this.$route.query.key_person;
    }
  }
}
</script>