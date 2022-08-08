<template>
  <div id="care-manager-registration">
    <div class="form box-shadow">
      <h2 class="form-ttl">ケアマネージャー 登録</h2>
      <ValidationObserver v-slot="{ invalid }">
        <div class="form-content">
          <div class="form-item">
            <div class="form-item-wrap">
              <div class="form-item-name-wrap">
                <ValidationProvider v-slot="{ errors }" rules="required|max:127">
                  <label for="last_name" class="form-item-lbl">姓</label>
                  <input type="text" id="last_name" class="name-input" v-model="care_manager.last_name" name="姓"
                    placeholder="山田" required>
                  <div class="error">{{ errors[0] }}</div>
                </ValidationProvider>
              </div>
              <div class="form-item-name-wrap">
                <ValidationProvider v-slot="{ errors }" rules="required|max:127">
                  <label for="first_name" class="form-item-lbl">名</label>
                  <input type="text" id="first_name" class="name-input" v-model="care_manager.first_name" name="名"
                    placeholder="太郎" required>
                  <div class="error">{{ errors[0] }}</div>
                </ValidationProvider>
              </div>
            </div>
          </div>
          <div class="form-item">
            <div class="form-item-wrap">
              <div class="form-item-name-wrap">
                <ValidationProvider v-slot="{ errors }" rules="required|full_sized_katakana|max:127" name="セイ">
                  <label for="last_name_furigana" class="form-item-lbl">セイ</label>
                  <input type="text" id="last_name_furigana" class="name-input"
                    v-model="care_manager.last_name_furigana" placeholder="ヤマダ" required>
                  <div class="error">{{ errors[0] }}</div>
                </ValidationProvider>
              </div>
              <div class="form-item-name-wrap">
                <ValidationProvider v-slot="{ errors }" rules="required|full_sized_katakana|max:127" name="メイ">
                  <label for="first_name_furigana" class="form-item-lbl">メイ</label>
                  <input type="text" id="first_name_furigana" class="name-input"
                    v-model="care_manager.first_name_furigana" placeholder="タロウ" required>
                  <div class="error">{{ errors[0] }}</div>
                </ValidationProvider>
              </div>
            </div>
          </div>
          <div class="form-item">
            <ValidationProvider v-slot="{ errors }" rules="required|length:8">
              <label class="form-item-lbl" for="registration_number">介護支援専門員登録番号</label>
              <input type="text" id="registration_number" class="input" v-model="care_manager.registration_number"
                placeholder="13000000" required>
              <div class="error">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div class="form-item">
            <ValidationProvider v-slot="{ errors }" rules="required">
              <label class="form-item-lbl" for="suport_office">所属居宅介護支援事業所</label>
              <select id="suport_office" class="select" v-model="care_manager.support_office">
                <option v-for="support_office in support_offices" :key="support_office.id" :value="support_office">
                  {{ support_office.name }}
                </option>
              </select>
              <div class="error">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div class="form-item">
            <ValidationProvider v-slot="{ errors }" rules="required|email">
              <label class="form-item-lbl" for="email">メールアドレス</label>
              <input type="email" id="email" class="input" v-model="care_manager.email"
                placeholder="taro_yamada@sample.com" required>
              <div class="error">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div class="form-item">
            <ValidationProvider v-slot="{ errors }" rules="required|min:10|max:11">
              <label class="form-item-lbl" for="tel">電話番号</label>
              <input type="text" id="tel" class="input" v-model="care_manager.tel" placeholder="09012345678" required>
              <div class="error">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div class="form-item">
            <ValidationProvider v-slot="{ errors }" rules="required|password_rule">
              <label class="form-item-lbl" for="password">パスワード</label>
              <input type="password" id="password" class="input" v-model="care_manager.password" required>
              <div class="error">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
        </div>
        <div class="form-btn-wrap">
          <button class="btn" v-if="update_flg" @click="confirmRegistration()" :disabled="invalid">登録内容確認</button>
          <button class="btn" v-else @click="confirmRegistration()" :disabled="invalid">更新内容確認</button>
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      support_offices: null,
      care_manager: {
        last_name: null,
        first_name: null,
        last_name_furigana: null,
        first_name_furigana: null,
        support_office: null,
        registration_number: null,
        email: null,
        tel: null,
        password: null
      },
    }
  },
  methods: {
    confirmRegistration() {
      this.$router.push({
        name: 'CareManagerRegistrationConfirmation',
        query: { care_manager: this.care_manager }
      });
    },
    async getSupportOffices() {
      if (!this.$store.getters.hasSupportOffices) {
        await this.$store.dispatch('fetchSupportOffices');
      }
      this.support_offices = this.$store.getters.getSupportOffices;
    },
    initialize() {
      this.getSupportOffices();
      
      if (this.$route.query.care_manager !== null) {
        this.care_manager = this.$route.query.care_manager
      }
    }
  },
  created() {
    this.initialize();
  }
}
</script>
