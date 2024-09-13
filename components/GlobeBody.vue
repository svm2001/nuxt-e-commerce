<script setup>
import Globe from "@/components/Globe.vue"
import { ArrowRightIcon } from "@heroicons/vue/20/solid"
</script>

<template>
    <div class="flex h-[85%] w-[85%] items-center px-8 fixed">
        <div
            class="group relative mx-auto flex h-80 w-full max-w-md flex-col overflow-hidden rounded-2xl border border-white/5 bg-zinc-800">
            <div
                class="absolute inset-0 bg-[radial-gradient(40%_128px_at_50%_0%,theme(backgroundColor.white/5%),transparent)]"></div>

            <div>
                <Globe
                    dark
                    base-color="#777A80"
                    glow-color="#50505A"
                    marker-color="#22d3ee"
                    :opacity="0.85"
                    :brightness="1"
                    :offset-x="320"
                    :offset-y="64"
                    :scale="1.125" />
            </div>

            <div class="pointer-events-none mt-auto px-6 pb-6">
                <div class="relative transition duration-300 group-hover:-translate-y-9">
                    <div class="text-lg text-white transition-all duration-300 group-hover:text-base">Interactive components</div>

                    <p class="mt-2 text-sm font-light leading-relaxed text-white/75">
                        Build interactive headlines and content blocks that react as users interact with elements or scroll through
                        the page.
                    </p>

                    <div
                        class="absolute -left-2 bottom-0 translate-y-11 opacity-0 transition duration-300 group-hover:opacity-100">
                        <a
                            href="/products"
                            class="pointer-events-auto inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-white transition hover:bg-white/5">
                            <span>Explore components</span>

                            <ArrowRightIcon class="h-3 w-3" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
