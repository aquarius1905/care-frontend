<template>
  <div class="registration">
    <h2 class="registration__ttl">介護事業所 登録</h2>
    <div class="registration___form">
      <validation-observer v-slot="{ invalid }">
        <div class="form__info box-shadow">
          <h3 class="form__ttl">事業所情報</h3>
          <div class="form__item">
            <validation-provider v-slot="{ errors }" rules="required|max:255">
              <label for="office_name" class="form__item-lbl">
                事業所名
                <span class="required__lbl">必須</span>
              </label>
              <input type="text" id="office_name" class="input" 
              v-model="nursing_care_office.office_name" name="事業所名"
                placeholder="デイサービスセンター　新橋">
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form__item">
            <validation-provider v-slot="{ errors }" rules="required|max:255">
              <label for="corporate_name" class="form__item-lbl">
                法人名
                <span class="required__lbl">必須</span>
              </label>
              <input type="text" id="corporate_name" class="input"
                v-model="nursing_care_office.corporate_name"
                placeholder="社会福祉法人 港福祉会" required>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form__item">
            <validation-provider v-slot="{ errors }" rules="required">
             <label class="form__item-lbl" for="survice_type">
                サービス種別
                <span class="required__lbl">必須</span>
              </label>
              <select id="survice_type" class="select" v-model="nursing_care_office.service_type">
                <option v-for="service_type in service_types" :key="service_type.id" :value="service_type">
                  {{ service_type.name }}
                </option>
              </select>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form__item">
            <validation-provider v-slot="{ errors }" rules="required|numeric|length:10">
              <label class="form__item-lbl" for="office_number">
                事業所番号
                <span class="required__lbl">必須</span>
              </label>
              <input type="text" id="office_number" class="input" v-model="nursing_care_office.office_number" size="10" maxlength="10"
                placeholder="1370300000" required>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form__item">
            <validation-provider v-slot="{ errors }" rules="required|numeric|length:7">
              <label class="form__item-lbl" for="post_code">
                郵便番号
                <span class="required__lbl">必須</span>
              </label>
              <div class="flex">
                <input type="text" id="post_code" class="input" v-model="nursing_care_office.post_code" placeholder="1050004" required>
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
              <input type="text" id="address" class="input" v-model="nursing_care_office.address" placeholder="東京都港区新橋3-4-5"
                required>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
        </div>
        <div class="form__info box-shadow">
          <h3 class="form__ttl">担当者情報</h3>
          <div class="form__item">
            <div class="form__item-wrap">
              <div class="form__item-name-wrap">
                <validation-provider v-slot="{ errors }" rules="required|max:127">
                  <label for="last_name" class="form__item-lbl">
                    姓
                    <span class="required__lbl">必須</span>
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    class="name-input"
                    v-model="nursing_care_office.last_name"
                    name="姓"
                    placeholder="山田"
                    required>
                  <div class="error">{{ errors[0] }}</div>
                </validation-provider>
              </div>
              <div class="form__item-name-wrap">
                <validation-provider v-slot="{ errors }" rules="required|max:127">
                  <label for="first_name" class="form__item-lbl">
                    名
                    <span class="required__lbl">必須</span>
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    class="name-input"
                    v-model="nursing_care_office.first_name"
                    name="名"
                    placeholder="太郎"
                    required>
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
                  <input
                    type="text"
                    id="last_name_furigana"
                    class="name-input"
                    v-model="nursing_care_office.last_name_furigana"
                    placeholder="ヤマダ" 
                    required>
                  <div class="error">{{ errors[0] }}</div>
                </validation-provider>
              </div>
              <div class="form__item-name-wrap">
                <validation-provider v-slot="{ errors }" rules="required|full_sized_katakana|max:127" name="メイ">
                  <label for="first_name_furigana" class="form__item-lbl">
                    メイ
                    <span class="required__lbl">必須</span>
                  </label>
                  <input
                    type="text" 
                    id="first_name_furigana"
                    class="name-input"
                    v-model="nursing_care_office.first_name_furigana"
                    placeholder="タロウ" 
                    required>
                  <div class="error">{{ errors[0] }}</div>
                </validation-provider>
              </div>
            </div>
          </div>
          <div class="form__item">
            <validation-provider v-slot="{ errors }" rules="required|email">
              <label class="form__item-lbl" for="email">
                メールアドレス
                <span class="required__lbl">必須</span>
              </label>
              <input type="email" id="email" class="input" 
              v-model="nursing_care_office.email"
                placeholder="day-service-shinbashi@minato-fukushi.com" required>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form__item">
            <validation-provider v-slot="{ errors }" rules="required|numeric|min:10|max:11">
              <label class="form__item-lbl" for="tel">
                電話番号
                <span class="required__lbl">必須</span>
              </label>
              <input type="text" id="tel" class="input" v-model="nursing_care_office.tel" placeholder="0312345678" required>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form__item">
            <validation-provider v-slot="{ errors }" rules="required|password_rule" vid="password">
              <label class="form__item-lbl" for="password">
                パスワード（半角英数字(A~Z,a~z,0~9)を最低1文字含む8～64文字）
                <span class="required__lbl">必須</span>
              </label>
              <input type="password" id="password" class="input" v-model="nursing_care_office.password" required>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form__item">
            <validation-provider v-slot="{ errors }" rules="required|confirmed:password">
              <label class="form__item-lbl" for="password_confirmation">
                パスワード（確認用）
                <span class="required__lbl">必須</span>
              </label>
              <input type="password" id="password_confirmation" class="input" 
              v-model="nursing_care_office.password_confirmation" required>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
        </div>
        <button class="btn confirm__btn" @click="confirmRegistration" :disabled="invalid">
          登録内容確認
        </button>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import plugin from '@/plugins'
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters([
    'emptyServiceTypes',
    'getServiceTypes'
    ]),
  },
  data() {
    return {
      service_types: null,
      nursing_care_office: {
        office_name: null,
        corporate_name: null,
        service_type: null,
        office_number: null,
        post_code: null,
        address: null,
        tel: null,
        last_name: null,
        first_name: null,
        last_name_furigana: null,
        first_name_furigana: null,
        email: null,
        password: null,
        password_confirmation: null
      },
    }
  },
  methods: {
    ...mapActions([ 'fetchServiceTypes' ]),
    async fetchAddress() {
      this.nursing_care_office.address
        = await plugin.fetchAddress(
          this.nursing_care_office.post_code
        );
    },
    confirmRegistration() {
      this.$router.push({
        name: 'NursingCareOfficeConfirm',
        query: {
          nursing_care_office: this.nursing_care_office
        }
      });
    },
    async initialize() {
      if (this.emptyServiceTypes) {
        await this.fetchServiceTypes();
      }
      this.service_types = this.getServiceTypes;

      if (this.$route.query.nursing_care_office === null) {
        this.nursing_care_office.service_type
          = this.service_types[0];
      } else {
        this.nursing_care_office
          = this.$route.query.nursing_care_office
      }
    }
  },
  async created() {
    await this.initialize();
  }
}
</script>