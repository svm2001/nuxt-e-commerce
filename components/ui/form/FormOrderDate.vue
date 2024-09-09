<script setup lang="ts">
import {
    DateFormatter,
    CalendarDate,
    type DateValue,
    getLocalTimeZone,
    today,
} from '@internationalized/date'

import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const df = new DateFormatter('en-US', {
    dateStyle: 'long',
})

const items = [
    { value: 0, label: 'Today' },
    { value: 1, label: 'Tomorrow' },
    { value: 3, label: 'In 3 days' },
    { value: 7, label: 'In a week' },
]

const value = ref<DateValue>()

const emits = defineEmits<{
    (e: 'update:modelValue', payload: string | number): void
}>()

watch(value, (newValue) => {
    if (newValue) {
        emits('update:modelValue', newValue.toString())
    }
})

</script>

<template>
    <Popover>
        <PopoverTrigger as-child>
            <Button
                variant="outline"
                :class="cn(
          'w-full justify-start text-left font-medium',
          !value && 'text-muted-foreground',
        )"
            >
                <CalendarIcon class="mr-2 h-4 w-4" />
                {{ value ? df.format(value.toDate(getLocalTimeZone())) : "* Pick a delivery date" }}
            </Button>
        </PopoverTrigger>
        <PopoverContent class="flex w-auto flex-col gap-y-2 p-2">
            <Select
                class=""
                @update:model-value="(v) => {
          if (!v) return;
          value = today(getLocalTimeZone()).add({ days: Number(v) });
        }"
            >
                <SelectTrigger>
                    <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem v-for="item in items" :key="item.value" :value="item.value.toString()">
                        {{ item.label }}
                    </SelectItem>
                </SelectContent>
            </Select>
            <Calendar
                v-model="value"
                calendar-label="Delivery date"
                initial-focus
                :max-value="new CalendarDate(2027, 1, 1)"
                :min-value="today(getLocalTimeZone())"
            />
        </PopoverContent>
    </Popover>
</template>