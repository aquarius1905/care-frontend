<template>
  <div id="detail-menu">
    <nav class="nav">
      <h2 class="menu-ttl">詳細メニュー</h2>
      <div>
        <ul class="detail-menu-content">
          <li>
            <button class="btn-link" @click="showVisitDateTimeView()">訪問日時</button>
          </li>
          <li>
            <button class="btn-link">居宅サービス計画書</button>
          </li>
          <li>
            <button class="btn-link">サービス利用票</button>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      care_receiver: {}
    }
  },
  methods: {
    showVisitDateTimeView() {
      this.$router.push({
        name: 'CareManagerVisitDateTime'
      });
    }
  },
  created() {
    this.care_receiver = this.$store.getters.getCurrentCareReceiver
  }
};
</script>

<style scoped>
#detail-menu {
  width: 210px;
  height: 500px;
  box-shadow: 2px 0 4px 1px #888;
  border-radius: 6px;
  background: #fff;
}
.menu-ttl {
  padding: 20px;
  font-size: 18px;
}
.nav {
  width: 100%;
  height: auto;
}
.btn-link {
  border: none;
  font-size: 16px;
  cursor: pointer;
  background-color: #fff;
  width: 100%;
  text-align: left;
  padding-left: 20px;
  line-height: 40px;
  height: 40px;
}
</style>
