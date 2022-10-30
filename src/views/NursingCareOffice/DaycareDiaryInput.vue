<template>
  <div class="diary">
    <h2 class="diary__ttl">日誌</h2>
    <div class="diary__content box-shadow">
      <validation-observer v-slot="{ invalid }">
        <table class="diary-input__form">
          <tr>
            <th>日付</th>
            <td>{{ $dayjs(diary.date).format("YYYY年MM月DD日（ddd）") }}</td>
          </tr>
          <tr>
            <th>名前</th>
            <td><span class="name">{{ diary.care_receiver_name }}</span>様</td>
          </tr>
          <tr>
            <th>ご家庭での状況</th>
            <td>{{ diary.situation_at_home }}</td>
          </tr>
          <tr>
            <th>
              <label for="body_temperature">
                体温
                <span class="required__lbl">必須</span>
              </label>
            </th>
            <td>
              <validation-provider v-slot="{ errors }" rules="required|min_value:30.0|max_value:40.0|body_temperature">
                <div class="body-temperature-input__wrap">
                  <input type="number" id="body_temperature" class="input body-temperature__input"
                    v-model="diary.body_temperature" step="0.1" placeholder="36.0" required>
                </div>
                <div class="error">{{ errors[0] }}</div>
              </validation-provider>
            </td>
          </tr>
          <tr>
            <th>
              <label for="systonic_blood_pressure">
                血圧（上）
              </label>
              <span class="required__lbl">必須</span>
            </th>
            <td>
              <validation-provider v-slot="{ errors }" rules="required|integer|min_value:0|max_value:999">
                <div class="blood-pressure__wrap">
                  <input type="number" id="systonic_blood_pressure" class="input blood-pressure__input"
                    v-model="diary.systonic_blood_pressure" 
                    @input="event => value = event.target.value.replace(/[^0-9]/, '')"
                    placeholder="120" required>
                </div>
                <div class="error">{{ errors[0] }}</div>
              </validation-provider>
            </td>
          </tr>
          <tr>
            <th>
              <label for="diastolic_blood_pressure">
                血圧（下）
              </label>
              <span class="required__lbl">必須</span>
            </th>
            <td>
              <validation-provider v-slot="{ errors }" rules="required|integer|min_value:0|max_value:999">
                <div class="blood-pressure__wrap">
                  <input type="number" id="diastolic_blood_pressure" 
                    class="input blood-pressure__input"
                    v-model="diary.diastolic_blood_pressure" 
                    @input="event => value = event.target.value.replace(/[^0-9]/g, '')"
                    placeholder="80" required>
                </div>
                <div class="error">{{ errors[0] }}</div>
              </validation-provider>
            </td>
          </tr>
          <tr>
            <th>
              <label for="pulse">
                脈拍
                <span class="required__lbl">必須</span>
              </label>
            </th>
            <td>
              <validation-provider v-slot="{ errors }" rules="required|integer|min_value:0|max_value:200">
                <div class="pulse-input__wrap">
                  <input type="number" id="pulse" class="input pulse__input" v-model="diary.pulse" placeholder="70"

                    required>
                </div>
                <div class="error">{{ errors[0] }}</div>
              </validation-provider>
            </td>
          </tr>
          <tr>
            <th>
              <label for="staple_food">
                食事量（主食）
                <span class="required__lbl">必須</span>
              </label>
            </th>
            <td>
              <validation-provider v-slot="{ errors }" rules="required|integer|between:0,10">
                <div class="staple_food-input__wrap">
                  <input type="number" id="staple_food" class="input staple-food__input" v-model="diary.staple_food"
                    placeholder="10" required>
                </div>
                <div class="error">{{ errors[0] }}</div>
              </validation-provider>
            </td>
          </tr>
          <tr>
            <th>
              食事量（副食）
              <span class="required__lbl">必須</span>
            </th>
            <td>
              <validation-provider v-slot="{ errors }" rules="required|integer|between:0,10">
                <div class="side_dish-input__wrap">
                  <input type="number" id="side_dish" class="input side-dish__input" v-model="diary.side_dish" placeholder="10"
                    required>
                </div>
                <div class="error">{{ errors[0] }}</div>
              </validation-provider>
            </td>
          </tr>
          <tr>
            <th>
              レクリエーション
              <span class="required__lbl">必須</span>
            </th>
            <td>
              <validation-provider v-slot="{ errors }" rules="required">
                <label class="radio__lbl">
                  <input type="radio" name="recreation" value="0" v-model="diary.recreation">未実施
                </label>
                <label class="radio__lbl">
                  <input type="radio" name="recreation" value="1" v-model="diary.recreation">実施
                </label>
                <div class="error">{{ errors[0] }}</div>
              </validation-provider>
            </td>
          </tr>
          <tr>
            <th>
              リハビリ内容
              <span class="required__lbl">必須</span>
            </th>
            <td>
              <validation-provider v-slot="{ errors }" rules="required" name="リハビリ内容">
                <label v-for="(rehabilitation_content, index) in rehabilitation_contents" 
                :key="index"
                class="checkbox__lbl"
                :for="rehabilitation_content.name">
                  <input type="checkbox" :id="rehabilitation_content.name" v-model="diary.rehabilitations" :value="rehabilitation_content.id">
                  {{ rehabilitation_content.name }}
                </label>
                <input type="text" class="input" v-model="diary.others_detail">
                <div class="error">{{ errors[0] }}</div>
              </validation-provider>
            </td>
          </tr>
          <tr>
            <th>特記事項</th>
            <td>
              <validation-provider v-slot="{ errors }" rules="max:255">
                <label for="special_notes" class="form__item-lbl"></label>
                <textarea id="special_notes" class="special-notes" v-model="diary.special_notes"></textarea>
                <div class="error">{{ errors[0] }}</div>
              </validation-provider>
            </td>
          </tr>
          <tr>
            <th>
              <label for="entry_person">
                記入者
                <span class="required__lbl">必須</span>
              </label>
            </th>
            <td>
              <validation-provider v-slot="{ errors }" rules="required">
                <input type="text" id="entry_person" class="input" 
                v-model="diary.entry_person" placeholder="佐藤" required>
                <div class="error">{{ errors[0] }}</div>
              </validation-provider>
            </td>
          </tr>
        </table>
        <button class="btn registration__btn" :disabled="invalid" @click="register">
          登録
        </button>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import { mapGetters, mapActions } from 'vuex';
