<template>
    <div id="field">
        <van-nav-bar :title="fieldType[router.currentRoute.value.query.type as keyof typeof fieldType].label"
            left-text="返回" right-text="保存" left-arrow @click-left="onClickLeft" @click-right="onSave" />
        <van-field class="mt-4" v-model="value"
            :type="(fieldType[router.currentRoute.value.query.type as keyof typeof fieldType].type as FieldType)"
            :placeholder="fieldType[router.currentRoute.value.query.type as keyof typeof fieldType].placeholder" />
    </div>
</template>
<script setup lang="ts">
import { updateProfile } from '@/api/user';
import { useUserStore } from '@/stores/user';
import { FieldType } from 'vant';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();
const value = ref('');

const fieldType = {
    tel: { type: 'tel', label: '手机号', placeholder: '请输入新手机号' },
    username: { type: 'text', label: '用户名', placeholder: '请输入新用户名' },
    password: { type: 'password', label: '密码', placeholder: '请输入密码' },
    detail: { type: 'textarea', label: '个性签名', placeholder: '请输入个性签名' },
};


const onClickLeft = () => history.back();

// 保存
const onSave = async () => {
    // 更新的数据写在了url上，原因是之前更改了axios的配置，导致出现一个招不到的bug，目前bug解决了，但是由于时间问题就先暂时这样写了
    let res = await updateProfile(value.value, router.currentRoute.value.query.type as string);
    if (res) {
        const type = router.currentRoute.value.query.type as keyof typeof userStore.user_info as never;
        // 手机号脱敏处理
        if (type === 'tel') {
            value.value = value.value.slice(0, 3) + '****' + value.value.slice(value.value.length - 4)
        }
        if (!(type === 'password')) {
            userStore.update(value.value as never, type);
        }
        history.back()
    }

};
</script>
<style scoped>
#field {
    height: 100%;
    background-color: #f2f2f2
}
</style>