<script setup lang="ts">
import {MENU_DATA} from "~/components/layout/Menu/Menu";
</script>

<template>
    <nav class="flex items-center gap-4">
        <NuxtLink
            class="flex items-center py-1 text-xl font-medium rounded-md px-2 w-full hover:opacity-60 transition-all gap-0.5"
            v-for="item in MENU_DATA"
            :key="item.url"
            :to="item.url"
        >
            <Icon :name="item.icon" class="mr-0.5"/>
            {{ item.name }}
        </NuxtLink>
    </nav>
</template>

<style scoped>

.router-link-exact-active {
    color: #81e6d9;
    &:hover {
        opacity: 1;
    }
}

</style>