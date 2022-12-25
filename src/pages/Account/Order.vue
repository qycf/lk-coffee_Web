<template >
    <van-nav-bar fixed title="所有订单" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div id="order" v-if="order_list">
        <div class="cart_list mt-14">
            <div data-aos="fade-down">
            <van-cell-group class="group bg-slate-400" inset v-for="(item, key, index) in order_list" :key="index">
                <van-cell icon="location-o" size="large" title-style="margin:-1px;font-color:black;margin-buttom:5px">
                    <template #title class="ml-4">
                        <span class=" text-base mt-4">{{ item.address_detail }}</span>
                        <van-divider class="divider" />
                    </template>
                    <template #label>
                        <van-card v-for="order in item.goods_list" :num="order.count" :thumb="order.thumb"
                            :origin-price="order.originPrice">
                            <template #title>
                                <div class=" text-base font-bold text-black">{{ order.title }}</div>
                            </template>
                            <template #price>
                                <div class="text-base font-medium  text-red-500">￥{{ order.price }}</div>
                            </template>
                            <template #tags>
                                <van-tag class="mt-3" plain type="danger">{{ order.temperature }}</van-tag>
                                <van-tag class="mx-2" type="primary">{{ order.cup }}</van-tag>
                                <van-tag type="success">{{ order.sugar }}</van-tag>
                            </template>
                        </van-card>
                        <div class="card_foot">
                            <van-divider dashed />
                            <van-row class="mb-4">
                                <van-col span="15">
                                    {{ item.create_time }}
                        <div class=" text-xs">单号:{{item.orderId}}</div>

                                </van-col>
                                <van-col class=" text-black" span="8">合计：{{ getOrderPrice(item.goods_list) }}元</van-col>
                            </van-row>
                        </div>
                    </template>
                </van-cell>
            </van-cell-group>
        </div>
        </div>
    </div>



</template>

<script lang='ts' setup>
import { getUserOrder } from '@/api/order';
import { computed, onMounted, ref } from 'vue'
const order_list = ref()

const getUserOrderList = async () => {
    const res = await getUserOrder()
    if (res.data.data.order_count > 0) {
        order_list.value = res.data.data.order_list
    }
}

const getOrderPrice = (item: any) => {
    let price = 0
    item.forEach((item: any) => {
        price += item.price * item.count
    })
    return price
}

onMounted(() => {
    getUserOrderList()
})



const onClickLeft = () => history.back();
</script>
<style scoped>
.cart_list {
    overflow: auto;
    width: -webkit-fill-available;
    height: calc(100vh - 100px);
}

#order {
    /* overflow: auto; */
    overflow: hidden;
    background-color: rgb(245, 245, 245);
    /* height: 90% */
}

.card_foot .van-divider {
    display: flex;
    align-items: center;
    margin: var(--van-divider-margin);
    color: var(--van-divider-text-color);
    font-size: var(--van-divider-font-size);
    line-height: var(--van-divider-line-height);
    border-color: rgb(172, 170, 170);
    border-style: dashed;
    border-width: 0;
}

.van-card {
    background-color: #fff;
}

.van-cell__left-icon {
    margin: 3px !important;
}


.group {
    margin-bottom: 1rem !important;
}
</style>