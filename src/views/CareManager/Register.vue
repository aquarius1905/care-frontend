<template>
  <div class="registration">
    <h2 class="registration__ttl">ケアマネージャー 登録</h2>
    <div class="registration__form">
      <validation-observer v-slot="{ invalid }">
        <div class="form__info box-shadow">
          <div class="office__info">
            <h3 class="form__ttl">居宅介護支援事業所情報</h3>
            <div class="form__item">
              <validation-provider v-slot="{ errors }" rules="required|max:255">
                <label for="office_name" class="form__item-lbl">
                  事業所名
                  <span class="required__lbl">必須</span>
                </label>
                <input type="text" id="office_name" class="input" 
                v-model="care_manager.office_name" name="事業所名"
                  placeholder="居宅介護支援事業所 新橋">
                <div class="error">{{ errors[0] }}</div>
              </validation-provider>
            </div>
            <div class="form__item">
              <validation-provider v-slot="{ errors }" rules="required|max:255">
                <label for="corporate_name" class="form__item-lbl">
                  法人名
                  <span class="required__lbl">必須</span>
                </label>
                <input type="text" id="corporate_name" class="input" v-model="care_manager.corporate_name" placeholder="社会福祉法人 港福祉会" required>
                <div class="error">{{ errors[0] }}</div>
              </validation-provider>
            </div>
            <div class="form__item">
              <validation-provider v-slot="{ errors }" rules="required|numeric|length:10">
                <label class="form__item-lbl" for="office_number">
                  事業所番号
                  <span class="required__lbl">必須</span>
                </label>
                <input type="text" id="office_number" class="input" v-model="care_manager.office_number" size="10" maxlength="10"
                  placeholder="1370300000" required>
                <div class="error">{{ errors[0] }}</div>
              </validation-provider>
            </div>
            <div class="form__item">
              <validation-provider v-slot="{ errors }" rules="required|numeric|length:7">
                <label class="form__item-lbl" for="office_postcode">
                  郵便番号
                  <span class="required__lbl">必須</span>
                </label>
                <div class="flex">
                  <input type="text" id="post_code" class="input" v-model="care_manager.office_postcode" placeholder="1050004" required>
                  <button class="btn address-search__btn" @click="fetchAddress">住所検索</button>
                </div>
                <div class="error">{{ errors[0] }}</div>
              </validation-provider>
            </div>
            <div class="form__item">
              <validation-provider v-slot="{ errors }" rules="required|max:255">
                <label class="form__item-lbl" for="address">
                  住所
                  <span class="required__lbl">必須</span>
                </label>
                <input type="text" id="address" class="input" v-model="care_manager.office_address" placeholder="東京都港区新橋3-4-5"
                  required>
                <div class="error">{{ errors[0] }}</div>
              </validation-provider>
            </div>
          </div>
          <div class="care-manager__info">
            <h3 class="form__ttl">ケアマネージャー情報</h3>
            <div class="form__item">
              <div class="form__item-wrap">
                <div class="form__item-name-wrap">
                  <validation-provider v-slot="{ errors }" rules="required|max:127">
                    <label for="last_name" class="form__item-lbl">
                      姓
                      <span class="required__lbl">必須</span>
                    </label>
                    <input type="text" id="last_name" class="name-input" v-model="care_manager.last_name" name="姓"
                      placeholder="山田" required>
                    <div class="error">{{ errors[0] }}</div>
                  </validation-provider>
                </div>
                <div class="form__item-name-wrap">
                  <validation-provider v-slot="{ errors }" rules="required|max:127">
                    <label for="first_name" class="form__item-lbl">
                      名
                      <span class="required__lbl">必須</span>
                    </label>
                    <input type="text" id="first_name" class="name-input" v-model="care_manager.first_name" name="名"
                      placeholder="太郎" required>
                    <div class="error">{{ errors[0] }}</div>
                  </validation-provider>
                </div>
              </div>
            </div>
            <div class="form__item">
              <div class="form__item-wrap">
                <div class="form__item-name-wrap">
                  <validation-provider v-slot="{ errors }" rules="required|full_sized_katakana|max:127" name="セイ">
                    <label for="last_name_furigana" class="form__item-lbl">
                      セイ
                      <span class="required__lbl">必須</span>
                    </label>
                    <input type="text" id="last_name_furigana" class="name-input"
                      v-model="care_manager.last_name_furigana" placeholder="ヤマダ" required>
                    <div class="error">{{ errors[0] }}</div>
                  </validation-provider>
                </div>
                <div class="form__item-name-wrap">
                  <validation-provider v-slot="{ errors }" rules="required|full_sized_katakana|max:127" name="メイ">
                    <label for="first_name_furigana" class="form__item-lbl">
                      メイ
                      <span class="required__lbl">必須</span>
                    </label>
                    <input type="text" id="first_name_furigana" class="name-input"
                      v-model="care_manager.first_name_furigana" placeholder="タロウ" required>
                    <div class="error">{{ errors[0] }}</div>
                  </validation-provider>
                </div>
              </div>
            </div>
            <div class="form__item">
              <validation-provider v-slot="{ errors }" rules="required|length:8">
                <label class="form__item-lbl" for="registration_number">
                  介護支援専門員登録番号
                  <span class="required__lbl">必須</span>
                </label>
                <input type="text" id="registration_number" class="input" v-model="care_manager.registration_number"
                  placeholder="13000000" required>
                <div class="error">{{ errors[0] }}</div>
              </validation-provider>
            </div>
            <div class="form__item">
              <validation-provider v-slot="{ errors }" rules="required|email">
                <label class="form__item-lbl" for="email">
                  メールアドレス
                  <span class="required__lbl">必須</span>
                </label>
                <input type="email" id="email" class="input" v-model="care_manager.email"
                  placeholder="taro_yamada@sample.com" required>
                <div class="error">{{ errors[0] }}</div>
              </validation-provider>
            </div>
            <div class="form__item">
              <validation-provider v-slot="{ errors }" rules="required|min:10|max:11">
                <label class="form__item-lbl" for="tel">
                  電話番号
                  <span class="required__lbl">必須</span>
                </label>
                <input type="text" id="tel" class="input" v-model="care_manager.tel" placeholder="09012345678" required>
                <div class="error">{{ errors[0] }}</div>
              </validation-provider>
            </div>
            <div class="form__item">
              <validation-provider v-slot="{ errors }" rules="required|password_rule">
                <label class="form__item-lbl" for="password">
                  パスワード（半角英数字(A~Z,a~z,0~9)を最低1文字含む8～64文字）
                  <span class="required__lbl">必須</span>
                </label>
                <input type="password" id="password" class="input" v-model="care_manager.password" required>
                <div class="error">{{ errors[0] }}</div>
              </validation-provider>
            </div>
            <div class="form__item">
              <validation-provider v-slot="{ errors }" rules="required|confirmed:password" vid="password">
                <label class="form__item-lbl" for="password_confirmation">
                  パスワード（確認用）
                  <span class="required__lbl">必須</span>
                </label>
                <input type="password" id="password_confirmation" class="input" v-model="care_manager.password_confirmation" required>
                <div class="error">{{ errors[0] }}</div>
              </validation-provider>
            </div>
          </div>
          <button class="btn confirm__btn" @click="confirmRegistration" :disabled="invalid">
            登録内容確認
          </button>
        </div>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import plugin from '@/plugins'
export default {
  data() {
    return {
      care_manager: {
        last_name: null,
        first_name: null,
        last_name_furigana: null,
        first_name_furigana: null,
        registration_number: null,
        email: null,
        tel: null,
        password: null,
        password_confirmation: null,
        office_name: null,
        corporate_name: null,
        office_number: null,
        office_postcode: null,
        office_address: null
      },
    }
  },
  methods: {
    async fetchAddress() {
      this.care_manager.office_address
          = await plugin.fetchAddress(
            this.care_manager.office_postcode
          );
    },
    confirmRegistration() {
      this.$router.push({
        name: 'CareManagerConfirm',
        query: { care_manager: this.care_manager }
      });
    },
  },
  created() {
    if (this.$route.query.care_manager !== null) {
      this.care_manager
        = this.$route.query.care_manager
    }
  }
}
</script>
<style scoped>
.care-manager__info {
  margin-top: 40px;
}
</style>