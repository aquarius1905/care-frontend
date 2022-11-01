<template>
  <div class="monthly-schedule">
    <div class="ttl__wrap">
      <button class="btn last-month__btn" @click="moveToMonthlySchedulePage(false)">先月へ</button>
      <h2 class="page__ttl">月別スケジュール</h2>
      <label class="date">{{ $dayjs(this.year_and_month).format('YYYY年MM月') }}</label>
      <button class="btn next-month__btn" @click="moveToMonthlySchedulePage(true)">来月へ</button>
    </div>
    <div class="page__content">
      <table class="monthly-schedule__tbl box-shadow">
        <thead>
          <tr>
            <th rowspan="2">日付</th>
            <th rowspan="2">施設名</th>
            <th colspan="2">サービス提供時間</th>
            <th rowspan="2">キャンセル</th>
            <th rowspan="2">日誌</th>
          </tr>
          <tr>
            <th>開始</th>
            <th>終了</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(schedule, index) in monthly_schedules" :key="index" >
            <td>{{ schedule.date.format('D日（ddd）') }}</td>
            <td>{{ schedule.office_name }}</td>
            <td>{{ schedule.starting_time }}</td>
            <td>{{ schedule.ending_time }}</td>
            <td>
              <label v-if="beforeToday(schedule.date)">ー</label>
              <button class="btn tbl-cancel__btn" 
              @click="cancel(schedule)" v-else>
                キャンセル
              </button>
            </td>
            <td>
              <button class="btn tbl-diary__btn" 
              v-if="beforeToday(schedule.date)" 
              @click="showDiary(schedule)">
              日誌
            </button>
              <label v-else>ー</label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      year_and_month: null,
      monthly_schedules: []
    }
  },
  computed: {
    ...mapGetters({
      care_receiver: 'getLoggedInCareReceiver',
      weekly_service_schedules: 'getWeeklyServiceSchedules'
    }),
    beforeToday: function () {
      return function (date) {
        return dayjs(date).isSameOrBefore(dayjs());
      }
    },
  },
  methods: {
    makeMonthlySchedules() {
      const date = new Date(this.year_and_month);
      const monthStart = dayjs(date, 'YYYY-MM-DD').startOf('month');
      const monthEnd = dayjs(date, 'YYYY-MM-DD').endOf('month');
      const numberOfDays = monthEnd.diff(monthStart, "day");

      this.monthly_schedules = [];
      for (let i = 0; i <= numberOfDays; i++) {
        let date = monthStart.add(i, 'd');
        const schedules = this.weekly_service_schedules.filter(
          item => item.dayofweek === date.day()
        );
        if (schedules.length === 0) {
          continue;
        }
        for (let schedule of schedules) {
          const monthly_schedule = {
            'weekly_service_schedule_id': schedule.id,
            'date': date,
            'office_name': schedule.nursing_care_office.office_name,
            'starting_time': schedule.starting_time.substring(0, 5),
            'ending_time': schedule.ending_time.substring(0, 5),
            'disabled': date.isSameOrBefore(dayjs()),
            'cancelled': this.isCancelled(schedule.cancellations, date)
          }
          this.monthly_schedules.push(monthly_schedule);
        }
      }
    },
    isCancelled(cancellations, date) {
      if (cancellations.length === 0) {
        return false;
      }
    },
    cancel(schedule) {
      schedule.date = dayjs(schedule.date, 'YYYY年MM月DD日 (ddd)').toDate().toString();
      this.$router.push({
        name: 'Cancellation',
        query: { schedule: schedule }
      });
    },
    showDiary(schedule) {
      const send_data = {
        'weekly_service_schedule_id': schedule.weekly_service_schedule_id,
        'date': dayjs(schedule.date).format('YYYY-MM-DD')
      }
      this.$router.push({
        name: 'CareReceiverDiary',
        query: { send_data: send_data }
      });
    },
    moveToMonthlySchedulePage(next_month_flg) {
      let date = new Date(this.year_and_month);
      if (next_month_flg) {
        date.setMonth(date.getMonth() + 1);
      } else {
        date.setMonth(date.getMonth() - 1);
      }
      this.year_and_month = date.toDateString();

      this.makeMonthlySchedules();
    },
  },
  created() {
    dayjs.extend(isSameOrBefore);
    this.year_and_month = this.$route.query.year_and_month;
    this.makeMonthlySchedules();
  }
}
</script>
<style scoped>
.monthly-schedule {
  padding-bottom: 30px;
  margin: 0 auto;
  max-width: 1000px;
}
.tbl-cancel__btn,
.tbl-diary__btn {
  width: 105px;
  font-size: 16px;
}

.page__ttl {
  padding: 0;
  margin-right: 10px;
}

.last-month__btn,
.next-month__btn {
  width: auto;
  padding: 5px 15px;
}
.last-month__btn {
  margin-right: 20px;
}
.next-month__btn {
  margin-left: 20px;
}
</style>