<script setup lang="ts">
import {useCategoryStore} from "~/store/categories";
const categoryStore = useCategoryStore


definePageMeta({
    layout: 'admin'
})

useSeoMeta({
    title: 'Categories / Dashboard | My e-commerce'
})
</script>

<template>
    <div class="mb-5">
        <Dialog>
            <DialogTrigger as-child>
                <Button class="bg-blue-700 w-[197px] flex items-center gap-1">
                    New category
                    <Icon name="lets-icons:add-duotone" class="w-6 h-6" style="color: white;"></Icon>
                </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add new category</DialogTitle>
                </DialogHeader>
                <AdminFormsAddCategory />
            </DialogContent>
        </Dialog>
    </div>
    <AdminCategories />
</template>

<style scoped>

</style>