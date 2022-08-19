<template>
  <div id="app">
    <Header v-show="isShow"></Header>
    <div class="flex">
      <SideBar v-show="isShow"></SideBar>
      <router-view class="router-view" />
    </div>
  </div>
</template>

<script>
import SideBar from "./components/SideBar";
import Header from "./components/Header";
export default {
  components: { Header, SideBar },
  computed: {
    isShow: function () {
      return this.$route.path !== '/';
    }
  }
};
</script>

<style>
@import "./css/reset.css";
@import "./css/common.css";

.router-view {
  margin: 0 auto;
}
</style>
