export interface CartItem {
    productId: number
    quantity: number
    price: number
    totalPrice?: number
    title: string
    description: string
    images: string[]
    categoryName?: any
}