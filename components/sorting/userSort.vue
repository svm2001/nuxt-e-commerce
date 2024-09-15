<script setup lang="ts">
import { ref } from 'vue';
const sortOption = ref('ID: Low to High');

const sortOptions = [
    'ID: Low to High',
    'ID: High to Low',
    'Name: A - Z',
    'Name: Z - A',
    'Email: A - Z',
    'Email: Z - A',
    'Role: Customer -> Admin',
    'Role: Admin -> Customer',
];

const selectedSorting = ref('');
const emit = defineEmits(['sort']);
const sortUsers = (sorting: string) => {
    selectedSorting.value = sorting;
    emit('sort', sorting);
};
</script>

<template>
    <div class="bg-blue-100 p-3 rounded-md">
        <div class="text-xl text-[#1e40af] font-bold mb-3">Sorting</div>
        <div class="flex flex-col gap-3">
            <Select v-model="sortOption" @update:modelValue="sortUsers">
                <SelectTrigger class="w-full bg-white">
                    <SelectValue placeholder="Select a sorting option" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Sorting Options</SelectLabel>
                        <SelectItem v-for="option in sortOptions" :key="option" :value="option">
                            {{ option }}
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    </div>
</template>