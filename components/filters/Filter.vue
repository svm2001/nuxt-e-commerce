<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useProductStore } from "~/store/products";
import {toast} from "vue-sonner";

const router = useRouter();
const route = useRoute();
const productStore = useProductStore();
const searchQuery = ref<any>(route.query.title || '');
const priceQuery = ref<any>(route.query.price || '');
const minPrice = ref<any>(route.query.price_min || '');
const maxPrice = ref<any>(route.query.price_max || '');
const catId = ref<any>(route.query.categoryId || '');

onMounted(async () => {
    await productStore.fetchCategories();
});

watch(
    [
        searchQuery,
        priceQuery,
        minPrice,
        maxPrice,
        catId
    ],
    ([
        newQuery,
        newPrice,
        newMinPrice,
        newMaxPrice,
        newcatId
     ]) => {
    const query = {
        title: newQuery || undefined,
        price: newPrice || undefined,
        minPrice: newMinPrice || undefined,
        maxPrice: newMaxPrice || undefined,
        categoryId: newcatId === 'all' ? undefined : newcatId || undefined
    };
    router.push({ query });
    productStore.filterProducts(
        newQuery,
        newPrice,
        newMinPrice,
        newMaxPrice,
        newcatId === 'all' ? undefined : newcatId
    );

    if(maxPrice.value !== '' && minPrice.value >= maxPrice.value) {
        toast('The maximum price cannot be greater or equals than the minimum',{
            action: {
                label: 'OK',
                onClick: () => {}
            }
        })
    }

});

const resetFilters = () => {
    setTimeout(() => {
        searchQuery.value = '';
        priceQuery.value = '';
        minPrice.value = '';
        maxPrice.value = '';
        catId.value = '';
        router.push({ query: {} });
        productStore.filterProducts();
    }, 500)
};

productStore.filterProducts(
    searchQuery.value,
    priceQuery.value,
    minPrice.value,
    maxPrice.value,
    catId.value
);
</script>

<template>
    <div class="p-4 bg-slate-950/60 mb-6 rounded-lg border-2 border-teal-600 z-50 flex flex-col gap-10 min-w-[290px] h-fit sticky top-[210px] transition">
        <div>
            <div class="text-[#00dc82] text-xl font-bold mb-1.5 flex gap-1">
                <Icon name="lets-icons:search-duotone" class="w-6 h-6" style="color: #00dc82;"></Icon>
                Search:</div>
            <div class="flex gap-3 items-center relative">
                <Input v-model="searchQuery" placeholder="find something" class="input" />
            </div>
        </div>
        <div>
            <div class="text-[#00dc82] text-xl font-bold mb-1.5 flex gap-1">
                <Icon name="mage:filter" class="w-6 h-6" style="color: #00dc82;"></Icon>
                Filters:
            </div>
            <div class="flex flex-col gap-6">
                <div>
                    <div class="text-[#00dc82] font-medium mb-1">By price</div>
                    <div class="flex flex-col gap-2">
                        <div class="flex items-center text-[#00dc82]">
                            <div class="min-w-[40px]">min:</div>
                            <Input v-model="minPrice" type="number" class="input" :placeholder="productStore.filterMinPrice"></Input>
                        </div>
                        <div class="flex items-center text-[#00dc82]">
                            <div class="min-w-[40px]">max:</div>
                            <Input v-model="maxPrice" type="number" class="input" :placeholder="productStore.filterMaxPrice"></Input>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="text-[#00dc82] font-medium mb-1">By category</div>
                    <Select v-model="catId">
                        <SelectTrigger class="w-full">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Categories</SelectLabel>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem v-for="category in productStore.categories" :key="category.id" :value="category.id">
                                    {{ category.name }}
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
        <Button @click="resetFilters" class="gap-1 flex items-center text-xl font-medium bg-red-600 hover:bg-red-800">Reset All Filters
            <Icon name="carbon:reset-alt" class="w-5 h-5" style="color: white;"></Icon>
        </Button>
    </div>
</template>

<style scoped>
.input {
    @apply bg-transparent border text-white
}
</style>