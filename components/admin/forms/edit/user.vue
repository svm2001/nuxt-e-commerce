<script setup lang="ts">
import type {User} from "~/components/admin/usersTypes";
import {toast} from "vue-sonner";
import {useUserStore} from "~/store/user";

const props = defineProps<{
    user: User;
}>();

const userStore = useUserStore();

const name = ref(props.user.name);
const email = ref(props.user.email);
const password = ref(props.user.password);
const avatar = ref(props.user.avatar);

const close = ref<HTMLElement | null>(null)
const images = ref<File>();
const imagePreview = ref<string>(avatar.value);

watchEffect(() => {
    imagePreview.value = props.user.avatar
})

const handleImageUpload = (event: Event) => {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
        images.value = files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.value = e.target?.result as string;
        };
        reader.readAsDataURL(files[0]);
    }
};

const removeImage = () => {
    images.value = undefined;
    props.user.avatar = '';
    imagePreview.value = '';
};

const uploadImages = async () => {
    let imageUrl: string = '';
    if (images.value) {
        const formData = new FormData();
        formData.append('file', images.value);
        const response = await fetch('https://api.escuelajs.co/api/v1/files/upload', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        imageUrl = data.location.toString();
    }
    return imageUrl;
};

const submitForm = async () => {
    if (!name.value || !email.value || !password.value || !avatar.value) {
        toast.error('Please fill the name and upload an image');
        return
    }

    try {
        userStore.loading = true
        const imageUrl = await uploadImages();

        const newCategory = {
            name: name.value,
            email: email.value,
            password: password.value,
            role: 'customer',
            avatar: props.user.avatar !== '' ? props.user.avatar : imageUrl,
        };

        const response = await fetch(`https://api.escuelajs.co/api/v1/users/${props.user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCategory)
        });

        response.ok
            ? toast.success('User edited successfully')
            : toast.success('Error')
    } catch (err: any) {
        console.error(err)
    } finally {
        userStore.loading = false
        userStore.getUsers()
        close.value?.click()
    }
}


</script>

<template>
    <form @submit.prevent="submitForm">
        <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-4">
                <FormField v-slot="{ componentField }" name="name">
                    <FormItem>
                        <FormControl>
                            <input class="inputEdit" v-model="name" required type="text" placeholder="* Name" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="email">
                    <FormItem>
                        <FormControl>
                            <input class="inputEdit" v-model="email" required type="text" placeholder="* Email" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="password">
                    <FormItem>
                        <FormControl>
                            <input class="inputEdit" v-model="password" required type="text" placeholder="* Password" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="image">
                    <FormItem>
                        <FormControl>
                            <div class="flex flex-col gap-4">
                                <div v-if="!imagePreview">
                                    <div class="file-input">
                                        <input
                                            id="file-input"
                                            class="file-input__input"
                                            type="file"
                                            @change="handleImageUpload"
                                            accept="image/*"
                                        />
                                        <label class="file-input__label min-w-4 mr-2" for="file-input">
                                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="upload" class="min-w-4 mr-2 svg-inline--fa fa-upload fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path></svg>
                                            <span>Upload avatar</span>
                                        </label>
                                    </div>
                                </div>
                                <div class="flex gap-[18px]">
                                    <div class="relative" v-if="imagePreview">
                                        <img :src="imagePreview" alt="Preview" class="w-20 h-20 object-cover rounded" />
                                        <button @click="removeImage()" class="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
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
            <Button class="flex items-center gap-1 bg-green-600 hover:bg-green-700">
                Confirm
            </Button>
        </div>
    </form>
</template>

<style scoped>

</style>