<template>
  <div class="care-receivers__list">
    <h2 class="page__ttl">担当被介護者一覧</h2>
    <table class="tbl box-shadow">
      <thead>
        <tr>
          <th class="checkbox-width">
            <input type="checkbox" class="all-checkbox" @click="allChecked($event)">
          </th>
          <th>No</th>
          <th>氏名</th>
          <th>フリガナ</th>
          <th>性別</th>
          <th>生年月日</th>
          <th>介護度</th>
          <th>詳細</th>
          <th>更新</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(care_receiver, index) in care_receivers" :key="care_receiver.id">
          <td>
            <input type="checkbox" class="checkbox" v-model="checked_care_receiver_ids" :value=care_receiver.id @click="checked($event)">
          </td>
          <td>{{ index + 1 }}</td>
          <td>{{ care_receiver.name }}</td>
          <td>{{ care_receiver.name_furigana }}</td>
          <td>{{ care_receiver.gender === 0 ? "男" : "女" }}</td>
          <td>{{ $dayjs(care_receiver.birthday).format('YYYY/MM/DD') }}</td>
          <td>{{ care_receiver.care_level.name }}</td>
          <td>
            <button class="btn delete__btn" @click="showDetail(care_receiver)">詳細</button>
          </td>
          <td>
            <button class="btn update__btn" @click="updateCareReceiver(care_receiver)">更新</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button class="btn all-delete__btn" @click="deleteCareReceivers" :disabled="isDisabled">一括削除</button>
  </div>
</template>

<script>
import { careManagerAuthApi } from "@/plugins/axios";
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      care_receivers: {},
      checked_care_receiver_ids: [],
      isDisabled: true
    }
  },
  methods: {
    ...mapActions([
      'setSelectedCareReceiver',
      'setCareManagerDetailFlg'
    ]),
    async getCareReceivers() {
      try {
        const { data } = await careManagerAuthApi.get('/care-receivers');

        this.care_receivers = data.data;
      } catch (error) {
        if (error.response.status === 403) {
          this.$router.push({
            name: 'EmailUnverified'
          });
        } else {
          alert("データの取得に失敗しました");
        }
      }
    },
    allChecked(event) {
      let check_boxes = document.getElementsByClassName('checkbox');
      let checked_flg = event.target.checked;
      this.isDisabled = !checked_flg;

      for (let i = 0; i < check_boxes.length; i++) {
        const check_box = check_boxes[i];
        check_box.checked = checked_flg;
        const care_receiver_id = Number(check_box.value);
        if (checked_flg) {
          this.checked_care_receiver_ids.push(care_receiver_id);
        } else {
          this.checked_care_receiver_ids.splice(
            this.checked_care_receiver_ids.indexOf(care_receiver_id), 1
          );
        }
      }
    },
    checked(event) {
      if (event.target.checked) {
        this.isDisabled = false;
        return;
      }
      this.isDisabled = true;
      let check_boxes = document.getElementsByClassName('checkbox');
      for (let i = 0; i < check_boxes.length; i++) {
        if (check_boxes[i].checked) {
          this.isDisabled = false;
          break;
        }
      }
    },
    showDetail(care_receiver) {
      this.setSelectedCareReceiver(care_receiver);

      this.$router.push({
        name: 'CareManagerCareReceiverDetail'
      });
    },
    updateCareReceiver(care_receiver) {
      this.$router.push({
        name: 'CareReceiverUpdate',
        query: { care_receiver: care_receiver }
      });
    },
    async deleteCareReceivers() {
      if (!confirm("削除しますか？")) {
        return;
      }
      
      try {
        const send_data = {
          ids: this.checked_care_receiver_ids
        };
        const { data } = await careManagerAuthApi.post(
          '/care-receivers/batch-delete',
          send_data
        );

        this.care_receivers = data.data;

      } catch (error) {
        console.log(error);
        alert("削除に失敗しました");
      }
    },
  },
  async created() {
    this.setCareManagerDetailFlg(false);
    await this.getCareReceivers();
  }
};
</script>

<style scoped>
.care-receivers__list {
  margin: 0 auto;
}

.page__ttl {
  text-align: center;
  padding: 20px 0;
}

.tbl {
  width: 90%;
  margin: 0 auto;
  border-radius: 6px;
}

.tbl tr {
  background-color: #fff;
}

.tbl th,
.tbl td {
  text-align: center;
  padding: 10px 0;
}
.tbl th {
  font-size: 20px;
  color: #f5f5f5;
  background-color: #1A237E;
}

.tbl th:first-child {
  border-top-left-radius: 6px;
}

.tbl th:last-child {
  border-top-right-radius: 6px;
}

.tbl tr:last-child td {
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}

.tbl td {
  color: #555;
}

.delete__btn,
.update__btn {
  width: auto;
  padding: 5px 10px;
}

.all-checkbox,
.checkbox {
  transform: scale(1.5);
}

.checkbox-width {
  width: 6%;
}
</style>
