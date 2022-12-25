<template>
    <van-nav-bar v-if="$route.query.type == 'cart'" fixed title="地址管理" left-text="返回" left-arrow
        @click-left="onClickLeft" right-text="保存" @click-right="onSetAddress" />
    <van-nav-bar v-else fixed title="地址管理" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="mt-12">
        <van-address-list v-if="addressStore.default_address.id" class="default_address" v-model="chosenAddressId"
            :list="[addressStore.default_address]" default-tag-text="默认" @add="onAdd" @edit="onEdit" />
        <van-address-list v-model="chosenAddressId" :list="addressStore.user_address" default-tag-text="默认" @add="onAdd"
            @edit="onEdit" />
    </div>
    <!-- <van-empty v-if="!(addressStore.user_address&& addressStore.default_address.id != null)" class=" mt-36"
        image="https://i.328888.xyz/2022/12/22/AsOFL.png" :image-size="[190, 170]" description="没有地址" /> -->

    <van-dialog v-model:show="show" title="标题" closeOnClickOverlay :show-confirm-button="false">
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

const show = ref(false);
const addressStore = useAddressStore();
const chosenAddressId = ref(addressStore.default_address.id);


const onSave = async (info: any) => {
    isEdit ? updateAddress(info) : insertAddress(info);
    // showToast(address.data.msg)
    show.value = false
}


const insertAddress = async (info: any) => {
    info.isDefault = info.isDefault ? 1 : 0;
    // 如果是新增默认地址，那么修改当前默认地址为非默认地址
    if (info.isDefault == 1) {
        await setDefaultAddress(addressStore.default_address.id)
        // 取消旧的默认地址并放到地址列表中
        addressStore.cancelDefaultAddress(addressStore.default_address)
    }
    let address = await savaOrUpdateAddress(info)
    // 设置新添加的地址为默认地址
    address.data.data.isDefault ? addressStore.default_address = address.data.data : addressStore.user_address.push(address.data.data)
    chosenAddressId.value = addressStore.default_address.id
}

const updateAddress = async (info: any) => {
    info.isDefault = info.isDefault ? 1 : 0;
    await savaOrUpdateAddress(info)
    if (info.isDefault == 1) {
        await setDefaultAddress(addressStore.default_address.id)
        // 取消旧的默认地址并放到地址列表中
        addressStore.cancelDefaultAddress(addressStore.default_address)
    }
    let res = await getUserAddress()
    addressStore.setAddress(res.data.data.address_list, res.data.data.default_address)
    chosenAddressId.value = addressStore.default_address.id
    isEdit.value = false
}

const onDelete = async (info: any) => {
    show.value = false
    let res = await deleteAddressByid(info.id)
    showToast(res.data.msg)
    addressStore.deleteAddress(info.id)

}

const onAdd = () => {
    show.value = true
    address_info.value = {}
};

const address_info = ref()
const isEdit = ref(false)
const onEdit = (item: address) => {
    getAddressByid(item.id).then(res => {
        address_info.value = res.data.data
        address_info.value.isDefault = res.data.data.isDefault == 1 ? true : false;
    })
    isEdit.value = true
    show.value = true
}


const onClickLeft = () => history.back();

const onSetAddress = async () => {
    let res = await getAddressByid(chosenAddressId.value)
    if (res) {
        addressStore.select_address.addressDetail = res.data.data.addressDetail
        addressStore.select_address.id = res.data.data.id
        showToast('设置成功')
        history.back()
    }
}

onMounted(async () => {
    let res = await getUserAddress()
    if (res.data.data.address_list) {
        addressStore.setAddress(res.data.data.address_list, res.data.data.default_address)
        chosenAddressId.value = addressStore.default_address.id
    }
})

</script>
<style scoped>
.default_address {
    padding-bottom: 0;
}
</style>