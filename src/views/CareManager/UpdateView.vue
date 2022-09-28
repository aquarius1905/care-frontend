<template>
  <div class="update">
    <h2 class="update__ttl">登録情報確認・更新</h2>
    <div class="update__form">
      <validation-observer v-slot="{ invalid }">
        <div class="form__info box-shadow">
          <div class="form__item">
            <div class="form__item-wrap">
              <div class="form__item-name-wrap">
                <validation-provider v-slot="{ errors }" rules="required|max:127">
                  <label for="last_name" class="form__item-lbl">姓</label>
                  <input type="text" id="last_name" class="name-input" v-model="care_manager.last_name" name="姓"
                    placeholder="山田" required>
                  <div class="error">{{ errors[0] }}</div>
                </validation-provider>
              </div>
              <div class="form__item-name-wrap">
                <validation-provider v-slot="{ errors }" rules="required|max:127">
                  <label for="first_name" class="form__item-lbl">名</label>
                  <input type="text" id="first_name" class="name-input" v-model="care_manager.first_name" name="名"
                    placeholder="太郎" required>
                  <div class="error">{{ errors[0] }}</div>
                </validation-provider>
              </div>
            </div>
          </div>
          <div class="form__item">
            <div class="form__item-wrap">
              <div class="form__item-name-wrap">
                <validation-provider v-slot="{ errors }" rules="required|full_sized_katakana|max:127" name="セイ">
                  <label for="last_name_furigana" class="form__item-lbl">セイ</label>
                  <input type="text" id="last_name_furigana" class="name-input"
                    v-model="care_manager.last_name_furigana" placeholder="ヤマダ" required>
                  <div class="error">{{ errors[0] }}</div>
                </validation-provider>
              </div>
              <div class="form__item-name-wrap">
                <validation-provider v-slot="{ errors }" rules="required|full_sized_katakana|max:127" name="メイ">
                  <label for="first_name_furigana" class="form__item-lbl">メイ</label>
                  <input type="text" id="first_name_furigana" class="name-input"
                    v-model="care_manager.first_name_furigana" placeholder="タロウ" required>
                  <div class="error">{{ errors[0] }}</div>
                </validation-provider>
              </div>
            </div>
          </div>
          <div class="form__item">
            <validation-provider v-slot="{ errors }" rules="required|length:8">
              <label class="form__item-lbl" for="registration_number">介護支援専門員登録番号</label>
              <input type="text" id="registration_number" class="input" v-model="care_manager.registration_number"
                placeholder="13000000" required>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form__item">
            <validation-provider v-slot="{ errors }" rules="required|email">
              <label class="form__item-lbl" for="email">メールアドレス</label>
              <input type="email" id="email" class="input" v-model="care_manager.email"
                placeholder="taro_yamada@sample.com" required>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form__item">
            <validation-provider v-slot="{ errors }" rules="required|min:10|max:11">
              <label class="form__item-lbl" for="tel">電話番号</label>
              <input type="text" id="tel" class="input" v-model="care_manager.tel" placeholder="09012345678" required>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
        </div>
        <button class="btn confirm__btn" @click="confirmUpdate" :disabled="invalid">更新内容確認</button>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'hasSupportOffices',
      'hasCareManager'
    ]),
    ...mapGetters({
      support_offices: 'getSupportOffices',
      care_manager: 'getCareManager'
    })
  },
  methods: {
    confirmUpdate() {
      this.$router.push({
        name: 'CareManagerUpdateConfirm',
        query: { care_manager: this.care_manager }
      });
    },
    async getCareManagerInfo() {
      if (!this.hasCareManager) {
        await this.$store.dispatch("fetchCareManagerInfo");
      }
      
      this.splitName();
    },
    splitName() {
      const care_manager_name_arr = this.care_manager.name.split(/\u3000/);
      this.care_manager.last_name = care_manager_name_arr[0];
      this.care_manager.first_name = care_manager_name_arr[1];

      const care_manager_name_furigana_arr = this.care_manager.name_furigana.split(/\u3000/);
      this.care_manager.last_name_furigana = care_manager_name_furigana_arr[0];
      this.care_manager.first_name_furigana = care_manager_name_furigana_arr[1];
    },
    initialize() {
      if (this.$route.query.care_manager === null) {
        this.getCareManagerInfo();
      } else {
        this.care_manager = this.$route.query.care_manager
      }
    }
  },
  created() {
    this.initialize();
  }
}
</script>
