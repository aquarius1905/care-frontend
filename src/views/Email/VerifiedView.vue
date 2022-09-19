<template>
  <div>
    <TextMessage :msg="msg"></TextMessage>
  </div>
</template>

<script>
import TextMessage from "@/components/TextMessage";
export default {
  components: { TextMessage },
  data: function () {
    return {
      msg: "メール認証が完了しました"
    }
  }
};
</script>