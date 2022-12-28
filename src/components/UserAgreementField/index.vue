<template>
  <van-field name="agree" :rules="[{ required: true, message: '请同意该协议' }]">
    <template #input>
      <van-checkbox v-model="agree">
        我已阅读并同意
        <span class=" text-blue-500">
          <a href="https://www.baidu.com">《lk咖啡用户协议》</a>
          <a href="https://www.baidu.com">《隐私协议》</a>
        </span>
      </van-checkbox>
    </template>
  </van-field>
</template>

<script lang='ts' setup>import { ref } from 'vue';


const props = defineProps(
  {
    agreee: {
      type: Boolean,
      default: false
    }
  }
)
const agree = ref(props.agreee)

</script>
<style scoped>

</style>