import type { Product } from "~/components/products/List_types";

export const sortProducts = (products: Product[], sorting: string): Product[] => {
    switch (sorting) {
        case 'Price: High to Low':
            return [...products].sort((a, b) => b.price - a.price);
        case 'Price: Low to High':
            return [...products].sort((a, b) => a.price - b.price);
        case 'Title: A - Z':
            return [...products].sort((a, b) => a.title.localeCompare(b.title));
        case 'Title: Z - A':
            return [...products].sort((a, b) => b.title.localeCompare(a.title));
        case 'ID: High to Low':
            return [...products].sort((a, b) => b.id - a.id);
        case 'ID: Low to High':
            return [...products].sort((a, b) => a.id - b.id);
        default:
            return products;
    }
};