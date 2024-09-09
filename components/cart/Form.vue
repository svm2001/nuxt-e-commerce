<script setup lang="ts">
import { useCartStore } from "~/store/cart";
import { vMaska } from "maska/vue";
import { PhonePattern } from "~/components/ui/form/patterns";
import Combobox from "~/components/ui/combobox/Combobox.vue";
import { cities } from "~/components/ui/form/comboboxOptions";
import FormOrderDate from "~/components/ui/form/FormOrderDate.vue";
import FormOrderHours from "~/components/ui/form/FormOrderHours.vue";
import {useForm} from "vee-validate";

const cartStore = useCartStore();
const { handleSubmit, setFieldValue } = useForm({ validationSchema: cartStore.formSchema })
const citiesArr = cities;
const onSubmit = handleSubmit((values:any) => cartStore.onSubmit(values))
const updateLocation = (newValue: any) => setFieldValue('location', newValue)
const updateDate = (newValue: any) => setFieldValue('date', newValue)
const updateHours = (newValue: any) => setFieldValue('hours', newValue)
</script>

<template>
    <form @submit="onSubmit">
        <div class="flex flex-col gap-6 min-h-[72dvh] max-h-[72dvh] overflow-auto p-1">
            <!--name-->
            <FormField v-slot="{ componentField }" name="name">
                <FormItem>
                    <FormControl>
                        <Input type="text" placeholder="* Enter your name" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <!--phone-->
            <FormField v-slot="{ componentField }" name="phone">
                <FormItem>
                    <FormControl>
                        <Input type="tel" v-maska="PhonePattern" placeholder="* +7" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <!--email-->
            <FormField v-slot="{ componentField }" name="email">
                <FormItem>
                    <FormControl>
                        <Input type="email" placeholder="* E-mail" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <!--location-->
            <FormField v-slot="{ componentField }" name="location">
                <FormItem>
                    <FormControl>
                        <Combobox
                            v-model="cartStore.form.values.location"
                            @update:modelValue="updateLocation"
                            :options="citiesArr"
                            placeholder="* Select city..."
                            searchPlaceholder="Search city..."
                            emptyText="No city found."
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <!--date-->
            <FormField v-slot="{ componentField }" name="date">
                <FormItem>
                    <FormControl>
                        <FormOrderDate @update:modelValue="updateDate" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <!--hours-->
            <FormField v-slot="{ componentField }" name="hours">
                <FormItem>
                    <FormControl>
                        <div>
                            <span class="text-[14px] block text-slate-500 mb-2">* Pick a hours</span>
                            <FormOrderHours @update:modelValue="updateHours" />
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <!--street-->
            <FormField v-slot="{ componentField }" name="street">
                <FormItem>
                    <FormControl>
                        <Input type="text" placeholder="* Street name" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <!--house-->
            <FormField v-slot="{ componentField }" name="house">
                <FormItem>
                    <FormControl>
                        <Input type="number" placeholder="* House number" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <!--floor-->
            <FormField v-slot="{ componentField }" name="floor">
                <FormItem>
                    <FormControl>
                        <Input type="number" placeholder="* Floor number" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <!--apartment-->
            <FormField v-slot="{ componentField }" name="apartment">
                <FormItem>
                    <FormControl>
                        <Input type="number" placeholder="* Apartment number" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
        </div>
        <Button class="mt-8 absolute bottom-20" type="submit" style="width: calc(100% - 48px)">
            Submit
        </Button>
    </form>
</template>