<template>
  <div class="register">
    <h2 class="register__ttl">居宅介護事業所 登録</h2>
    <div class="registration___form">
      <validation-observer v-slot="{ invalid }">
        <div class="form__info box-shadow">
          <h3 class="form__ttl">事業者情報</h3>
          <div class="form-item">
            <validation-provider v-slot="{ errors }" rules="required|max:255">
              <label for="office_name" class="form-item-lbl">
                事業所名
                <span class="required-label">必須</span>
              </label>
              <input type="text" id="office_name" class="input" 
              v-model="nursing_care_office.office_name" name="事業所名"
                placeholder="デイサービスセンター　新橋">
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form-item">
            <validation-provider v-slot="{ errors }" rules="required|max:255">
              <label for="corporate_name" class="form-item-lbl">
                法人名
                <span class="required-label">必須</span>
              </label>
              <input type="text" id="corporate_name" class="input"
                v-model="nursing_care_office.corporate_name"
                placeholder="社会福祉法人 港福祉会" required>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form-item">
            <validation-provider v-slot="{ errors }" rules="required">
              <fieldset class="fieldset">
                <legend class="form-item-lbl legend-lbl">
                  サービス種別
                  <span class="required-label">必須</span>
                </legend>
                <ul class="home-care-service-lst">
                  <li v-for="home_care_service in home_care_services" 
                  :key="home_care_service.id" class="home-care-service">
                    <input type="checkbox" 
                    class="checkbox"
                    name="service_type" 
                    :id="home_care_service.name" 
                    :value="home_care_service"
                    v-model="nursing_care_office.service_types">
                    <label class="checkbox-lbl" :for="home_care_service.name">{{ home_care_service.name
                      }}</label>
                  </li>
                </ul>
              <div class="error">{{ errors[0] }}</div>
              </fieldset>
            </validation-provider>
          </div>
          <div class="form-item">
            <validation-provider v-slot="{ errors }" rules="required|numeric|length:10">
              <label class="form-item-lbl" for="office_number">
                事業所番号
                <span class="required-label">必須</span>
              </label>
              <input type="text" id="office_number" class="input" v-model="nursing_care_office.office_number"
                placeholder="1370300000" required>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form-item">
            <validation-provider v-slot="{ errors }" rules="required|numeric|length:7">
              <label class="form-item-lbl" for="post_code">
                郵便番号
                <span class="required-label">必須</span>
              </label>
              <div class="flex">
                <input type="text" id="post_code" class="input" v-model="nursing_care_office.post_code" placeholder="1050004"
                  @blur="fetchAddress" required>
              </div>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form-item">
            <validation-provider v-slot="{ errors }" rules="required|max:255">
              <label class="form-item-lbl" for="address">
                住所
                <span class="required-label">必須</span>
              </label>
              <input type="text" id="address" class="input" v-model="nursing_care_office.address" placeholder="東京都港区新橋3-4-5"
                required>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form-item">
            <validation-provider v-slot="{ errors }" rules="required|numeric|min:10|max:11">
              <label class="form-item-lbl" for="tel">
                電話番号
                <span class="required-label">必須</span>
              </label>
              <input type="text" id="tel" class="input" v-model="nursing_care_office.tel" placeholder="0312345678" required>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
        </div>
        <div class="form__info box-shadow">
          <h3 class="form__ttl">担当者情報</h3>
          <div class="form-item">
            <div class="form-item-wrap">
              <div class="form-item-name-wrap">
                <validation-provider v-slot="{ errors }" rules="required|max:127">
                  <label for="last_name" class="form-item-lbl">
                    姓
                    <span class="required-label">必須</span>
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
              <div class="form-item-name-wrap">
                <validation-provider v-slot="{ errors }" rules="required|max:127">
                  <label for="first_name" class="form-item-lbl">
                    名
                    <span class="required-label">必須</span>
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
          <div class="form-item">
            <div class="form-item-wrap">
              <div class="form-item-name-wrap">
                <validation-provider v-slot="{ errors }" rules="required|full_sized_katakana|max:127" name="セイ">
                  <label for="last_name_furigana" class="form-item-lbl">
                    セイ
                    <span class="required-label">必須</span>
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
              <div class="form-item-name-wrap">
                <validation-provider v-slot="{ errors }" rules="required|full_sized_katakana|max:127" name="メイ">
                  <label for="first_name_furigana" class="form-item-lbl">
                    メイ
                    <span class="required-label">必須</span>
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
          <div class="form-item">
            <validation-provider v-slot="{ errors }" rules="required|email">
              <label class="form-item-lbl" for="email">
                メールアドレス
                <span class="required-label">必須</span>
              </label>
              <input type="email" id="email" class="input" 
              v-model="nursing_care_office.email"
                placeholder="day-service-shinbashi@minato-fukushi.com" required>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
            <div class="form-item">
              <validation-provider v-slot="{ errors }" rules="required|password_rule">
                <label class="form-item-lbl" for="password">
                  パスワード
                  <span class="required-label">必須</span>
                </label>
                <input type="password" id="password" class="input" 
                v-model="nursing_care_office.password" required>
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
    'emptyHomeCareServices',
    'getHomeCareServices'
    ])
  },
  data() {
  return {
      home_care_services: null,
      nursing_care_office: {
        office_name: null,
        corporate_name: null,
        service_types: [],
        office_number: null,
        post_code: null,
        address: null,
        tel: null,
        last_name: null,
        first_name: null,
        last_name_furigana: null,
        first_name_furigana: null,
        email: null,
        password: null
      },
    }
  },
  methods: {
    ...mapActions([ 'fetchHomeCareServices' ]),
    async fetchAddress() {
      this.nursing_care_office.address
        = await plugin.fetchAddress(
          this.nursing_care_office.post_code
        );
    },
    confirmRegistration() {
      this.$router.push({
        name: 'NursingCareOfficeRegistrationConfirm',
        query: {
          nursing_care_office: this.nursing_care_office
        }
      });
    },
    async initialize() {
      if (this.emptyHomeCareServices) {
        await this.fetchHomeCareServices();
      }
      this.home_care_services = this.getHomeCareServices;

      if (this.$route.query.nursing_care_office === null) {
        this.nursing_care_office.service_type
          = this.home_care_services[0];
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
<style scoped>
.register {
  margin: 20px auto 50px;
  width: 700px;
}
.register__ttl {
  color: #1A237E;
  font-size: 22px;
  user-select: none;
}
.form__info {
  background-color: #fff;
  margin-top: 20px;
  padding: 20px;
  border-radius: 6px;
}
.form__ttl {
  font-size: 20px;
  margin-bottom: 20px;
}

.confirm__btn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto 0;
  border: none;
}
.home-care-service-lst{
  list-style:none;
}
.home-care-service {
  margin-bottom: 10px;
}
.checkbox {
  transform: scale(1.2);
}
.checkbox-lbl {
  margin-left: 10px;
}
</style>