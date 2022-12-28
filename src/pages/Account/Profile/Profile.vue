<template>
    <van-nav-bar title="个人资料" left-text="返回" left-arrow @click-left="onClickLeft" />

    <van-cell-group inset>
        <van-cell icon="" title="头像" is-link value="内容" @click="(show = true)">
            <van-image class="profile-info-avatar" round fit="cover"
                :src="userStore.user_info.avatar || default_avatar" />
        </van-cell>
        <van-cell title="手机号" is-link to="/account/profile/edit?type=tel" :value="userStore.user_info.tel" />
        <van-cell title="用户名" is-link to="/account/profile/edit?type=username" :value="userStore.user_info.username" />
        <van-cell title="密码" is-link to="/account/profile/edit?type=password" value="修改密码" />
        <van-cell title="个性签名" is-link to="/account/profile/edit?type=detail" :value="userStore.user_info.detail || default_detail" />

    </van-cell-group>

    <van-action-sheet v-model:show="show" :actions="actions" cancel-text="取消" close-on-click-action
        @select="onSelect" />
    <van-uploader ref="uploaderRef" :show-upload="false" :before-read="beforeRead" :after-read="afterRead"
        result-type="file" />
</template>

<script lang='ts' setup>
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';
import type { UploaderInstance } from 'vant';
import http from '@/utils/http';
import axios from 'axios';
import { setRandomAvatar } from '@/api/avatar';
import { showNotify } from 'vant';
import 'vant/es/notify/style';

const uploaderRef = ref<UploaderInstance>();

const userStore = useUserStore()
const isEdit = ref(false);
const show = ref(false)
const default_avatar = 'https://img.51miz.com/Element/00/88/08/86/716b81c7_E880886_bebe0ef3.png'
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

const onSelect = async (item: any) => {
    // 默认情况下点击选项时不会自动收起
    // 可以通过 close-on-click-action 属性开启自动收起
    // index==1?
    if (item.index == 2) {
        let res = await setRandomAvatar()
        if (res) {
            userStore.user_info.avatar = res.data.data.imgurl
        }
    } else {
        uploaderRef.value?.chooseFile();
    }
    show.value = false;
}

const beforeRead = (file: any) => {
    if (file.type !== 'image/jpeg') {
        showNotify({ type: 'danger', message: '请选择正确的图片格式' });
        return false;
    }
    return true;
};

const afterRead = async (file: any) => {	//文件读取完成后的回调函数
    let params = new FormData()
    params.append('file', file.file)
    let res = await axios.post('http://127.0.0.1:8080/user/avatar', params, {
        headers: {
            'lktoken': userStore.token,
            'Content-Type': 'multipart/form-data'
        }
    })
    if (res) {
        userStore.user_info.avatar = res.data.data.imgurl
        showNotify({ type: 'success', message: '头像设置成功' });
    }
}


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