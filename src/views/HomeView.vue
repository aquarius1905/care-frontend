<template>
  <div id="home">
    <div class="btn-wrap box-shadow">
      <h1 class="ttl">Care</h1>
      <div class="home-link-wrap">
        <router-link class="home-link" to="/care-manager/login">ケアマネージャーの方はこちら</router-link>
      </div>
      <div>
        <router-link class="home-link" to="/key-person/login">被介護者、キーパーソンの方はこちら</router-link>
      </div>
      <div>
        <router-link class="home-link" to="/care-giving-office/login">介護事業者の方はこちら</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
#home {
  margin: 50px auto 0;
}
.ttl {
  text-align: center;
  padding: 0;
  margin-bottom: 20px;
  font-size: 36px;
}
.btn-wrap {
  width: 400px;
  margin: 0 auto;
  padding: 40px;
  background-color: #fff;
  border-radius: 6px;
}
.home-link-wrap {
  width: 100%;
}
.home-link {
  display: inline-block;
  text-decoration: none;
  color: #fff;
  background-color: #1A237E;
  font-size: 18px;
  padding: 20px;
  margin-bottom: 20px;
  box-sizing: border-box;
  width: 100%;
}
</style>