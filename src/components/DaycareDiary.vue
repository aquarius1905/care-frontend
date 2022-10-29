<template>
  <div class="daycare-diary">
    <div class="diary__content box-shadow">
      <validation-observer v-slot="{ invalid }">
        <table class="diary__tbl">
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
            <th>体温</th>
            <td>{{ diary.body_temperature }}</td>
          </tr>
          <tr>
            <th>血圧</th>
            <td>
              {{ systonic_blood_pressure + ' / ' + diary.diastolic_blood_pressure + ' mmHg'}}
            </td>
          </tr>
          <tr>
            <th>脈拍</th>
            <td>{{ diary.pulse }}</td>
          </tr>
          <tr>
            <th>食事量（主食）</th>
            <td>{{ diary.staple_food + '割' }}</td>
          </tr>
          <tr>
            <th>食事量（副食）</th>
            <td>{{ diary.side_dish + '割' }}</td>
          </tr>
          <tr>
            <th>レクリエーション</th>
            <td>{{ diary.recreation == 0 ? "未実施" : "実施" }}</td>
          </tr>
          <tr>
            <th>リハビリ内容</th>
            <td>
            </td>
          </tr>
          <tr>
            <th>特記事項</th>
            <td>{{ diary.special_notes }}</td>
          </tr>
          <tr>
            <th>記入者</th>
            <td>{{ diary.entry_person }}</td>
          </tr>
        </table>
        <button class="btn update__btn" :disabled="invalid" @click="update">
          更新
        </button>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import { nursingCareOfficeAuthApi } from "@/plugins/axios";
export default {
  props: {
    diary: {
      type: Object
    }
  },
  methods: {
    async update() {
      if (!confirm("日誌を更新しますか？")) {
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
  },
}
</script>

<style scoped>
.daycare-diary {
  margin: 20px auto 50px;
  width: 600px;
}

.diary__tbl {
  width: 100%;
  border-collapse: collapse;
}

.diary__tbl th {
  text-align: left;
  vertical-align: middle;
  width: 35%;
}

.diary__tbl td {
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
</style>