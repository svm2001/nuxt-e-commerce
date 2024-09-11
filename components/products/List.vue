<script setup lang="ts">
import { useProductStore } from "~/store/products";
const productStore = useProductStore();
</script>

<template>
    <div class="w-full">
        <div class="pb-10 ">
            <div v-if="!productStore.loading && productStore.products.length > 0" class="grid grid-cols-3 gap-4 transition duration-500">
                <ProductsCard
                    v-for="product in productStore.products"
                    :key="product.id"
                    v-bind="product"
                />
            </div>
            <div v-else-if="!productStore.loading && productStore.products.length === 0" class="text-white text-center pt-40 text-2xl font-bold flex flex-col gap-4 items-center">
                <Icon name="hugeicons:file-not-found" class="w-10 h-10" style="color: white"></Icon>
                No products found.
            </div>
            <div v-else class="grid grid-cols-3 gap-4 opacity-100 transition duration-500">
                <div class="rounded-lg max-h-[372px] min-h-[372px] p-4 bg-slate-600 text-white"
                     v-for="product in productStore.products"
                     :key="product.id"
                >
                    <Skeleton class="rounded-md mb-2 min-h-48 max-h-48 object-cover w-full bg-slate-800 text-2xl flex items-center justify-center">
                        <span class="loader"></span>
                    </Skeleton>
                    <Skeleton class="text-xl min-h-[28px] max-h-[28px] overflow-hidden font-medium mb-1 block" />
                    <Skeleton class="mb-3 min-h-[48px] max-h-[48px] overflow-ellipsis overflow-hidden" />
                    <div class="flex items-center justify-between">
                        <Skeleton class="h-10 w-[56px]" />
                        <Skeleton class="h-10 w-[56px]" />
                    </div>
                </div>
            </div>
        </div>
        <div v-if="productStore.totalProducts > productStore.itemsPerPage">
            <ProductsPagination class="user-select-none" :class="{ 'opacity-70 pointer-events-none': productStore.loading }" />
        </div>
    </div>
</template>

<style scoped>
.loader {
    width: 48px;
    height: 48px;
    display: inline-block;
    position: relative;
    border: 3px solid;
    border-color: #00dc82 #0000 #fff #0000;
    border-radius: 50%;
    box-sizing: border-box;
    animation: 1s rotate linear infinite;
}
.loader:before , .loader:after{
    content: '';
    top: 0;
    left: 0;
    position: absolute;
    border: 10px solid transparent;
    border-bottom-color:#fff;
    transform: translate(-10px, 19px) rotate(-35deg);
}
.loader:after {
    border-color: #00dc82 #0000 #0000 #0000 ;
    transform: translate(32px, 3px) rotate(-35deg);
}
@keyframes rotate {
    100%{    transform: rotate(360deg)}
}
</style>