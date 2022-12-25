<template>
    <Login v-if="!userStore.token"></Login>
    <Admin v-else-if="userStore.user_info.roleCode == 'admin'"></Admin>
    <Member v-else></Member>
</template>

<script lang='ts' setup>
import { useUserStore } from '@/stores/user';
import Admin from '@/pages/Admin.vue';
import Login from '@/pages/Login.vue';
import Member from './Member.vue';
const userStore = useUserStore();
</script>
<style scoped>

</style>