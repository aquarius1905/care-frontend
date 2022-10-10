<template>
  <div class="visit-datetime">
    <div class="visit-datetime__form box-shadow">
      <h2 class="form__ttl">訪問日時{{ registered_flg ? "確認・変更": "登録" }}</h2>
        <validation-observer v-slot="{ invalid }">
        <div class="form__content">
          <div class="form__item">
            <label class="form__item-lbl">氏名</label>
            <label class="">{{ care_receiver.name }}</label>
          </div>
          <div class="form__item">
            <validation-provider v-slot="{ errors }" rules="required">
              <label class="form__item-lbl" for="visit_date">訪問日</label>
              <input type="date" id="visit_date" class="input" v-model="visit_datetime.date" :min="tomorrow" required>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form__item">
            <validation-provider v-slot="{ errors }" rules="required">
              <label class="form__item-lbl" for="visit_time">時間</label>
              <select id="visit_time" class="select time-select" v-model="visit_datetime.time">
                <option v-for="(time, index) in times" :value="time" :key="index">{{ time }}</option>
              </select>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
        </div>
        <button class="btn register-btn" @click="register" :disabled="invalid">
          {{ registered_flg ? "更新" : "登録" }}
        </button>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import { careManagerAuthApi } from "@/plugins/axios";
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      visit_datetime_id: 0,
      visit_datetime: {
        care_receiver_id: null,
        date: null,
        time: null
      },
      times: [],
      tomorrow: null,
      registered_flg: false,
    }
  },
  computed: {
    ...mapGetters({
      care_receiver: 'getSelectedCareReceiver',
    })
  },
  methods: {
    ...mapActions([
      'setCareManagerDetailFlg'
    ]),
    initialize() {
      this.setCareManagerDetailFlg(true);

      this.visit_datetime.care_receiver_id = this.care_receiver.id;
      this.registered_flg = this.care_receiver.visit_datetime !== null;
      if (this.registered_flg) {
        this.visit_datetime_id = this.care_receiver.visit_datetime.id;
      }
      
      this.setTomorrow();
      this.setTimes();
      this.setVisitDateTime();
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
    setVisitDateTime() {
      if (this.registered_flg) {
        const visit_datetime = this.care_receiver.visit_datetime;
        this.visit_datetime.date = dayjs(visit_datetime.date).format('YYYY-MM-DD');
        this.visit_datetime.time = dayjs(visit_datetime.time).format('HH:mm');
      } else {
        this.visit_datetime.date = this.tomorrow;
        this.visit_datetime.time = '14:00';
      }
    },
    async register() {
      const msg = this.registered_flg ?
      "訪問日時を更新しますか？" : "訪問日時を登録しますか？"
      if (!confirm(msg)) {
        return;
      }

      const response = null;
      if (this.registered_flg) {
        response = await careManagerAuthApi.put(
          `/care-managers/visit/${this.visit_datetime_id}`,
          this.visit_datetime
        );
      } else {
        response = await careManagerAuthApi.post(
          '/care-managers/visit',
          this.visit_datetime
        );
      }

      if (response.status === 201) {
        this.care_receiver.visit_datetime = this.visit_datetime;
        await this.$store.dispatch('setSelectedCareReceiver', this.care_receiver);
        this.$router.push({
            name: 'CareReceiverDetail'
          });
      }
    },
  },
  created() {
    this.initialize();
  }
}
</script>

<style scoped>
.visit-datetime {
  display: flex;
  justify-content: center;
}
.form {
  width: 500px;
  margin: 0;
}
.time-select {
  font-size: 20px;
  padding: 0 5px;
}
</style>
