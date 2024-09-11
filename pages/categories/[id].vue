<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import {useCategoryStore} from "~/store/categories";

const categoryStore = useCategoryStore();
const route = useRoute();
const id = Number(route.params.id);
const category = computed(() => categoryStore.getCategoryById(id));

onMounted(async () => {
    await categoryStore.fetchProductsByCategory(id);

    const options = {
        rootMargin: "0px",
        threshold: 1.0,
    }
    const callback = (entries: any) => entries[0].isIntersecting && categoryStore.page < categoryStore.totalPages ? categoryStore.showMore(id) : ''
    const observer = new IntersectionObserver(callback, options);
    if(<HTMLDivElement> document.querySelector('.js-intersection-flag')) {
        observer.observe(<HTMLDivElement> document.querySelector('.js-intersection-flag'))
    }
});

</script>

<template>
    <div>
        <Container>
            <Toaster />
            <NuxtLink to="/categories" class="text-white text-sm decoration-1 flex items-center gap-1 mt-4 mb-6 hover:text-[#00dc82] transition">
                <Icon name="icon-park-solid:back" style="color: white;" />Categories
            </NuxtLink>
            <Heading :as="'h1'">{{ category?.name }}</Heading>
            <div v-if="categoryStore.products && categoryStore.products.length > 0" class="grid grid-cols-4 gap-4 pb-28">
                <ProductsCard
                    v-for="product in categoryStore.products"
                    :key="product.id"
                    v-bind="product"
                />
            </div>
            <div class="js-intersection-flag"></div>
        </Container>
    </div>
</template>