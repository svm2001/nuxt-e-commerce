<script setup lang="ts">
import { useProductStore } from "~/store/products";
useSeoMeta({
    title: 'Products | My e-commerce'
})
const productStore = useProductStore();
</script>

<template>
    <div class="pb-12">
        <Container>
            <Toaster />
            <div class="sticky top-[130px]">
                <Heading :as="'h1'">Products</Heading>
            </div>
            <div class="flex gap-4">
                <FiltersFilter />
                <div class="flex flex-col gap-4 w-full -mt-[83.5px]">
                    <SortingSort @sort="productStore.sortProductsBy"/>
                    <ProductsList :products="productStore.products"/>
                </div>
            </div>
        </Container>
    </div>
</template>