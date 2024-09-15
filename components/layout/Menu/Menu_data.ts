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

export const ADMIN_MENU_DATA: MenuItem[] = [
    {
        icon: 'carbon:catalog-publish',
        name: 'Products',
        url: '/admin/products'
    },
    {
        icon: 'iconamoon:category-duotone',
        name: 'Categories',
        url: '/admin/categories'
    },
    {
        icon: 'flowbite:users-group-outline',
        name: 'Users',
        url: '/admin/users'
    },
    {
        icon: 'akar-icons:statistic-up',
        name: 'Statistic',
        url: '/admin/statistic'
    },
    {
        icon: 'mdi:widget-line-shimmer',
        name: 'Widgets',
        url: '/admin/widgets'
    },
    {
        icon: 'material-symbols:contact-support-outline',
        name: 'Support',
        url: '/admin/support'
    },
]