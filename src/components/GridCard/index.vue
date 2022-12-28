<template>
    <div class="GridCard-component">
        <div class="GridCard-title" v-if="title != undefined" :style="titleStyle">
            <span>{{ title }}</span>
        </div>
        <van-grid :border="false" :column-num="columnNum">
            <van-gridItem v-for="item in items" :text="item.text" :dot="item.dot" :badge="item.badge" :url="item.url"
                :to="item.to">
                <template #icon>
                    <svg-icon v-if="item.svg" :name="item.svg"></svg-icon>
                    <van-icon v-else-if="item.icon" :name="item.icon"></van-icon>
                    <van-icon v-else name="photo-o"></van-icon>
                </template>
            </van-gridItem>
            <van-gridItem v-if="isSystemCard" text="退出登录" @click="onLogout">
                <template #icon>
                    <van-icon name="close"></van-icon>
                </template>
            </van-gridItem>
        </van-grid>
    </div>
</template>
<script setup lang='ts'>
import { logout } from '@/api/user';
import router from '@/router';
import { useUserStore } from '@/stores/user';
import { showNotify } from 'vant';


const props = defineProps({
    title: {
        type: String,
        default: undefined
    },
    titleStyle: {
        type: Object,
        default: {}
    },
    columnNum: {
        type: Number,
        default: 4
    },
    items: {
        type: Object,
        default: {}
    },
    isSystemCard: {
        type: Boolean,
        default: false
    }
})

const userStore = useUserStore()


const onLogout = async () => {
    let res = await logout()
    if (res) {
        showNotify({ type: 'success', message: '退出成功' });
        userStore.setDataEmpty();
        router.push('/login');
    }
}
</script>
<style lang="scss" scoped>
.GridCard-component {
    overflow: hidden;
    margin: 5px 20px 5px 20px;
    border-radius: 10px;
    background-color: white;

    .GridCard-title {
        margin: 15px 15px 0px 20px;

        span {
            font-size: 18px;
            font-weight: 500;
        }
    }
}
</style>