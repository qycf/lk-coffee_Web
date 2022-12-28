<template>
    <div>
        <van-field @input="$emit('input', $event)" v-model="phone_number" clearable name="phone_number" label="手机号"
            placeholder="手机号" :rules="[{ required: true, message: '请输入手机号' }]" />
    </div>
</template>

<script lang='ts' setup>
import { toRef } from 'vue';

const props = defineProps({
    value: {
        type: String,
        default: ''
    }
})
const phone_number = toRef(props, 'value');
// const phone_number = ref(props.phone_number1)

const test = (() => {
    console.log(phone_number);

})

</script>
<style scoped>

</style>