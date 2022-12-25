<template>
    <van-nav-bar title="商品管理" left-text="返回" right-text="新增" left-arrow @click-left="onClickLeft"
        @click-right="addGoods" />


    <van-row>
        <van-col span="24">
            <van-dropdown-menu>
                <van-dropdown-item @change="onChange" v-model="menu_id" :options="(menu_list as any)" />
            </van-dropdown-menu>
        </van-col>
        <!-- 商品-->
        <van-col span="24" class="cart_list">
            <GoodsCard :goods_list="goods_list" :showAdd="false" :isEdit="true" @edit_goods="edit_goods"></GoodsCard>
        </van-col>
    </van-row>

    <van-action-sheet v-model:show="show" title="编辑">
        <van-form @submit="onSubmit" class="mt-4">
            <van-cell-group inset>
                <van-field v-model="goods_form.menu_id" is-link readonly name="menu_id" label="类别" placeholder="点击选择分类"
                    @click="showPicker = true" />
                <van-popup v-model:show="showPicker" position="bottom">
                    <van-picker :columns="goods_menu_list" @confirm="onSelect" @cancel="showPicker = false" />
                </van-popup>

                <van-field v-model="goods_form.title" name="title" label="商品名" placeholder="请输入商品名" />
                <van-field v-model="goods_form.detail" name="detail" label="描述" placeholder="请输入描述" />
                <van-field v-model="goods_form.price" name="price" label="价格" placeholder="请输入价格" />
                <van-field v-model="goods_form.originPrice" name="originPrice" label="原价" placeholder="请输入原价" />
                <van-field v-model="goods_form.thumb" name="thumb" label="图片" placeholder="请输入图片url" />
            </van-cell-group>
            <div class="mt-4 p-4">
                <van-button round block type="primary" native-type="submit">
                    保存
                </van-button>
            </div>
            <div class="p-4" v-if="!isAdd">
                <van-button round block type="danger" @click="deleteGoods">
                    删除
                </van-button>
            </div>
        </van-form>

    </van-action-sheet>

</template>

<script lang='ts' setup>
import { onMounted, ref } from 'vue';
import { useCartStore } from '@/stores/cart';
import { getGoodsListByMenuId, goodsEdit, goodsDelete } from '@/api/goods';
import GoodsCard from '../components/GoodsCard.vue';
import { getMenuList } from '@/api/menu';
import { formProps, showToast } from 'vant';

const goods_form = ref({
    title: '',
    detail: '',
    price: '',
    originPrice: '',
    thumb: '',
    menu_id: '',
    id: 1,
});
const result = ref();

const menu_id = ref(null as any);

const menu_list = ref([] as any);
const goods_menu_list = ref([] as any);
const edit_goods = async (values: any) => {
    goods_form.value = values;

    let res = await getMenuList()
    if (res) {
        goods_menu_list.value = res.data.data.map((item: any) => {
            return {
                text: item.title,
                value: item.id,
            };
        });
    }
    isAdd.value = false;
    show.value = true;
}

const get_menuList = async () => {
    let res = await getMenuList()
    if (res) {
        menu_list.value = res.data.data.map((item: any) => {
            return {
                text: item.title,
                value: item.id,
            };
        });
    }
    menu_list.value.unshift({
        text: '全部商品',
        value: null,
    });

};

const onClickLeft = () => history.back();

const isAdd = ref(false);
const showPicker = ref(false);
const onConfirm = (value: string) => {
    result.value = value;
    showPicker.value = false;
};

const onSelect = ({ selectedOptions }: any) => {
    goods_form.value.menu_id = selectedOptions[0]?.text;
    result.value = selectedOptions[0]?.value;
    showPicker.value = false;
};


const addGoods = async () => {
    let res = await getMenuList()
    if (res) {
        goods_menu_list.value = res.data.data.map((item: any) => {
            return {
                text: item.title,
                value: item.id,
            };
        });
    }
    goods_form.value = {
        title: '',
        detail: '',
        price: '',
        originPrice: '',
        thumb: '',
        menu_id: '',
        id: 1,
    };
    isAdd.value = true;
    show.value = true;
};


const onChange = (value: number | null) => {
    getGoodsList(value);
};

const goods_list = ref();

const getGoodsList = (menu_id: number | null) => {
    getGoodsListByMenuId(menu_id).then((res) => {
        goods_list.value = res.data.data
    })
}

const show = ref(false);



const onSubmit = async (values: any) => {
    if (isAdd.value) {
        console.log("isAdd", isAdd);
        goods_form.value.id = null as any;
    }
    goods_form.value.menu_id = result.value;
    let res = await goodsEdit(goods_form.value);
    if (res) {
        show.value = false;
        getGoodsList(null);
    }
};


const deleteGoods = async () => {
    let res = await goodsDelete(goods_form.value.id);
    if (res) {
        show.value = false;
        getGoodsList(null);
    }

};

onMounted(() => {
    get_menuList();
    getGoodsList(null);
});

</script>
<style scoped>
.cart_list {
    overflow: auto;
    width: -webkit-fill-available;
    height: 175vw;
}
</style>