<template>
  <van-row>
    <van-col :span="24" class="welcome">
      <div class="ml-8">
        <div class=" text-5xl text-slate-800 my-auto">欢迎回来</div>
        <div class=" text-2xl text-slate-400 my-auto"> Please login to your accounts</div>
      </div>
    </van-col>

    <van-col class="h-full m-auto w-full">
      <BizForm @onShowReg="(show_register_panel = true)" :isRegister="false" :isUsePwd="false" :formData="login_form"
        @onLogin="onLogin" />
    </van-col>
  </van-row>

  <van-action-sheet v-model:show="show_register_panel" title="手机注册">
    <div class="content">
      <BizForm @on-register="onRegister" :form-data="register_form" :is-register="true" :isUsePwd="true" />
    </div>
  </van-action-sheet>
</template>

<script lang='ts' setup>
import { ref } from 'vue';
import { showNotify } from 'vant';
import 'vant/es/notify/style';
import { loginWithPw, loginWithTel, register } from '@/api/user';
import { useUserStore } from '@/stores/user';
import router from '@/router';
import BizForm from '@/components/BizForm/index.vue';
import { getUserAddress } from '@/api/address';
import { useAddressStore } from '@/stores/address';

const userStore = useUserStore()


// 注册面板显示
const show_register_panel = ref(false)

// 登录表单
const login_form = ref({
  tel: '',
  password: '',
  verify_code: '',
  agree: false
})


// 注册表单
const register_form = ref({
  username: '',
  phone_number: '',
  password: '',
  agree: false,
  code: ''
})



const phoneNumberValidator = (val: string) => /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(val);

const onRegister = async (values: any) => {
  let res = await register(values)
  userStore.setUser(res.data.token, res.data.user_info)
  router.push('/account')
}

const onLogin = async (values: any, is_LoginWithPw: boolean) => {
  if (is_LoginWithPw) {
    onLoginWithPw(values)
  } else {
    onLoginWithTel(values)
  }
}

const onLoginWithPw = async (values: any) => {
  let res = await loginWithPw(values)
  if (res) {
    userStore.setUser(res.data.data.token, res.data.data.user_info)
    showNotify({ type: 'success', message: '登录成功' });
    router.push('/account')

  }
};

const onLoginWithTel = async (values: any) => {
  let res = await loginWithTel(values)
  if (res) {
    userStore.setUser(res.data.data.token, res.data.data.user_info)
    showNotify({ type: 'success', message: '登录成功' });
    router.push('/account')

  }
};



</script>
<style scoped>
.welcome {
  width: 100%;
  height: 25vh;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
}

.content {
  padding: 16px 16px 45px;
}
</style>