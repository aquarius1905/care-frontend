<template>
  <div>
    <div class="form box-shadow">
      <h2 class="form-ttl">被介護者・キーパーソン 更新</h2>
      <validation-observer v-slot="{ invalid }">
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
                <validation-provider v-slot="{ errors }" rules="required|max:127|full_sized_katakana">
                  <label for="last_name_furigana" class="form-item-lbl">セイ</label>
                  <input type="text" id="last_name_furigana" class="name-input"
                    v-model="care_receiver.last_name_furigana" placeholder="ヤマダ" required>
                  <div class="error">{{ errors[0] }}</div>
                </validation-provider>
              </div>
              <div class="form-item-name-wrap">
                <validation-provider v-slot="{ errors }" rules="required|max:127|full_sized_katakana">
                  <label for="first_name_furigana" class="form-item-lbl">メイ</label>
                  <input type="text" id="first_name_furigana" class="name-input"
                    v-model="care_receiver.first_name_furigana" placeholder="タロウ" required>
                  <div class="error">{{ errors[0] }}</div>
                </validation-provider>
              </div>
            </div>
          </div>
          <div class="form-item">
            <label class="form-item-lbl">性別</label>
            <label>{{ care_receiver.gender === 1 ? "男" : "女" }}</label>
          </div>
          <div class="form-item">
            <label class="form-item-lbl" for="birthday">生年月日</label>
            <label>{{ $dayjs(care_receiver.birthday).format('YYYY/MM/DD') }}</label>
          </div>
          <div class="form-item">
            <validation-provider v-slot="{ errors }" rules="required|numeric|length:7">
              <label class="form-item-lbl" for="post_code">郵便番号</label>
              <div class="post-code-wrap">
                <input type="text" id="post_code" class="input" v-model="care_receiver.post_code" placeholder="1050004"
                  @blur="fetchAddress" required>
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
            <validation-provider v-slot="{ errors }" rules="required|numeric|min:6|max:8">
              <label class="form-item-lbl" for="insurer_number">保険者番号</label>
              <input type="text" id="insurer_number" class="input" v-model="care_receiver.insurer_number"
                placeholder="39130000" required>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form-item">
            <validation-provider v-slot="{ errors }" rules="required|numeric|length:11">
              <label class="form-item-lbl" for="insured_number">被保険者番号</label>
              <input type="text" id="insured_number" class="input" v-model="care_receiver.insured_number"
                placeholder="12345678901" required>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form-item">
            <fieldset class="fieldset">
              <legend class="form-item-lbl">介護度</legend>
              <div class="care_level_wrap">
                <ul class="care_level_lst">
                  <li v-for="needed_support_level in needed_support_levels" :key="needed_support_level.id">
                    <input type="radio" name="care_level" :id="needed_support_level.name" :value="needed_support_level"
                      v-model="care_receiver.care_level">
                    <label class="care-level-lbl" :for="needed_support_level.name">{{ needed_support_level.name
                    }}</label>
                  </li>
                </ul>
              </div>
              <div class="care_level_wrap">
                <ul class="care_level_lst">
                  <li v-for="needed_care_level in needed_care_levels" :key="needed_care_level.id">
                    <input type="radio" name="care_level" :id="needed_care_level.name" :value="needed_care_level"
                      v-model="care_receiver.care_level">
                    <label class="care-level-lbl" :for="needed_care_level.name">{{ needed_care_level.name }}</label>
                  </li>
                </ul>
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
            </fieldset>
          </div>
        </div>
        <div class="form-btn-wrap form-confrim-btn-wrap">
          <button class="btn" @click="confirmUpdate()" :disabled="invalid">更新内容確認</button>
        </div>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from 'dayjs';
const jsonpAdapter = require('axios-jsonp')
export default {
  data() {
    return {
      support_offices: null,
      needed_support_levels: null,
      needed_care_levels: null,
      care_receiver: null,
      key_person: null
    }
  },
  methods: {
    async fetchAddress() {
      const { data } = await axios
        .get(`https://api.zipaddress.net/?zipcode=${this.care_receiver.post_code}`, { adapter: jsonpAdapter });
      this.care_receiver.address = data.fullAddress;
    },
    confirmUpdate() {
      this.$router.push({
        name: 'CareReceiverUpdateConfirmation',
        query: { care_receiver: this.care_receiver, key_person: this.key_person }
      });
    },
    async getCareLevels() {
      if (!this.$store.getters.hasCareLevels) {
        await this.$store.dispatch("fetchCareLevels");
      }
      const care_levels = this.$store.getters.getCareLevels;
      this.needed_support_levels = care_levels.slice(0, 2);
      this.needed_care_levels = care_levels.slice(2);
    },
    initialize() {
      this.getCareLevels();
      
      this.care_receiver = this.$route.query.care_receiver;
      const care_receiver_name_arr = this.care_receiver.name.split(/\u3000/);
      this.care_receiver['last_name'] = care_receiver_name_arr[0];
      this.care_receiver['first_name'] = care_receiver_name_arr[1];

      const care_receiver_furigana_arr = this.care_receiver.name_furigana.split(/\u3000/);
      this.care_receiver['last_name_furigana'] = care_receiver_furigana_arr[0];
      this.care_receiver['first_name_furigana'] = care_receiver_furigana_arr[1];

      this.key_person = this.$route.query.care_receiver.key_person;
      const key_person_name_arr = this.key_person.name.split(/\u3000/);
      this.key_person['last_name'] = key_person_name_arr[0];
      this.key_person['first_name'] = key_person_name_arr[1];

      const key_person_furigana_arr = this.key_person.name_furigana.split(/\u3000/);
      this.key_person['last_name_furigana'] = key_person_furigana_arr[0];
      this.key_person['first_name_furigana'] = key_person_furigana_arr[1];

      this.care_receiver.birthday = dayjs(this.care_receiver.birthday).format('YYYY-MM-DD');
    }
  },
  created() {
    this.initialize();
  }
}
</script>
<style scoped>
.care_level_wrap {
  margin-bottom: 20px
}
.care_level_lst {
  list-style: none;
  display: flex;
}
.care-level-lbl {
  display: inline-block;
  margin-right: 10px;
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
