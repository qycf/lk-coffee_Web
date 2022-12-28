<template>
  <div data-aos="fade-down">
    <GoodsCard :goods_list="props.goods_list" :showAdd="true" @add_cart="add_cart"></GoodsCard>
  </div>
</template>

<script lang='ts' setup>
import { useRouter } from 'vue-router';
import { useGoodsStore } from '@/stores/goods'
import GoodsCard from '@/components/GoodsCard/index.vue';

const router = useRouter()


const props = defineProps(['goods_list'])

const goodsStore = useGoodsStore()
const add_cart = (item: any) => {
  goodsStore.goods.name = item.title
  goodsStore.goods.price = item.price
  goodsStore.thumb = item.thumb
  goodsStore.detail = item.detail
  goodsStore.id = item.id
  goodsStore.goods.originPrice = item.originPrice
  router.push({ path: '/detail/' + item.id })
}


</script>
<style scoped>
.van-card {
  background-color: white;
}


.add_button {
  margin-top: -1.55rem;
}


.dialog {
  width: auto;
  height: 85% !important;
}
</style>