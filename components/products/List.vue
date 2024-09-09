<script setup lang="ts">
import { useProductStore } from "~/store/products";
const productStore = useProductStore();
onMounted(() => {
    productStore.fetchTotalProducts();
})
</script>

<template>
    <div class="min-h-[800px] pb-10">
        <div v-show="!productStore.loading" class="grid grid-cols-4 gap-4">
            <ProductsCard
                v-for="product in productStore.products"
                :key="product.id"
                v-bind="product"
            />
        </div>

        <div v-show="productStore.loading"  class="grid grid-cols-4 gap-4 opacity-50">
            <div class="border-slate-300 border-4 rounded-lg max-h-[372px] p-4 bg-slate-400 text-white"
                 v-for="product in productStore.products"
                 :key="product.id"
            >
                <Skeleton class="rounded-md mb-2 min-h-48 max-h-48 object-cover w-full" />
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
</template>