<script setup lang="ts">
import Container from "~/components/Container.vue";
import Menu from "~/components/layout/Menu/Menu.vue";
import type {Product} from "~/components/products/List_types";
import {formatNumber} from "~/utils/formatNumber";
import {useCartStore} from "~/store/cart";
import {useFavouriteStore} from "~/store/favourites";
import {useUserStore} from "~/store/user";
import { useRouter } from 'vue-router';

const props = defineProps<Product>()
const router = useRouter();
const cartStore = useCartStore();
const favouriteStore = useFavouriteStore();
const userStore = useUserStore();

const handleLogout = () => {
    userStore.logout();
    router.push('/login');
};
</script>

<template>
<header class="fixed border-2 border-teal-800 z-50 top-5 min-h-16 shadow max-h-16 flex items-center" v-if="cartStore.isOrderSended === false">
    <Container>
        <div class="flex justify-between items-center">
            <div class="flex items-center gap-2">
                <NuxtLink to="/">
                    <Avatar class="bg-slate-900">
                        <Icon name="logos:nuxt-icon" class="w-6 h-6"/>
                    </Avatar>
                </NuxtLink>
                <LayoutClock />
            </div>
            <Menu />
            <div class="flex items-center gap-5">
                <div v-if="!userStore.isAuthenticated()" class="flex items-center gap-5">
                    <NuxtLink to="/login" class="flex items-center" title="Log In">
                        <Icon name="ic:outline-login" class="w-6 h-6" style="color: #00dc82"></Icon>
                    </NuxtLink>
                </div>
                <div v-else class="flex items-center gap-5">
                    <div>
                        <NuxtLink to="/cart" title="Cart" class="flex items-center gap-2 font-bold">
                            <div class="flex flex-col gap-1.5">
                        <span class="leading-none text-lg text-[#00dc82]">
                            {{formatNumber(cartStore.totalPrice)}} $
                        </span>
                            </div>
                            <Icon name="cil:cart" class="w-6 h-6" style="color: #00dc82" />
                        </NuxtLink>
                    </div>
                    <div>
                        <NuxtLink class="flex items-center relative" to="/favourites" title="Favourites">
                    <span
                        v-if="favouriteStore.favouriteItems.length > 0"
                        class="w-5 h-5 rounded-full bg-slate-900 absolute z-10 font-bold -top-2 -right-4
                         border border-[#00dc82] flex items-center justify-center text-[10px] text-[#00dc82]">
                        {{favouriteStore.favouriteItems.length}}
                    </span>
                            <Icon name="mdi:favourite-border" class="w-6 h-6" style="color: #00dc82"></Icon>
                        </NuxtLink>
                    </div>
                    <div v-if="userStore.getRole() === 'admin'" class="min-h-6 min-h-6 max-w-6 max-h-6">
                        <NuxtLink to="/admin/products" title="Dashboard">
                            <Icon name="ic:twotone-admin-panel-settings" class="w-6 h-6" style="color: #00dc82"></Icon>
                        </NuxtLink>
                    </div>
                    <div>
                        <button @click="handleLogout" class="flex items-center" title="Log Out">
                            <Icon name="solar:logout-2-broken" class="w-6 h-6" style="color: #00dc82"></Icon>
                        </button>
                    </div>
                    <div>
                        <div class="flex items-center" :title="`${userStore.user?.name}`">
                            <img :src="userStore.user?.avatar" alt="" class="w-9 h-9 rounded-full">
                            <!--                            <span class="w-6 h-6 flex items-center justify-center bg-[#00dc82] text-slate-950 rounded-full uppercase leading-[0px] font-bold">{{userStore.user?.name.charAt(0)}}</span>-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Container>
</header>
</template>

<style scoped>
    header {
        border-radius: 14px;
        min-width: 70dvw;
        max-width: 70dvw;
        left: 50%;
        transform: translateX(-50%);
        backdrop-filter: blur(10px);
        background: rgba(0, 4, 33, 0.4);
        color: white!important;
    }
</style>