<template>
    <RouterView />
</template>
  
<script lang='ts' setup>
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import router from '@/router';



onMounted(() => {
    let userStore = useUserStore();
    if (!userStore.token && userStore.user_info.roleCode != 'user') {
        router.push('/login')
    }

});

</script>
<style scoped>

</style>