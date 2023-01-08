<template>
  <div data-aos="fade-down">
    <GoodsCard :goods_list="props.goods_list" :showAdd="true" ></GoodsCard>
  </div>
</template>

<script lang='ts' setup>
import { useRouter } from 'vue-router';
import { useGoodsStore } from '@/stores/goods'
import GoodsCard from '@/components/GoodsCard/index.vue';

const router = useRouter()


const props = defineProps(['goods_list'])


const goodsStore = useGoodsStore()


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