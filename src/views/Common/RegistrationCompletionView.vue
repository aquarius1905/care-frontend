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
      msg: "登録が完了しました\n\nご登録頂いたメールアドレス宛てに\nメールを送信しましたので\n認証をお願い致します"
    }
  }
};
</script>