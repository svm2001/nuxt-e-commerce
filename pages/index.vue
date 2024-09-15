<script setup lang="ts">
import {useUserStore} from "~/store/user"
const userStore = useUserStore();

useSeoMeta({
    title: 'Homepage | My e-commerce'
})
</script>

<template>
    <Container>
        <h1 class="pt-0 text-4xl text-[#00dc82] font-medium text-center mb-10" v-if="!userStore.isAuthenticated()">Welcome, unauthorized user! <br>This is Homepage of my demo e-commerce store</h1>
        <h1 class="pt-10 text-4xl text-[#00dc82] font-medium text-center mb-12" v-else>Welcome, {{ userStore.user?.name }}! This is Homepage <br> of my demo e-commerce store</h1>
        <div class="flex gap-5 justify-center">
            <div class="text-slate-200 border-slate-200 border p-4 bg-slate-900 w-[220px] rounded-md shadow-lg">
                <p class="text-xl font-medium mb-2">Stack:</p>
                <div class="flex flex-col gap-1">
                    <div class="flex items-center gap-1"><Icon name="logos:nuxt-icon" class="w-4 h-4" /> - Nuxt (v.3)</div>
                    <div class="flex items-center gap-1"><Icon name="hugeicons:computer-programming-01" class="w-4 h-4" style="color: #3bc896" /> - Composition API</div>
                    <div class="flex items-center gap-1"><Icon name="logos:typescript-icon" class="w-4 h-4" /> - Typescript</div>
                    <div class="flex items-center gap-1"><Icon name="logos:pinia" class="w-4 h-4" /> - Pinia</div>
                    <div class="flex items-center gap-1"><Icon name="logos:tailwindcss-icon" class="w-4 h-4" /> - Tailwind</div>
                    <div class="flex items-center gap-1"><Icon name="simple-icons:shadcnui" class="w-4 h-4" style="color: #3bc896" /> - Shadcn-vue</div>
                    <div class="flex items-center gap-1"><Icon name="simple-icons:iconify" class="w-4 h-4" style="color: #3bc896" /> - <NuxtLink class="transition hover:text-[#3BC896FF]" to="https://iconify.design/" target="_blank">Iconify</NuxtLink></div>
                    <div class="flex items-center gap-1"><Icon name="carbon:two-factor-authentication" class="w-4 h-4" style="color: #3bc896" /> - <div>JWT Token</div></div>
                    <div class="flex items-center gap-1"><Icon name="simple-icons:platzi" class="w-4 h-4" style="color: #92c53c" /> - <NuxtLink class="transition hover:text-[#3BC896FF]" to="https://fakeapi.platzi.com/" target="_blank">Platzi API</NuxtLink></div>
                </div>
            </div>
            <div class="text-slate-200 border-slate-200 border p-4 bg-slate-900 w-[220px] rounded-md shadow-lg flex flex-col gap-3 justify-center">
                <Icon name="healthicons:info" class="min-w-6 min-h-6 text-[#00dc82]"/>
                <p class="text-slate-500 text-justify text-sm flex items-start gap-3">
                    This is not real data and mokky information in product cards. Data is populated by other web-developers in real time. If you see obscenity, it's not me :D<br><br>
                    Login as customer to make an orders or login as admin to manage the app.
                </p>
                <div class="flex items-center justify-center gap-3 mt-6">
                    <NuxtLink class="transition hover:opacity-50" to="https://github.com/svm2001/nuxt-e-commerce" target="_blank" title="GitHub">
                        <Icon name="icon-park-outline:github" class="text-[#00dc82] w-6 h-6"></Icon>
                    </NuxtLink>
                    <NuxtLink class="transition hover:opacity-50" to="https://t.me/svm_2001" target="_blank" title="Telegram">
                        <Icon name="ic:baseline-telegram" class="text-[#00dc82] w-7 h-7"></Icon>
                    </NuxtLink>
                    <a class="transition hover:opacity-50" href="mailto:iblancos.instagram@gmail.com" title="Send me email">
                        <Icon name="basil:gmail-solid" class="text-[#00dc82] w-7 h-7"></Icon>
                    </a>
                </div>
            </div>
        </div>
        <div class="text-slate-200 flex flex-col gap-3 items-center border-slate-200 border p-4 bg-slate-900 w-[460px] rounded-md shadow-lg m-auto mt-5 text-center">
            <Icon name="ic:twotone-warning" class="text-yellow-300 w-6 h-6"></Icon>
            The app is made exclusively for the desktop version. For better experience use it on Full HD resolution (1920x1080)
        </div>
    </Container>
</template>

<style scoped>

</style>