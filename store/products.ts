import { defineStore } from 'pinia'
import type { Product } from "~/components/products/List_types";

export const useProductStore = defineStore('products', () => {
    const url = 'https://api.escuelajs.co'
    const catalog = '/api/v1/products'
    const categories = '/api/v1/categories/'

    // getting data
    const products = ref<Product[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    // pagination
    const itemsPerPage = ref(8)
    const currentPage = ref(1)
    const totalProducts = ref(0)
    const totalPages = ref(0)

    const fetchTotalProducts = async () => {
        try {
            const response = await fetch(`${url}${catalog}?limit=1`);
            const data = await response.json();
            if (Array.isArray(data)) {
                totalProducts.value = data.length > 0 ? data.length : 0;
                totalPages.value = Math.ceil(totalProducts.value / itemsPerPage.value);
                await fetchProducts(currentPage.value);
            } else {
                throw new Error('Failed to fetch total products');
            }
        } catch (err: any) {
            error.value = err.message;
        }
    }

    const fetchProducts = async (page: number) => {
        loading.value = true
        error.value = null
        const offset = (page - 1) * itemsPerPage.value
        try {
            const response = await fetch(`${url}${catalog}?limit=${itemsPerPage.value}&offset=${offset}`)
            const data = await response.json()
            if (Array.isArray(data)) {
                products.value = data;
            } else {
                throw new Error('Failed to fetch products');
            }
        } catch (err: any) {
            error.value = err.message
        } finally {
            loading.value = false
        }
    }

    const prevPage = () => {
        if (currentPage.value > 1) {
            loading.value = true
            currentPage.value--;
            fetchTotalProducts();
        }
    };

    const nextPage = () => {
        if (currentPage.value < totalPages.value) {
            loading.value = true
            currentPage.value++;
            fetchTotalProducts();
        }
    };

    const changePage = (page: number) => {
        if (page >= 1 && page <= totalPages.value) {
            loading.value = true
            currentPage.value = page;
            fetchTotalProducts();
        }
    };

    return {
        products,
        loading,
        error,
        fetchProducts,
        fetchTotalProducts,
        changePage,
        nextPage,
        prevPage,
        totalPages,
        totalProducts,
        currentPage,
        itemsPerPage
    }
})