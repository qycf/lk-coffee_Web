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

        <van-col class="mt-3" span="8">
            <van-icon size="8rem" name="https://img1.imgtp.com/2022/11/30/gdzLRBeK.jpg" @click="onClick"/>
        </van-col>
        <van-col class="mt-3" span="8">
            <van-icon size="8rem" name="https://img1.imgtp.com/2022/11/30/ABcAD8Uw.jpg" />
        </van-col>
        <van-col class="mt-3" span="8">
            <van-icon size="8rem" name="https://img1.imgtp.com/2022/11/30/IDO8qcUI.jpg" />
        </van-col>
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


const onClick = ()=>{
    console.log(123);
    
}

</script>
<style scoped>
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
}
</style>