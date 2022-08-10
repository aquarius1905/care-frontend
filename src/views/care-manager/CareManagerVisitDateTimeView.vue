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
              <input type="date" id="visit_date" class="input" v-model="care_receiver.date" v-bind:min="tomorrow"
                required>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div class="form-item">
            <validation-provider v-slot="{ errors }" rules="required">
              <label class="form-item-lbl" for="visit_time">時間</label>
              <input type="time" 
              id="visit_time" 
              class="input" 
              min="09:00" 
              max="18:00" 
              step="1800" 
              list="time-list"
              v-model="care_receiver.time" 
              required>
              <datalist id="time-list">
                <option value="09:00">09:00</option>
                <option value="09:30">09:30</option>
                <option value="10:00">10:00</option>
              </datalist>
              <div class="error">{{ errors[0] }}</div>
            </validation-provider>
          </div>
        </div>
        <div class="form-btn-wrap form-confrim-btn-wrap">
          <button class="btn" @click="confirmRegistration()" :disabled="invalid">登録内容確認</button>
        </div>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
export default {
  data() {
    return {
      care_receiver: {
        id: null,
        name: null,
        date: '',
        time: ''
      },
      tomorrow: null
    }
  },
  methods: {
    initialize() {
      console.log(this.care_receiver);
      this.care_receiver.id = this.$route.query.care_receiver_id;
      this.care_receiver.name = this.$route.query.care_receiver_name;
      console.log(this.care_receiver);
      this.tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD');
      if (!this.care_receiver.visit_date) {
        this.care_receiver.visit_date = this.tommorow;
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
</style>
