<script setup lang="ts">
import {useCartStore} from "~/store/cart";
import type {Product} from "~/components/products/List_types";
const cartStore = useCartStore();

</script>

<template>
    <div class="p-3 rounded-md bg-slate-300 sticky top-36 flex flex-col h-fit">
        <h3 class="text-2xl font-bold text-slate-800 mb-7">Order</h3>
        <div class="mb-5">
            <div class="flex items-end gap-1 text-lg font-medium">
                <span class="flex items-center gap-1.5">
                    <Icon name="fluent-mdl2:total"></Icon>
                    Total items:
                </span>
                <span>{{ formatNumber(cartStore.totalCount) }}</span>
            </div>
            <div class="flex items-end gap-1 text-lg font-medium">
                <span class="flex items-center gap-1.5">
                    <Icon name="fa6-solid:sack-dollar"></Icon>
                    Total price:
                </span>
                <span>{{ formatNumber(cartStore.totalPrice) }} $</span>
            </div>
            <div class="flex items-end gap-1 text-lg font-medium">
                <span class="flex items-center gap-1.5">
                    <Icon name="mdi:sale-circle"></Icon>
                    Discount:
                </span>
                <span>0 %</span>
            </div>
        </div>
        <h3 class="text-2xl font-bold text-slate-800 mb-5">For payment: {{ formatNumber(cartStore.totalPrice) }} $</h3>
        <Sheet>
            <SheetTrigger as-child>
                <Button class="w-full text-xl p-0 !min-h-14 !text-teal-300 flex items-center gap-2 mt-auto">Next <Icon name="grommet-icons:link-next" class="w-4 h-4"></Icon></Button>
            </SheetTrigger>
            <SheetContent :class="{ 'translate-x-full pointer-events-none': cartStore.formSending }">
                <SheetHeader>
                    <SheetTitle>Fill the form</SheetTitle>
                    <SheetDescription class="mb-6">
                        Fields marked as * are required
                    </SheetDescription>
                </SheetHeader>
                    <CartForm />
                <SheetFooter>
                    <SheetClose as-child>
                        <Button class="mt-2 bg-slate-400 !absolute bottom-6" style="width: calc(100% - 48px)">
                            Back
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    </div>
</template>

<style scoped>

</style>