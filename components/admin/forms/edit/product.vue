<script setup lang="ts">
import { ref, watch } from 'vue';
import { useProductStore } from "~/store/products";
import { Textarea } from "~/components/ui/textarea";
import { toast } from "vue-sonner";
import type { Product } from "~/components/products/List_types";

const props = defineProps<{
    product: Product;
}>();

const productStore = useProductStore();
const title = ref(props.product.title);
const price = ref(props.product.price);
const description = ref(props.product.description);

const submitForm = async () => {
    try {
        productStore.loading = true;
        const updatedProduct = {
            title: title.value,
            price: price.value,
            description: description.value,
        };

        const response = await fetch(`https://api.escuelajs.co/api/v1/products/${props.product.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
        });

        if (response.ok) {
            toast.success('Product updated successfully');
            productStore.loading = false;
        } else {
            const errorData = await response.json();
            toast.error(errorData.message || 'Failed to update product');
        }
    } catch (err: any) {
        toast.error(err.message || 'An error occurred');
    } finally {
        productStore.fetchFilteredProducts();
        productStore.loading = false;
    }
};
</script>

<template>
    <form @submit.prevent="submitForm">
        <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-4">
                <FormField v-slot="{ componentField }" name="title">
                    <FormItem>
                        <FormControl>
                            <input class="inputEdit" v-model="title" type="text" placeholder="* Title" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="price">
                    <FormItem>
                        <FormControl>
                            <input class="inputEdit" v-model="price" type="number" placeholder="* Price" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="description">
                    <FormItem>
                        <FormControl>
                            <textarea class="textAreaEdit max-h-[300px]" v-model="description" type="text" placeholder="* Description" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <DialogClose class="hidden">
                    <button ref="close">CLOSE</button>
                </DialogClose>
            </div>
            <Button class="flex items-center gap-1 bg-green-600 hover:bg-green-700">
                Confirm
                <Icon name="lets-icons:add-duotone" class="w-6 h-6" style="color: white;"></Icon>
            </Button>
        </div>
    </form>
</template>

<style>
.inputEdit {
    @apply flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50;
}

.textAreaEdit {
    @apply flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
}
</style>