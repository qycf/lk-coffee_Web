<template>
  <van-nav-bar fixed>
    <template #title>
      <div class=" font-bold">购物袋</div>
      <!-- 收货地址 -->
      <van-tag type="primary" @click="onClickLink" v-if="false">配送至：{{
    addressStore.select_address.addressDetail ||
    addressStore.user_address[0].address
}}</van-tag>
    </template>
  </van-nav-bar>
  <van-row>
    <!-- 商品-->
    <van-col span="24" class="cart_list mt-12">
      <van-swipe-cell class="w-full mb-2 " v-for="(item, index) in cartStore.cart_list" :key="index">
        <van-card :thumb="item.thumb" :origin-price="item.origin_price">
          <template #title>
            <div class=" text-base font-bold text-black">{{ item.name }}</div>
          </template>
          <template #price>
            <div class="text-base font-medium  text-red-500">￥{{ item.price }}</div>
          </template>
          <template #tags>
            <van-tag class="mt-3" plain type="danger">{{ item.temperature }}</van-tag>
            <van-tag class="mx-2" type="primary">{{ item.cup }}</van-tag>
            <van-tag type="success">{{ item.sugar }}</van-tag>
          </template>
          <template #price-top>
            <van-stepper class=" float-right" v-model="item.count" min="0" theme="round" button-size="22"
              disable-input />
          </template>
        </van-card>
        <template #right>
          <van-button square @click="delete_good(item.id)" text="删除" type="danger" class="delete-button" />
        </template>
      </van-swipe-cell>
      <van-empty v-if="cartStore.cart_list.length < 1" description="挑点好喝的装入购物袋" />
    </van-col>
    <van-col>
      <van-submit-bar class=" mb-16 bg-black" :price="(totalPrice * 100)" :disabled="disabled" button-text="提交订单"
        @submit="onSubmit">
      </van-submit-bar>
    </van-col>
  </van-row>

</template>

<script lang='ts' setup>
import { computed, onMounted, ref } from 'vue';
import { useCartStore } from '@/stores/cart';
import { useUserStore } from '@/stores/user';
import router from '@/router';
// Toast
import { showNotify } from 'vant';
import 'vant/es/notify/style';
import { putUserOrder } from '@/api/order';
import { useAddressStore } from '@/stores/address';


const addressStore = useAddressStore()


const onClickLink = () => {
  router.push('/Account/address/?type=cart')
}

const cartStore = useCartStore()
const userStore = useUserStore()
const disabled = ref(false)
const delete_good = (id: number) => {
  cartStore.cart_list = cartStore.cart_list.filter((item) => item.id !== id)
  if (cartStore.cart_list.length === 0) {
    disabled.value = true
  }
}

const onSubmit = () => {
  console.log(addressStore.select_address.id);
  let cart_order = ref([] as any)
  if (!userStore.token) {
    showNotify({ type: 'danger', message: '请先登录' });
    // 1秒后执行跳转登录
    setTimeout(() => {
      router.push('/login')
    }, 1500);
    return
  }
  let order_id = createordernum();
  // 订单列表
  let order_goods = ref([] as any)
  cartStore.cart_list.forEach((item) => {
    let { id, count, cup, sugar, temperature } = item
    order_goods.value.push({ order_id, goods_id: id, count, cup, sugar, temperature })
  })
  cart_order.value = {
    order_id,
    address_id: addressStore.select_address.id | addressStore.user_address[0].id,
    goods_list: order_goods.value,
    user_order: {
      order_id: order_id,
      user_id: userStore.user_info.id
    },
    order_address: {
      order_id: order_id,
      address_id: addressStore.select_address.id
    }
  }

  putUserOrder(cart_order.value).then(res => {
    if (res.data.code != 200) {
      showNotify({ type: 'danger', message: '提交订单失败' });
    } else {
      cartStore.cart_list = []
      showNotify({ type: 'success', message: '提交订单成功' });
    }
  })
}

// 计算cart中商品总价
const totalPrice = computed(() => {
  return cartStore.cart_list.reduce((total, item) => {
    if (item.count === 0) {
      cartStore.cart_list = cartStore.cart_list.filter((_item) => _item.id !== item.id)
    }
    return total + item.price * item.count
  }, 0)
})


const setTimeDateFmt = (s: any) => {
  return s < 10 ? '0' + s : s;
}

//基于年月日时分秒+随机数生成订单编号
const createordernum = () => {
  const now = new Date()
  let month = setTimeDateFmt(now.getMonth() + 1)
  let day = setTimeDateFmt(now.getDate())
  let hour = setTimeDateFmt(now.getHours())
  let minutes = setTimeDateFmt(now.getMinutes())
  let seconds = setTimeDateFmt(now.getSeconds())
  return now.getFullYear().toString() + month.toString() + day + hour + minutes + seconds + (Math.round(Math.random() * 1000000)).toString();
}


</script>
<style scoped>
.goods-card {
  margin: 0;
  background-color: white;
  width: 100%;
}

.delete-button {
  height: 100%;
}

.van-divider {
  font-size: 1.5rem;
  font-family: 'Microsoft YaHei';
  font-weight: 500;
}

.cart_list {
  overflow: auto;
  width: -webkit-fill-available;
  height: calc(100vh - 160px);
}
</style>