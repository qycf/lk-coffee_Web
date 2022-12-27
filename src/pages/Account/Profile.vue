<template>
    <van-nav-bar title="个人资料" left-text="返回" left-arrow @click-left="onClickLeft" />

    <van-cell-group inset>
        <van-cell icon="" title="头像" is-link value="内容" @click="(show = true)">
            <van-image class="profile-info-avatar" round fit="cover"
                src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
        </van-cell>
        <van-cell title="手机号" is-link :value="userStore.user_info.tel" />
        <van-cell title="用户名" is-link :value="userStore.user_info.username" />
        <van-cell title="密码" is-link value="修改密码" />
        <van-cell title="个性签名" is-link :value="userStore.user_info.detail || default_detail" />

    </van-cell-group>

    <van-action-sheet v-model:show="show" :actions="actions" cancel-text="取消" close-on-click-action
        @select="onSelect" />
    <van-uploader ref="uploaderRef" :show-upload="false" />
</template>

<script lang='ts' setup>
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';
import type { UploaderInstance } from 'vant';

const uploaderRef = ref<UploaderInstance>();

const userStore = useUserStore()
const isEdit = ref(false);
const show = ref(false)
const default_detail = '这个人很懒，没有签名。'

const actions = [
    { name: '点击上传', index: 1 },
    { name: '随机头像', index: 2 },
];
const form = ref({
    password: '',
    detail: ''
});
const onClickLeft = () => history.back();

const onSelect = () => {
    // 默认情况下点击选项时不会自动收起
    // 可以通过 close-on-click-action 属性开启自动收起
    // index==1?
    show.value = false;
    uploaderRef.value?.chooseFile();
}


const onSubmit = () => {

};

</script>
<style scoped>
.profile-info-avatar {
    width: 30px;
    height: 30px;
}

.van-uploader__input-wrapper {
    width: 100%;
}
</style>