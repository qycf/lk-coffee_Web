<template>
    <van-nav-bar title="菜单管理" left-text="返回" right-text="新增" left-arrow @click-left="onClickLeft"
        @click-right="onClickRight" />

    <!-- <van-form @submit="onSubmit" class="mt-24">
        <van-cell-group inset>
            <van-field v-model="menu_name" name="menu_name" label="菜单名" placeholder="请输入菜单名"
                :rules="[{ required: true, message: '请填写用户名' }]" />
            <van-field v-model="menu_path" name="path" label="别名" placeholder="请输入别名" />
        </van-cell-group>
        <div style="margin: 16px margin-top:5rem;">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form> -->
    <van-cell-group>
        <van-cell class="mb-2" value="路径" size="large">
            <template #title>
                <span class=" text-black font-bold">菜单名</span>
            </template>
            <template #value>
                <span class=" text-black font-bold">路径</span>
            </template>
        </van-cell>
        <van-cell v-for="(item, index) in menu_list" size="large" :key="index" :title="item.title" :value="item.path"
            @click="editMenu(item)" />
    </van-cell-group>

    <van-action-sheet v-model:show="show" title="编辑">
        <van-form @submit="onSubmit" class="mt-4">
            <van-cell-group inset>
                <van-field v-model="menu_form.title" name="title" label="菜单名" placeholder="请输入菜单名" />
                <van-field v-model="menu_form.path" name="path" label="路径" placeholder="请输入路径" />
            </van-cell-group>
            <div class="mt-4 p-4">
                <van-button round block type="primary" native-type="submit">
                    保存
                </van-button>
            </div>
            <div class="p-4" v-if="!isAdd">
                <van-button round block type="danger" @click="deleteMenu">
                    删除
                </van-button>
            </div>
        </van-form>
    </van-action-sheet>

</template>

<script lang='ts' setup>
import { ref, onMounted } from 'vue';
import { useMenuStore } from '@/stores/menus';
import { addMenu, deleteMenuById, getMenuList } from '@/api/menu';
import { showNotify } from 'vant';
import 'vant/es/notify/style';


const menuStore = useMenuStore();

const menu_form = ref({
    id: '' as number | string,
    title: '',
    path: '',
});

const show = ref(false);
const isAdd = ref(false);
const onClickLeft = () => history.back();


const onClickRight = () => {
    isAdd.value = true;
    show.value = true;
    menu_form.value.title = '';
    menu_form.value.path = '';
    menu_form.value.id = '';

};

const onSubmit = async (values: any) => {
    let res = await addMenu(values);
    if (res) {
        showNotify({ type: 'success', message: '菜单编辑成功' });
        let menuList = await getMenuList();
        menu_list.value = menuList.data.data
        menuStore.menu_list.push(values);
        show.value = false;
    }
};

const editMenu = (item: any) => {
    isAdd.value = false;
    show.value = true;
    menu_form.value.title = item.title;
    menu_form.value.path = item.path;
    menu_form.value.id = item.id;
};


const deleteMenu = async () => {
    let res = await deleteMenuById(menu_form.value.id as number)
    if (res) {
        showNotify({ type: 'success', message: '菜单删除成功' });
        menuStore.menu_list = menuStore.menu_list.filter((item: any) => item.id !== menu_form.value.id);
        menu_list.value = menu_list.value.filter((item: any) => item.id !== menu_form.value.id);
        show.value = false;
    }
};
const menu_list = ref();

onMounted(async () => {
    let res = await getMenuList();
    if (res) {
        menu_list.value = res.data.data;
    }
});


</script>
<style scoped>
.content {
    padding: 16px 16px 160px;
}
</style>