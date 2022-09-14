<template>
  <div>
    <h2 class="page-ttl">被介護者 登録</h2>
    <div class="form box-shadow">
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
                <validation-provider v-slot="{ errors }" rules="required|max:127|full_sized_katakana" name="セイ">
                  <label for="last_name_furigana" class="form-item-lbl">セイ</label>
                  <input type="text" id="last_name_furigana" class="name-input"
                    v-model="care_receiver.last_name_furigana" placeholder="ヤマダ" required>
                  <div class="error">{{ errors[0] }}</div>
                </validation-provider>
              </div>
              <div class="form-item-name-wrap">
                <validation-provider v-slot="{ errors }" rules="required|max:127|full_sized_katakana" name="メイ">
                  <label for="first_name_furigana" class="form-item-lbl">メイ</label>
                  <input type="text" id="first_name_furigana" class="name-input"
                    v-model="care_receiver.first_name_furigana" placeholder="タロウ" required>
                  <div class="error">{{ errors[0] }}</div>
                </validation-provider>
              </div>
            </div>
          </div>
          <div class="form-item">
            <validation-provider v-slot="{ errors }" rules="required">
              <label class="form-item-lbl" for="gender">性別</label>
              <input type="radio" name="gender" id="male" value="1" v-model="care_receiver.gender">
              <label for="male" class="gender-lbl">男</label>
              <input type="radio" name="gender" id="female" value="2" v-model="care_receiver.gender">
              <label for="female" class="gender-lbl">女</label>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form-item">
            <validation-provider v-slot="{ errors }" rules="required">
              <label class="form-item-lbl" for="birthday">生年月日</label>
              <input type="date" id="birthday" class="input" v-model="care_receiver.birthday" min="1900-01-01"
                max="1970-01-01" required>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form-item">
            <validation-provider v-slot="{ errors }" rules="required|numeric|length:7">
              <label class="form-item-lbl" for="post_code">郵便番号</label>
              <div class="flex">
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
              <legend class="form-item-lbl legend-lbl">介護度</legend>
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
        <div class="form-btn-wrap form-confirm-btn-wrap">
          <button class="btn next__btn" @click="next()" :disabled="invalid">次へ</button>
        </div>
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
        gender: 1,
        birthday: "1940-01-01",
        post_code: null,
        address: null,
        insurer_number: null,
        insured_number: null,
        care_level: {
          id: 0,
          name: null
        }
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
        plugin.fetchAddress(this.care_receiver.post_code);
    },
    next() {
      this.$router.push({
        name: 'KeyPersonRegistration',
        query: { care_receiver: this.care_receiver, key_person: null }
      });
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
    }
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
.gender-lbl {
  display: inline-block;
  margin-right: 20px;
}

.keyperson-fieldset {
  padding: 20px;
}
</style>
