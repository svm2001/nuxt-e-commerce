<script setup lang="ts">
import type {Product} from "~/components/products/List_types";
import {useCartStore} from "~/store/cart";
import { toast } from 'vue-sonner'

const props = defineProps<Product>()
const cartStore = useCartStore();
const productId = props.id;
const count = computed(() => cartStore.getCount(productId));

const formattedImage = props.images.length > 0 ? props.images[0].replace(/["\[\]]/g, '') : '';

const AddToCart = () => {
    cartStore.addToCart(productId, props.price, props.title, props.description, props.images, props.category.name)
    toast('Product added successfully!', {
        description: `${props.title} (${props.price}$)`,
        action: {
            label: 'OK',
            onClick: () => {}
        }
    });
}
</script>

<template>
    <div class="border-teal-900 border rounded-lg max-h-[372px] p-4 bg-slate-900 text-white relative">
        <Badge class="absolute top-6 border border-teal-700 right-6 bg-slate-900 text-teal-300">{{ props.category.name }}</Badge>
        <div class="absolute z-10 top-6 left-6 cursor-pointer border-slate-900 border w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center">
            <Icon name="iconamoon:heart-duotone" class="w-6 h-6 transition opacity-50" style='color: #81e6d9' />
        </div>
        <NuxtImg
            loading="lazy"
            format="webp"
            :src="formattedImage"
            :alt="props.title"
            class="rounded-md mb-2 min-h-48 max-h-48 object-cover w-full"
        />
        <NuxtLink :to="`/products/${props.id}`" class="text-xl min-h-[28px] max-h-[28px] overflow-hidden font-medium mb-1 block transition hover:text-teal-300">{{ props.title }}</NuxtLink>
        <p class="mb-3 min-h-[48px] max-h-[48px] overflow-ellipsis text-slate-200 overflow-hidden">{{ props.description }}</p>
        <div class="flex items-center justify-between">
            <p class="text-lg font-bold">${{ formatNumber(props.price) }}</p>
            <Button class="text-md bg-teal-400 hover:bg-teal-600" v-if="count === 0" @click="AddToCart">
                <Icon name="cil:cart" class="w-6 h-6" style="color: #000026"/>
            </Button>
            <div v-else class="flex items-center gap-1">
                <Button @click="cartStore.decrementCount(productId)" class="bg-teal-400 hover:bg-teal-600">
                    <Icon name="gravity-ui:minus" class="w-4 h-4" style="color: #000026"/>
                </Button>
                <Input type="number" :min="1" :max="100" class="text-teal-300 bg-transparent border-none max-w-14 font-medium text-center pointer-events-none" v-model="count" placeholder="" :value="count"/>
                <Button @click="cartStore.incrementCount(productId)" class="bg-teal-400 hover:bg-teal-600">
                    <Icon name="mingcute:add-fill" class="w-4 h-4" style="color: #000026"/>
                </Button>
            </div>
        </div>
    </div>
</template>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>