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
            <van-sidebar v-model="(active as any)" replace>
                <van-sidebar-item replace v-for="(item, index) in menuList" @click="onClcick(item)" :index="item.id"
                    :title="item.title" :dot="item.dot" :to="{ path: '/menu', query: { mid: item.mid, cid: item.id } }"
                    :badge="item.badge" />
            </van-sidebar>
        </div>
        <!-- 右侧菜单 -->
        <div id="goodListId" v-if="goods_list">
            <GoodsList :goods_list="goods_list" />
        </div>
    </div>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { useMenuStore } from '@/stores/menus';
import { getGoodsListByMenuId } from '@/api/goods';
import { getMenuList } from '@/api/menu';
import GoodsList from '@/components/GoodsList/index.vue';

const router = useRouter()
const menuStore = useMenuStore()
const active = ref(router.currentRoute.value.query.mid || 0);
// 定义menuList为list类型
const menuList = ref([] as any)


const goods_list = ref()


const onClcick = async (item: any) => {
    let res = await getGoodsListByMenuId(item.id)
    if (res) {
        goods_list.value = res.data.data
    } else {
        goods_list.value = []
    }
}


onMounted(async () => {
    let res = await getMenuList();
    if (res) {
        menuStore.setMenuList(res.data.data)
        menuList.value = res.data.data
        let list_res = await getGoodsListByMenuId(router.currentRoute.value.query.cid as unknown as number || 0)
        if (list_res) {
            goods_list.value = list_res.data.data
        }
    }
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