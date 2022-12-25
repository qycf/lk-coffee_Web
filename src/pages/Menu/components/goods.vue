<template>
    <van-image width="100%" height="18rem" fit="fill" :src="useGoodsStore().thumb" />
    <div class=" font-black text-2xl ml-3 my-4">{{ useGoodsStore().goods.name }}</div>
    <div class="ml-3 my-2">价格：
        {{ form_data.cup == '大杯' ? useGoodsStore().goods.price + 1.5
                : useGoodsStore().goods.price
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

        <div class="p-4 m-4">
            <van-stepper class=" float-right mb-4" v-model="form_data.count" theme="round" button-size="22"
                disable-input />
            <van-button block type="primary" native-type="submit" size="large">
                加入购物车
            </van-button>
            <div class="my-4" />
            <van-button class="mt-12" block @click="cancel" size="large">
                取消
            </van-button>
        </div>
    </van-form>
</template>

<script lang='ts' setup>
import { ref } from 'vue';
import { useCartStore } from '@/stores/cart';
import { useGoodsStore } from '@/stores/goods';


const myEmit = defineEmits(['closeDialog'])

let form_data = ref({
    id: useGoodsStore().id,
    cup: '',
    temperature: '',
    sugar: '',
    count: 1
})

const onSubmit = (values: any) => {
    let goods = {
        id: useGoodsStore().id,
        name: useGoodsStore().goods.name,
        thumb: useGoodsStore().thumb,
        price: values.cup == '2' ? useGoodsStore().goods.price + 1.5 : useGoodsStore().goods.price,
        cup: values.cup,
        temperature: values.temperature,
        sugar: values.sugar,
        count: form_data.value.count,
        origin_price: useGoodsStore().goods.originPrice
    }

    useCartStore().addCart(goods)
    myEmit("closeDialog")
};

const cancel = () => {
    myEmit("closeDialog")
};

</script>
<style scoped>

</style>