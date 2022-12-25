<template>
    <van-row>
        <van-row gutter="24">
            <van-col span="24">
                <van-swipe :autoplay="3000" lazy-render :show-indicators="false">
                    <van-swipe-item v-for="image in images" :key="image">
                        <img :src="image" />
                    </van-swipe-item>
                </van-swipe>
            </van-col>
        </van-row>

        <van-row class=" bg-white">
            <van-col span="8">
                <van-icon size="8rem" name="https://img1.imgtp.com/2022/11/30/gdzLRBeK.jpg" />
            </van-col>
            <van-col span="8">
                <van-icon size="8rem" name="https://img1.imgtp.com/2022/11/30/ABcAD8Uw.jpg" />
            </van-col>
            <van-col span="8">
                <van-icon size="8rem" name="https://img1.imgtp.com/2022/11/30/IDO8qcUI.jpg" />
            </van-col>
        </van-row>
    </van-row>




</template>

<script lang='ts' setup>
import { ref } from 'vue';

const images = ref([
    'https://tse2-mm.cn.bing.net/th/id/OIP-C.GpT6Ei4X_Khi3XZ-WQN9XQHaEK?w=326&h=183&c=7&r=0&o=5&dpr=2&pid=1.7',
    'https://tse2-mm.cn.bing.net/th/id/OIP-C.GpT6Ei4X_Khi3XZ-WQN9XQHaEK?w=326&h=183&c=7&r=0&o=5&dpr=2&pid=1.7',
    'https://tse2-mm.cn.bing.net/th/id/OIP-C.GpT6Ei4X_Khi3XZ-WQN9XQHaEK?w=326&h=183&c=7&r=0&o=5&dpr=2&pid=1.7',
    'https://tse2-mm.cn.bing.net/th/id/OIP-C.GpT6Ei4X_Khi3XZ-WQN9XQHaEK?w=326&h=183&c=7&r=0&o=5&dpr=2&pid=1.7',
]);

</script>
<style scoped>
.van-swipe__indicators {
    bottom: -4.5rem !important;
}
</style>