<script setup lang="ts">
import {ADMIN_MENU_DATA, MENU_DATA} from "~/components/layout/Menu/Menu";
import {useUserStore} from "~/store/user";
const userStore = useUserStore();
import { useRouter } from 'vue-router';

const router = useRouter();
const handleLogout = () => {
    userStore.logout();
    router.push('/login');
};
</script>

<template>
<nav class="adminMenu bg-white absolute top-[110px] left-[30px] h-full flex-col pt-5 px-5 rounded-lg">
    <div class="flex flex-col gap-3 pb-3">
        <NuxtLink
            class="flex items-center text-slate-600 py-3 px-3 text-xl font-medium rounded-md px-2 w-full hover:opacity-60 transition-all gap-0.5"
            v-for="item in ADMIN_MENU_DATA"
            :key="item.url"
            :to="item.url"
        >
            <Icon :name="item.icon" class="mr-0.5"/>
            {{ item.name }}
        </NuxtLink>
    </div>
    <hr>
    <Button @click="handleLogout" class="bg-slate-400 hover:bg-red-700 w-full mt-6">
        <span class="text-xl flex items-center gap-2">Logout <Icon name="solar:logout-2-broken" class="w-5 h-5" style="color: white;"></Icon></span>
    </Button>
    <div class="absolute select-none pointer-events-none w-full bg-slate-600 bottom-0 rounded-br-lg rounded-bl-lg py-5 flex flex-col gap-2 items-center left-1/2 -translate-x-1/2 text-slate-500 pt-4">
        <Icon name="teenyicons:nuxtjs-outline" class="w-8 h-8" style="color: #00dc82"></Icon>
        <div class="text-white">Demo Dashboard</div>
        <div class="text-[12px] text-slate-400">Version: 1.0.0</div>
    </div>
</nav>
</template>

<style scoped>

.adminMenu {
    min-height: calc(100dvh - 140px);
    max-height: calc(100dvh - 140px);
    max-width: 300px;
    min-width: 300px;
    box-shadow: 0 0 12px -2px #000572;
}

.router-link-active {
    background: #344a83;
    color: white;
    &:hover {
        opacity: 1;
        cursor: default;
    }
}

</style>