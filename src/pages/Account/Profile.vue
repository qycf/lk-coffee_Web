<template>
    <van-nav-bar title="个人资料" left-text="返回" :right-text="!isEdit ? '编辑' : '保存'" left-arrow @click-left="onClickLeft"
        @click-right="onClickRight" />

    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <van-cell icon="" title="头像" is-link value="内容" @click="(show = true)">
                <van-image class="profile-info-avatar" round fit="cover"
                    src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
            </van-cell>


            <van-field input-align="right" v-model="userStore.user_info.tel" disabled name="手机号" label="手机号"
                placeholder="手机号" />
            <van-field input-align="right" v-model="userStore.user_info.username" disabled name="用户名" label="用户名"
                placeholder="用户名" />
            <van-field input-align="right" v-model="form.password" type="password" :disabled="!isEdit" name="密码"
                label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]" />
        </van-cell-group>

    </van-form>

    <van-action-sheet v-model:show="show" :actions="actions" cancel-text="取消" close-on-click-action
        @select="onSelect" />
    <van-uploader ref="uploaderRef" :show-upload="false">

    </van-uploader>

</template>

<script lang='ts' setup>
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';
import type { UploaderInstance } from 'vant';

const uploaderRef = ref<UploaderInstance>();

const userStore = useUserStore()
const isEdit = ref(false);
const show = ref(false)

const actions = [
    { name: '点击上传', index: 1 },
    { name: '随机头像', index: 2 },
];
const form = ref({
    password: ''
});


const onClickLeft = () => history.back();
const onClickRight = () => {
    isEdit.value = !isEdit.value;
};

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