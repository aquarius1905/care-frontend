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
            <th>ご家庭での状況</th>
            <td>
              <validation-provider v-slot="{ errors }" rules="max:255">
                <label for="situation_at_home" class="form__item-lbl"></label>
                <textarea id="situation_at_home" class="situation-at-home" 
                v-model="diary.situation_at_home" placeholder="体調の変化・薬の変更等ご記入下さい"></textarea>
                <div class="error">{{ errors[0] }}</div>
              </validation-provider>
            </td>
          </tr>
          <tr>
            <th>体温</th>
            <td>{{ diary.body_temperature + ' ℃' }}</td>
          </tr>
          <tr>
            <th>血圧</th>
            <td>
              {{ diary.systonic_blood_pressure + ' / ' + diary.diastolic_blood_pressure + ' mmHg'}}
            </td>
          </tr>
          <tr>
            <th>脈拍</th>
            <td>{{ diary.pulse + ' 回/分' }}</td>
          </tr>
          <tr>
            <th>食事量（主食）</th>
            <td>{{ diary.staple_food + ' 割' }}</td>
          </tr>
          <tr>
            <th>食事量（副食）</th>
            <td>{{ diary.side_dish + ' 割' }}</td>
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
import { careReceiverAuthApi } from "@/plugins/axios";
import { mapGetters } from 'vuex';
export default {
  props: ['sendData'],
  computed: {
    ...mapGetters({
      care_receiver_name: 'getLoggedInCareReceiverName'
    })
  },
  data() {
    return {
      diary: {},
      rehabilitaion_contents: {}
    }
  },
  methods: {
    async update() {
      if (!confirm("日誌を更新しますか？")) {
        return;
      }
      
      const send_data = {
        'id': this.diary.id,
        'situation_at_home': this.diary.situation_at_home
      };
      try {
        const response = await careReceiverAuthApi.put(
          '/daycare-diaries/situation-at-home-updates', send_data
        );

        if (response.status === 201) {
          this.$router.push({
            name: 'CareReceiverDiaryUpdateCompleted',
            query: { msg: "日誌の更新が完了しました" }
          });
        }
      } catch (error) {
        console.log(error);
        alert("日誌の更新に失敗しました");
      }
    },
    async getDaycareDiary() {
      try {
        const params = this.sendData;
        const { data } = await careReceiverAuthApi.get(
          '/daycare-diaries/search', { params }
        );

        this.diary = data.data;
      } catch (error) {
        console.log(error);
        alert("日誌の取得に失敗しました");
      }
    }
  },
  async created() {
    await this.getDaycareDiary();
  }
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
  height: 70px;
  vertical-align: middle;
}

.update__btn {
  width: 100%;
}
</style>