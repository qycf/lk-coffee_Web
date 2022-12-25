<template>
    <van-field name="verify_code" v-model="verify_code" center clearable label="验证码"
        :rules="[{ required: true, message: '请填写验证码' }]" placeholder="请输入短信验证码">
        <template #button>
            <van-button size="small" round plain type="primary" :disabled="countDownButtonArgs.timing"
                @click="sendLoginCodes">
                {{ sendBtn.loading ? sendBtn.loadingText : countDownButtonArgs.timing ? countDownButtonArgs.count :
        sendBtn.buttonText
                }}
            </van-button>
        </template>
    </van-field>
</template>

<script lang='ts' setup>
import { reactive, ref} from 'vue';
import 'vant/es/notify/style';
import { showNotify } from 'vant';
import { sendLoginCode } from '@/api/sms';

const props = defineProps(
    {
        tel: {
            type: String,
            default: ''
        },
        verify_code: {
            type: String,
            default: ''
        }
    }
)

const verify_code = ref(props.verify_code)
const sendBtn = ref({
    loading: false,
    buttonText: '获取验证码',
    loadingText: '发送中...',
    maxSecondNum: 60
})

// 倒计时变量
const countDownButtonArgs = reactive<{ timing: boolean; count: number }>({
    timing: false,
    count: 0
})

// const phoneNumberValidator = (val: string) => /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(val);



// 发送验证码
const sendLoginCodes = () => {
    if (!props.tel) {
        showNotify({ type: 'danger', message: '请输入手机号' });
        return;
    }
    sendLoginCode(props.tel).then((res: any) => {
        countDownButtonArgs.timing = true
        countDownButtonArgs.count = sendBtn.value.maxSecondNum
        const timer = setInterval(() => {
            const { count } = countDownButtonArgs
            if (count > 0 && count <= sendBtn.value.maxSecondNum) {
                countDownButtonArgs.count--;
            } else {
                countDownButtonArgs.timing = false
                clearInterval(timer)
                countDownButtonArgs.count = 0
            }
        }, 1000)
        showNotify({ type: 'success', message: res.data.msg });
    });
}

</script>
<style scoped>

</style>