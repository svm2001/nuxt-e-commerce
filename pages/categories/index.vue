<script setup lang="ts">
import {useCategoryStore} from "~/store/categories";
const categoryStore = useCategoryStore()
import {Toaster} from "~/components/ui/sonner";

useSeoMeta({
    title: 'Categories | My e-commerce'
})
</script>

<template>
    <div class="pb-12">
        <Container>
            <Toaster />
            <Heading :as="'h1'">Categories</Heading>
            <CategoriesList />
        </Container>
    </div>
</template>

<style scoped>

</style>