import type { Product } from "~/components/products/List_types";
import type { CartItem } from "~/components/cart/types";

export const mapProductToCartItem = (product: Product): CartItem => {
    return {
        productId: product.id,
        quantity: 1,
        price: product.price,
        title: product.title,
        description: product.description,
        images: product.images,
        categoryName: product.category.name
    };
}