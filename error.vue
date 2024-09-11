<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
    error: Object as () => NuxtError
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
    <div class="flex lg:min-h-screen min-h-dvh flex-col bg-slate-800">
        <main class="flex-1 font-sans">
            <section class="flex items-center justify-center h-dvh px-10 max-xl:px-4">
                <div class="flex flex-col justify-center items-center">
                    <div v-if="error?.statusCode === 400" class="flex flex-col gap-5 font-bold items-center mb-12 max-xl:mb-10 max-md:mb-8">
                        <h1 class="text-center text-[200px] text-[#00dc82]">{{ error?.statusCode }}</h1>
                    </div>
                    <div v-if="error?.statusCode === 403" class="flex flex-col gap-5 font-bold items-center mb-12 max-xl:mb-10 max-md:mb-8">
                        <h1 class="text-center text-[200px] text-[#00dc82]">{{ error?.statusCode }}</h1>
                    </div>
                    <div v-if="error?.statusCode === 404" class="flex flex-col gap-5 font-bold items-center mb-12 max-xl:mb-10 max-md:mb-8">
                        <h1 class="text-center text-[200px] text-[#00dc82]">{{ error?.statusCode }}</h1>
                    </div>
                    <div v-if="error?.statusCode === 500" class="flex flex-col gap-5 font-bold items-center mb-12 max-xl:mb-10 max-md:mb-8">
                        <h1 class="text-center text-[200px] text-[#00dc82]">{{ error?.statusCode }}</h1>
                    </div>
                    <div v-if="error?.statusCode === 502" class="flex flex-col gap-5 font-bold items-center mb-12 max-xl:mb-10 max-md:mb-8">
                        <h1 class="text-center text-[200px] text-[#00dc82]">{{ error?.statusCode }}</h1>
                    </div>
                    <div v-if="error?.statusCode === 503" class="flex flex-col gap-5 font-bold items-center mb-12 max-xl:mb-10 max-md:mb-8">
                        <h1 class="text-center text-[200px] text-[#00dc82]">{{ error?.statusCode }}</h1>
                    </div>
                    <NuxtLink @click="handleError">
                        <Button as="button" class="bg-primary px-8 error-btn">
                            Homepage
                        </Button>
                    </NuxtLink>
                </div>
            </section>
        </main>
        <Footer />
    </div>
    <Sonner />
</template>

<style>
.error-btn {
    & > div {
        background: #0a2341;
        svg path {
            fill: white;
        }
    }
}
</style>