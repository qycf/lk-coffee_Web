<template>
    <van-row>
        <van-col span="24">
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="image in images" :key="image">
                    <img :src="image" />
                </van-swipe-item>
            </van-swipe>
        </van-col>
        <van-col span="24">
            <van-notice-bar left-icon="volume-o" text="为欢庆圣诞节，lk咖啡今日上新圣诞节新品咖啡，欢迎新老顾客选购！" />
        </van-col>

        <van-col class="mt-3" span="8" v-for="(item, index) in icon_list">
            <van-icon size="8rem" :name="item.url" @click="$router.push('/menu')" :key="index" />
        </van-col>

        <van-col span="24">
            <div class="px-4 pt-4 font-bold">猜你喜欢</div>
        </van-col>
        <div id="goodListId" v-if="goods_list">
            <van-col span="24">
                <GoodsList :goods_list="goods_list" showAdd="false" />
            </van-col>
        </div>

    </van-row>




</template>

<script lang='ts' setup>
import { getGoodsByRandom } from '@/api/goods';
import { onMounted, ref } from 'vue';
const images = ref([
    'https://tse2-mm.cn.bing.net/th/id/OIP-C.GpT6Ei4X_Khi3XZ-WQN9XQHaEK?w=326&h=183&c=7&r=0&o=5&dpr=2&pid=1.7',
    'https://tse2-mm.cn.bing.net/th/id/OIP-C.GpT6Ei4X_Khi3XZ-WQN9XQHaEK?w=326&h=183&c=7&r=0&o=5&dpr=2&pid=1.7',
    'https://tse2-mm.cn.bing.net/th/id/OIP-C.GpT6Ei4X_Khi3XZ-WQN9XQHaEK?w=326&h=183&c=7&r=0&o=5&dpr=2&pid=1.7',
    'https://tse2-mm.cn.bing.net/th/id/OIP-C.GpT6Ei4X_Khi3XZ-WQN9XQHaEK?w=326&h=183&c=7&r=0&o=5&dpr=2&pid=1.7',
]);

const icon_list = ref([
    {
        url: 'https://img1.imgtp.com/2022/11/30/gdzLRBeK.jpg',
    },
    {
        url: 'https://img1.imgtp.com/2022/11/30/ABcAD8Uw.jpg',
    },
    {
        url: 'https://img1.imgtp.com/2022/11/30/IDO8qcUI.jpg',
    },
])


const goods_list = ref()
onMounted(async () => {
    let res = await getGoodsByRandom()
    if (res) {
        goods_list.value = res.data.data
    }
});

</script>
<style scoped>
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
}

#goodListId {
    overflow: auto;
    width: -webkit-fill-available;
    height: calc(100vh - 170px);
}
</style>