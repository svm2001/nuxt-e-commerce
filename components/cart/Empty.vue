<script setup lang="ts">

</script>

<template>
    <div class="flex flex-col items-center pt-20">
        <Heading :as="'h3'">Unfortunately, your cart is empty!</Heading>
        <Icon name="noto:sad-but-relieved-face" class="w-12 h-12 mb-7"/>
        <NuxtLink to="/products">
            <Button class="flex items-center gap-1">
                <Icon name="lets-icons:back" class="w-4 h-4" style="color: white;" />
                Go to products</Button>
        </NuxtLink>
    </div>
</template>

<style scoped>

</style>