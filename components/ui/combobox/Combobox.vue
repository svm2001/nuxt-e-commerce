<script setup lang="ts">
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import type { comboboxProps } from "~/components/ui/form/comboboxTypes";

const open = ref(false)
const value = ref<string | number | undefined>()

const props = defineProps<comboboxProps>()

const emits = defineEmits<{
    (e: 'update:modelValue', payload: string | number): void
}>()

const handleSelect = (ev: any) => {
    if (typeof ev.detail.value === 'string' || typeof ev.detail.value === 'number') {
        value.value = ev.detail.value
        emits('update:modelValue', value.value)
    }
    open.value = false
}
</script>

<template>
    <Popover v-model:open="open">
        <PopoverTrigger as-child>
            <Button
                variant="outline"
                role="combobox"
                :aria-expanded="open"
                class="w-full justify-between"
            >
                {{ value ? options.find((option) => option.value === value)?.label : placeholder }}
                <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
        </PopoverTrigger>
        <PopoverContent class="!w-[335px] p-0">
            <Command>
                <CommandInput class="h-9" :placeholder="searchPlaceholder" />
                <CommandEmpty>{{ emptyText }}</CommandEmpty>
                <CommandList>
                    <CommandGroup>
                        <CommandItem
                            v-for="option in options"
                            :key="option.value"
                            :value="option.value"
                            @select="handleSelect"
                        >
                            {{ option.label }}
                            <Check :class="cn('ml-auto h-4 w-4', value === option.value ? 'opacity-100' : 'opacity-0')"/>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        </PopoverContent>
    </Popover>
</template>