<template>
  <div id="app">
    <SideBar v-show="isShowSidebar"></SideBar>
    <router-view class="router-view"/>
  </div>
</template>

<script>
import SideBar from "./components/SideBar";
export default {
  components: { SideBar },
  data() {
    return {
      show_sidebar: false,
    }
  },
  computed: {
    isShowSidebar: function () {
      return this.$route.path !== '/';
    }
  }
};
</script>

<style>
@import "./css/reset.css";
@import "./css/common.css";

#app {
  display: flex;
}
.router-view {
  margin: 50px auto 0;
}
</style>
