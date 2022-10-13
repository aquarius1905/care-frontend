<template>
  <div class="cancellation">
    <h2 class="cancellation__ttl">キャンセル連絡</h2>
    <div class="cancellation__form box-shadow">
        <div class="form__content">
          <div class="form__item">
            <label class="form__item-lbl">氏名</label>
            <label>{{ care_receiver_name }}</label>
          </div>
          <div class="form__item">
            <label class="form__item-lbl">施設名</label>
            <label>{{ schedule.office_name }}</label>
          </div>
          <div class="form__item">
            <label class="form__item-lbl">日付</label>
          </div>
          <div class="form__item">
            <label class="form__item-lbl">時間</label>
            <label>{{ schedule.starting_time }}～{{ schedule.ending_time }}</label>
          </div>
          <div class="form__item reason__item">
            <label class="form__item-lbl" for="reason">
              理由
              <span class="required__lbl">必須</span>
            </label>
            <textarea name="" id="reason" class="reason" v-model="schedule.reason"></textarea>
          </div>
          <button class="btn cancel__btn" @click="cancel">
            キャンセル
          </button>
        </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import { careReceiverAuthApi } from "@/plugins/axios";
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      schedule: {}
    }
  },
  computed: {
    ...mapGetters({
      care_receiver_name: 'getLoggedInCareReceiverName',
    })
  },
  methods: {
    cancel() {
      try {
        const response = careReceiverAuthApi.post(
          '/cancellation', this.schedule
        );
        if (response.status === 201) {
          this.$router.push({
            name: 'CancellationCompleted',
            query: { msg: "キャンセルの登録が完了しました" }
          });
        }
      } catch (error) {
        console.log(error);
        alert("キャンセルの登録に失敗しました");
      }

    }
  },
  created() {
    this.schedule = this.$route.query.schedule;
  }
}
</script>

<style scoped>
.cancellation {
  margin: 20px auto 0;
  width: 550px;
}
.cancellation__form {
  background-color: #fff;
  width: 100%;
  margin: 20px auto 0;
  border-radius: 6px;
}
.form__content {
  padding: 20px;
}
.form__item-lbl {
  display: inline-block;
  margin: 0;
  width: 150px;
}
.reason {
  resize: none;
  width: 300px;
  height: 100px;
  padding: 10px;
  font-size: 18px;
}
</style>
