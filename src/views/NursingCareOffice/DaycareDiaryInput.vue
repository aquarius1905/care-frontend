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
              リハビリ内容
              <span class="required__lbl">必須</span>
            </th>
            <td>
              <ul class="rehabilitation__lst">
                <li>
                  <input type="checkbox" id="strength_training" v-model="diary.strength_training">
                  <label for="strength_training">筋力トレーニング（上肢・下肢・体幹）</label>
                </li>
                <li>
                  <input type="checkbox" id="stand_up_practice" v-model="diary.stand_up_practice">
                  <label for="stand_up_practice">立ち上がり練習</label>
                </li>
                <li>
                  <input type="checkbox" id="stretch" v-model="diary.stretch">
                  <label for="stretch">ストレッチ</label>
                </li>
                <li>
                  <input type="checkbox" id="thermotherapy" v-model="diary.thermotherapy">
                  <label for="thermotherapy">温熱療法</label>
                </li>
                <li>
                  <input type="checkbox" id="bicycle_exercise" v-model="diary.bicycle_exercise">
                  <label for="bicycle_exercise">自転車運動</label>
                </li>
                <li>
                  <input type="checkbox" id="walking_practice" v-model="diary.walking_practice">
                  <label for="walking_practice">歩行練習</label>
                </li>
                <li>
                  <input type="checkbox" id="others" v-model="diary.others">
                  <label for="others">その他</label>
                  <input type="text" class="input" v-model="diary.others_detail">
                </li>
                <li>
                  <input type="checkbox" id="rehabilitation_plan">
                  <label for="rehabilitation_plan">リハビリ計画書</label>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <th>
              レクリエーション
              <span class="required__lbl">必須</span>
            </th>
            <td>
              <label class="radio__lbl">
                <input type="radio" name="recreation" value="0" v-model="diary.recreation">未実施
              </label>
              <label class="radio__lbl">
                <input type="radio" name="recreation" value="1" v-model="diary.recreation">実施
              </label>
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
export default {
  data() {
    return {
      diary: {
        care_receiver_id: null,
        care_receiver_name: null,
        date: dayjs().format('YYYY-MM-DD'),
        situation_at_home: 'ー',
        body_temperature: null,
        systonic_blood_pressure: null,
        diastolic_blood_pressure: null,
        pulse: null,
        staple_food: null,
        side_dish: null,
        strength_training: false,
        stretch: false,
        stand_up_practice: false,
        thermotherapy: false,
        bicycle_exercise: false,
        walking_practice: false,
        others: false,
        others_detail: '',
        rehabilitation_plan: false,
        recreation: 0,
        special_notes: null,
        entry_person: null
      }
    }
  },
  methods: {
    register() {
      console.log(this.diary);
    }
  },
  created() {
    this.diary.care_receiver_id = this.$route.query.care_receiver_id;
    this.diary.care_receiver_name = this.$route.query.care_receiver_name;
  }
}
</script>

<style scoped>
.diary {
  margin: 20px auto 50px;
  width: 600px;
}

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

.special-notes {
  resize: none;
  width: 95%;
  height: 100px;
  padding: 10px;
  font-size: 16px;
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

.staple-food__wrap,
.side_dish__wrap {
  display: flex;
  align-items: center;
  margin-left: 30px;
}

li {
  list-style: none;
}

.rehabilitation__lst li {
  margin-bottom: 15px;
}

.radio__lbl {
  margin-right: 20px;
}
</style>