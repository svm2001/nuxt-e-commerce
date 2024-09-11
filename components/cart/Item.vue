<script setup lang="ts">
import type { CartItem } from "~/components/cart/types";
import {useCartStore} from "~/store/cart";
import {formatNumber} from "~/utils/formatNumber";
const props = defineProps<CartItem>()
const image = props.images[0]
const cartStore = useCartStore();
</script>

<template>
    <div class="border border-teal-900 p-2.5 rounded-md flex bg-slate-900">
        <div class="w--45 flex items-center gap-2">
            <div class="min-h-[72px] max-h-[72px] min-w-[72px] max-w-[72px] border-2 border-slate-500 rounded-md overflow-hidden">
                <NuxtImg class="w-full h-full object-cover" :src="image" :alt="props.title"></NuxtImg>
            </div>
            <div class="flex flex-col gap-1">
                <NuxtLink :to="`/products/${props.productId}`" class="text-lg font-medium min-h-7 text-[#00dc82] max-h-7 overflow-hidden transition hover:text-[#00dc82]"> {{ props.title }} </NuxtLink>
                <span class="text-slate-400 text-sm max-h-[40px] min-h-[40px] overflow-hidden"> {{ props.description }} </span>
            </div>
        </div>
        <div class="w--7 text-center flex items-center justify-center text-[#00dc82]">
            <span class="font-medium"> {{ formatNumber(props.price) }} $ </span>
        </div>
        <div class="w--16 text-center font-medium flex items-center justify-center">
            <div class="flex items-center gap-1">
                <Button class="bg-[#00dc82] hover:bg-teal-600 p-2" @click="cartStore.decrementCount(productId)">
                    <Icon name="gravity-ui:minus" class="w-2.5 h-2.5" style="color: black"/>
                </Button>
                <Input type="number" :min="1" :max="100" class="text-black max-w-14 font-medium text-center pointer-events-none" v-model="props.quantity" placeholder="" :value="props.quantity"/>
                <Button class="bg-[#00dc82] hover:bg-teal-600 p-2" @click="cartStore.incrementCount(productId)">
                    <Icon name="mingcute:add-fill" class="w-2.5 h-2.5" style="color: black"/>
                </Button>
            </div>
        </div>
        <div class="w--7 text-center font-medium flex items-center text-[#00dc82] justify-center">
            <span> {{ formatNumber(props.price * props.quantity) }} $ </span>
        </div>
        <div class="w--7 text-right font-medium flex items-center justify-end">
            <Button class="p-0.5 bg-white group hover:bg-white" title="Remove" @click="cartStore.removeItem(props.productId)">
                <Icon name="ic:round-delete-forever" class="w-6 h-6 transition text-teal-700 group-hover:text-red-600"></Icon>
            </Button>
        </div>
    </div>
</template>