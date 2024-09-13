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
const categoryId = ref(props.product.category.id);
const images = ref<string[]>(props.product.images);
const newImages = ref<File[]>([]);
const imagePreviews = ref<string[]>(props.product.images);

const handleImageUpload = (event: Event) => {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
        for (let i = 0; i < files.length; i++) {
            if (newImages.value.length < 5) {
                newImages.value.push(files[i]);
                const reader = new FileReader();
                reader.onload = (e) => {
                    imagePreviews.value.push(e.target?.result as string);
                };
                reader.readAsDataURL(files[i]);
            }
        }
    }
};

const removeImage = (index: number) => {
    if (index < images.value.length) {
        images.value.splice(index, 1);
    } else {
        imagePreviews.value.splice(index - images.value.length, 1);
        newImages.value.splice(index - images.value.length, 1);
    }
};

const uploadImages = async () => {
    const uploadedImages = [];
    for (const file of newImages.value) {
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch('https://api.escuelajs.co/api/v1/files/upload', {
            method: 'POST',
            body: formData,
        });
        if (response.ok) {
            const data = await response.json();
            uploadedImages.push(data.location);
        } else {
            toast.error('Failed to upload image');
        }
    }
    return uploadedImages;
};

const submitForm = async () => {
    try {
        productStore.loading = true;
        // const uploadedImages = await uploadImages(newImages.value);
        // const validImages = images.value.filter(img => typeof img === 'string' && img.startsWith('[http'))

        const updatedProduct = {
            title: title.value,
            price: price.value,
            description: description.value,
            // images: validImages.concat(uploadedImages),
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
            productStore.fetchFilteredProducts();
            productStore.loading = false;
        } else {
            const errorData = await response.json();
            toast.error(errorData.message || 'Failed to update product');
        }
    } catch (err: any) {
        console.error(err);
        toast.error(err.message || 'An error occurred');
    } finally {
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

<!--                <FormField v-slot="{ componentField }" name="categoryId">-->
<!--                    <FormItem>-->
<!--                        <FormControl>-->
<!--                            <Select v-model="categoryId">-->
<!--                                <SelectTrigger class="w-full">-->
<!--                                    <SelectValue placeholder="Select a category" />-->
<!--                                </SelectTrigger>-->
<!--                                <SelectContent>-->
<!--                                    <SelectGroup>-->
<!--                                        <SelectItem v-for="category in productStore.categories" :key="category.id" :value="category.id">-->
<!--                                            {{ category.name }}-->
<!--                                        </SelectItem>-->
<!--                                    </SelectGroup>-->
<!--                                </SelectContent>-->
<!--                            </Select>-->
<!--                        </FormControl>-->
<!--                        <FormMessage />-->
<!--                    </FormItem>-->
<!--                </FormField>-->

<!--                <FormField v-slot="{ componentField }" name="file">-->
<!--                    <FormItem>-->
<!--                        <FormControl>-->
<!--                            <div class="flex flex-col gap-4">-->
<!--                                <div class="">-->
<!--                                    <div class="file-input">-->
<!--                                        <input-->
<!--                                            id="file-input"-->
<!--                                            class="file-input__input"-->
<!--                                            type="file"-->
<!--                                            multiple-->
<!--                                            @change="handleImageUpload"-->
<!--                                            accept="image/*"-->
<!--                                        />-->
<!--                                        <label class="file-input__label" for="file-input">-->
<!--                                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="upload" class="svg-inline&#45;&#45;fa fa-upload fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path></svg>-->
<!--                                            <span>Upload file(s)</span>-->
<!--                                        </label>-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                                <div class="flex gap-[18px]">-->
<!--                                    <div v-for="(preview, index) in imagePreviews" :key="index" class="relative">-->
<!--                                        <img :src="preview" alt="Preview" class="w-20 h-20 object-cover rounded" />-->
<!--                                        <button @click="removeImage(index)" class="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center">-->
<!--                                            <Icon name="carbon:close" class="w-4 h-4" />-->
<!--                                        </button>-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </FormControl>-->
<!--                        <FormMessage />-->
<!--                    </FormItem>-->
<!--                </FormField>-->
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

<style scoped>
.inputEdit {
    @apply flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50;
}

.textAreaEdit {
    @apply flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
}
</style>