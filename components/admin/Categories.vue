<script setup lang="ts">
import {useCategoryStore} from "~/store/categories"
import {useProductStore} from "~/store/products";
import {toast} from "vue-sonner";
import type { Product } from "~/components/products/List_types";

const categoryStore = useCategoryStore()
const productStore = useProductStore()
const products = ref<Product[]>([])
const productsIds = ref<number[]>([])

const removeProduct = async (id: number) => {
    try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            productStore.filteredProducts = productStore.filteredProducts.filter(p => p.id !== p.id);
            productStore.totalProducts--;
            productStore.totalPages = Math.ceil(productStore.totalProducts / productStore.itemsPerPage);
            productStore.paginateProducts(productStore.currentPage);
        } else {
            const errorData = await response.json();
        }
    } catch (err: any) {
        console.error(err);
    }
};

const removeCategoryCard = async (id: number) => {
    try {
        categoryStore.loading = true

        const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            categoryStore.categories = categoryStore.categories.filter(p => p.id !== p.id);
            categoryStore.fetchCategories()
            toast.success('Category deleted successfully');
            categoryStore.loading = false
        } else {
            const errorData = await response.json();
            toast.error(errorData.message || 'Failed to delete category');
        }
    } catch (err: any) {
        console.error(err);
        toast.error(err.message || 'An error occurred');
    }
};

const removeCategoryAndProducts = async (id: number) => {
    try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${id}/products`)
        const data = await response.json()
        if (Array.isArray(data)) {
            products.value = data;
            products.value.forEach(p => p ? productsIds.value.push(p.id) : '')
            for (let i = 0; i < productsIds.value.length; i++) {
                console.log(productsIds.value[i])
                await removeProduct(productsIds.value[i])
            }

            await removeCategoryCard(id)
        } else {
            throw new Error('Failed to fetch products by category');
        }
    } catch (err: any) {
        console.error(err.message)
    }
}

</script>

<template>
    <div class="grid grid-cols-5 gap-4">
        <div
            v-for="category in categoryStore.categories"
            :key="category.id"
            class="border-2 border-blue-400 rounded-md p-3 flex gap-3 bg-blue-100 items-stretch"
        >
            <div class="w-1/2 min-w-1/2 flex flex-col">
                <div class="text-[14px] text-slate-500">
                    <span>ID: </span>{{category.id}}
                </div>
                <div class="text-blue-800 font-bold">{{category.name}}</div>
                <div class="flex justify-between items-center gap-2 self-start mt-auto">
                    <Dialog>
                        <DialogTrigger as-child>
                            <Button class="h-8 w-full flex items-center gap-2">
                                <Icon name="uil:edit"></Icon>
                            </Button>
                        </DialogTrigger>
                        <DialogContent class="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Edit mode</DialogTitle>
                                <DialogDescription>
                                    <div>Let's edit "{{ category.name }}" </div>
                                </DialogDescription>
                            </DialogHeader>
                            <AdminFormsEditCategory :category="category" />
                        </DialogContent>
                    </Dialog>

                    <Dialog>
                        <DialogTrigger as-child>
                            <Button class="h-8 w-full bg-red-600 hover:bg-red-700">
                                <Icon name="ant-design:delete-twotone"></Icon>
                            </Button>
                        </DialogTrigger>
                        <DialogContent class="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Remove "{{ category.name }}"?</DialogTitle>
                                <DialogDescription>
                                    <div>The category and all related products will be removed</div>
                                </DialogDescription>
                            </DialogHeader>
                            <DialogClose>
                                <div class="flex items-center gap-3">
                                    <Button class='w-full bg-red-500 hover:bg-red-700' @click="removeCategoryAndProducts(category.id)" >Yes</Button>
                                    <Button class='w-full bg-slate-500 hover:bg-slate-700'>Cancel</Button>
                                </div>
                            </DialogClose>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div class="w-1/2 min-w-1/2 rounded-md overflow-hidden">
                <img class="object-cover w-full h-full" :src="category.image" :alt="category.name">
            </div>
        </div>
    </div>
</template>