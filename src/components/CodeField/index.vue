<template>
    <van-field name="verify_code" v-model="verify_code" center clearable label="验证码"
        :rules="[{ required: true, message: '请填写验证码' }]" placeholder="请输入短信验证码">
        <template #button>
            <van-button size="small" round plain type="primary" :disabled="sendBtn.isSend" @click="sendLoginCodes">
                <van-count-down ref="CountDown" :time="sendBtn.time" :auto-start="false" @finish="finish">
                    <template #default="timeData">
                        <span class="block">{{ !sendBtn.isSend ? '发送验证码' : timeData.minutes * 60 + timeData.seconds
                            }}</span>
                    </template>
                </van-count-down>
            </van-button>
        </template>
    </van-field>
</template>

<script lang='ts' setup>
import { reactive, ref } from 'vue';
import 'vant/es/notify/style';
import { showNotify } from 'vant';
import { sendLoginCode, sendRegisterCode } from '@/api/sms';
import type { CountDownInstance } from 'vant';

const sendBtn = reactive({
    buttonText: '发送验证码',
    isSend: false,
    time: 5 * 1000
})

const props = defineProps(
    {
        tel: {
            type: String,
            default: ''
        },
        verify_code: {
            type: String,
            default: ''
        },
        isRegister: {
            type: Boolean,
            default: false
        },
    }
)

const verify_code = ref(props.verify_code)


const CountDown = ref<CountDownInstance>();
const finish = () => {
    sendBtn.isSend = false;
    CountDown.value?.reset();
}

// 发送验证码
const sendLoginCodes = async () => {
    if (!props.tel) {
        showNotify({ type: 'danger', message: '请输入手机号' });
        return;
    }
    CountDown.value?.start();
    sendBtn.isSend = true;
    if (props.isRegister) {
        let res = await sendRegisterCode(props.tel)
        if (res) {
            showNotify({ type: 'success', message: res.data.msg });
        }
    } else {
        let res = await sendLoginCode(props.tel)
        if (res) {
            showNotify({ type: 'success', message: res.data.msg });
        }
    }
}
</script>
