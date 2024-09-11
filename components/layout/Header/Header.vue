<script setup lang="ts">
import Container from "~/components/Container.vue";
import Menu from "~/components/layout/Menu/Menu.vue";
import type {Product} from "~/components/products/List_types";
import {useCartStore} from "~/store/cart";

const props = defineProps<Product>()
const cartStore = useCartStore();
</script>

<template>
<header class="fixed border-2 border-teal-800 z-50 top-5 min-h-16 shadow max-h-16 flex items-center" v-if="cartStore.isOrderSended === false">
    <Container>
        <div class="flex justify-between items-center">
            <NuxtLink to="/">
                <Avatar class="bg-slate-900">
                    <Icon name="logos:nuxt-icon" class="w-6 h-6"/>
                </Avatar>
            </NuxtLink>
            <Menu />
            <NuxtLink to="/cart" title="Go to cart" class="flex items-center gap-2 font-bold">
                <Icon name="cil:cart" class="w-6 h-6" style="color: #00dc82" />
                <div class="flex flex-col gap-1.5">
                    <span class="leading-none text-lg text-[#00dc82]">
                        {{formatNumber(cartStore.totalPrice)}} $
                    </span>
                </div>
            </NuxtLink>
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