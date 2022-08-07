<template>
  <div id="detail-menu">
    <ul class="menu-list">
      <li>
        <button class="detail-menu-btn" @click="showCareReceiverDeitalPage">被介護者詳細</button>
      </li>
      <li>
        <button class="detail-menu-btn" @click="showCarePlanPage">介護計画</button>
      </li>
      <li><button class="detail-menu-btn" @click="showVisitDateTiemPage">訪問日時登録・確認</button></li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    showCareReceiverDeitalPage() {
    },
    displayCareReceiverRegistrationPage() {
    },
    showVisitDateTiemPage() {
    }
  },
}
</script>

<style scoped>
#detail-menu {
  width: 150px;
  padding: 10px;
  background: #1D278B;
}
.menu-list li {
  list-style: none;
}
.detail-menu-btn {
  border: none;
  font-size: 14px;
  cursor: pointer;
  color: #fff;
  background: #1D278B;
  width: 100%;
  text-align: left;
  padding: 0;
  line-height: 40px;
  height: 40px;
}
</style>
