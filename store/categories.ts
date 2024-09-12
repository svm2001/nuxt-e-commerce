import {defineStore} from "pinia";
import type {Category} from "~/components/categories/types";
import type {Product} from "~/components/products/List_types";
import {sortProducts} from "~/utils/sorting";

export const useCategoryStore = defineStore('categories', () => {
        const url = 'https://api.escuelajs.co'
        const urlCategories = '/api/v1/categories?limit=0'

        // getting data
        const categories = ref<Category[]>([])
        const products = ref<Product[]>([])
        const error = ref<string | null>(null)
        const loading = ref<boolean>(false)

        const itemsPerPage = ref<number>(8)
        const page = ref<number>(1)
        const itemsLength = ref<number>(0)
        const totalPages = ref<number>(itemsLength.value / itemsPerPage.value)

        const fetchCategories = async () => {
            try {
                const response = await fetch(`${url}${urlCategories}`)
                const data = await response.json();
                if (Array.isArray(data)) {
                    categories.value = data
                } else {
                    throw new Error('Failed to fetch categories')
                }
            } catch (err: any) {
                error.value = err.message
            }
        }

        const fetchProductsByCategory = async (id: number) => {
            error.value = null
            try {
                const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${id}/products?limit=0&offset=0`)
                const data = await response.json()
                if (Array.isArray(data)) {
                    products.value = data;
                    itemsLength.value = products.value.length
                } else {
                    throw new Error('Failed to fetch products by category');
                }
            } catch (err: any) {
                error.value = err.message
            }
        }

        const showMore = async (id: number) => {
            page.value += 1
            error.value = null
            try {
                const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${id}/products?limit=0&offset=0`)
                const data = await response.json()
                if (Array.isArray(data)) {
                    products.value = [...products.value, ...data];
                } else {
                    throw new Error('Failed to fetch products by category');
                }
            } catch (err: any) {
                error.value = err.message
            }
        }

        const fetchCategoriesWithProducts = async () => {
            loading.value = true;
            await fetchCategories();
            const categoriesWithProducts = await Promise.all(
                categories.value.map(async (category) => {
                    await fetchProductsByCategory(category.id);
                    if (products.value.length > 0) {
                        return category;
                    }
                    return null;
                })
            );
            categories.value = categoriesWithProducts.filter(Boolean) as Category[];
            loading.value = false;
        };

        const getCategoryById = (id: number): Category | undefined => {
            return categories.value.find(category => category.id === id);
        };

        const sortProductsBy = (sorting: string) => {
            products.value = sortProducts(products.value, sorting);
        };

        return {
            fetchCategoriesWithProducts,
            fetchProductsByCategory,
            fetchCategories,
            categories,
            products,
            loading,
            error,
            getCategoryById,
            itemsPerPage,
            page,
            itemsLength,
            totalPages,
            showMore,
            sortProductsBy
        }
    })