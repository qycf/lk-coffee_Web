<template>
    <form action="/">
        <van-search @focus="showTagList = true" v-model="keyword" show-action placeholder="请输入搜索关键词" @search="onSearch"
            @cancel="onCancel" />
    </form>
    <van-row class="px-3" v-show="showTagList">
        <van-col class="py-1 mr-1" v-for="(item, index) in historyStore.keyword">
            <van-tag @click="onSearchTag(item)" :show="item.isShow" closeable :key="index" size="medium" type="primary"
                @close="onClose(item)">
                {{ item.name }}
            </van-tag>
        </van-col>
    </van-row>
    <template v-if="goods_list">
        <div data-aos="fade-down">
            <GoodsCard :goods_list="goods_list" :showAdd="true" @add_cart="add_cart"></GoodsCard>
        </div>
    </template>

</template>

<script lang='ts' setup>
import { getGoodsByKeyword } from '@/api/goods';
import router from '@/router';
import { useGoodsStore } from '@/stores/goods';
import GoodsCard from '@/components/GoodsCard/index.vue';
import { onMounted, ref } from 'vue';
import { usehistoryStore } from '@/stores/history';

const keyword = ref(router.currentRoute.value.query.keyword as string)
const historyStore = usehistoryStore()

const showTagList = ref(false);
const goods_list = ref()
const goodsStore = useGoodsStore()
const onSearch = async (value: any) => {
    router.push('/search?keyword=' + value)
    if (value === '') {
        return;
    }
    let res = await getGoodsByKeyword(value)
    let history_keywords = {
        name: value,
        isShow: true
    }
    historyStore.addKeyword(history_keywords)
    goods_list.value = res.data.data
    keyword.value = value
    showTagList.value = false;

}
const onSearchTag = (item: any) => {
    onSearch(item.name)

}
const onClose = (item: any) => {
    console.log(item.name);

    historyStore.clearKeyword(item)
}

const add_cart = (item: any) => {
    goodsStore.goods.name = item.title
    goodsStore.goods.price = item.price
    goodsStore.thumb = item.thumb
    goodsStore.detail = item.detail
    goodsStore.id = item.id
    goodsStore.goods.originPrice = item.originPrice
    router.push({ path: '/detail/' + item.id })
}

const onCancel = () => {
    router.push('/menu')
}


onMounted(() => {
    if (keyword.value) {
        onSearch(keyword.value)
    }
})

</script>
<style scoped>

</style>