<template>
    <div data-aos="fade-down">
        <van-cell-group class="group bg-slate-400" inset v-for="(item, key, index) in order_list" :key="index">
            <van-cell icon="location-o" size="large" title-style="margin:-1px;font-color:black;margin-buttom:5px">
                <template #title class="ml-4">
                    <span class=" text-base mt-4">{{ item.address_detail }}</span>
                    <span class=" float-right  text-sm font-sans text-gray-500">已完成</span>
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
                                <div class=" text-xs">单号:{{ item.orderId }}</div>

                            </van-col>
                            <van-col class=" text-black" span="8">合计：{{ getOrderPrice(item.goods_list)
                                }}元</van-col>
                        </van-row>
                    </div>
                </template>
            </van-cell>
        </van-cell-group>

    </div>
</template>
<script setup lang="ts">

const props = defineProps(['order_list'])

const getOrderPrice = (item: any) => {
    let price = 0
    item.forEach((item: any) => {

    })
    return price
}
</script>
<style scoped>

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