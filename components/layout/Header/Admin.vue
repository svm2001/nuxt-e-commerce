<script setup lang="ts">
import {useUserStore} from "~/store/user";
import {useRouter} from "#vue-router";

const userStore = useUserStore();
const router = useRouter();

const handleLogout = () => {
    userStore.logout();
    router.push('/login');
};
</script>

<template>

    <header class="adminHeader px-5 flex items-center justify-between min-h-[80px] max-h-[80px] bg-white rounded-br-lg rounded-bl-lg">
        <div class="flex items-center gap-3">
            <div class="border-2 border-blue-900 rounded-full overflow-hidden">
                <img :src="userStore.user.avatar" :alt="userStore.user.name" class="w-12 h-12">
            </div>
            <div class="text-blue-800 text-xl font-bold">{{userStore.user.name}}</div>
        </div>
        <div class="text-blue-800 text-2xl font-bold">Dashboard</div>
        <div class="items-center flex gap-3">
            <NuxtLink to="/" title="Homepage">
                <Icon name="ion:home-outline" class="w-6 h-6" style="color: #1e40af"></Icon>
            </NuxtLink>
            <button @click="handleLogout" title="Log Out">
                <Icon name="solar:logout-2-broken" class="w-6 h-6" style="color: #1e40af"></Icon>
            </button>
        </div>
    </header>

</template>

<style scoped>
.adminHeader {
    box-shadow: 0 0 12px -2px #000572;
}
</style>