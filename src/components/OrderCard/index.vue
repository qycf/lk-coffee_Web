<template>
    <div data-aos="fade-down">
        <van-cell-group class="group bg-slate-400" inset v-for="(item, key, index) in order_list" :key="index">
            <van-cell icon="location-o" size="large" title-style="margin:-1px;font-color:black;margin-buttom:5px">
                <template #title class="ml-4">
                    <span class=" text-base mt-4">{{ item.address_detail }}</span>
                    <span class=" float-right  text-sm font-sans text-gray-500">{{ item.status == 1 ? '已完成' : '进行中'
}}</span>
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
                        <van-button class="mx-4 float-right" v-if="item.status == 0" @click="onDon(item)" type="primary"
                            size="small">确认收货</van-button>
                    </div>
                </template>
            </van-cell>
        </van-cell-group>

    </div>
</template>
<script setup lang="ts">
import { setUserOrderDone } from '@/api/order';
import { showConfirmDialog } from 'vant';
import 'vant/es/dialog/style';

const props = defineProps(['order_list'])

const getOrderPrice = (item: any) => {
    let price = 0
    item.forEach((item: any) => {
        price += item.price * item.count
    })
    return price
}

const onDon = (item: any) => {
    showConfirmDialog({
        title: '确认收获？',
        message:
            '确认收货后，如有问题请联系客服',
    })
        .then(async () => {
            let res = await setUserOrderDone(item.orderId)
            if (res) {
                item.status = 1
            }
        })
        .catch(() => {
            // on cancel
        });

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