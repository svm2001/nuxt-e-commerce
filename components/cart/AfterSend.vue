<script setup lang="ts">
import {useCartStore} from "~/store/cart";
import {formatNumber} from "../../utils/formatNumber";

const cartStore = useCartStore();
const products = cartStore.cartItemsTemp
const productImage = ref<any>(null);
const replaceByDefault = () => {
    if (productImage.value) {
        productImage.value.style = 'object-fit: contain;'
        productImage.value.src = 'https://vueschool.io/storage/media/677bbaa8ba92bed432f2bc7b6490c03a/Nuxt-3-Fundamentals_transparent.png'
    }
};
</script>

<template>
    <div>
        <div class="flex flex-col gap-6">
            <div class="p-6 data rounded-md grid grid-cols-2 gap-10 w-[1000px] m-auto shadow-md shadow-teal-500">
                <div class="flex flex-col gap-6">
                    <h2 class="text-[#00dc82] text-3xl font-bold">Your Order:</h2>
                    <div class="flex flex-col gap-4">
                        <div
                            v-for="product in products"
                            :key="product.productId"
                        >
                            <div class="flex items-start gap-4 p-2 border border-teal-800 rounded-md">
                                <img ref="productImage"
                                     @error="replaceByDefault"
                                     class="min-w-[72px] max-w-[72px] min-h-[72px] max-h-[72px] object-cover rounded-sm overflow-hidden"
                                     :src="product.images[0]"
                                     :alt="product.title"
                                />
                                <div class="flex items-center gap-1 text-slate-400">
                                    <div>
                                        <div class="text-[18px] text-white font-medium transition">
                                            {{ product.title }}
                                        </div>
                                        {{ formatNumber(product.price) }}$ x {{ formatNumber(product.quantity) }} =
                                        {{ formatNumber(product.price * product.quantity) }}$
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col gap-6">
                    <h2 class="text-[#00dc82] text-3xl font-bold">Your Data:</h2>
                    <div class="flex flex-col gap-4 text-white">
                        <div class="data-list">
                            <div>
                                <Icon name="line-md:person-twotone" class="w-5 h-5" style="color: white"></Icon>
                                Name:
                            </div>
                            <span class="data-list-value">{{ cartStore.tempData.name }}</span>
                        </div>
                        <div class="data-list">
                            <div>
                                <Icon name="ic:twotone-phone-iphone" style="color: white"></Icon>
                                Phone:
                            </div>
                            <span class="data-list-value">{{ cartStore.tempData.phone }}</span>
                        </div>
                        <div class="data-list">
                            <div>
                                <Icon name="ic:twotone-email" style="color: white"></Icon>
                                E-mail:
                            </div>
                            <span class="data-list-value">{{ cartStore.tempData.email }}</span>
                        </div>
                        <div class="data-list">
                            <div>
                                <Icon name="iconamoon:location-pin-duotone" style="color: white"></Icon>
                                City:
                            </div>
                            <span class="data-list-value">{{ cartStore.tempData.location }}</span>
                        </div>
                        <div class="data-list">
                            <div>
                                <Icon name="uiw:date" style="color: white"></Icon>
                                Delivery Date:
                            </div>
                            <span class="data-list-value">{{ cartStore.tempData.date }}</span>
                        </div>
                        <div class="data-list">
                            <div>
                                <Icon name="iconamoon:clock-duotone" style="color: white"></Icon>
                                Delivery Hours:
                            </div>
                            <span class="data-list-value">{{ cartStore.tempData.hours }}</span>
                        </div>
                        <div class="data-list">
                            <div>
                                <Icon name="streamline:street-road" style="color: white"></Icon>
                                Street:
                            </div>
                            <span class="data-list-value">{{ cartStore.tempData.street }}</span>
                        </div>
                        <div class="data-list">
                            <div>
                                <Icon name="ph:house-line-duotone" style="color: white"></Icon>
                                House:
                            </div>
                            <span class="data-list-value">{{ cartStore.tempData.house }}</span>
                        </div>
                        <div class="data-list">
                            <div>
                                <Icon name="material-symbols:floor-rounded" style="color: white"></Icon>
                                Floor:
                            </div>
                            <span class="data-list-value">{{ cartStore.tempData.floor }}</span>
                        </div>
                        <div class="data-list">
                            <div>
                                <Icon name="ic:twotone-meeting-room" style="color: white"></Icon>
                                Apartment:
                            </div>
                            <span class="data-list-value">{{ cartStore.tempData.apartment }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <Button class="m-auto" @click="cartStore.isOrderSended = false">Close</Button>
        </div>
    </div>
</template>

<style scoped>

.data-list {
    @apply flex border-b border-teal-800 border-dotted justify-between gap-1 text-lg text-slate-400;
}

.data-list-value {
    @apply text-white font-medium
}

.data {
    backdrop-filter: blur(3px);
    background: rgba(0, 12, 37, 0.333);
}

</style>