import { nursingCareOfficeAuthApi } from "@/plugins/axios";
export default {
  data() {
    return {
      diary: {
        weekly_service_schedule_id: 0,
        care_receiver_name: null,
        date: dayjs().format('YYYY-MM-DD'),
        situation_at_home: '',
        body_temperature: null,
        systonic_blood_pressure: null,
        diastolic_blood_pressure: null,
        pulse: null,
        staple_food: null,
        side_dish: null,
        rehabilitations: [],
        others_detail: '',
        recreation: 0,
        special_notes: null,
        entry_person: null
      },
      rehabilitation_contents: null
    }
  },
  computed: {
    ...mapGetters([
      'emptyRehabilitationContents',
      'getRehabilitationContents'
    ])
  },
  methods: {
    ...mapActions([
      'fetchRehabilitationContents',
    ]),
    async register() {
      if (!confirm("日誌を登録しますか？")) {
        return;
      }
      try {
        const response = await nursingCareOfficeAuthApi.post(
          '/daycare-diaries', this.diary
        );
        if (response.status === 201) {
          this.$router.push({
            name: 'DaycareDiaryCompleted',
            query: { msg: "日誌の登録が完了しました" }
          });
        }
      } catch (error) {
        console.log(error);
        alert("日誌の登録に失敗しました");
      }
    },
    async setRehabilitationContents() {
      if (this.emptyRehabilitationContents) {
        await this.fetchRehabilitationContents();
      }

      this.rehabilitation_contents = this.getRehabilitationContents;
    }
  },
  async created() {
    this.diary.weekly_service_schedule_id = this.$route.query.weekly_service_schedule_id;
    this.diary.care_receiver_name = this.$route.query.care_receiver_name;
    await this.setRehabilitationContents();
  }
}
</script>

<style scoped>
.diary-input__form {
  width: 100%;
  border-collapse: collapse;
}

.diary-input__form th {
  text-align: left;
  vertical-align: middle;
  width: 35%;
}

.diary-input__form td {
  width: 65%;
  height: 80px;
  vertical-align: middle;
}

.body-temperature-input__wrap {
  display: flex;
  align-items: center;
}

.body-temperature-input__wrap::after {
  content: "℃";
  font-size: 16px;
}

.body-temperature__input,
.pulse__input,
.blood-pressure__input,
.staple-food__input,
.side-dish__input{
  width: 30%;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  margin: 0;
  -webkit-appearance: none;
  appearance: none;
}

input[type="number"] {
  -moz-appearance: textfield;
  appearance: none;
  margin-right: 10px;
}

input[type="radio"] {
  height: 40px;
}

.blood-pressure__wrap::after {
  content: "mmHg";
  font-size: 16px;
}
.pulse-input__wrap::after {
  content: "回/分";
  font-size: 16px;
}
.staple_food-input__wrap::after,
.side_dish-input__wrap::after {
  content: "割";
  font-size: 16px;
}
.body-temerature__wrap,
.blood-pressure__wrap {
  display: flex;
  align-items: center;
}

.checkbox__lbl {
  display: block;
  margin-bottom: 10px;
}
.radio__lbl {
  margin-right: 20px;
}

.registration__btn {
  width: 100%;
}
</style>