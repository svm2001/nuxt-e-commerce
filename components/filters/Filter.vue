<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProductStore } from "~/store/products"
import { formatNumber } from "~/utils/formatNumber"
import { toast } from "vue-sonner"
import debounce from 'lodash.debounce'

const props = defineProps({
    isSite: {
        type: Boolean,
        default: true
    }
});

const router = useRouter()
const route = useRoute()
const productStore = useProductStore()
const searchQuery = ref<any>(route.query.title || '')
const priceQuery = ref<any>(route.query.price || '')
const minPrice = ref<any>(route.query.price_min || '')
const maxPrice = ref<any>(route.query.price_max || '')
const catId = ref<any>(route.query.categoryId || '')

onMounted(async () => {
    await productStore.fetchCategories()
})

const debouncedFilterProducts = debounce((query: any, price: any, minPrice: any, maxPrice: any, catId: any) => {
    const queryParams = {
        title: query || undefined,
        price: price || undefined,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
        categoryId: catId === 'all' ? undefined : catId || undefined
    }
    router.push({ query: queryParams });
    productStore.filterProducts(
        query,
        price,
        minPrice,
        maxPrice,
        catId === 'all' ? undefined : catId
    )
}, 1000)
watch([ searchQuery, priceQuery, minPrice, maxPrice, catId ], ([ newQuery, newPrice, newMinPrice, newMaxPrice, newcatId ]) => debouncedFilterProducts(newQuery, newPrice, newMinPrice, newMaxPrice, newcatId))

const resetFilters = () => {
    setTimeout(() => {
        searchQuery.value = ''
        priceQuery.value = ''
        minPrice.value = ''
        maxPrice.value = ''
        catId.value = ''
        router.push({ query: {} })
        productStore.filterProducts()
    }, 500)
}

productStore.filterProducts(searchQuery.value, priceQuery.value, minPrice.value, maxPrice.value, catId.value)
</script>

<template>
    <div class="p-4 bg-slate-950/60 mb-6 rounded-lg border-2 border-teal-900 z-50 flex flex-col gap-10 min-w-[290px] h-fit sticky top-[210px] transition" v-if="props.isSite">
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
                            <Input v-model="minPrice" type="number" class="input" :placeholder="formatNumber(productStore.filterMinPrice)"></Input>
                        </div>
                        <div class="flex items-center text-[#00dc82]">
                            <div class="min-w-[40px]">max:</div>
                            <Input v-model="maxPrice" type="number" class="input" :placeholder="formatNumber(productStore.filterMaxPrice)"></Input>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="text-[#00dc82] font-medium mb-1">By category</div>
                    <Select v-model="catId">
                        <SelectTrigger class="w-full bg-slate-400">
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
        <Button @click="resetFilters" class="gap-1 flex items-center text-xl font-medium bg-red-600 hover:bg-red-800">Reset All
            <Icon name="carbon:reset-alt" class="w-5 h-5" style="color: white;"></Icon>
        </Button>
    </div>
    <div class="flex items-center gap-3" v-else>
        <div class="bg-blue-100 p-2 rounded-md">
            <div class="flex items-center gap-12">
                <div>
                    <div class="font-bold mb-2 flex items-center gap-1.5">
                        <Icon name="lets-icons:search-duotone" class="w-6 h-6" style="color: #0e4664;"></Icon>
                        Search:
                    </div>
                    <div class="flex items-center gap-1.5">
                        <div class="flex gap-3 items-center relative">
                            <Input v-model="searchQuery" placeholder="find something" class="" />
                        </div>
                    </div>
                </div>
                <div>
                    <div class="font-bold mb-2 flex items-center gap-1.5">
                        <Icon name="ic:outline-attach-money" class="w-6 h-6" style="color: #0e4664;"></Icon>
                        Price:
                    </div>
                    <div class="flex items-center gap-5">
                        <div class="flex items-center text-slate-400 text-[14px]">
                            <div class="min-w-[32px]">min:</div>
                            <Input v-model="minPrice" class="w-[120px] text-slate-900" type="number" :placeholder="formatNumber(productStore.filterMinPrice)"></Input>
                        </div>
                        <div class="flex items-center text-slate-400 text-[14px]">
                            <div class="min-w-[32px]">max:</div>
                            <Input v-model="maxPrice" class="w-[120px] text-slate-900" type="number" :placeholder="formatNumber(productStore.filterMaxPrice)"></Input>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="font-bold mb-2 flex items-center gap-1.5">
                        <Icon name="tabler:category" class="w-6 h-6" style="color: #0e4664;"></Icon>
                        Category:
                    </div>
                    <Select v-model="catId">
                        <SelectTrigger class="w-[180px]">
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
                <div class="-ml-9">
                    <div class="font-bold mb-2 text-transparent">Reset:</div>
                    <Button @click="resetFilters" class="gap-1 flex items-center font-medium bg-red-600 hover:bg-red-800">
                        <Icon name="carbon:reset-alt" class="w-4 h-4" style="color: white;"></Icon>
                    </Button>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
.input {
    @apply bg-slate-700 border text-white
}
</style>