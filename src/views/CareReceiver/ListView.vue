<template>
  <div id="care-receiver-list">
    <h2 class="page-ttl">担当被介護者一覧</h2>
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
          <th>訪問日時</th>
          <th>詳細</th>
          <th>更新</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(care_receiver, index) in care_receivers" :key="care_receiver.id">
          <td>
            <input type="checkbox" class="checkbox" v-model="checked_care_receiver_ids" :value=care_receiver.id>
          </td>
          <td>{{ index + 1 }}</td>
          <td>{{ care_receiver.name }}</td>
          <td>{{ care_receiver.name_furigana }}</td>
          <td>{{ care_receiver.gender === 1 ? "男" : "女" }}</td>
          <td>{{ $dayjs(care_receiver.birthday).format('YYYY/MM/DD') }}</td>
          <td>{{ care_receiver.care_level.name }}</td>
          <td><button class="btn list-btn" @click="showVisitDateTimeView(care_receiver)">訪問日時</button></td>
          <td><button class="btn list-btn" @click="showDetailView(care_receiver)">詳細</button></td>
          <td><button class="btn list-btn" @click="updateCareReceiver(care_receiver)">更新</button></td>
        </tr>
      </tbody>
    </table>
    <div class="list-btn-wrap">
      <button class="btn" @click="deleteCareReceivers">一括削除</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      care_receivers: null,
      checked_care_receiver_ids: []
    }
  },
  methods: {
    async getCareReceivers() {
      const { data } = await axios.get(`${process.env.VUE_APP_API_ORIGIN}/care-receivers`, {
        headers: {
          Authorization: `Bearer ${this.$store.getters.getCareManagerAccessToken}`,
        }
      });
      this.care_receivers = data.data;
    },
    allChecked(event) {
      let check_boxes = document.getElementsByClassName('checkbox');
      let action_flg = event.target.checked;

      for (let i = 0; i < check_boxes.length; i++) {
        const check_box = check_boxes[i];
        check_box.checked = action_flg;
        const care_receiver_id = Number(check_box.value);
        if (action_flg) {
          this.checked_care_receiver_ids.push(care_receiver_id);
        } else {
          this.checked_care_receiver_ids.splice(
            this.checked_care_receiver_ids.indexOf(care_receiver_id), 1
          );
        }
      }
    },
    showVisitDateTimeView(care_receiver) {
      const registered_flg = care_receiver.visit_datetime !== null;
      this.$router.push({
        name: 'CareManagerVisitDateTime',
        query: { care_receiver: care_receiver, registered_flg: registered_flg }
      });
    },
    showDetailView(care_receiver) {
      console.log(care_receiver);
      this.$router.push({
        name: 'CareReceiverDetail',
        query: { care_receiver: care_receiver }
      });
    },
    updateCareReceiver(care_receiver) {
      this.$router.push({
        name: 'CareReceiverUpdate',
        query: { care_receiver: care_receiver }
      });
    },
    async deleteCareReceivers() {
      if (confirm("削除しますか？")) {
        axios.defaults.headers.common['Authorization'] =
          'Bearer ' + this.$store.getters.getCareManagerAccessToken;
        const response = await axios.post(
          `${process.env.VUE_APP_API_ORIGIN}/care-receivers/batch-delete`,
          this.checked_care_receiver_ids
        );
        if (response.status === 200) {
          this.getCareReceivers();
        } else {
          alert("削除に失敗しました");
        }
        axios.defaults.headers.common['Authorization'] = null;
      }
    }
  },
  created() {
    this.getCareReceivers();
  }
};
</script>

<style scoped>
#care-receiver-list {
  width: 1000px;
}
.tbl {
  width: 100%;
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
.list-btn {
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
