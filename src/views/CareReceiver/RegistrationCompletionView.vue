<template>
  <div>
    <CompletionMessage :msg="msg"></CompletionMessage>
  </div>
</template>

<script>
import CompletionMessage from "@/components/CompletionMessage";
export default {
  components: { CompletionMessage },
  data: function () {
    return {
      msg: "被介護者、及びキーパーソンの登録が完了しました"
    }
  }
};
</script>

<style scoped>
.msg-box {
  background-color: #fff;
  max-width: 700px;
  height: 300px;
  display: grid;
  place-items: center;
  margin: 0 auto;
  border-radius: 6px;
  font-size: 26px;
  text-align: center;
  line-height: 40px;
}
</style>