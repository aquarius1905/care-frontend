<template>
  <div id="detail-menu">
    <nav class="nav">
      <h2 class="menu-ttl">詳細メニュー</h2>
      <div>
        <ul class="detail-menu-content">
          <li>
            <router-link class="router-link" :to="{ name: 'CareReceiverDetail'}">
              被介護者詳細情報
            </router-link>
          </li>
          <li>
            <router-link class="router-link" :to="{ name: 'CareManagerVisitDateTime'}">
              訪問日時
            </router-link>
          </li>
          <li>
            <button class="btn-link">居宅サービス計画書</button>
          </li>
          <li>
            <router-link class="router-link" :to="{ name: 'CareReceiverWeeklyServiceSchedule'}">
              週間サービス計画表
            </router-link>
          </li>
          <li>
            <button class="btn-link">サービス利用票</button>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<style scoped>
#detail-menu {
  width: 210px;
  height: 300px;
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
.router-link {
  display: inline-block;
  text-decoration: none;
  color: #000;
  font-size: 16px;
  width: 100%;
  line-height: 40px;
  height: 40px;
  padding-left: 20px;
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
