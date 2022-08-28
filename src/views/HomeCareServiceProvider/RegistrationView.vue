<template>
  <div id="">
    <h2 class="page-ttl">居宅介護事業所 登録</h2>
    <div class="form box-shadow">
      <validation-observer v-slot="{ invalid }">
        <div class="form-content">
          <div class="form-item">
            <validation-provider v-slot="{ errors }" rules="required|max:255">
              <label for="office_name" class="form-item-lbl">
                事業所名
                <span class="form-item-label-required">必須</span>
              </label>
              <input type="text" id="office_name" class="input" 
              v-model="home_care_service_provider.office_name" name="事業所名"
                placeholder="デイサービスセンター　新橋">
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form-item">
            <validation-provider v-slot="{ errors }" rules="required|max:255">
              <label for="corporate_name" class="form-item-lbl">
                法人名
                <span class="form-item-label-required">必須</span>
              </label>
              <input type="text" id="corporate_name" class="input"
                v-model="home_care_service_provider.corporate_name"
                placeholder="（社会福祉法人）港福祉会" required>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form-item">
            <validation-provider v-slot="{ errors }" rules="required">
              <label class="form-item-lbl" for="service_type">
                サービス種別
                <span class="form-item-label-required">必須</span>
              </label>
              <select id="service_type" class="select"
              v-model="home_care_service_provider.service_type">
                <option v-for="service_type in home_care_services" 
                :key="service_type.id" :value="service_type">
                  {{ service_type.name }}
                </option>
              </select>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form-item">
            <validation-provider v-slot="{ errors }" rules="required|numeric|length:10">
              <label class="form-item-lbl" for="office_number">
                事業所番号
                <span class="form-item-label-required">必須</span>
              </label>
              <input type="text" id="office_number" class="input" v-model="home_care_service_provider.office_number"
                placeholder="1370300000" required>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form-item">
            <validation-provider v-slot="{ errors }" rules="required|numeric|length:7">
              <label class="form-item-lbl" for="post_code">
                郵便番号
                <span class="form-item-label-required">必須</span>
              </label>
              <div class="flex">
                <input type="text" id="post_code" class="input" v-model="home_care_service_provider.post_code" placeholder="1050004"
                  @blur="fetchAddress" required>
              </div>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form-item">
            <validation-provider v-slot="{ errors }" rules="required|max:255">
              <label class="form-item-lbl" for="address">
                住所
                <span class="form-item-label-required">必須</span>
              </label>
              <input type="text" id="address" class="input" v-model="home_care_service_provider.address" placeholder="東京都港区新橋3-4-5"
                required>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form-item">
            <validation-provider v-slot="{ errors }" rules="required|numeric|min:10|max:11">
              <label class="form-item-lbl" for="tel">
                電話番号
                <span class="form-item-label-required">必須</span>
              </label>
              <input type="text" id="tel" class="input" v-model="home_care_service_provider.tel" placeholder="0312345678" required>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form-item">
            <validation-provider v-slot="{ errors }" rules="numeric|max:10|max:11">
              <label class="form-item-lbl" for="tel">FAX</label>
              <input type="text" id="tel" class="input" 
              v-model="home_care_service_provider.fax" placeholder="0312345678">
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form-item">
            <validation-provider v-slot="{ errors }" rules="required|email">
              <label class="form-item-lbl" for="email">
                メールアドレス
                <span class="form-item-label-required">必須</span>
              </label>
              <input type="email" id="email" class="input" 
              v-model="home_care_service_provider.email"
                placeholder="day-service-shinbashi@minato-fukushi.com" required>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
            <div class="form-item">
              <validation-provider v-slot="{ errors }" rules="required|password_rule">
                <label class="form-item-lbl" for="password">
                  パスワード
                  <span class="form-item-label-required">必須</span>
                </label>
                <input type="password" id="password" class="input" 
                v-model="home_care_service_provider.password" required>
                <div class="error">{{ errors[0] }}</div>
              </validation-provider>
            </div>
        </div>
        <div class="form-btn-wrap form-confirm-btn-wrap">
          <button class="btn" @click="confirmRegistration" :disabled="invalid">登録内容確認</button>
        </div>
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
    'hasHomeCareServices',
    'getHomeCareServices'
    ])
  },
  data() {
  return {
      home_care_services: null,
      home_care_service_provider: {
        office_name: null,
        corporate_name: null,
        service_type: null,
        office_number: null,
        post_code: null,
        address: null,
        tel: null,
        fax: null,
        email: null,
        password: null
      },
    }
  },
  methods: {
    ...mapActions([ 'fetchHomeCareServices' ]),
    async fetchAddress() {
      this.home_care_service_provider.address
        = plugin.fetchAddress(this.care_receiver.post_code);
    },
    confirmRegistration() {
      this.$router.push({
        name: 'HomeCareServiceProviderRegistrationConfirm',
        query: {
          home_care_service_provider: this.home_care_service_provider
        }
      });
    },
    async initialize() {
      if (!this.hasHomeCareServices) {
        await this.fetchHomeCareServices();
      }
      this.home_care_services = this.getHomeCareServices;

      if (this.$route.query.home_care_service_provider === null) {
        this.home_care_service_provider.service_type
          = this.home_care_services[0];
      } else {
        this.home_care_service_provider
          = this.$route.query.home_care_service_provider
      }
    }
  },
  async created() {
    await this.initialize();
  }
}
</script>