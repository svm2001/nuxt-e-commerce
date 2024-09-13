<script setup lang="ts">
import { useUserStore } from '~/store/user';
import { toast } from "vue-sonner";
import { useRouter } from 'vue-router';
import axios from 'axios';

definePageMeta({
    layout: 'login'
})

useSeoMeta({
    title: 'Sign Up | My e-commerce'
})

const name = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const role = ref<string>('customer');
const avatar = ref<string>('https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars.png');
const adminToken = 'ew8qpQl1Aw9LZaEgQ'

const isLoading = ref(false);
const router = useRouter();
const userStore = useUserStore();

const handleSignUp = async () => {
    isLoading.value = true;
    try {
        const usersResponse = await axios.get('https://api.escuelajs.co/api/v1/users');
        const users = usersResponse.data;
        const userExists = users.some((user: any) => user.email === email.value);

        if (userExists) {
            setTimeout(() => {
                toast('Email already registered! ❌', {
                    description: 'Please use a different email address.',
                    action: {
                        label: 'OK',
                        onClick: () => {}
                    }
                });
            }, 1500)
            return;
        }

        const response = await axios.post('https://api.escuelajs.co/api/v1/users', {
            email: email.value,
            name: name.value,
            password: password.value,
            role: role.value,
            avatar: avatar.value,
        });
        console.log('User registered successfully:', response.data);
            toast('Success! ✅', {
                description: 'Redirecting to Sign In...',
                action: {
                    label: 'OK',
                    onClick: () => {}
                }
            });

            setTimeout(() => {
                router.push('/login');
            }, 4000)
    } catch (error) {
        console.error('Registration failed:', error);
        toast('Something went wrong! ❌', {
            description: 'Check your input values',
            action: {
                label: 'OK',
                onClick: () => {}
            }
        });
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <div class="flex items-center justify-center min-h-screen max-h-screen">
        <div class="flex flex-col items-center justify-center relative">
            <Toaster />
            <Heading :as="'h1'">Sign Up</Heading>
            <div v-if="isLoading" class="flex  items-center justify-center min-h-[240px]">
                <LayoutLoader />
            </div>
            <div v-else class="border-2 border-slate-400 p-4 rounded-md bg-slate-300">
                <form @submit.prevent="handleSignUp" class="flex flex-col gap-5">
                    <div class="flex items-center gap-3">
                        <Icon name="mdi:account" class="w-5 h-5" style="color: #001250"></Icon>
                        <FormField v-slot="{ componentField }" name="name">
                            <FormItem>
                                <FormControl>
                                    <Input
                                        v-bind="componentField"
                                        v-model="name"
                                        type="text"
                                        required
                                        placeholder="* Name"
                                        class="min-w-[300px]"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                    </div>

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
                                        placeholder="* Email"
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
                                        placeholder="* Password"
                                        class="min-w-[300px]"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                    </div>

                    <div class="flex items-center justify-stretch gap-3">
                        <Icon name="eos-icons:role-binding" class="w-5 h-5" style="color: #001250"></Icon>
                        <FormField v-slot="{ componentField }" name="role" class="w-full">
                            <FormItem>
                                <FormControl>
                                    <Select v-model="role" class="w-full">
                                        <SelectTrigger class="w-full">
                                            <SelectValue class="w-full" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="customer"> Customer </SelectItem>
                                                <SelectItem value="admin"> Admin </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                    </div>

                    <div class="flex items-center gap-3" v-if="role === 'admin'">
                        <Icon name="oui:token-key" class="w-5 h-5 -translate-y-[11px]" style="color: #001250"></Icon>
                        <FormField v-slot="{ componentField }" name="admin_token">
                            <FormItem>
                                <FormControl>
                                    <Input
                                        v-bind="componentField"
                                        type="text"
                                        required
                                        placeholder="* Admin access token"
                                        class="min-w-[300px]"
                                    />
                                    <span class="text-[12px] text-slate-500">token:
                                        <span class="font-bold">{{adminToken}}</span>
                                    </span>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                    </div>

                    <Button type="submit">Sign Up</Button>
                    <div class="text-slate-500">
                        Already have an account?
                        <NuxtLink to="/login" class="text-slate-700 font-bold underline">Sign In</NuxtLink>
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

<style scoped>
.space-y-2 {
    width: 100%;
}
</style>