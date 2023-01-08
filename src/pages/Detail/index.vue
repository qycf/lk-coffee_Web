
<template>
    <van-nav-bar fixed title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="h-full">
        <van-image width="100%" height="18rem" fit="fill" :src="goods_detail?.thumb" />
        <div class=" font-black text-2xl ml-3 my-4">{{ goods_detail?.title }}</div>
        <div class="ml-3 my-2">价格：
            {{ form_data.cup == '大杯' ? goods_detail?.price as number + 1.5
        : goods_detail?.price
}}</div>
        <van-form @submit="onSubmit">
            <van-field name="cup" label="杯型" label-width="34">
                <template #input>
                    <van-radio-group v-model="form_data.cup" direction="horizontal">
                        <van-radio name="中杯" shape="square">中杯</van-radio>
                        <van-radio name="大杯" shape="square">大杯</van-radio>
                    </van-radio-group>
                </template>
            </van-field>

            <van-field name="temperature" label="温度" label-width="34">
                <template #input>
                    <van-radio-group v-model="form_data.temperature" direction="horizontal">
                        <van-radio name="冰" shape="square">冰</van-radio>
                        <van-radio name="热" shape="square">热</van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <van-field name="sugar" label="糖度" label-width="34">
                <template #input>
                    <van-radio-group v-model="form_data.sugar" direction="horizontal">
                        <van-radio name="不加糖" shape="square">不加糖</van-radio>
                        <van-radio name="半糖" shape="square">半糖</van-radio>
                        <van-radio name="标准塘" shape="square">标准塘</van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <div class="p-3 mt-4">
                <span>选择数量</span>
                <van-stepper class=" float-right mb-4" v-model="form_data.count" theme="round" button-size="22"
                    disable-input />
                <div class="mt-4 mb-2 text-gray-400">商品描述</div>
                <div class=" text-sm text-gray-400">{{ goods_detail?.detail }}</div>
            </div>
            <van-submit-bar button-text="提交订单" @submit="onSubmit">

                <!-- <van-button icon="cart" type="primary" /> -->

                <van-badge :content="cart_count" :offset="[-10, 6]">
                    <lord-icon @Click="$router.push('/cart')" src="https://cdn.lordicon.com/cllunfud.json"
                        trigger="loop" delay="2000" style="width:50px;height:50px"></lord-icon>
                    <!-- <span class=" text-xs">购物袋</span> -->
                </van-badge>
                <!-- <van-icon class=" mx-5" size="30" name="like" :color="isLike ? 'red' : 'grey'" /> -->
                <lord-icon @Click="onAddLike" src="https://cdn.lordicon.com/hqrgkqvs.json" trigger="click"
                    :colors="isLike ? 'outline:#121331,primary:#ee6d66,secondary:#ebe6ef' : 'outline:#121331,primary:#b4b4b4,secondary:#ebe6ef'"
                    style="width:50px;height:50px" />

                <!-- <div class=" text-xs ">{{ isLike ? '已收藏' : '收藏' }} </div> -->

                <!-- <van-button class=" like_btn" icon="like" type="primary"></van-button> -->
                <template #button>
                    <van-button type="primary" size="large" round native-type="submit">
                        加入购物袋
                    </van-button>
                </template>

            </van-submit-bar>
        </van-form>
    </div>



</template>

<script lang='ts' setup>
import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';

import { useGoodsStore } from '@/stores/goods';
import { onMounted, ref } from 'vue';
import { useCartStore } from "@/stores/cart";
import { addLike, getGoodsById } from '@/api/goods';
import { useUserStore } from '@/stores/user';
import router from '@/router';

defineElement(lottie.loadAnimation);
const goods_id = router.currentRoute.value.params.id as unknown as number

const goods_detail = ref<goodsList>()
const cartStore = useCartStore()
const goodsStore = useGoodsStore()
const onClickLeft = () => history.back();
const cart_count = ref(cartStore.cart_list.length)
let form_data = ref({
    id: goods_id,
    cup: '中杯',
    temperature: '冰',
    sugar: '不加糖',
    count: 1
})

const onSubmit = (values: any) => {
    let goods = {
        id: goods_id,
        name: goods_detail.value?.title,
        thumb: goods_detail.value?.thumb,
        price: values.cup == '2' ? goods_detail.value?.price as number + 1.5 : goods_detail.value?.price,
        cup: values.cup,
        temperature: values.temperature,
        sugar: values.sugar,
        count: form_data.value.count,
        origin_price: goods_detail.value?.originPrice
    }
    cartStore.addCart(goods)
    cart_count.value = cartStore.cart_list.length
};


const onAddLike = async () => {
    isLike.value = !isLike.value
    await addLike({ user_id: useUserStore().user_info.id, goods_id: goods_id })
    if (!isLike.value) {
        goodsStore.goods_like = goodsStore.goods_like.filter((item: any) => item.goods_id != goods_id)
    } else {
        goodsStore.goods_like.push({ user_id: useUserStore().user_info.id, goods_id: goods_id })
    }
}
const isLike = ref(false)
onMounted(() => {

    getGoodsById(router.currentRoute.value.params.id as unknown as number).then((res: any) => {
        goods_detail.value = res.data.data.goods
        console.log(res.data.data);
        isLike.value = res.data.data.isLike

    })
    cart_count.value = cartStore.cart_list.length
})

console.log(router.currentRoute.value.params.id);


</script>
<style scoped>
.van-button {
    width: 250px;
}

.like_btn {
    margin-left: 0.5rem !important;
    margin-right: 0.5rem !important;
    border: 0;
    height: 4rem;
}
</style>