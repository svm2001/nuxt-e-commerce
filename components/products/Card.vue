<script setup lang="ts">
import type {Product} from "~/components/products/List_types";
import {useCartStore} from "~/store/cart";
import {useFavouriteStore} from "~/store/favourites";
import { toast } from 'vue-sonner'
import {formatNumber} from "~/utils/formatNumber";
import {useUserStore} from "~/store/user";
import {useRouter} from "#vue-router";

const userStore = useUserStore();
const router = useRouter();
const props = defineProps<Product>()
const cartStore = useCartStore();
const favouriteStore = useFavouriteStore()
const productId = props.id;
const count = computed(() => cartStore.getCount(productId));

const productImage = ref<any>(null);

const replaceByDefault = () => {
    if (productImage.value) {
        productImage.value.style = 'object-fit: contain;'
        productImage.value.src = 'https://vueschool.io/storage/media/677bbaa8ba92bed432f2bc7b6490c03a/Nuxt-3-Fundamentals_transparent.png'
    }
};

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

const handleLogout = () => {
    toast('You are not authorized. 😒 ', {
        description: 'Redirecting to sign in page...'
    })
    setTimeout(() => {
        userStore.logout();
        router.push('/login');
    }, 3500)
};

const isFavourite = computed(() => favouriteStore.favouriteItems.some(item => item.id === productId));
const toggleFavourite = () => isFavourite.value ? favouriteStore.removeFromFavourites(productId) : favouriteStore.addToFavourites(props)
</script>

<template>
    <div class="border-teal-900 border-2 rounded-lg max-h-[372px] min-h-[372px] p-4 bg-slate-950 text-white relative transition duration-500 hover:shadow-lg hover:-translate-y-[10px] hover:shadow-teal-700">
        <Badge class="absolute top-6 border border-teal-700 right-6 bg-slate-900 text-[#00dc82]">{{ props.category.name }}</Badge>

        <button v-if="!userStore.isAuthenticated()"
                @click="handleLogout"
                class="absolute z-10 top-6 left-6 cursor-pointer w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center select-none transition">
            <span class="opacity-30 transition duration-500 text-sm"
                  :class="{ '!opacity-100 scale-125': isFavourite }">
                💚
            </span>
        </button>

        <button v-else
                @click="toggleFavourite"
                class="absolute z-10 top-6 left-6 cursor-pointer w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center select-none transition">
            <span class="opacity-30 transition duration-500 text-sm"
                  :class="{ '!opacity-100 scale-125': isFavourite }">
                💚
            </span>
        </button>
        <img
            loading="lazy"
            :src="formattedImage"
            :alt="props.title"
            @error="replaceByDefault"
            ref="productImage"
            class="rounded-md mb-2 min-h-48 max-h-48 object-cover w-full"
        />
        <NuxtLink :to="`/products/${props.id}`" class="text-xl min-h-[28px] max-h-[28px] overflow-hidden font-medium mb-1 block transition hover:text-[#00dc82]">{{ props.title }}</NuxtLink>
        <p class="mb-3 min-h-[48px] max-h-[48px] overflow-ellipsis text-slate-500 overflow-hidden">{{ props.description }}</p>
        <div class="flex items-center justify-between">
            <p class="text-lg font-bold">${{ formatNumber(props.price) }}</p>
            <div v-if="!userStore.isAuthenticated()">
                <Button class="text-md bg-[#00dc82] hover:bg-teal-600" @click="handleLogout">
                    <Icon name="cil:cart" class="w-6 h-6" style="color: #000026"/>
                </Button>
            </div>
            <div v-else>
                <Button class="text-md bg-[#00dc82] hover:bg-teal-600" v-if="count === 0" @click="AddToCart">
                    <Icon name="cil:cart" class="w-6 h-6" style="color: #000026"/>
                </Button>
                <div v-else class="flex items-center gap-1">
                    <Button @click="cartStore.decrementCount(productId)" class="bg-[#00dc82] hover:bg-teal-600">
                        <Icon name="gravity-ui:minus" class="w-4 h-4" style="color: #000026"/>
                    </Button>
                    <Input type="number" :min="1" :max="100" class="text-[#00dc82] bg-transparent border-none max-w-14 font-medium text-center pointer-events-none" v-model="count" placeholder="" :value="count"/>
                    <Button @click="cartStore.incrementCount(productId)" class="bg-[#00dc82] hover:bg-teal-600">
                        <Icon name="mingcute:add-fill" class="w-4 h-4" style="color: #000026"/>
                    </Button>
                </div>
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