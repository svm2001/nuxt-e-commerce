<script setup lang="ts">
import { useUserStore } from '~/store/user';
import { toast } from "vue-sonner";
import { useRouter } from 'vue-router';

definePageMeta({
    layout: 'login'
})

useSeoMeta({
    title: 'Sign In | My e-commerce'
})

const email = ref('');
const password = ref('');
const isLoading = ref(false);
const router = useRouter();
const userStore = useUserStore();

const handleLogin = async () => {
    isLoading.value = true
    const success = await userStore.login(email.value, password.value);
    if (success) {
        setTimeout(() => {
            isLoading.value = false
            toast('Success! ✅', {
                action: {
                    label: 'OK',
                    onClick: () => {}
                }
            });

            setTimeout (() => {
                userStore.user.role === 'customer' ? router.push('/') : router.push('/admin/products')
            }, 2000)
        }, 1500)
    } else {
        setTimeout(() => {
            toast('Something went wrong! ❌', {
                description: 'Check your email or password values',
                action: {
                    label: 'OK',
                    onClick: () => {}
                }
            });
            isLoading.value = false
            password.value  = ''
        },1500)
    }
}
</script>

<template>
    <div class="flex items-center justify-center min-h-screen max-h-screen">
        <div class="flex flex-col items-center justify-center relative">
            <Toaster />
            <Heading :as="'h1'">Sign In</Heading>
            <div v-if="isLoading" class="flex  items-center justify-center min-h-[240px]">
                <LayoutLoader />
            </div>
            <div v-else class="border-2 border-slate-400 p-4 rounded-md bg-slate-300">
                <form @submit.prevent="handleLogin" class="flex flex-col gap-5">
                    <div class="flex items-center gap-3">
                        <Icon name="ic:round-email" class="w-5 h-5" style="color: #001250"></Icon>
                        <FormField v-slot="{ componentField }" name="email">
                            <FormItem>
                                <FormControl>
                                    <Input
                                        v-bind="componentField"
                                        v-model="email"
                                        type="email"
                                        required
                                        placeholder="Email"
                                        class="min-w-[300px]"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                    </div>

                    <div class="flex items-center gap-3">
                        <Icon name="teenyicons:password-solid" class="w-5 h-5" style="color: #001250"></Icon>
                        <FormField v-slot="{ componentField }" name="password">
                            <FormItem>
                                <FormControl>
                                    <Input
                                        v-bind="componentField"
                                        v-model="password"
                                        type="password"
                                        required
                                        placeholder="Password"
                                        class="min-w-[300px]"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                    </div>

                    <Button type="submit">Sign In</Button>
                    <div class="text-slate-500">
                        Don't have an account?
                        <NuxtLink to="/register" class="text-slate-700 font-bold underline">Sign Up</NuxtLink>
                    </div>
                </form>
            </div>
            <NuxtLink class="text-slate-200 transition hover:text-slate-50 flex items-center gap-1 mt-10" to="/">
                <Icon name="lets-icons:back" style="color: white;" />
                Homepage
            </NuxtLink>
        </div>
    </div>
</template>