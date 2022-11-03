<template>
  <div class="update">
    <h2 class="update__ttl">被介護者・キーパーソン 更新</h2>
    <div class="update__form">
      <validation-observer v-slot="{ invalid }">
        <div class="form__info box-shadow">
          <div class="care-receiver__info">
            <h3 class="form__ttl">被介護者情報</h3>
            <div class="form__item">
              <div class="form__item-wrap">
                <div class="form__item-name-wrap">
                  <validation-provider v-slot="{ errors }" rules="required|max:127">
                    <label for="last_name" class="form__item-lbl">
                      姓
                      <span class="required__lbl">必須</span>
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
                      <span class="required__lbl">必須</span>
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
                  <validation-provider v-slot="{ errors }" rules="required|max:127|full_sized_katakana">
                    <label for="last_name_furigana" class="form__item-lbl">
                      セイ
                      <span class="required__lbl">必須</span>
                    </label>
                    <input type="text" id="last_name_furigana" class="name-input"
                      v-model="care_receiver.last_name_furigana" placeholder="ヤマダ" required>
                    <div class="error">{{ errors[0] }}</div>
                  </validation-provider>
                </div>
                <div class="form__item-name-wrap">
                  <validation-provider v-slot="{ errors }" rules="required|max:127|full_sized_katakana">
                    <label for="first_name_furigana" class="form__item-lbl">
                      メイ
                      <span class="required__lbl">必須</span>
                    </label>
                    <input type="text" id="first_name_furigana" class="name-input"
                      v-model="care_receiver.first_name_furigana" placeholder="タロウ" required>
                    <div class="error">{{ errors[0] }}</div>
                  </validation-provider>
                </div>
              </div>
            </div>
            <div class="form__item">
              <label class="form__item-lbl">性別</label>
              <label>{{ care_receiver.gender === 0 ? "男" : "女" }}</label>
            </div>
            <div class="form__item">
              <label class="form__item-lbl" for="birthday">生年月日</label>
              <label>{{ $dayjs(care_receiver.birthday).format('YYYY年MM月DD日') }}</label>
            </div>
            <div class="form__item">
              <validation-provider v-slot="{ errors }" rules="required|numeric|length:7">
                <label class="form__item-lbl" for="post_code">
                  郵便番号
                  <span class="required__lbl">必須</span>
                </label>
                <div class="flex">
                  <input type="text" id="post_code" class="input" v-model="care_receiver.post_code" placeholder="1050004"
                    @blur="fetchAddress" required>
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
                <input type="text" id="address" class="input" v-model="care_receiver.address" placeholder="東京都港区新橋5-6-7"
                  required>
                <div class="error">{{ errors[0] }}</div>
              </validation-provider>
            </div>
            <div class="form__item">
              <validation-provider v-slot="{ errors }" rules="required|numeric|insurer_number">
                <label class="form__item-lbl" for="insurer_number">
                  保険者番号
                  <span class="required__lbl">必須</span>
                </label>
                <input type="text" id="insurer_number" class="input" v-model="care_receiver.insurer_number"
                  placeholder="39130000" required>
                <div class="error">{{ errors[0] }}</div>
              </validation-provider>
            </div>
            <div class="form__item">
              <validation-provider v-slot="{ errors }" rules="required|numeric|length:10">
                <label class="form__item-lbl" for="insured_number">
                  介護保険 被保険者番号
                  <span class="required__lbl">必須</span>
                </label>
                <input type="text" id="insured_number" class="input" v-model="care_receiver.insured_number"
                  placeholder="12345678901" required>
                <div class="error">{{ errors[0] }}</div>
              </validation-provider>
            </div>
            <div class="form__item">
              <fieldset class="fieldset">
                <legend class="form__item-lbl">介護度</legend>
                <div class="care-level__wrap">
                  <ul class="care-level__lst">
                    <li v-for="needed_support_level in needed_support_levels" :key="needed_support_level.id">
                      <input type="radio" name="care_level" :id="needed_support_level.name" 
                      v-model="care_receiver.care_level_id" :value="needed_support_level.id">
                      <label class="radio-btn__lbl" :for="needed_support_level.name">{{ needed_support_level.name
                      }}</label>
                    </li>
                  </ul>
                </div>
                <div class="care-level__wrap">
                  <ul class="care-level__lst">
                    <li v-for="needed_care_level in needed_care_levels" :key="needed_care_level.id">
                      <input type="radio" name="care_level" :id="needed_care_level.name" 
                      v-model="care_receiver.care_level_id" :value="needed_care_level.id">
                      <label class="radio-btn__lbl" :for="needed_care_level.name">{{ needed_care_level.name }}</label>
                    </li>
                  </ul>
                </div>
              </fieldset>
            </div>
          </div>
          <div class="keyperson__info">
            <h3 class="form__ttl">キーパーソン情報</h3>
            <div class="form__item">
              <div class="form__item-wrap">
                <div class="form__item-name-wrap">
                  <validation-provider v-slot="{ errors }" rules="required|max:127">
                    <label for="last_name" class="form__item-lbl">
                      姓
                      <span class="required__lbl">必須</span>
                    </label>
                    <input type="text" id="last_name" class="name-input" v-model="care_receiver.keyperson_last_name" name="姓"
                      placeholder="山田">
                    <div class="error">{{ errors[0] }}</div>
                  </validation-provider>
                </div>
                <div class="form__item-name-wrap">
                  <validation-provider v-slot="{ errors }" rules="required|max:127">
                    <label for="first_name" class="form__item-lbl">
                      名
                      <span class="required__lbl">必須</span>
                    </label>
                    <input type="text" id="first_name" class="name-input" v-model="care_receiver.keyperson_first_name" name="名"
                      placeholder="太郎">
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
                      <span class="required__lbl">必須</span>
                    </label>
                    <input type="text" id="last_name_furigana" class="name-input" 
                    v-model="care_receiver.keyperson_last_name_furigana"
                      placeholder="ヤマダ" required>
                    <div class="error">{{ errors[0] }}</div>
                  </validation-provider>
                </div>
                <div class="form__item-name-wrap">
                  <validation-provider v-slot="{ errors }" rules="required|max:127|full_sized_katakana">
                    <label for="first_name_furigana" class="form__item-lbl">
                      メイ
                      <span class="required__lbl">必須</span>
                    </label>
                    <input type="text" id="first_name_furigana" class="name-input" v-model="care_receiver.keyperson_first_name_furigana"
                      placeholder="タロウ" required>
                    <div class="error">{{ errors[0] }}</div>
                  </validation-provider>
                </div>
              </div>
            </div>
            <div class="form__item">
              <validation-provider v-slot="{ errors }" rules="required|max:255">
                <label class="form__item-lbl" for="relationship">
                  続柄
                  <span class="required__lbl">必須</span>
                </label>
                <input type="text" id="relationship" class="input"
                v-model="care_receiver.relationship" placeholder="妻" required>
                <div class="error">{{ errors[0] }}</div>
              </validation-provider>
            </div>
            <div class="form__item">
              <validation-provider v-slot="{ errors }" rules="required|email">
                <label class="form__item-lbl" for="email">
                  メールアドレス
                  <span class="required__lbl">必須</span>
                </label>
                <input type="email" id="email" class="input"
                v-model="care_receiver.email" placeholder="taro_yamada@sample.com" required>
                <div class="error">{{ errors[0] }}</div>
              </validation-provider>
            </div>
            <div class="form__item">
              <validation-provider v-slot="{ errors }" rules="required|numeric|min:10|max:11">
                <label class="form__item-lbl" for="tel">
                  電話番号
                  <span class="required__lbl">必須</span>
                </label>
                <input type="text" id="tel" class="input" v-model="care_receiver.tel" placeholder="09012345678" required>
                <div class="error">{{ errors[0] }}</div>
              </validation-provider>
            </div>
          </div>
          <button class="btn update-info__btn" @click="update" :disabled="invalid">
            更新
          </button>
        </div>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import { careManagerAuthApi } from "@/plugins/axios";
