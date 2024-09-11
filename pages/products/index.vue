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
                <ProductsList :products="productStore.products"/>
            </div>
        </Container>
    </div>
</template>