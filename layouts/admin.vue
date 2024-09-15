<script setup lang="ts">
import {useUserStore} from "~/store/user";

const userStore = useUserStore();
</script>

<template>
    <Toaster />
    <div class="min-h-screen max-h-screen overflow-hidden flex items-center justify-center">
        <div v-show="userStore.getRole() !== 'admin'" class="bg-white dashboard shadow-lg overflow-hidden shadow-blue-400 rounded-2xl flex items-center justify-center">
            <div class="flex flex-col items-center">
                <div class="text-slate-900 text-bold text-3xl">You are not signed in as administrator.</div>
                <div class="mt-4 flex items-center gap-2">
                    <NuxtLink to="/login">
                        <Button>Sign In</Button>
                    </NuxtLink>
                </div>
            </div>
        </div>
        <div v-show="userStore.getRole() !== 'customer' || userStore.getRole() !== ''" class="relative bg-blue-200 min-h-screen max-h-screen overflow-hidden dashboard shadow-lg flex flex-col gap-[30px]">
            <LayoutHeaderAdmin />
            <LayoutMenuAdminMenu />
            <main class="p-5 rounded-lg bg-white overflow-auto relative">
                <slot></slot>
            </main>
        </div>
    </div>
</template>

<style scoped>
.dashboard {
    height: 100%;
    width: 100%;
}

main {
    box-shadow: 0 0 12px -2px #000572;
    min-width: calc(100dvw - 300px);
    max-width: calc(100dvw - 300px);
    width: 100%;
    margin-left: auto;
    transform: translateX(-30px);
    min-height: calc(100dvh - 140px);
    max-height: calc(100dvh - 140px);
    height: 100%;
}
</style>