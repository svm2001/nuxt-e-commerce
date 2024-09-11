<script setup lang="ts">
import {Toaster} from "~/components/ui/sonner";
import { useFavouriteStore } from '~/store/favourites';

useSeoMeta({
    title: 'Favourites | My e-commerce'
})
const favouriteStore = useFavouriteStore();
</script>

<template>
    <div class="pb-12">
        <Container>
            <Toaster />
            <Heading :as="'h1'">Favourites</Heading>
            <div class="grid grid-cols-4 gap-4" v-if="favouriteStore.favouriteItems.length !== 0">
                <ProductsCard v-for="product in favouriteStore.favouriteItems" :key="product.id" v-bind="product" />
            </div>
            <div class="text-white text-center mt-40 text-2xl font-bold flex flex-col gap-4 items-center p-7 rounded-lg bg-slate-600/60 m-auto w-fit" v-else>
                No favourites yet 🚫
                <NuxtLink to="/products">
                    <Button class="flex items-center gap-1">
                        <Icon name="lets-icons:back" class="w-4 h-4" style="color: white;" />
                        Go to products</Button>
                </NuxtLink>
            </div>
        </Container>
    </div>
</template>