<template>
  <div data-aos="fade-down">
    <GoodsCard :goods_list="props.goods_list" :showAdd="true" @add_cart="add_cart"></GoodsCard>
  </div>
  <van-dialog class="dialog" :showConfirmButton="false" v-model:show="show">
    <Goods @closeDialog="closeDialog"></Goods>
  </van-dialog>
</template>

<script lang='ts' setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Goods from './goods.vue';
import { useGoodsStore } from '../../../stores/goods'
import GoodsCard from '@/pages/components/GoodsCard.vue';

const router = useRouter()

const show = ref(false)

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

const closeDialog = () => {
  show.value = false
}
// const goods_list = ref()

onMounted(() => {
  // getGoodsListByMenuId(useMenuStore().activeMenu).then((res: any) => {
  //   goodsStore.goods_list = goods_list.value = res.data.data
  // })
})


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