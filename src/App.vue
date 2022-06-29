<template>
  <div id="app">
    <CommonHeader></CommonHeader>
    <nav>
      <router-link to="/care-manager/register">ケアマネージャー登録</router-link>
      <router-link to="/care-manager/login">ケアマネージャーログイン</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
import CommonHeader from "./components/CommonHeader";
export default {
  components: { CommonHeader }
};
</script>

<style>
@import "./css/reset.css";
@import "./css/common.css";
</style>
