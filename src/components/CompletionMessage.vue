<template>
  <div id="completion-msg">
    <div class="msg-box box-shadow">
      <p class="msg">{{ msg }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: String
    }
  }
};
</script>
<style>
.msg {
  white-space: pre-wrap;
}
</style>