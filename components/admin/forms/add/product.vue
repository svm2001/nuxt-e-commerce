<script setup lang="ts">
import {useProductStore} from "~/store/products";
const productStore = useProductStore();
import { toast } from "vue-sonner";
import {Textarea} from "~/components/ui/textarea";

const title = ref('');
const price = ref<number | null>(null);
const description = ref('');
const catId = ref<number | null>(null);
const images = ref<File[]>([]);
const imagePreviews = ref<string[]>([]);
const close = ref<HTMLElement | null>(null)

const handleImageUpload = (event: Event) => {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
        for (let i = 0; i < files.length; i++) {
            if (images.value.length < 5) {
                images.value.push(files[i]);
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
    images.value.splice(index, 1);
    imagePreviews.value.splice(index, 1);
};

const uploadImages = async () => {
    const imageUrls: string[] = [];
    for (const image of images.value) {
        const formData = new FormData();
        formData.append('file', image);
        const response = await fetch('https://api.escuelajs.co/api/v1/files/upload', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        imageUrls.push(data.location);
    }
    console.log(imageUrls)
    return imageUrls;
};

const submitForm = async () => {
    if (!title.value || !price.value || !description.value || !catId.value || images.value.length === 0) {
        toast.error('Please fill all fields and upload at least one image');
        return
    }

    if(price.value <= 0) {
        toast.error('Price must be a positive number');
        return
    }

    try {
        productStore.loading = true
        const imageUrls = await uploadImages();

        const newProduct = {
            title: title.value,
            price: price.value,
            description: description.value,
            categoryId: catId.value,
            images: imageUrls
        };

        const response = await fetch('https://api.escuelajs.co/api/v1/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        });

        if (response.ok) {
            close.value?.click()
            const data = await response.json();
            productStore.addProduct(data);
            toast.success('Product added successfully');
            title.value = '';
            price.value = null;
            description.value = '';
            catId.value = null;
            images.value = [];
            imagePreviews.value = [];
            productStore.loading = false
        }
    } catch (err: any) {
        console.error(err)
    }
}
</script>

<template>
    <form @submit.prevent="submitForm">
        <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-4">
                <FormField v-slot="{ componentField }" name="title">
                    <FormItem>
                        <FormControl>
                            <Input v-model="title" type="text" placeholder="* Title" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="price">
                    <FormItem>
                        <FormControl>
                            <Input v-model="price" type="number" placeholder="* Price" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="description">
                    <FormItem>
                        <FormControl>
                            <Textarea v-model="description" type="text" class="max-h-[300px]" placeholder="* Description" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="categoryId">
                    <FormItem>
                        <FormControl>
                            <Select v-model="catId">
                                <SelectTrigger class="w-full">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem v-for="category in productStore.categories" :key="category.id" :value="Number(category.id)">
                                            {{ category.name }}
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="categoryId">
                    <FormItem>
                        <FormControl>
                            <div class="flex flex-col gap-4">
                                <div class="">
                                    <div class="file-input">
                                        <input
                                            id="file-input"
                                            class="file-input__input"
                                            type="file"
                                            multiple
                                            @change="handleImageUpload"
                                            accept="image/*"
                                        />
                                        <label class="file-input__label" for="file-input">
                                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="upload" class="svg-inline--fa fa-upload fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path></svg>
                                            <span>Upload file(s)</span>
                                        </label>
                                    </div>
                                </div>
                                <div class="flex gap-[18px]">
                                    <div v-for="(preview, index) in imagePreviews" :key="index" class="relative">
                                        <img :src="preview" alt="Preview" class="w-20 h-20 object-cover rounded" />
                                        <button @click="removeImage(index)" class="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
                                            <Icon name="carbon:close" class="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                    <DialogClose class="hidden">
                        <a ref="close">CLOSE</a>
                    </DialogClose>
            </div>
            <Button class="flex items-center gap-1">
                Add
                <Icon name="lets-icons:add-duotone" class="w-6 h-6" style="color: white;"></Icon>
            </Button>
        </div>
    </form>
</template>

<style>
.file-input__input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
}

.file-input__label {
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    border-radius: 6px;
    font-size: 14px;
    border: 1px solid #e2e8f0;
    color: rgb(2, 8, 23);
    width: 100%;
    padding: 10px 12px;
    background-color: transparent;
}

.file-input__label svg {
    height: 16px;
    margin-right: 4px;
}
</style>