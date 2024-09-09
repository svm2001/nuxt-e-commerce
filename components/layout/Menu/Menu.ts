export interface MenuItem {
    name: string
    url: string
    icon: string
}

export const MENU_DATA: MenuItem[] = [
    {
        icon: 'ion:home-outline',
        name: 'Home',
        url: '/'
    },
    {
        icon: 'carbon:catalog-publish',
        name: 'Products',
        url: '/products'
    },
    {
        icon: 'iconamoon:category-duotone',
        name: 'Categories',
        url: '/categories'
    },
    {
        icon: 'cil:cart',
        name: 'Cart',
        url: '/cart'
    }
]