<template>
    <!-- 搜索栏 -->
    <van-row class="main">
        <van-col span="24">
            <van-search v-model="key" placeholder="请输入搜索关键词" input-align="center" />
        </van-col>
        <van-sticky>
        </van-sticky>
        <!-- 标签栏 -->
        <van-col span="24">
            <van-tabs v-model:active="tabsActive">
                <van-row>
                    <van-col span="5" class="menu_list">

                        <van-tab title="经典菜单">
                            <!-- 侧栏 -->
                            <van-sidebar v-model="active" @change="onClcick">
                                <van-sidebar-item replace v-for="(item, index) in sideBarItem" :key="index"
                                    :title="item.title" :dot="item.dot" :to="item.path" :badge="item.badge" />
                            </van-sidebar>
                        </van-tab>
                    </van-col>
                    <van-col class="good" span="19" v-if="(tabsActive == 0)">
                        <router-view :key="router.fullPath"></router-view>
                    </van-col>
                </van-row>

                <van-tab title="我的常点">内容 4</van-tab>
            </van-tabs>
        </van-col>
    </van-row>
</template>

<script lang='ts' setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Content from './components/content.vue';


const router = useRoute()
const key = ref('')
const active = ref(0);
const tabsActive = ref(0);

const onClcick = (index: number) => {
    active.value = index;
}

const sideBarItem = ref([
    {
        id: 1,
        title: '人气Top',
        dot: true,
        path: '/menu'
    },
    {
        id: 2,
        title: '生酪拿铁',
        badge: 5,
        path: '/menu/slnt'
    },
    {
        id: 3,
        title: '丝绒拿铁',
        path: '/menu/srnt'
    },
    {
        id: 4,
        title: '生椰拿铁',
        path: '/menu/synt'
    }
])

</script>
<style scoped>
.main {
    width: 100%;
}

.van-sidebar-item {
    background-color: white;
}

.menu_list {
    width: auto;
    height: 100%;
    background-color: #FDF1EA;
}

#goodListId {
    overflow: auto;
    width: -webkit-fill-available;
}
</style>