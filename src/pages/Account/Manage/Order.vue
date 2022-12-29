<template >
    <van-nav-bar fixed title="所有订单" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div id="order" v-if="order_list">
        <div class="cart_list mt-14">
            <van-tabs v-model:active="active" sticky offset-top="2.9rem" animated type="line" @click-tab="onClickTab">
                <van-tab title="全部" name="">
                    <OrderCard class="mt-4" :order_list="order_list" />
                </van-tab>
                <van-tab title="进行中" name="0">
                    <OrderCard class="mt-4" :order_list="order_list" />
                </van-tab>
                <van-tab title="已完成" name="1">
                    <OrderCard class="mt-4" :order_list="order_list" />
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { getUserOrder } from '@/api/order';
import { onMounted, ref } from 'vue'
const order_list = ref()
const active = ref(0)

const onClickTab = (item: any) => {
    getUserOrderList(item.name as number)
}

const getUserOrderList = async (status?: number) => {
    const res = await getUserOrder(status)
    if (res.data.data.order_count > 0) {
        order_list.value = res.data.data.order_list
    }else{
        order_list.value = []
    }
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
    height: calc(100vh - 70px);
}

#order {
    /* overflow: auto; */
    overflow: hidden;
    background-color: rgb(245, 245, 245);
    height: 100%
}
</style>