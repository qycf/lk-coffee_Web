<template>
    <van-sticky>
        <van-nav-bar title="菜单">
            <template #right>
                <van-icon name="search" size="18" @click="$router.push('/search')" />
            </template>
        </van-nav-bar>
    </van-sticky>


    <!-- 菜单左右联动 -->
    <van-tabs v-model:active="tabsActive">
        <van-tab title="经典菜单">
            <div class="menu_detail">
                <!-- 左侧菜单 -->
                <div class="menu_list">
                    <van-sidebar v-model="active" @change="onClcick">
                        <van-sidebar-item replace v-for="(item, index) in menuList" :key="index" :title="item.title"
                            :dot="item.dot" :to="item.path" :badge="item.badge" />
                    </van-sidebar>
                </div>
                <!-- 右侧菜单 -->
                <div id="goodListId" v-if="goods_list">
                    <Content :goods_list="goods_list" />
                    <!-- <router-view :key="router.currentRoute.value.fullPath"></router-view> -->
                </div>
            </div>
        </van-tab>
        <van-tab title="我的喜欢">
            <Content :goods_list="user_like" />
        </van-tab>

    </van-tabs>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useMenuStore } from '@/stores/menus';
import { getGoodsLike, getGoodsListByMenuId, getUserLike } from '@/api/goods';
import { getMenuList } from '@/api/menu';
import { useGoodsStore } from '@/stores/goods';
import GoodsCard from '@/pages/components/GoodsCard.vue';
import Goods from '@/pages/Menu/components/Goods.vue';
import Content from './components/content.vue';

const router = useRouter()

const menuStore = useMenuStore()

const tabsActive = ref(0);
const active = ref(0);
const goods_list = ref()
const goodsStore = useGoodsStore()
const user_like = ref()
const onClcick = async (index: number) => {
    goods_list.value = await (await getGoodsListByMenuId(index + 1)).data.data;
    active.value = index;
}

const menuList = ref()
const userLikeList = ref()
const show = ref(false)

onMounted(async () => {
    if (!menuStore.menu_list.length) {
        getMenuList().then(res => {
            menuStore.setMenuList(res.data.data)
            menuList.value = res.data.data
        })
    } else {
        menuList.value = menuStore.menu_list
    }
    goods_list.value = await (await getGoodsListByMenuId(1)).data.data;
    user_like.value = await (await getUserLike()).data.data
    let res = await getGoodsLike()
    userLikeList.value = await (await getUserLike()).data.data
    useGoodsStore().goods_like = res.data.data
})

</script>

<style scoped>
.van-sidebar-item {
    background-color: white;
}

.menu_detail {
    height: calc(100vh - 140px);
    display: flex;
}

.menu_list {
    width: auto;
    height: 100%;
    background-color: #f7f8fa;
}

#goodListId {
    overflow: auto;
    width: -webkit-fill-available;
}

/* 选中标签三角标识 */
.van-sidebar-item--select:before {
    position: absolute;
    top: 50%;
    left: 0;
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-left: 10px solid #FF6900;
    border-bottom: 5px solid transparent;
    -webkit-transform: translateY(-50%);
    background-color: #fff;
    transform: translateY(-50%);
    content: '';
}
</style>