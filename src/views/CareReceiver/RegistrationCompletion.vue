<template>
  <div>
    <TextMessage :msg="msg"></TextMessage>
  </div>
</template>

<script>
import TextMessage from "@/components/TextMessage";
export default {
  components: { TextMessage },
  data() {
    return {
      msg: "被介護者、及びキーパーソンの登録が完了しました"
    }
  }
};
</script>