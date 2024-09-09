<script setup lang="ts">
import { useProductStore } from "~/store/products";

const productStore = useProductStore();
</script>

<template>
    <Pagination
        v-slot="{ page }"
        :total="productStore.totalPages * 10"
        :sibling-count="1"
        show-edges
        :default-page="productStore.currentPage"
        @page-change="productStore.changePage"
    >
        <PaginationList v-slot="{ items }" class="flex items-center gap-1 justify-center">
            <PaginationFirst @click="productStore.changePage(1)" />
            <PaginationPrev @click="productStore.prevPage" />

            <template v-for="(item, index) in items">
                <PaginationListItem
                    v-if="item.type === 'page'"
                    :key="index"
                    :value="item.value"
                    as-child
                >
                    <Button
                        class="w-10 h-10 p-0"
                        :variant="item.value === page ? 'default' : 'outline'"
                        @click="productStore.changePage(item.value)"
                    >
                        {{ item.value }}
                    </Button>
                </PaginationListItem>
                <PaginationEllipsis v-else :key="item.type" :index="index" />
            </template>

            <PaginationNext @click="productStore.nextPage" />
            <PaginationLast @click="productStore.changePage(productStore.totalPages)" />
        </PaginationList>
    </Pagination>
</template>