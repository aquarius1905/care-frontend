<template>
  <div>
    <div class="form box-shadow">
      <h2 class="form-ttl">訪問日時{{ registered_flg ? "確認・変更": "登録" }}</h2>
      <validation-observer v-slot="{ invalid }">
        <div class="form-content">
          <div class="form-item">
            <label class="form-item-lbl">氏名</label>
            <label class="">{{ care_receiver.name }}</label>
          </div>
          <div class="form-item">
            <validation-provider v-slot="{ errors }" rules="required">
              <label class="form-item-lbl" for="visit_date">訪問日</label>
              <input type="date" id="visit_date" class="input" v-model="visit_datetime.date" :min="tomorrow" required>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form-item">
            <validation-provider v-slot="{ errors }" rules="required">
              <label class="form-item-lbl" for="visit_time">時間</label>
              <select id="visit_time" class="select time-select" v-model="visit_datetime.time">
                <option v-for="(time, index) of times" :value="time" :key="index">{{ time }}</option>
              </select>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
        </div>
        <div class="form-btn-wrap form-confirm-btn-wrap">
          <button class="btn register-btn" @click="update" :disabled="invalid" v-if="registered_flg">更新</button>
          <button class="btn update-btn" @click="register" :disabled="invalid" v-else>登録</button>
        </div>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from 'dayjs';
export default {
  data() {
    return {
      care_receiver: null,
      visit_datetime: {
        care_receiver_id: null,
        date: null,
        time: null
      },
      times: [],
      tomorrow: null,
      registered_flg: false
    }
  },
  methods: {
    initialize() {
      this.care_receiver = this.$route.query.care_receiver;
      this.visit_datetime.care_receiver_id = this.care_receiver.id;
      this.registered_flg = this.$route.query.registered_flg;

      this.setTomorrow();
      this.setTimes();

      const visit_datetime = this.care_receiver.visit_datetime;
      if (visit_datetime) {
        this.visit_datetime.date = dayjs(visit_datetime.date).format('YYYY-MM-DD');
        this.visit_datetime.time = dayjs(visit_datetime.time).format('HH:mm');
      } else {
        this.visit_datetime.date = this.tomorrow;
        this.visit_datetime.time = '14:00';
      }
    },
    setTomorrow() {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      this.tomorrow = dayjs(tomorrow).format('YYYY-MM-DD');
    },
    setTimes() {
      for (let h = 9; h <= 18; h++) {
        this.times.push(h + ':' + '00');
        this.times.push(h + ':' + '30');
      }
    },
    async register() {
      if (confirm("訪問日時を登録しますか？")) {
        axios.defaults.headers.common['Authorization']
          = 'Bearer ' + this.$store.getters.getCareManagerAccessToken;
        const response = await axios.post(
          `${process.env.VUE_APP_API_ORIGIN}/care-managers/visit`,
          this.visit_datetime
        );
        
        if (response.status === 201) {
          axios.defaults.headers.common['Authorization'] = null;
          this.care_receiver.visit_datetime = this.visit_datetime;
          this.$router.push({
              name: 'CareReceiverDetail',
              query: { care_receiver: this.care_receiver }
            });
        }
      }
    },
    update() {
      if (confirm("訪問日時を登録しますか？")) {
        console.log("更新");
      }
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
.time-select {
  font-size: 20px;
  padding: 0 5px;
}
</style>
