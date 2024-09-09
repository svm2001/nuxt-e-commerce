<script setup lang="ts">
import {useCartStore} from "~/store/cart";
const cartStore = useCartStore();
</script>

<template>
    <div>
        <div class="flex w-full justify-between bg-slate-800 px-3 py-2 text-teal-300 rounded-md font-bold mb-5">
            <span class="w--45 ">Name</span>
            <span class="w--7 text-center">Price (x1)</span>
            <span class="w--16 text-center">Quantity</span>
            <span class="w--7 text-center">Total Price</span>
            <span class="w--7 text-right pr-2">X</span>
        </div>
        <ul v-auto-animate class="flex flex-col gap-2 transition" name="list" tag="div">
            <CartItem
                v-for="item in cartStore.cartItems"
                :key="item.productId"

                :category-name="item.categoryName"
                :product-id="item.productId"
                :title="item.title"
                :price="item.price"
                :quantity="item.quantity"
                :total-price="item.totalPrice"
                :description="item.description"
                :images="item.images"
            />
        </ul>
    </div>
</template>

<style scoped>
.list-item {
    display: inline-block;
}
.list-enter-active,
.list-leave-active {
    transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(-100px);
}
</style>