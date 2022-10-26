<template>
  <div class="diary">
    <h2 class="diary__ttl">日誌</h2>
    <div class="diary__content box-shadow">
      <validation-observer v-slot="{ invalid }">
        <table class="diary__tbl">
          <tr>
            <th>日付</th>
            <td>{{ $dayjs(contact_book.date).format("YYYY年MM月DD日（ddd）") }}</td>
          </tr>
          <tr>
            <th>名前</th>
            <td>{{ contact_book.care_receiver_name }}</td>
          </tr>
          <tr>
            <th>ご家庭での状況</th>
            <td>{{ contact_book.situation_at_home }}</td>
          </tr>
          <tr>
            <th>
              体温
              <span class="required__lbl">必須</span>
            </th>
            <td>
              <validation-provider v-slot="{ errors }" rules="required|min_value:30.0|max_value:40.0|body_temperature">
                <div class="body-temperature-input__wrap">
                  <input type="number" id="body_temperature" class="input body-temperature__input"
                    v-model="contact_book.body_temperature" step="0.1" placeholder="36.0" required>
                </div>
                <div class="error">{{ errors[0] }}</div>
              </validation-provider>
            </td>
          </tr>
          <tr>
            <th>
              血圧（上）
              <span class="required__lbl">必須</span>
            </th>
            <td>
              <validation-provider v-slot="{ errors }" rules="required|numeric|digits:3">
                <div class="blood-pressure__wrap">
                  <input type="number" id="blood_pressure" class="input blood-pressure__input"
                    v-model="contact_book.systonic_blood_pressure" placeholder="120" required>
                </div>
                <div class="error">{{ errors[0] }}</div>
              </validation-provider>
            </td>
          </tr>
          <tr>
            <th>
              血圧（下）
              <span class="required__lbl">必須</span>
            </th>
            <td>
              <validation-provider v-slot="{ errors }" rules="required|numeric|digits:3">
                <div class="blood-pressure__wrap">
                  <input type="number" id="blood_pressure" class="input blood-pressure__input"
                    v-model="contact_book.diastolic_blood_pressure" placeholder="80" required>
                </div>
                <div class="error">{{ errors[0] }}</div>
              </validation-provider>
            </td>
          </tr>
          <tr>
            <th>
              脈拍
              <span class="required__lbl">必須</span>
            </th>
            <td>
              <validation-provider v-slot="{ errors }" rules="required">
                <div class="pulse-input__wrap">
                  <input type="number" id="pulse" class="input pulse__input" v-model="contact_book.pulse" placeholder="70"
                    required>
                </div>
                <div class="error">{{ errors[0] }}</div>
              </validation-provider>
            </td>
          </tr>
          <tr>
            <th>
              食事量（主食）
              <span class="required__lbl">必須</span>
            </th>
            <td>
              <ul class="food-amount__list">
                <validation-provider v-slot="{ errors }" rules="required|numeric|between:0,10">
                  <div class="staple_food-input__wrap">
                    <input type="number" id="staple_food" class="input staple-food__input" v-model="contact_book.staple_food"
                      placeholder="10" required>
                  </div>
                  <div class="error">{{ errors[0] }}</div>
                </validation-provider>
              </ul>
            </td>
          </tr>
          <tr>
            <th>
              食事量（副食）
              <span class="required__lbl">必須</span>
            </th>
            <td>
              <validation-provider v-slot="{ errors }" rules="required|numeric|between:0,10">
                <div class="side_dish-input__wrap">
                  <input type="number" id="side_dish" class="input side-dish__input" v-model="contact_book.side_dish" placeholder="10"
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
                  <input type="checkbox" id="strength_training" v-model="contact_book.strength_training">
                  <label for="strength_training">筋力トレーニング（上肢・下肢・体幹）</label>
                </li>
                <li>
                  <input type="checkbox" id="stand_up_practice" v-model="contact_book.stand_up_practice">
                  <label for="stand_up_practice">立ち上がり練習</label>
                </li>
                <li>
                  <input type="checkbox" id="stretch" v-model="contact_book.stretch">
                  <label for="stretch">ストレッチ</label>
                </li>
                <li>
                  <input type="checkbox" id="thermotherapy" v-model="contact_book.thermotherapy">
                  <label for="thermotherapy">温熱療法</label>
                </li>
                <li>
                  <input type="checkbox" id="bicycle_exercise" v-model="contact_book.bicycle_exercise">
                  <label for="bicycle_exercise">自転車運動</label>
                </li>
                <li>
                  <input type="checkbox" id="walking_practice" v-model="contact_book.walking_practice">
                  <label for="walking_practice">歩行練習</label>
                </li>
                <li>
                  <input type="checkbox" id="others" v-model="contact_book.others">
                  <label for="others">その他</label>
                  <input type="text" class="input" v-model="contact_book.others_detail">
                </li>
                <li>
                  <input type="checkbox" id="rehabilitation_plan">
                  <label for="rehabilitation_plan">リハビリ計画書</label>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <th>レクリエーション</th>
            <td>
            </td>
          </tr>
          <tr>
            <th>特記事項</th>
            <td>
              <validation-provider v-slot="{ errors }" rules="max:255">
                <label for="special_notes" class="form__item-lbl"></label>
                <textarea id="special_notes" class="special-notes" v-model="contact_book.special_notes"></textarea>
                <div class="error">{{ errors[0] }}</div>
              </validation-provider>
            </td>
          </tr>
          <tr>
            <th>
              記入者
              <span class="required__lbl">必須</span>
            </th>
            <td>
              <validation-provider v-slot="{ errors }" rules="required|max:255">
                <input type="text" class="input" placeholder="佐藤">
                <div class="error">{{ errors[0] }}</div>
              </validation-provider>
            </td>
          </tr>
        </table>
        <button class="btn confirm__btn" :disabled="invalid">
          入力内容確認
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
      contact_book: {
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
        recreation: false,
        special_notes: null,
        entry_person: null
      }
    }
  },
  created() {
    this.contact_book.care_receiver_id = this.$route.query.care_receiver_id;
    this.contact_book.care_receiver_name = this.$route.query.care_receiver_name;
  }
}
</script>

<style scoped>
.diary {
  margin: 20px auto 50px;
  width: 600px;
}
.special-notes {
  resize: none;
  width: 95%;
  height: 100px;
  padding: 10px;
  font-size: 16px;
}
.body-temperature__wrap {
  display: flex;
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
.staple-food__input,
.side-dish__input{
  width: 30%;
}
.blood-pressure__input {
  width: 90%;
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
.blood-pressure__wrap,
.food-amount__wrap {
  display: flex;
  align-items: center;
}

.staple-food__wrap,
.side_dish__wrap {
  display: flex;
  align-items: center;
  margin-left: 30px;
}
.staple-food__input-wrap,
.side-dish__input-wrap {
  margin-left: 10px;
}
.staple-food__input-wrap::after,
.side-dish__input-wrap::after {
  content: ' 割';
}

.staple-food__input,
.side-dish__input {
  margin-left: 10px;
}
.form__item-lbl {
  vertical-align: center;
}
li {
  list-style: none;
}
.rehabilitation__lst li{
  margin-bottom: 15px;
}
.diary__tbl th {
  text-align: left;
  vertical-align: top;
  height: 80px;
}
</style>