import plugin from '@/plugins'
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      needed_support_levels: null,
      needed_care_levels: null,
      care_receiver: null
    }
  },
  computed: {
    ...mapGetters([
      'emptyCareLevels',
      'getNeededSupportLevels',
      'getNeededCareLevels',
    ])
  },
  methods: {
    ...mapActions([ 'fetchCareLevels' ]),
    async fetchAddress() {
      this.care_receiver.address = await
        plugin.fetchAddress(this.care_receiver.post_code);
    },
    async update() {
      if (!confirm('更新しますか？')) {
        return;
      }

      try {
        const send_data = plugin.makeCareReceiverData(
          this.care_receiver
        );

        const response = await careManagerAuthApi.put(
          '/care-receivers/' + this.care_receiver.id,
          send_data
        );

        if (response.status === 200) {
          this.$router.push({
            name: 'CareReceiverUpdateCompleted',
            query: { msg: "被介護者及びキーパーソンの登録情報を更新しました" }
          });
        }
      } catch (error) {
        alert("更新に失敗しました");
        console.log(error);
      }
    },
    async getCareLevels() {
      if (this.emptyCareLevels) {
        await this.fetchCareLevels();
      }

      this.needed_support_levels = this.getNeededSupportLevels;
      this.needed_care_levels = this.getNeededCareLevels;
    },
    async initialize() {
      await this.getCareLevels();
      this.initializeCareReceiverData();
    },
    initializeCareReceiverData() {
      this.care_receiver = this.$route.query.care_receiver;

      const name_arr = this.care_receiver.name.split(/\u3000/);
      this.care_receiver.last_name = name_arr[0];
      this.care_receiver.first_name = name_arr[1];

      const furigana_arr = this.care_receiver.name_furigana.split(/\u3000/);
      this.care_receiver.last_name_furigana = furigana_arr[0];
      this.care_receiver.first_name_furigana = furigana_arr[1];

      const keyperson_name_arr = this.care_receiver.keyperson_name.split(/\u3000/);
      this.care_receiver.keyperson_last_name = keyperson_name_arr[0];
      this.care_receiver.keyperson_first_name = keyperson_name_arr[1];

      const keyperson_furigana_arr = this.care_receiver.keyperson_name_furigana.split(/\u3000/);
      this.care_receiver.keyperson_last_name_furigana = keyperson_furigana_arr[0];
      this.care_receiver.keyperson_first_name_furigana = keyperson_furigana_arr[1];
    },
    makeSendData() {

    }
  },
  async created() {
    await this.initialize();
  }
}
</script>
<style scoped>

</style>