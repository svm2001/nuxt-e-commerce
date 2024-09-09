<script setup lang="ts">
import { useProductStore } from "~/store/products";
import { useCartStore } from "~/store/cart";
import { useRoute } from "vue-router";
import { useSeoMeta } from "@unhead/vue";
import { toast } from 'vue-sonner';
import { formatNumber } from "~/utils/formatNumber";
import { mapProductToCartItem } from "~/utils/mapProductToCartItem";
import router from "#app/plugins/router";


const route = useRoute();
const productStore = useProductStore();
const cartStore = useCartStore();
const productId = parseInt(route.params.id as string);

const product = computed(() => {
    const foundProduct = productStore.products.find(p => p.id === productId);
    return foundProduct ? mapProductToCartItem(foundProduct) : undefined;
})

const isAdded = ref(false)

useSeoMeta({
    title: `${product.value?.title} | My e-commerce`,
    description: product.value?.description
});

const AddToCart = () => {
    if (product.value) {
        cartStore.addToCart(product.value.productId, product.value.price, product.value.title, product.value.description, product.value.images, product.value.categoryName);
        toast('Product added successfully!', {
            description: `${product.value.title} (${product.value.price}$)`,
            action: {
                label: 'OK',
                onClick: () => {}
            }
        });
        cartStore.isSinglePageItemAdded = true
    }
}

const RemoveFromCart = () => {
    if(product.value) {
        cartStore.removeItem(product.value.productId)
        cartStore.isSinglePageItemAdded = false
    }
}

</script>

<template>
    <div class="pb-12">
        <Container>
            <Toaster />
            <NuxtLink to="/products" class="text-white text-sm decoration-1 flex items-center gap-1 mt-4 mb-6 hover:text-teal-300 transition">
                <Icon name="icon-park-solid:back" style="color: white;" />Products
            </NuxtLink>
            <Heading :as="'h1'">{{ product ? product.title : 'Loading...' }}</Heading>
            <div v-if="product" class="grid grid-cols-2 gap-8 p-4 shadow-lg shadow-teal-300 rounded-md">
                <div class="relative">
                    <Badge class="absolute top-3 right-3"> {{product.categoryName}} </Badge>
                    <NuxtImg
                        loading="lazy"
                        format="webp"
                        :src="product.images[0]"
                        :alt="product.title"
                        class="rounded-md min-h-96 max-h-96 object-cover w-full"
                    />
                </div>
                <div>
                    <p class="text-xl text-white mb-4">{{ product.description }}</p>
                    <p class="text-2xl text-white font-bold mb-4">Price: ${{ formatNumber(product.price) }}</p>
                    <Button class="text-md bg-teal-400 hover:bg-teal-600" @click="AddToCart" v-if="!cartStore.isSinglePageItemAdded">
                        <Icon name="cil:cart" class="w-6 h-6" style="color: #000026"/>
                        <span class="pl-1.5 text-slate-900 font-bold">Add to cart</span>
                    </Button>
                    <Button class="text-md bg-teal-400 hover:bg-teal-600" @click="RemoveFromCart" v-if="cartStore.isSinglePageItemAdded">
                        <Icon name="mingcute:close-fill" class="w-6 h-6" style="color: #000026"/>
                        <span class="pl-1.5 text-slate-900 font-bold">Remove from cart</span>
                    </Button>
                </div>
            </div>
            <div v-else class="flex justify-center items-center pt-32">
                <LayoutLoader />
            </div>
        </Container>
    </div>
</template>