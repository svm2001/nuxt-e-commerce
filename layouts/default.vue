<template>
    <div>
        <NuxtLoadingIndicator />
        <LayoutBg />
        <Globe />
        <LayoutMouseFollower/>
        <div>
            <LayoutHeader />
            <main class="pt-32">
                <slot></slot>
            </main>
        </div>
    </div>
</template>
<script setup lang="ts">
import Globe from "~/components/Globe.vue";
</script>