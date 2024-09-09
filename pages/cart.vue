<script setup lang="ts">
import {Toaster} from "~/components/ui/sonner";
import {useCartStore} from "~/store/cart";

useSeoMeta({
    title: 'Cart | My e-commerce'
})

const cartStore = useCartStore();
</script>

<template>
    <div class="pb-12">
        <Container>
            <Toaster />
            <div v-if="cartStore.formSending" class="fixed w-full h-full flex items-center justify-center top-0 left-0" style="z-index: 9999999999">
                <LayoutLoader />
            </div>
            <Heading :as="'h1'" v-if="cartStore.isOrderSended === false">Cart</Heading>
            <div class="grid-container" v-if="cartStore.cartItems.length > 0 && cartStore.isOrderSended === false">
                <CartList />
                <CartOrder />
            </div>
            <CartAfterSend v-if="cartStore.cartItems.length === 0 && cartStore.isOrderSended === true" />
            <CartEmpty v-if="cartStore.cartItems.length === 0 && cartStore.isOrderSended === false" />
        </Container>
    </div>
</template>

<style>

.grid-container {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 30px;
}

.w--45 {
    width: 45%;
    flex-basis: 45%;
}
.w--16 {
    width: 19%;
    flex-basis: 19%;
}
.w--7 {
    width: 12%;
    flex-basis: 12%;
}
</style>