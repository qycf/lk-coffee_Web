<template>
    <van-nav-bar title="个人中心" />
    <van-row>
        <!-- 用户头像 -->
        <van-col span="24" class="mt-6">
            <van-skeleton title avatar :row="3" :loading="false">
                <!-- 用户头像与昵称 -->
                <van-row>
                    <van-col span="4" class="ml-4 mt-12">
                        <van-image src="https://img.yzcdn.cn/vant/cat.jpeg" width="80" height="80" round />
                    </van-col>
                    <van-col span="18">
                        <van-cell-group inset>
                            <van-cell title="昵称" :value="userStore.user_info.username" />
                            <van-cell title="手机号" :value="userStore.user_info.tel" />
                            <van-cell title="幸运日" :value="userStore.user_info.create_time" />
                            <van-cell title="身份" :value="userStore.user_info.roleName" />
                        </van-cell-group>
                    </van-col>
                </van-row>
            </van-skeleton>

        </van-col>
        <van-col span="24" class="mt-7">
            <van-cell-group>
                <van-cell title="菜单管理" value="编辑添加菜单" is-link to="/admin/MenuManage" />
                <van-cell title="商品管理" value="编辑添加商品" is-link to="/admin/GoodsManage" />
                <van-cell title="我的订单" value="查看全部订单" is-link />
                <van-cell title="管理地址" value="查看取餐地址" is-link />
                <van-cell title="联系客服" value="查看全部客服" is-link />
                <van-cell title="退出登录" is-link @click="click_logout" />
            </van-cell-group>
        </van-col>
    </van-row>

</template>

<script lang='ts' setup>
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import router from '@/router';
import { logout } from '@/api/user';
import { showNotify } from 'vant';
const userStore = useUserStore();


const click_logout = () => {
    logout().then(() => {
        showNotify({ type: 'success', message: '退出成功' });
        userStore.setDataEmpty();
        router.push('/login');
    }).catch(() => {
        showNotify({ type: 'danger', message: '退出失败' });
    })
}

</script>
<style scoped>

</style>