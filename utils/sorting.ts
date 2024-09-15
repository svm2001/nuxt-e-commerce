import type { Product } from "~/components/products/List_types";
import type {User} from "~/components/admin/usersTypes";

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

export const sortUsers = (users: User[], sorting: string): User[] => {
    switch (sorting) {
        case 'ID: High to Low':
            return [...users].sort((a, b) => b.id - a.id);
        case 'ID: Low to High':
            return [...users].sort((a, b) => a.id - b.id);
        case 'Name: A - Z':
            return [...users].sort((a, b) => a.name.localeCompare(b.name));
        case 'Name: Z - A':
            return [...users].sort((a, b) => b.name.localeCompare(a.name));
        case 'Email: A - Z':
            return [...users].sort((a, b) => a.email.localeCompare(b.email));
        case 'Email: Z - A':
            return [...users].sort((a, b) => b.email.localeCompare(a.email));
        case 'Role: Customer -> Admin':
            return [...users].sort((a, b) => b.role.localeCompare(a.role));
        case 'Role: Admin -> Customer':
            return [...users].sort((a, b) => a.role.localeCompare(b.role));
        default:
            return users;
    }
};