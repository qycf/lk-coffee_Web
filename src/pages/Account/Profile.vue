<template>
    <van-nav-bar title="个人资料" left-text="返回" :right-text="!isEdit?'编辑':'保存'" left-arrow @click-left="onClickLeft"
        @click-right="onClickRight" />

    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <van-field v-model="useUserStore().user_info.tel" disabled name="手机号" label="手机号" placeholder="手机号" />
            <van-field v-model="useUserStore().user_info.username" disabled name="用户名" label="用户名" placeholder="用户名" />
            <van-field v-model="form.password" type="password" :disabled="!isEdit" name="密码" label="密码" placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]" />
        </van-cell-group>
    </van-form>


</template>

<script lang='ts' setup>
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';

const isEdit = ref(false);
const text = ref('编辑')

const form = ref({
    password: ''
});


const onClickLeft = () => history.back();
const onClickRight = () => {
    isEdit.value = !isEdit.value;
};


const onSubmit = () => {

};

</script>
<style scoped>

</style>