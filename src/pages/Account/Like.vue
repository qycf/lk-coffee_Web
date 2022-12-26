<template>

    <van-nav-bar title="我的喜欢" left-text="返回" left-arrow @click-left="onClickLeft" />
    <Content :goods_list="goods_list" />

</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';

import Content from '@/pages/Menu/components/content.vue'
import { getGoodsLike } from "@/Api/goods";
import { useGoodsStore } from '@/stores/goods';

const goods_list = ref()
const goods_like_list = async () => {
    let res = await getGoodsLike()
    if (res) {
        goods_list.value = res.data.data
        useGoodsStore().goods_like = res.data.data
    }
}

const onClickLeft = () => history.back()

onMounted(() => {
    goods_like_list()
})
</script>
