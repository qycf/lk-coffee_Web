<template>
    <van-card v-if="props.goods_list" v-for="(item, index) in props.goods_list" :desc="item.detail"
        :origin-price="item.originPrice" :thumb="item.thumb" :key="index">
        <template #price-top v-if="showAdd">
            <van-button @click="$router.push({ path: '/detail/' + item.id })" class="float-right add_button" icon="plus" size="small" round
                type="primary"></van-button>
        </template>
        <template #price-top v-if="props.isEdit">
            <van-button @click="emit('edit_goods', item)" class="float-right add_button" size="small" round
                type="primary">编辑</van-button>
        </template>
        <template #title>
            <div class=" text-base font-bold text-black">{{ item.title }}</div>
        </template>
        <template #price>
            <div class="text-base font-medium  text-red-500">{{ item.price }}</div>
        </template>
    </van-card>
</template>

<script lang='ts' setup>
const props = defineProps(['goods_list', 'showAdd', 'isEdit'])
const emit = defineEmits(['edit_goods'])

</script>
<style scoped>
.add_button {
    margin-top: -2rem !important;
}

.van-card {
    background-color: #fff;
}
</style>