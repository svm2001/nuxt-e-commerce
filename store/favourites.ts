import { defineStore } from "pinia";
import type { Product } from "~/components/products/List_types";
import { toast } from "vue-sonner";

export const useFavouriteStore = defineStore('favourites', () => {
    const favouriteItems = ref<Product[]>([])

    const addToFavourites = (product: Product) => {
        setTimeout(() => {
            const existingItem = favouriteItems.value.find(item => item.id === product.id);

            if (!existingItem) {
                favouriteItems.value.push(product);
                toast('Product added to favourites!', {
                    description: `${product.title} (${formatNumber(product.price)} $)`,
                    action: {
                        label: 'OK',
                        onClick: () => {}
                    }
                });
            }
        }, 100)
    }

    const removeFromFavourites = (productId: number) => {
        setTimeout(() => {
            favouriteItems.value = favouriteItems.value.filter(item => item.id !== productId);
            toast('Product removed from favourites!', {
                action: {
                    label: 'OK',
                    onClick: () => {}
                }
            });
        },100)
    };

    return {
        favouriteItems,
        addToFavourites,
        removeFromFavourites
    }
},
    { persist: true} )
