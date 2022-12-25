<template>
    <van-nav-bar title="个人中心" />
    <!-- 用户头像以及信息 -->
    <van-row>
        <van-col span="24">
            <div>
                <div class="max-w-sm rounded overflow-hidden shadow-lg">
                    <div class="px-6 py-4">
                        <div class="flex items-center">
                            <img class=" w-24 h-24 rounded-full"
                                src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" alt="Avatar" />
                            <div class="ml-4">
                                <div class="font-bold text-xl mb-2">
                                    用户名:{{ userStore.user_info.username }}
                                </div>
                                <p class="text-gray-700 text-base">手机号: {{ userStore.user_info.tel }}</p>
                                <p class="text-gray-700 text-base">身份: {{ userStore.user_info.roleName }}</p>
                                <p class="text-gray-700 text-base">幸运日: {{ userStore.user_info.create_time }}</p>
                            </div>
                        </div>
                    </div>
                    <van-grid class="my-4" :column-num="2" clickable>
                        <van-grid-item to="/account/order" icon-color="#3b82f6" icon="cart-circle" text="我的订单" dot />
                        <van-grid-item to="/account/address" icon-color="#3b82f6" icon="wap-home" text="地址管理" />
                    </van-grid>
                </div>
            </div>
        </van-col>

    </van-row>


    <van-cell-group>
        <template v-for="item, index in admin_routes">
            <van-cell is-link :to="item.path" :key="index" :title="item.name"
                v-if="item.isAdmin && userStore.user_info.roleCode === 'admin'" />
        </template>
        <van-cell title="修改资料" is-link to="/account/profile" />
        <van-cell title="退出登录" is-link @click="click_logout" />
    </van-cell-group>
</template>

<script lang='ts' setup>
import { logout } from '@/api/user';
import router from '@/router';
import { useUserStore } from '@/stores/user';
import { showNotify } from 'vant';
import { admin_routes } from "@/router/admin";

const userStore = useUserStore();

const click_logout = async () => {
    let res = await logout()
    if (res) {
        showNotify({ type: 'success', message: '退出成功' });
        userStore.setDataEmpty();
        router.push('/login');
    }
}

</script>
<style scoped>
.user_cell {
    --tw-gradient-from: #3b82f6;
    --tw-gradient-to: rgb(59 130 246 / 0);
    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
    background: linear-gradient(to right, var(--tw-gradient-stops));
}

:root {
    --van-grid-item-content-background: red !important;
}
</style>