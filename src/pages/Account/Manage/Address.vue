<template>
    <van-nav-bar v-if="$route.query.type == 'cart'" fixed title="地址管理" left-text="返回" left-arrow
        @click-left="onClickLeft" right-text="保存" @click-right="onSetAddress" />
    <van-nav-bar v-else fixed title="地址管理" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="mt-12">
        <van-address-list :switchable="$route.query.type == 'cart'?true:false" v-model="chosenAddressId" :list="addressStore.user_address" default-tag-text="默认" @add="onAdd"
            @edit="onEdit" />
    </div>
    <van-dialog v-model:show="showEdit" title="标题" closeOnClickOverlay :show-confirm-button="false">
        <van-address-edit :area-list="areaList" :show-delete="isEdit" show-set-default :address-info="address_info"
            :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @delete="onDelete" />
    </van-dialog>

</template>

<script lang='ts' setup>
import { showToast } from 'vant';
import { onMounted, ref } from 'vue';
import { areaList } from '@vant/area-data';
import { deleteAddressByid, getAddressByid, getUserAddress, savaOrUpdateAddress, setDefaultAddress } from '@/api/address';
import { useAddressStore } from '@/stores/address';


const addressStore = useAddressStore();
const chosenAddressId = ref(1);

// 地址信息
const address_info = ref()
// 是否是编辑
const isEdit = ref(false)
// 显示地址编辑框
const showEdit = ref(false);
// 保存事件,判断当前是新增还是修改
const onSave = async (info: any) => {
    isEdit ? updateAddress(info) : insertAddress(info);
    showEdit.value = false
}

// 地址新增
const insertAddress = async (info: any) => {
    info.isDefault = info.isDefault ? 1 : 0;
    // 如果是新增默认地址，那么修改当前默认地址为非默认地址
    if (info.isDefault == 1) {
        await setDefaultAddress(addressStore.user_address[0].id)
    }
    // 发送新增地址请求
    await savaOrUpdateAddress(info)
    // 获取新的用户地址数据
    get_user_address()
}

// 地址修改
const updateAddress = async (info: any) => {
    info.isDefault = info.isDefault ? 1 : 0;
    // 发起修改用户地址请求
    await savaOrUpdateAddress(info)
    // 获取新的用户地址数据
    get_user_address()
    isEdit.value = false
}

// 地址删除
const onDelete = async (info: any) => {
    // 发起删除地址请求
    let res = await deleteAddressByid(info.id)
    showToast(res.data.msg)
    addressStore.deleteAddress(info.id)
    showEdit.value = false
}

// 控制地址新增窗口显示
const onAdd = () => {
    showEdit.value = true
    address_info.value = {}
};


// 地址编辑
const onEdit = (item: address) => {
    getAddressByid(item.id).then(res => {
        address_info.value = res.data.data
        address_info.value.isDefault = res.data.data.isDefault == 1 ? true : false;
    })
    isEdit.value = true
    showEdit.value = true
}

// 返回
const onClickLeft = () => history.back();

// 设置收货地址
const onSetAddress = async () => {
    let res = await getAddressByid(chosenAddressId.value)
    if (res) {
        addressStore.select_address.addressDetail = res.data.data.addressDetail
        addressStore.select_address.id = res.data.data.id
        showToast('设置成功')
        history.back()
    }
}

onMounted(() => {
    get_user_address()
})

// 获取用户地址数据列表
const get_user_address = async () => {
    let res = await getUserAddress()
    if (res.data.data) {
        addressStore.setAddress(res.data.data)
    }
    chosenAddressId.value = 0
}

</script>
<style scoped>
.default_address {
    padding-bottom: 0;
}
</style>