import {defineStore} from 'pinia'
import type {Product} from "~/components/products/List_types"
import type {Category} from "~/components/categories/types"
import {sortProducts} from "~/utils/sorting"
import debounce from 'lodash.debounce'

export const useProductStore = defineStore('products', () => {
        const url = 'https://api.escuelajs.co'
        const catalog = '/api/v1/products'
        const categoriesEndpoint = '/api/v1/categories'

        // getting data
        const products = ref<Product[]>([])
        const categories = ref<Category[]>([])
        const filteredProducts = ref<Product[]>([])
        const loading = ref(false)
        const error = ref<string | null>(null)

        // pagination
        const itemsPerPage = ref(12)
        const currentPage = ref(1)
        const totalProducts = ref(0)
        const totalPages = ref(0)

        // price range
        const filterMinPrice = ref<number | null>(null)
        const filterMaxPrice = ref<number | null>(null)

        const fetchCategories = async () => {
            try {
                const response = await fetch(`${url}${categoriesEndpoint}`)
                const data = await response.json()
                if (Array.isArray(data)) {
                    categories.value = data
                } else {
                    throw new Error('Failed to fetch categories')
                }
            } catch (err: any) {
                error.value = err.message
            }
        }

        const fetchFilteredProducts = async (
            title?: string,
            price?: number,
            minPrice?: number,
            maxPrice?: number,
            categoryId?: number
        ) => {
            loading.value = true
            error.value = null

            let queryParams = []
            if (title) queryParams.push(`title=${title}`)
            if (price) queryParams.push(`price=${price}`)
            if (minPrice !== undefined) queryParams.push(`price_min=${minPrice}`)
            if (maxPrice !== undefined) queryParams.push(`price_max=${maxPrice}`)
            if (categoryId !== undefined) queryParams.push(`categoryId=${categoryId}`)
            const query = queryParams.length > 0 ? `?${queryParams.join('&')}` : ''

            try {
                const response = await fetch(`${url}${catalog}${query}`)
                const data = await response.json()
                if (Array.isArray(data)) {
                    filteredProducts.value = data
                    totalProducts.value = data.length
                    totalPages.value = Math.ceil(totalProducts.value / itemsPerPage.value)
                    paginateProducts(currentPage.value)

                    if (data.length > 0) {
                        const prices = data.map(product => product.price)
                        filterMinPrice.value = Math.min(...prices)
                        filterMaxPrice.value = Math.max(...prices)
                    }
                } else {
                    throw new Error('Failed to fetch products')
                }
            } catch (err: any) {
                error.value = err.message
            } finally {
                loading.value = false
            }
        }

        const paginateProducts = (page: number) => {
            const start = (page - 1) * itemsPerPage.value
            const end = start + itemsPerPage.value
            products.value = filteredProducts.value.slice(start, end)
        }

        const filterProducts = async (
            title?: string,
            price?: number,
            minPrice?: number,
            maxPrice?: number,
            categoryId?: number
        ) => {
            currentPage.value = 1
            await fetchFilteredProducts(
                title,
                price,
                minPrice,
                maxPrice,
                categoryId
            )
        }

        const sortProductsBy = (sorting: string) => {
            filteredProducts.value = sortProducts(filteredProducts.value, sorting)
            paginateProducts(currentPage.value)
        }

        const prevPage = () => {
            if (currentPage.value > 1) {
                loading.value = true
                setTimeout(() => {
                    currentPage.value--
                    paginateProducts(currentPage.value)
                    loading.value = false
                }, 1100)
            }
        }

        const nextPage = () => {
            if (currentPage.value < totalPages.value) {
                loading.value = true
                setTimeout(() => {
                    currentPage.value++
                    paginateProducts(currentPage.value)
                    loading.value = false
                }, 1100)
            }
        }

        const changePage = (page: number) => {
            if (page >= 1 && page <= totalPages.value) {
                loading.value = true
                setTimeout(() => {
                    currentPage.value = page
                    paginateProducts(currentPage.value)
                    loading.value = false
                }, 1100)
            }
        }

        const addProduct = (product: Product) => {
            filteredProducts.value.push(product)
            totalProducts.value++
            totalPages.value = Math.ceil(totalProducts.value / itemsPerPage.value)
            paginateProducts(currentPage.value)
        }

        return {
            products,
            loading,
            error,
            fetchFilteredProducts,
            paginateProducts,
            changePage,
            nextPage,
            prevPage,
            totalPages,
            totalProducts,
            currentPage,
            itemsPerPage,
            filterProducts,
            filteredProducts,
            filterMinPrice,
            filterMaxPrice,
            categories,
            fetchCategories,
            sortProductsBy,
            addProduct
        }
    },
    {
        persist: true
    })