<template>
  <div id="app">
    <div>
      <CommonHeader></CommonHeader>
    </div>
    <SideBar></SideBar>
    <router-view class="router-view" />
  </div>
</template>

<script>
import CommonHeader from "./components/CommonHeader";
import SideBar from "./components/SideBar";
export default {
  components: { CommonHeader, SideBar }
};
</script>

<style>
@import "./css/reset.css";
@import "./css/common.css";

.router-view {
  width: 80%;
  margin: 90px 0 0 auto;
}
</style>
