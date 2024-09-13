<script setup lang="ts">
import {useProductStore} from "~/store/products";
import {formatNumber} from "../../utils/formatNumber";
import type {Product} from "~/components/products/List_types";
const productStore = useProductStore();
import {toast} from "vue-sonner";

const productImage = ref<any>(null);

const replaceByDefault = () => {
    if (productImage.value) {
        productImage.value.style = 'object-fit: contain;'
        productImage.value.src = 'https://vueschool.io/storage/media/677bbaa8ba92bed432f2bc7b6490c03a/Nuxt-3-Fundamentals_transparent.png'
    }
};

const formatImgUrl = (url:string) => url.replace(/["\[\]]/g, '')

const removeFromList = async (id: number) => {
    try {
        productStore.loading = true
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            productStore.filteredProducts = productStore.filteredProducts.filter(p => p.id !== p.id);
            productStore.totalProducts--;
            productStore.totalPages = Math.ceil(productStore.totalProducts / productStore.itemsPerPage);
            productStore.paginateProducts(productStore.currentPage);
            productStore.fetchFilteredProducts()
            toast.success('Product deleted successfully');
            productStore.loading = false
        } else {
            const errorData = await response.json();
            toast.error(errorData.message || 'Failed to delete product');
        }
    } catch (err: any) {
        console.error(err);
        toast.error(err.message || 'An error occurred');
    }
};
</script>

<template>
    <div v-if="!productStore.loading">
        <Table>
            <TableHeader>
                <TableRow class="text-[18px]">
                    <TableHead class="w-[60px]">ID</TableHead>
                    <TableHead class="min-w-[300px] max-w-[300px] w-[300px]">Title</TableHead>
                    <TableHead class="min-w-[500px] max-w-[500px] w-[500px]">Description</TableHead>
                    <TableHead class="w-[150px]">Price</TableHead>
                    <TableHead>Images</TableHead>
                    <TableHead class="w-[120px]">Category</TableHead>
                    <TableHead class="text-right w-[120px]">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="product in productStore.products" :key="product.id" v-bind="product">
                    <TableCell class="text-slate-900 text-md">{{ product.id }}</TableCell>
                    <TableCell class="font-bold whitespace-nowrap overflow-hidden text-ellipsis min-w-[300px] max-w-[300px] w-[300px]">{{ product.title }}</TableCell>
                    <TableCell class="text-slate-600 whitespace-nowrap min-w-[500px] max-w-[500px] w-[500px] overflow-hidden text-ellipsis">{{ product.description }}</TableCell>
                    <TableCell>{{ formatNumber(product.price) }} $</TableCell>
                    <TableCell>
                        <div class="flex items-center gap-1">
                            <img
                                loading="lazy"
                                v-for="(image, idx) in product.images"
                                :key="idx"
                                :src="formatImgUrl(image)"
                                :alt="product.title"
                                class="min-w-8 min-h-8 max-w-8 max-h-8 rounded-sm"
                                ref="productImage"
                                @error="replaceByDefault"
                            >
                        </div>
                    </TableCell>
                    <TableCell>{{ product.category.name }}</TableCell>
                    <TableCell class="text-right">
                        <div class="flex items-center justify-end gap-1">
                            <Dialog>
                                <DialogTrigger as-child>
                                    <Button class="h-8 w-8 p-0 flex items-center gap-2">
                                        <Icon name="uil:edit"></Icon>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent class="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Edit mode</DialogTitle>
                                        <DialogDescription>
                                            <div>Let's edit "{{ product.title }}" </div>
                                        </DialogDescription>
                                    </DialogHeader>
                                    <AdminFormsEditProduct :product="product"/>
                                </DialogContent>
                            </Dialog>

                            <Dialog>
                                <DialogTrigger as-child>
                                    <Button class="h-8 w-8 p-0 bg-red-600 hover:bg-red-700">
                                        <Icon name="ant-design:delete-twotone"></Icon>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent class="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Are you sure?</DialogTitle>
                                        <DialogDescription>
                                            <div>Product "{{ product.title }}" will be permanently deleted from database</div>
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogClose>
                                        <div class="flex items-center gap-3">
                                            <Button class='w-full bg-red-500 hover:bg-red-700' @click="removeFromList(product.id)">Yes</Button>
                                            <Button class='w-full bg-slate-500 hover:bg-slate-700'>Cancel</Button>
                                        </div>
                                    </DialogClose>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
    <div v-else>
        <Table>
            <TableHeader>
                <TableRow class="text-[18px]">
                    <TableHead class="w-[60px]"></TableHead>
                    <TableHead class="min-w-[300px] max-w-[300px] w-[300px]">Title</TableHead>
                    <TableHead class="min-w-[500px] max-w-[500px] w-[500px]">Description</TableHead>
                    <TableHead class="w-[150px]">Price</TableHead>
                    <TableHead>Images</TableHead>
                    <TableHead class="w-[160px]">Category</TableHead>
                    <TableHead class="text-right w-[120px]">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="product in productStore.products" :key="product.id" v-bind="product">
                    <TableCell class="text-slate-900 text-md">
                        <Skeleton class="h-[28px]" />
                    </TableCell>
                    <TableCell class="font-bold whitespace-nowrap overflow-hidden text-ellipsis min-w-[300px] max-w-[300px] w-[300px]">
                        <Skeleton class="h-[28px]" />
                    </TableCell>
                    <TableCell class="text-slate-600 whitespace-nowrap min-w-[500px] max-w-[500px] w-[500px] overflow-hidden text-ellipsis">
                        <Skeleton class="h-[28px]" />
                    </TableCell>
                    <TableCell>
                        <Skeleton class="h-[28px]" />
                    </TableCell>
                    <TableCell>
                        <div class="flex items-center gap-1.5">
                            <Skeleton class="min-w-8 min-h-8 max-w-8 max-h-8 rounded-sm" />
                            <Skeleton class="min-w-8 min-h-8 max-w-8 max-h-8 rounded-sm" />
                            <Skeleton class="min-w-8 min-h-8 max-w-8 max-h-8 rounded-sm" />
                        </div>
                    </TableCell>
                    <TableCell>
                        <Skeleton class="h-[28px]" />
                    </TableCell>
                    <TableCell class="text-right">
                        <div class="flex items-center justify-end gap-1">
                            <Skeleton class="h-8 w-8 p-0 flex items-center gap-2" />
                            <Skeleton class="h-8 w-8 p-0 flex items-center gap-2" />
                        </div>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
</template>