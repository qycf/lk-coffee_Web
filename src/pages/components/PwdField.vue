<template>
    <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]" />
</template>

<script lang='ts' setup>
import { ref } from 'vue';

const props = defineProps({
    password: {
        type: String,
        default: ''
    }
})

const password = ref(props.password)
</script>
<style scoped>

</style>