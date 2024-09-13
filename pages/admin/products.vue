<script setup lang="ts">
import {useProductStore} from "~/store/products";
import {formatNumber} from "~/utils/formatNumber";

definePageMeta({
    layout: 'admin'
})

useSeoMeta({
    title: 'Products / Dashboard | My e-commerce'
})

const productStore = useProductStore();
</script>

<template>
    <div class="flex items-end gap-5">
        <FiltersFilter :is-site="false" />
        <SortingSort :is-site="false" @sort="productStore.sortProductsBy"/>
        <div class="flex flex-col items-center justify-center gap-2 w-fit">
            <div>Total products:
                <span class="font-bold text-blue-700">{{formatNumber(productStore.totalProducts)}}</span>
            </div>
            <Dialog>
                <DialogTrigger as-child>
                    <Button class="bg-blue-700 w-[197px] flex items-center gap-1">
                        New product
                        <Icon name="lets-icons:add-duotone" class="w-6 h-6" style="color: white;"></Icon>
                    </Button>
                </DialogTrigger>
                <DialogContent class="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>New product</DialogTitle>
                        <DialogDescription>
                            Click add when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <AdminFormsAddProduct />
                </DialogContent>
            </Dialog>
        </div>
    </div>
    <AdminProducts v-if="productStore.totalProducts > 0"  />
    <div class="flex pt-32 justify-center text-blue-600 font-bold" v-else>No products found. ❌</div>
    <div v-if="productStore.totalProducts > 12" class="absolute bottom-5 left-1/2 -translate-x-1/2">
        <ProductsPagination :is-site="false" />
    </div>
</template>