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
            <Heading :as="'h1'">Products</Heading>
            <ProductsList :products="productStore.products"/>
        </Container>
    </div>
</template>