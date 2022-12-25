<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>

      <van-field v-if="isReg" v-model="formData.username" name="username" label="用户名" placeholder="用户名"
        :rules="userNameRules" />

      <van-field v-model="formData.tel" clearable name="tel" label="手机号" placeholder="手机号" :rules="phoneNumberRules" />

      <PwdField v-if="isUsePwd || (isUsePwd && isReg)" :password="formData.password" />

      <CodeField v-if="(isReg || !isUsePwd)" :verify_code="formData.verify_code" :tel="formData.tel" />

    </van-cell-group>

    <div class="mt-4" v-if="!isReg">
      <div class="ml-6 float-left text-slate-400" @click="usePwdLogin">{{ !isUsePwd ? '切换密码登录' : '切换验证码登录' }}</div>
      <div v-if="isUsePwd" class="float-right text-slate-400">忘记密码？</div>
    </div>

    <div class=" button_s" v-if="!isReg">
      <van-button round block color="rgb(12,52,186)" native-type="submit">
        登录
      </van-button>
    </div>

    <div style="margin: 1rem !important;margin-top: 1rem !important;">
      <van-button v-if="!isReg" round block type="default" @click="emit('onShowReg')">注册</van-button>
      <van-button v-else round block native-type="submit" color="rgb(12,52,186)">注册</van-button>

    </div>

    <UserAgreementField :ageree="formData.agree" />
  </van-form>
</template>

<script lang='ts' setup>
import UserAgreementField from '@/pages/components/UserAgreementField.vue';
import PwdField from '@/pages/components/PwdField.vue';
import CodeField from '@/pages/components/CodeField.vue';
import { ref } from 'vue';

const emit = defineEmits(['onShowReg', 'onLogin', 'onRegister'])

const props = defineProps({
  isRegister: {
    type: Boolean,
    default: false
  },
  isUsePwd: {
    type: Boolean,
    default: false
  },
  formData: {
    type: Object,
    default: {}
  }
})

const phoneNumberValidator = (val: string) => /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(val);
const phoneNumberRules = [{ validator: phoneNumberValidator, required: true, message: '请填写正确的手机号' }]
const userNameRules = [{ required: true, message: '请填写用户名' }]

const isUsePwd = ref(props.isUsePwd)
const isReg = ref(props.isRegister)
const usePwdLogin = () => {
  isUsePwd.value = !isUsePwd.value
}

const onSubmit = (values: any) => {
  if (!isReg.value) {
    emit('onLogin', values, isUsePwd.value)
  } else {
    emit('onRegister', values)
  }
}

</script>
<style scoped>
.button_s {
  margin: 1rem !important;
  margin-top: 4.5rem !important;
}
</style>