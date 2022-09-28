<template>
  <div class="registration">
    <h2 class="registration__ttl">被介護者 登録</h2>
    <div class="registration__form">
      <validation-observer v-slot="{ invalid }">
        <div class="form__info box-shadow">
          <h3 class="form__ttl">被介護者情報</h3>
          <div class="form__item">
            <div class="form__item-wrap">
              <div class="form__item-name-wrap">
                <validation-provider v-slot="{ errors }" rules="required|max:127">
                  <label for="last_name" class="form__item-lbl">
                    姓
                    <span class="required-lbl">必須</span>
                  </label>
                  <input type="text" id="last_name" class="name-input" v-model="care_receiver.last_name" name="姓"
                    placeholder="山田">
                  <div class="error">{{ errors[0] }}</div>
                </validation-provider>
              </div>
              <div class="form__item-name-wrap">
                <validation-provider v-slot="{ errors }" rules="required|max:127">
                  <label for="first_name" class="form__item-lbl">
                    名
                    <span class="required-lbl">必須</span>
                  </label>
                  <input type="text" id="first_name" class="name-input" v-model="care_receiver.first_name" name="名"
                    placeholder="太郎">
                  <div class="error">{{ errors[0] }}</div>
                </validation-provider>
              </div>
            </div>
          </div>
          <div class="form__item">
            <div class="form__item-wrap">
              <div class="form__item-name-wrap">
                <validation-provider v-slot="{ errors }" rules="required|max:127|full_sized_katakana" name="セイ">
                  <label for="last_name_furigana" class="form__item-lbl">
                    セイ
                    <span class="required-lbl">必須</span>
                  </label>
                  <input type="text" id="last_name_furigana" class="name-input" v-model="care_receiver.last_name_furigana"
                    placeholder="ヤマダ" required>
                  <div class="error">{{ errors[0] }}</div>
                </validation-provider>
              </div>
              <div class="form__item-name-wrap">
                <validation-provider v-slot="{ errors }" rules="required|max:127|full_sized_katakana" name="メイ">
                  <label for="first_name_furigana" class="form__item-lbl">
                    メイ
                    <span class="required-lbl">必須</span>
                  </label>
                  <input type="text" id="first_name_furigana" class="name-input" v-model="care_receiver.first_name_furigana"
                    placeholder="タロウ" required>
                  <div class="error">{{ errors[0] }}</div>
                </validation-provider>
              </div>
            </div>
          </div>
          <div class="form__item">
            <validation-provider v-slot="{ errors }" rules="required">
              <label class="form__item-lbl" for="gender">
                性別
                <span class="required-lbl">必須</span>
              </label>
              <input type="radio" name="gender" id="male" value="0" v-model="care_receiver.gender">
              <label for="male" class="radio__lbl">男</label>
              <input type="radio" name="gender" id="female" value="1" v-model="care_receiver.gender">
              <label for="female" class="radio__lbl">女</label>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form__item">
            <validation-provider v-slot="{ errors }" rules="required">
              <label class="form__item-lbl" for="birthday">
                生年月日
                <span class="required-lbl">必須</span>
              </label>
              <input type="date" id="birthday" class="input" v-model="care_receiver.birthday" min="1900-01-01" max="1970-01-01"
                required>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form__item">
            <validation-provider v-slot="{ errors }" rules="required|numeric|length:7">
              <label class="form__item-lbl" for="post_code">
                郵便番号
                <span class="required-lbl">必須</span>
              </label>
              <input type="text" id="post_code" class="input" v-model="care_receiver.post_code" placeholder="1050004"
                @blur="fetchAddress" required>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form__item">
            <validation-provider v-slot="{ errors }" rules="required|max:255">
              <label class="form__item-lbl" for="address">
                住所
                <span class="required-lbl">必須</span>
              </label>
              <input type="text" id="address" class="input" v-model="care_receiver.address" placeholder="東京都港区新橋5-6-7" required>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form__item">
            <validation-provider v-slot="{ errors }" rules="required|numeric|insurer_number" name="保険者番号">
              <label class="form__item-lbl" for="insurer_number">
                保険者番号
                <span class="required-lbl">必須</span>
              </label>
              <input type="text" id="insurer_number" class="input" v-model="care_receiver.insurer_number" placeholder="39130000"
                required>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form__item">
            <validation-provider v-slot="{ errors }" rules="required|numeric|length:10">
              <label class="form__item-lbl" for="insured_number">
                介護保険 被保険者番号
                <span class="required-lbl">必須</span>
              </label>
              <input type="text" id="insured_number" class="input" v-model="care_receiver.insured_number"
                placeholder="1234567890" required>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form__item">
            <fieldset class="fieldset">
              <legend class="form__item-lbl legend-lbl">
                介護度
                <span class="required-lbl">必須</span>
              </legend>
              <div class="care-level-wrap">
                <ul class="care-level-lst">
                  <li v-for="needed_support_level in needed_support_levels" :key="needed_support_level.id">
                    <input type="radio" name="care_level" :id="needed_support_level.name" :value="needed_support_level"
                      v-model="care_receiver.care_level">
                    <label class="radio-btn-lbl" :for="needed_support_level.name">{{ needed_support_level.name
                    }}</label>
                  </li>
                </ul>
              </div>
              <div class="care-level-wrap">
                <ul class="care-level-lst">
                  <li v-for="needed_care_level in needed_care_levels" :key="needed_care_level.id">
                    <input type="radio" name="care_level" :id="needed_care_level.name" :value="needed_care_level"
                      v-model="care_receiver.care_level">
                    <label class="radio-btn-lbl" :for="needed_care_level.name">{{ needed_care_level.name }}</label>
                  </li>
                </ul>
              </div>
            </fieldset>
          </div>
        </div>
        <div class="form__info box-shadow">
          <h3 class="form__ttl">キーパーソン情報</h3>
          <div class="form__item">
            <div class="form__item-wrap">
              <div class="form__item-name-wrap">
                <validation-provider v-slot="{ errors }" rules="required|max:127">
                  <label for="last_name" class="form__item-lbl">
                    姓
                    <span class="required-lbl">必須</span>
                  </label>
                  <input type="text" id="last_name" class="name-input" v-model="care_receiver.keyperson_lastname" name="姓" placeholder="山田">
                  <div class="error">{{ errors[0] }}</div>
                </validation-provider>
              </div>
              <div class="form__item-name-wrap">
                <validation-provider v-slot="{ errors }" rules="required|max:127">
                  <label for="first_name" class="form__item-lbl">
                    名
                    <span class="required-lbl">必須</span>
                  </label>
                  <input type="text" id="first_name" class="name-input" v-model="care_receiver.keyperson_firstname" name="名" placeholder="花子">
                  <div class="error">{{ errors[0] }}</div>
                </validation-provider>
              </div>
            </div>
          </div>
          <div class="form__item">
            <div class="form__item-wrap">
              <div class="form__item-name-wrap">
                <validation-provider v-slot="{ errors }" rules="required|max:127|full_sized_katakana">
                  <label for="last_name_furigana" class="form__item-lbl">
                    セイ
                    <span class="required-lbl">必須</span>
                  </label>
                  <input type="text" id="last_name_furigana" class="name-input" v-model="care_receiver.keyperson_lastname_furigana"
                    placeholder="ヤマダ" required>
                  <div class="error">{{ errors[0] }}</div>
                </validation-provider>
              </div>
              <div class="form__item-name-wrap">
                <validation-provider v-slot="{ errors }" rules="required|max:127|full_sized_katakana">
                  <label for="first_name_furigana" class="form__item-lbl">
                    メイ
                    <span class="required-lbl">必須</span>
                  </label>
                  <input type="text" id="first_name_furigana" class="name-input" v-model="care_receiver.keyperson_firstname_furigana"
                    placeholder="ハナコ" required>
                  <div class="error">{{ errors[0] }}</div>
                </validation-provider>
              </div>
            </div>
          </div>
          <div class="form__item">
            <validation-provider v-slot="{ errors }" rules="required|max:10">
              <label class="form__item-lbl" for="relationship">
                続柄
                <span class="required-lbl">必須</span>
              </label>
              <input type="text" id="relationship" class="input" v-model="care_receiver.relationship" placeholder="妻" required>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form__item">
            <validation-provider v-slot="{ errors }" rules="required|email">
              <label class="form__item-lbl" for="email">
                メールアドレス
                <span class="required-lbl">必須</span>
              </label>
              <input type="email" id="email" class="input" v-model="care_receiver.email" placeholder="taro_yamada@sample.com"
                required>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form__item">
            <validation-provider v-slot="{ errors }" rules="required|numeric|min:10|max:11">
              <label class="form__item-lbl" for="tel">
                電話番号
                <span class="required-lbl">必須</span>
              </label>
              <input type="text" id="tel" class="input" v-model="care_receiver.tel" placeholder="09012345678" required>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form__item">
            <validation-provider v-slot="{ errors }" rules="required|password_rule">
              <label class="form__item-lbl" for="password">
                パスワード
                <span class="required-lbl">必須</span>
              </label>
              <input type="password" id="password" class="input" v-model="care_receiver.password" required>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form__item">
            <validation-provider v-slot="{ errors }" rules="required|confirmed:password" vid="password">
              <label class="form__item-lbl" for="password_confirmation">
                パスワード（確認用）
                <span class="required-lbl">必須</span>
              </label>
              <input type="password" id="password_confirmation" class="input" v-model="care_receiver.password_confirmation"
                required>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
        </div>
        <button class="btn confirm__btn" @click="confirmRegistration" :disabled="invalid">登録内容確認</button>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import plugin from '@/plugins'
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      needed_support_levels: null,
      needed_care_levels: null,
      care_receiver: {
        last_name: null,
        first_name: null,
        last_name_furigana: null,
        first_name_furigana: null,
        gender: 0,
        birthday: "1940-01-01",
        post_code: null,
        address: null,
        insurer_number: null,
        insured_number: null,
        care_level: {
          id: 0,
          name: null
        },
        keyperson_lastname: null,
        keyperson_firstname: null,
        keyperson_lastname_furigana: null,
        keyperson_firstname_furigana: null,
        relationship: null,
        email: null,
        tel: null,
        password: null,
        password_confirmation: null
      }
    }
  },
  computed: {
    ...mapGetters([
      'hasCareLevels',
      'getNeededSupportLevels',
      'getNeededCareLevels'
    ]),
  },
  methods: {
    ...mapActions([ 'fetchCareLevels' ]),
    async fetchAddress() {
      this.care_receiver.address = await
        plugin.fetchAddress(
          this.care_receiver.post_code
        );
    },
    async getCareLevels() {
      if (!this.hasCareLevels) {
        await this.fetchCareLevels();
      }

      this.needed_support_levels = this.getNeededSupportLevels;
      this.needed_care_levels = this.getNeededCareLevels;

      if (this.care_receiver.care_level.id === 0) {
        this.care_receiver.care_level.id = this.needed_support_levels[0].id;
        this.care_receiver.care_level.name = this.needed_support_levels[0].name;
      }
    },
    confirmRegistration() {
      this.$router.push({
        name: 'CareReceiverRegistrationConfirm',
        query: { care_receiver: this.care_receiver }
      });
    },
  },
  created() {
    if (this.$route.query.care_receiver !== null) {
      this.care_receiver = this.$route.query.care_receiver
    }
    this.getCareLevels();
  }
}
</script>
<style scoped>
.keyperson-fieldset {
  padding: 20px;
}
</style>
