<template>
  <div>
    <div class="form box-shadow">
      <h2 class="form-ttl">被介護者 登録</h2>
      <validation-observer ref="obs" v-slot="ObserverProps">
        <div class="form-content">
          <div class="form-item">
            <div class="form-item-wrap">
              <div class="form-item-name-wrap">
                <validation-provider v-slot="{ errors }" rules="required|max:127">
                  <label for="last_name" class="form-item-lbl">姓</label>
                  <input type="text" id="last_name" class="name-input" v-model="care_receiver.last_name" name="姓"
                    placeholder="山田">
                  <div class="error">{{ errors[0] }}</div>
                </validation-provider>
              </div>
              <div class="form-item-name-wrap">
                <validation-provider v-slot="{ errors }" rules="required|max:127">
                  <label for="first_name" class="form-item-lbl">名</label>
                  <input type="text" id="first_name" class="name-input" v-model="care_receiver.first_name" name="名"
                    placeholder="太郎">
                  <div class="error">{{ errors[0] }}</div>
                </validation-provider>
              </div>
            </div>
          </div>
          <div class="form-item">
            <div class="form-item-wrap">
              <div class="form-item-name-wrap">
                <validation-provider v-slot="{ errors }" rules="required|max:127">
                  <label for="last_name_furigana" class="form-item-lbl">セイ</label>
                  <input type="text" id="last_name_furigana" class="name-input"
                    v-model="care_receiver.last_name_furigana" placeholder="ヤマダ" required>
                  <div class="error">{{ errors[0] }}</div>
                </validation-provider>
              </div>
              <div class="form-item-name-wrap">
                <validation-provider v-slot="{ errors }" rules="required|max:127">
                  <label for="first_name_furigana" class="form-item-lbl">メイ</label>
                  <input type="text" id="first_name_furigana" class="name-input"
                    v-model="care_receiver.first_name_furigana" placeholder="タロウ" required>
                  <div class="error">{{ errors[0] }}</div>
                </validation-provider>
              </div>
            </div>
          </div>
          <div class="form-item">
            <validation-provider v-slot="{ errors }" rules="required|">
              <label class="form-item-lbl" for="birthday">生年月日</label>
              <input type="date" id="birthday" class="input" v-model="care_receiver.birthday" min="1900-01-01"
                max="1970-01-01" required>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form-item">
            <validation-provider v-slot="{ errors }" rules="required|length:7">
              <label class="form-item-lbl" for="post_code">郵便番号</label>
              <div class="post-code-wrap">
                <input type="text" id="post_code" class="input" v-model="care_receiver.post_code" placeholder="1050004"
                  required>
                <button class="search-btn btn" @click="searchAddress">住所検索</button>
              </div>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form-item">
            <validation-provider v-slot="{ errors }" rules="required|max:255">
              <label class="form-item-lbl" for="address">住所</label>
              <input type="text" id="address" class="input" v-model="care_receiver.address" placeholder="東京都港区新橋5-6-7"
                required>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form-item">
            <fieldset class="fieldset">
              <legend class="form-item-lbl">介護度</legend>
              <div class="care_level_wrap">
                <label v-for="value in care_levels" :key="value.id" :value="value.name" class="care-level-lbl">
                  <input type="radio" name="care_level" v-model="care_receiver.care_level_id">
                  {{ value.name }}
                </label>
              </div>
            </fieldset>
            <fieldset class="keyperson-fieldset fieldset">
              <legend class="form-item-lbl">キーパーソン</legend>
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
                        placeholder="太郎">
                      <div class="error">{{ errors[0] }}</div>
                    </validation-provider>
                  </div>
                </div>
              </div>
              <div class="form-item">
                <div class="form-item-wrap">
                  <div class="form-item-name-wrap">
                    <validation-provider v-slot="{ errors }" rules="required|max:127">
                      <label for="last_name_furigana" class="form-item-lbl">セイ</label>
                      <input type="text" id="last_name_furigana" class="name-input"
                        v-model="key_person.last_name_furigana" placeholder="ヤマダ" required>
                      <div class="error">{{ errors[0] }}</div>
                    </validation-provider>
                  </div>
                  <div class="form-item-name-wrap">
                    <validation-provider v-slot="{ errors }" rules="required|max:127">
                      <label for="first_name_furigana" class="form-item-lbl">メイ</label>
                      <input type="text" id="first_name_furigana" class="name-input"
                        v-model="key_person.first_name_furigana" placeholder="タロウ" required>
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
                <validation-provider v-slot="{ errors }" rules="required|min:10|max:11">
                  <label class="form-item-lbl" for="tel">電話番号</label>
                  <input type="text" id="tel" class="input" v-model="key_person.tel" placeholder="09012345678" required>
                  <div class="error">{{ errors[0] }}</div>
                </validation-provider>
              </div>
            </fieldset>
          </div>
        </div>
        <div class="form-btn-wrap form-confrim-btn-wrap">
          <button class=" btn" @click="confirmRegistration"
            :disabled="ObserverProps.invalid || !ObserverProps.validated">登録内容確認</button>
        </div>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const jsonpAdapter = require('axios-jsonp')
export default {
  data() {
    return {
      support_offices: null,
      care_levels: null,
      care_receiver: {
        last_name: null,
        first_name: null,
        last_name_furigana: null,
        first_name_furigana: null,
        post_code: null,
        address: null,
        birthday: null,
        care_level_id: 0
      },
      key_person: {
        last_name: null,
        first_name: null,
        last_name_furigana: null,
        first_name_furigana: null,
        relationship: null,
        email: null,
        tel: null
      }
    }
  },
  methods: {
    async searchAddress() {
      const { data } = await axios
        .get(`https://api.zipaddress.net/?zipcode=${this.care_receiver.post_code}`, { adapter: jsonpAdapter });
      this.care_receiver.address = data.fullAddress;
    },
    confirmRegistration() {
      this.$store.commit('setCareReceiver', this.care_receiver);
      this.$store.commit('setKeyPerson', this.key_person);
      this.$router.push({
        name: 'CareReceiverRegistrationConfirmation'
      });
    },
    async getCareLevels() {
      const { data } = await axios.get(`${process.env.VUE_APP_API_ORIGIN}/care-levels`);

      this.care_levels = data.data;

      if (this.care_receiver.care_level_id === 0) {
        this.care_receiver.care_level_id = this.care_levels[0].id;
      }
    }
  },
  created() {
    if (this.$route.query.care_receiver !== null) {
      this.care_receiver = this.$route.query.care_receiver
    }
    if (this.$route.query.key_person !== null) {
      this.key_person = this.$route.query.key_person;
    }
    this.getCareLevels();

    if (this.care_receiver.birthday === null) {
      this.care_receiver.birthday = "1940-01-01";
    }
  }
}
</script>
<style scoped>
.search-btn {
  margin-left: 10px;
}
.care_level_wrap {
  margin-bottom: 20px
}
.care-level-lbl {
  display: inline-block;
  margin-right: 20px;
}
.fieldset {
  border: 1px solid #555;
  padding: 10px;
  margin-bottom: 20px;
}
.keyperson-fieldset {
  padding: 20px;
}
.post-code-wrap {
  display: flex;
}
</style>
