<template>

    <router-view></router-view>
    <!-- 底栏 -->
    <van-tabbar route>
        <van-tabbar-item replace :to="router.currentRoute.value.fullPath == '/' ? '/' : '/home'"
            icon="wap-home">主页</van-tabbar-item>
        <van-tabbar-item replace to="/menu" icon="shop-collect">菜单</van-tabbar-item>
        <van-tabbar-item replace to="/cart" icon="shopping-cart">购物袋</van-tabbar-item>
        <van-tabbar-item replace :to="!userStore.token ? '/login' : '/account'"
            icon="manager">我的</van-tabbar-item>
    </van-tabbar>
</template>
<script lang='ts' setup>
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();

</script>
