<template>
  <div id="care-manager-registration">
    <div class="form box-shadow">
      <h2 class="form-ttl">ケアマネージャー 登録</h2>
      <ValidationObserver ref="obs" v-slot="ObserverProps">
        <div class="form-content">
          <div class="form-item">
            <div class="form-item-wrap">
              <div class="form-item-name-wrap">
                <ValidationProvider v-slot="{ errors }" rules="required|max:127">
                  <label for="last_name" class="form-item-lbl">姓</label>
                  <input type="text" id="last_name" class="name-input" v-model="send_data.last_name" name="姓"
                    placeholder="山田" required>
                  <div class="error">{{ errors[0] }}</div>
                </ValidationProvider>
              </div>
              <div class="form-item-name-wrap">
                <ValidationProvider v-slot="{ errors }" rules="required|max:127">
                  <label for="first_name" class="form-item-lbl">名</label>
                  <input type="text" id="first_name" class="name-input" v-model="send_data.first_name" name="名"
                    placeholder="太郎" required>
                  <div class="error">{{ errors[0] }}</div>
                </ValidationProvider>
              </div>
            </div>
          </div>
          <div class="form-item">
            <div class="form-item-wrap">
              <div class="form-item-name-wrap">
                <ValidationProvider v-slot="{ errors }" rules="required|max:127">
                  <label for="last_name_furigana" class="form-item-lbl">セイ</label>
                  <input type="text" id="last_name_furigana" class="name-input" v-model="send_data.last_name_furigana"
                    placeholder="ヤマダ" required>
                  <div class="error">{{ errors[0] }}</div>
                </ValidationProvider>
              </div>
              <div class="form-item-name-wrap">
                <ValidationProvider v-slot="{ errors }" rules="required|max:127">
                  <label for="first_name_furigana" class="form-item-lbl">メイ</label>
                  <input type="text" id="first_name_furigana" class="name-input" v-model="send_data.first_name_furigana"
                    placeholder="タロウ" required>
                  <div class="error">{{ errors[0] }}</div>
                </ValidationProvider>
              </div>
            </div>
          </div>
          <div class="form-item">
            <ValidationProvider v-slot="{ errors }" rules="required|length:8">
              <label class="form-item-lbl" for="registration_number">介護支援専門員登録番号</label>
              <input type="text" id="registration_number" class="input" v-model="send_data.registration_number"
                placeholder="13000000" required>
              <div class="error">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div class="form-item">
            <ValidationProvider v-slot="{ errors }" rules="required">
              <label class="form-item-lbl" for="suport_office">所属居宅介護支援事業所</label>
              <select id="suport_office" class="select" v-model="send_data.support_office">
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
              <input type="email" id="email" class="input" v-model="send_data.email"
                placeholder="taro_yamada@sample.com" required>
              <div class="error">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div class="form-item">
            <ValidationProvider v-slot="{ errors }" rules="required|min:10|max:11">
              <label class="form-item-lbl" for="tel">電話番号</label>
              <input type="text" id="tel" class="input" v-model="send_data.tel" placeholder="09012345678" required>
              <div class="error">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div class="form-item">
            <ValidationProvider v-slot="{ errors }" rules="required|min:8|max:255">
              <label class="form-item-lbl" for="password">パスワード</label>
              <input type="password" id="password" class="input" v-model="send_data.password" required>
              <div class="error">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
        </div>
        <div class="form-btn-wrap">
          <button class="btn" @click="confirmRegistration()"
            :disabled="ObserverProps.invalid || !ObserverProps.validated">登録内容確認</button>
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      support_offices: null,
      send_data: null
    }
  },
  methods: {
    confirmRegistration() {
      this.$store.commit('setCareManager', this.send_data);
      this.$router.push({
        name: 'CareManagerRegistrationConfirmation'
      });
    }
  },
  created() {
    axios
      .get(`${process.env.VUE_APP_API_ORIGIN}/home-care-support-offices`)
      .then(response => {
        this.support_offices = response.data.data;
        if (this.send_data.support_office === null) {
          this.send_data.support_office = this.support_offices[0];
        }
      })
      .catch(error => {
        console.log(error);
      });
    this.send_data = this.$store.getters.getCareManager;
  }
}
</script>
