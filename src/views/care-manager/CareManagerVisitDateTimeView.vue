<template>
  <div>
    <div class="form box-shadow">
      <h2 class="form-ttl">訪問日時登録・確認・変更</h2>
      <validation-observer v-slot="{ invalid }">
        <div class="form-content">
          <div class="form-item">
            <label class="form-item-lbl">氏名</label>
            <label class="">{{ care_receiver.name }}</label>
          </div>
          <div class="form-item">
            <validation-provider v-slot="{ errors }" rules="required">
              <label class="form-item-lbl" for="visit_date">訪問日</label>
              <vue-datepicker 
              id="visit_date" :language="ja" 
              :disabled-dates="disabledDates" 
              format="yyyy/MM/dd" 
              v-model="date">
              </vue-datepicker>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form-item">
            <validation-provider v-slot="{ errors }" rules="required">
              <label class="form-item-lbl" for="visit_time">時間</label>
              <div class="time-picker">
                <vue-timepicker 
                  id="visit_time" 
                  hour-label="時" 
                  minute-label="分"
                  :hour-range="[[9, 18]]" 
                  :minute-interval="30" 
                  hide-disabled-hours 
                  hide-clear-button 
                  advanced-keyboard 
                  manual-input 
                  :format="time_format"
                  v-model="time">
                </vue-timepicker>
              </div>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
        </div>
        <div class="form-btn-wrap form-confrim-btn-wrap">
          <button class="btn" @click="register" :disabled="invalid">登録</button>
        </div>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Datepicker from 'vuejs-datepicker';
import { ja } from 'vuejs-datepicker/dist/locale';
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue'
export default {
  components: {
    'vue-timepicker': VueTimepicker,
    'vue-datepicker': Datepicker
  },
  data() {
    return {
      care_receiver: null,
      date: null,
      time: null,
      time_format: 'HH:mm',
      ja: ja,
      disabledDates: {
        to: null
      },
    }
  },
  methods: {
    initialize() {
      this.care_receiver = this.$route.query.care_receiver;

      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      this.disabledDates.to = tomorrow;

      const visit_datetime = this.care_receiver.visit_datetime;
      if (visit_datetime) {
        this.date = visit_datetime.date;
        //修正が必要
        this.time = '14:00';
      } else {
        this.date = tomorrow;
        this.time = '14:00'
      }
    },
    async register() {
      if (confirm("訪問日時を登録しますか？")) {
        const visit_datetime = this.makeVisitData();
        axios.defaults.headers.common['Authorization']
          = 'Bearer ' + this.$store.getters.getCareManagerAccessToken;
        const response = await axios.post(
          `${process.env.VUE_APP_API_ORIGIN}/care-managers/visit`,
          visit_datetime
        );
        
        if (response.status === 201) {
          axios.defaults.headers.common['Authorization'] = null;
          this.care_receiver.visit_datetime = visit_datetime;
          this.$router.push({
              name: 'CareReceiverDetail',
              query: { care_receiver: this.care_receiver }
            });
        }
      }
    },
    makeVisitData() {
      let visit_datetime = {};
      visit_datetime.care_receiver_id = this.care_receiver.id;
      visit_datetime.date = this.date;
      visit_datetime.time = this.time;
      return visit_datetime;
    }
  },
  created() {
    this.initialize();
  }
}
</script>

<style scoped>
.form {
  width: 500px;
}
    .time-picker >>> .vue__time-picker .dropdown ul li:not([disabled]).active,
    .time-picker >>> .vue__time-picker .dropdown ul li:not([disabled]).active:focus,
    .time-picker >>> .vue__time-picker .dropdown ul li:not([disabled]).active:hover {
        background: #1A237E;
    }
</style>
<style>
.vue__time-picker {
  display: inline-block;
  position: relative;
  font-size: 18px;
  width: 100%;
  height: 48px;
  vertical-align: middle;
}
.vue__time-picker__calendar {
  width: 100% !important;
}
.vue__time-picker input.display-time {
  border: 1px solid #ddd;
  background-color: #eee;
  border-radius: 6px;
  width: 100%;
  height: 48px;
  padding: 10px;
  font-size: 1em;
}
.vdp-datepicker {
  width: 100%;
  height: 48px;
}
.vdp-datepicker__calendar {
  width: 100% !important;
}
.vdp-datepicker div input {
  border: 1px solid #ddd;
  background-color: #eee;
  border-radius: 6px;
  font-size: 18px;
  padding: 10px;
  width: 100%;
  height: 100%;
}
.vdp-datepicker__calendar .cell.selected:hover {
  background: #1A237E;
}
.vue__time-picker .dropdown,
.vue__time-picker .dropdown .select-list {
  width: 100%;
  height: auto;
}
</style>
