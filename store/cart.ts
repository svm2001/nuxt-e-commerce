import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CartItem } from "~/components/cart/types"
import { toast } from "vue-sonner"
import { useForm } from "vee-validate"
import { cardFormValidation } from "~/components/cart/cardFormValidation"

export const useCartStore = defineStore('cart', () => {
    // Data: State
    const cartItems = ref<CartItem[]>([])
    const cartItemsTemp = ref<CartItem[]>([])
    const isOrderSended = ref(false)
    const tempData: any = ref([])
    const formSending = ref(false)
    const isSinglePageItemAdded = ref(false)

    // Data: Form
    const formSchema = cardFormValidation
    const form = useForm({
        validationSchema: formSchema,
    })

    // Actions
    const addToCart = (productId: number, price: number, title: string, description: string, images: string[], categoryName: string) => {
        const existingItem = cartItems.value.find(item => item.productId === productId)
        if (!existingItem) {
            cartItems.value.push({
                productId,
                quantity: 1,
                price,
                title,
                description,
                images,
                categoryName
            })
            isSinglePageItemAdded.value = true
        } else {
            existingItem.quantity++
        }
    }

    const showSonner = (item: CartItem) => {
        toast('Product removed successfully!', {
            description: `${item.title} (${item.price}$)`,
            action: {
                label: 'Return to cart',
                onClick: () => {
                    addToCart(
                        item.productId,
                        item.price,
                        item.title,
                        item.description,
                        item.images,
                        item.categoryName
                    )
                    isSinglePageItemAdded.value = true
                }
            },
        })
    }

    const decrementCount = (productId: number) => {
        const item = cartItems.value.find(item => item.productId === productId)
        if (item) {
            item.quantity--
            isSinglePageItemAdded.value = false
            if (item.quantity <= 0) {
                showSonner(item)
                cartItems.value = cartItems.value.filter(i => i.productId !== productId)
                isSinglePageItemAdded.value = false
            }
        }
    }

    const incrementCount = (productId: number) => {
        const item = cartItems.value.find(item => item.productId === productId)
        if (item) {
            item.quantity++
            isSinglePageItemAdded.value = true
        }
    }

    const removeItem = (productId: number) => {
        const item = cartItems.value.find(item => item.productId === productId)
        if (item) {
            item.quantity = 0
            showSonner(item)
            if (item.quantity <= 0) cartItems.value = cartItems.value.filter(i => i.productId !== productId)
            isSinglePageItemAdded.value = false
        }
    }

    const updateLocation = (newValue: any) => form.setFieldValue('location', newValue)
    const updateDate = (newValue: any) => form.setFieldValue('date', newValue)
    const updateHours = (newValue: any) => form.setFieldValue('hours', newValue)

    const onSubmit = (values: any) => {

        formSending.value = true

        isSinglePageItemAdded.value = false

        setTimeout(() => {
            isOrderSended.value = true

            let formData = new FormData()
            formData.append('name', values.name)
            formData.append('phone', values.phone)
            formData.append('email', values.email)
            formData.append('location', values.location)
            formData.append('date', values.date)
            formData.append('hours', values.hours)
            formData.append('street', values.street)
            formData.append('house', values.house.toString())
            formData.append('floor', values.floor.toString())
            formData.append('apartment', values.apartment.toString())

            // don't need to send all products info, so:
            const orderData = cartItems.value.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price
            }))

            formData.append('orderData', JSON.stringify(orderData))

            tempData.value = {
                name: values.name,
                phone: values.phone,
                email: values.email,
                location: values.location,
                date: values.date,
                hours: values.hours,
                street: values.street,
                house: values.house,
                apartment: values.apartment,
                floor: values.floor,
            }

            cartItemsTemp.value = cartItems.value
            cartItems.value = []
            toast.success('Success! Your order has been placed', {
                description: 'We will contact you as soon as possible :)'
            })

            // check & log data (for dev mode only)
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`)
            }

            formSending.value = false
        }, 3000)

    }

    // Getters
    const getCount = (productId: number) => {
        const item = cartItems.value.find(item => item.productId === productId)
        return item ? item.quantity : 0
    }

    const totalCount = computed(() => cartItems.value.reduce((total, item) => total + item.quantity, 0))
    const totalPrice = computed(() => {
        return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
    })

    return {
        cartItems,
        cartItemsTemp,
        isOrderSended,
        formSchema,
        form,
        formSending,
        addToCart,
        isSinglePageItemAdded,
        decrementCount,
        incrementCount,
        removeItem,
        showSonner,
        updateLocation,
        updateDate,
        updateHours,
        onSubmit,
        getCount,
        totalCount,
        totalPrice,
        tempData,
    }
},{
    persist: true
})