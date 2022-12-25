<template>
    <van-sticky>
        <van-nav-bar title="菜单">
            <template #right>
                <van-icon name="search" size="18" @click="$router.push('/search')" />
            </template>
        </van-nav-bar>
    </van-sticky>


    <!-- 菜单左右联动 -->
    <div class="menu_detail">
        <!-- 左侧菜单 -->
        <div class="menu_list">
            <van-sidebar v-model="(active as any)" @change="onClcick">
                <van-sidebar-item replace v-for="(item, index) in menuList" :key="index" :title="item.title"
                    :dot="item.dot" :to="{ path: '/menu', query: { mid: item.id }                                                        }" :badge="item.badge" />
            </van-sidebar>
        </div>
        <!-- 右侧菜单 -->
        <div id="goodListId" v-if="goods_list">
            <Content :goods_list="goods_list" />
            <!-- <router-view :key="router.currentRoute.value.fullPath"></router-view> -->
        </div>
    </div>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { useMenuStore } from '@/stores/menus';
import { getGoodsListByMenuId } from '@/api/goods';
import { getMenuList } from '@/api/menu';
import Content from './components/content.vue';

const router = useRouter()
const menuStore = useMenuStore()

const menuList = ref()
const goods_list = ref()
const active = ref(router.currentRoute.value.query.mid || 0);

const onClcick = async () => {
    goods_list.value = await (await getGoodsListByMenuId(active.value as any)).data.data;
}


onMounted(async () => {
    if (!menuStore.menu_list.length) {
        let res = await getMenuList();
        menuStore.setMenuList(res.data.data)
        menuList.value = res.data.data
    } else {
        menuList.value = menuStore.menu_list
    }
    goods_list.value = await (await getGoodsListByMenuId(active.value as any)).data.data;
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