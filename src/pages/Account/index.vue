<template>
  <div class="profile-container">
    <div class="profile-header">
      <div class="profile-header-inner">
        <div class="profile-info">
          <van-image class="profile-info-avatar" round fit="cover"
            :src="userStore.user_info.avatar || default_avatar"></van-image>
          <div class="profile-info-main">
            <span class="profile-info-main-nickname">{{ userStore.user_info.username }}</span>
            <span class="profile-info-main-phone my-1">{{ userStore.user_info.tel }}</span>
            <span class="profile-info-main-phone">{{ userStore.user_info.detail || default_detail }}</span>
          </div>
        </div>
        <div class="profile-number mt-6">
          <div class="profile-number-box">
            <span class="profile-number-box-num">1,892</span>
            <span class="profile-number-box-text">累计订单</span>
          </div>
          <div class="profile-number-box">
            <span class="profile-number-box-num">￥{{ today_expend || 0 }}</span>
            <span class="profile-number-box-text">今日消费</span>
          </div>

        </div>
      </div>
      <GridCard class="profile-action-card" :items="ActionCard"></GridCard>
      <GridCard :columnNum="3" :isSystemCard="true" title="系统专区" :items="SystemCard"></GridCard>
    </div>
  </div>
</template>
  
<script setup lang="ts">

import { onMounted, reactive, ref } from 'vue';
import { useUserStore } from '@/stores/user';
import GridCard from "@/components/GridCard/index.vue";

import { getUserAddress } from '@/api/address';
import { useAddressStore } from '@/stores/address';
import { getUserTodayExpend } from '@/api/user';

const userStore = useUserStore()
const default_avatar = 'https://img.51miz.com/Element/00/88/08/86/716b81c7_E880886_bebe0ef3.png'
const today_expend = ref()
const default_detail = '这个人很懒，没有签名。'
const SystemCard = reactive([
  {
    text: '账号管理',
    icon: 'manager-o',
    to: '/account/profile'
  },
  {
    text: '联系客服',
    icon: 'chat-o',
    url: 'https://github.com/Coder-XiaoYi/vue-mobile-template'
  },
  {
    text: '在Github点赞',
    icon: 'good-job-o',
    url: 'https://github.com/qycf/lk-coffee_Web'
  },
])

const ActionCard = reactive({
  Like: {
    text: '我的喜欢',
    svg: 'Like',
    to: '/account/manage/like'
  },
  Order: {
    text: '我的订单',
    svg: 'Order',
    dot: true,
    to: '/account/manage/order'
  },
  Address: {
    text: '收获地址',
    svg: 'Address',
    badge: useAddressStore().user_address.length,
    to: '/account/manage/address'
  },
  Friend: {
    text: '邀请好友',
    svg: 'Friend'
  }
})


onMounted(async () => {
  if (userStore.user_info.roleCode == "admin") {
    console.log('管理员');
    SystemCard.unshift({
      text: '菜单管理',
      icon: 'manager-o',
      to: '/account/manage/menu'
    }, {
      text: '商品管理',
      icon: 'manager-o',
      to: '/account/manage/goods'
    })
  }

  let res = await getUserAddress()
  if (res.data.data) {
    useAddressStore().setAddress(res.data.data)
  }
  let expend = await getUserTodayExpend()
  if (expend) {
    today_expend.value = expend.data.data
  }
})
</script>
  
<style lang="scss" scoped>
.profile-container {
  height: 100%;
  background-color: #f2f3f5;

  .profile-header {
    overflow: hidden;

    &-inner {
      position: relative;
      width: 100%;
      height: 240px;
      z-index: 0;

      &:after {
        width: 140%;
        height: 240px;
        position: absolute;
        left: -20%;
        top: 0;
        z-index: -1;
        content: '';
        border-radius: 0 0 50% 50%;
        background-color: #2f343e;
      }

      .profile-info {

        height: 64px;
        color: #fff;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 20px 20px 0px 20px;



        &-avatar {
          border: 3px solid #aeb0b3;
          width: 64px;
          height: 64px;
        }

        &-main {

          height: 100%;
          padding: 0px 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;

          &-nickname {
            font-size: 20px;
            font-weight: 500;
          }

          &-phone {
            font-size: 14px;
            font-weight: 300;
          }
        }
      }

      .profile-number {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        height: 50px;
        padding: 20px 10px 0px 10px;
        color: #fff;

        &-box {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          width: calc(100vh / 3);

          &-num {
            font-size: 21px;
            font-weight: 600;
          }

          &-text {
            font-size: 13px;
          }
        }
      }
    }

    .profile-action-card {
      margin: -65px 20px 20px 20px;
    }
  }

}
</style>