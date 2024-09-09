<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import {useCategoryStore} from "~/store/categories";

const categoryStore = useCategoryStore();
const route = useRoute();
const id = Number(route.params.id);

onMounted(async () => {
    await categoryStore.fetchProductsByCategory(id);
});

const category = computed(() => categoryStore.getCategoryById(id));
</script>

<template>
    <div>
        <Container>
            <Heading :as="'h1'">{{ category?.name }}</Heading>
            <div v-if="categoryStore.products && categoryStore.products.length > 0" class="grid grid-cols-4 gap-4">
                <ProductsCard
                    v-for="product in categoryStore.products"
                    :key="product.id"
                    v-bind="product"
                />
            </div>
        </Container>
    </div>
</template>