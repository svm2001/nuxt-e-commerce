<script setup lang="ts">
import { useCategoryStore } from "~/store/categories";

const categoryStore = useCategoryStore();
categoryStore.fetchCategoriesWithProducts();

const productImage = ref<any>(null);
const replaceByDefault = () => {
    if (productImage.value) {
        productImage.value.style = 'object-fit: contain;'
        productImage.value.src = 'https://vueschool.io/storage/media/677bbaa8ba92bed432f2bc7b6490c03a/Nuxt-3-Fundamentals_transparent.png'
    }
};
</script>

<template>
    <div v-if="categoryStore.loading" class="flex justify-center items-center pt-24">
        <LayoutLoader />
    </div>
    <div v-else>
        <div v-if="categoryStore.categories.length > 0" class="grid grid-cols-5 gap-5">
            <NuxtLink
                :to="`/categories/${category.id}`"
                v-for="category in categoryStore.categories"
                :key="category.id"
                v-bind="category"
                class="p-4 rounded-md bg-slate-500 relative max-h-56 min-h-56 overflow-hidden transition hover:shadow-md hover:shadow-teal-500"
            >
                <Badge class="text-[14px] text-[#00dc82] absolute top-6 right-6 text-center">{{ category.name }}</Badge>
                <img
                    ref="productImage"
                    @error="replaceByDefault"
                    class="rounded-sm w-full h-full object-cover"
                    :src="category.image"
                    :alt="category.name"
                />
            </NuxtLink>
        </div>
        <div class="text-[#00dc82] text-3xl pt-32 text-center" v-else>
            No categories found
        </div>
    </div>
</template>