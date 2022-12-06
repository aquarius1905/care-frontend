<template>
  <div class="cancellation">
    <h2 class="cancellation__ttl">キャンセル</h2>
    <div class="cancellation__form box-shadow">
        <div class="form__content">
          <table class="cancellation__tbl">
            <tr>
              <th>氏名</th>
              <td>{{ care_receiver_name }}</td>
            </tr>
            <tr>
              <th>施設名</th>
              <td>{{ schedule.office_name }}</td>
            </tr>
            <tr>
              <th>日付</th>
              <td>{{ $dayjs(schedule.date).format('YYYY年MM月DD日（ddd）') }}</td>
            </tr>
            <tr>
              <th>時間</th>
              <td>{{ schedule.starting_time }}～{{ schedule.ending_time }}</td>
            </tr>
            <tr>
              <th>
                <label for="reason">
                  理由<span class="required__lbl">必須</span>
                </label>
              </th>
              <td>
                <textarea id="reason" class="reason" v-model="schedule.reason"></textarea>
              </td>
            </tr>
          </table>
          <button class="btn cancel__btn" @click="cancel">
            登録
          </button>
        </div>
    </div>
  </div>
</template>

<script>
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
    async cancel() {
      if (!confirm('キャンセル登録しますか？')) {
        return; 
      }
      
      try {
        this.schedule.date = new Date(this.schedule.date);

        const response = await careReceiverAuthApi.post(
          'care-receivers/cancel',
          this.schedule
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

.cancellation__tbl th {
  width: 30%;
  font-weight: 500;
  text-align: left;
  height: 50px;
  vertical-align: top;
}

.required__lbl {
  margin-left: 10px;
}
.reason {
  resize: none;
  width: 300px;
  height: 100px;
  padding: 10px;
  font-size: 16px;
}
.cancel__btn {
  margin-top: 30px;
  width: 100%;
  border: none;
}
</style>
