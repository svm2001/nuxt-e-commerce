<script setup lang="ts">
const selectedSorting = ref('');
const emit = defineEmits(['sort']);
const sortProducts = (sorting: string) => {
    selectedSorting.value = sorting;
    emit('sort', sorting);
};

const resetSorting = () => {
    selectedSorting.value = 'Price: High to Low';
    emit('sort', 'Price: High to Low');
};

const props = defineProps({
    isSite: {
        type: Boolean,
        default: true
    }
})
</script>

<template>
    <div class="flex items-center justify-between bg-slate-950/60 p-3 rounded-md border-2 border-teal-900 relative z-10" v-if="props.isSite">
        <div class="flex items-center gap-2 text-[#00dc82] text-xl font-bold">
            <Icon name="hugeicons:sorting-05" class="w-6 h-6" style="color: #00dc82;"></Icon>
            Sortings:
        </div>
        <div class="flex items-center gap-2">
            <Select v-model="selectedSorting" @update:modelValue="sortProducts">
                <SelectTrigger class="w-[230px] ml-auto bg-slate-300">
                    <SelectValue class="bg-slate-300" placeholder="Sorting" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="Price: High to Low">
                            Price: High to Low
                        </SelectItem>
                        <SelectItem value="Price: Low to High">
                            Price: Low to High
                        </SelectItem>
                        <SelectItem value="Title: A - Z">
                            Title: A - Z
                        </SelectItem>
                        <SelectItem value="Title: Z - A">
                            Title: Z - A
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Button class="flex items-center gap-2 cursor-pointer bg-red-600 transition hover:bg-red-800 text-[20px]" @click="resetSorting">
                Reset
                <Icon name="carbon:reset-alt" class="w-5 h-5" style="color: white;"></Icon>
            </Button>
        </div>
    </div>
    <div v-else>
        <div class="bg-blue-100 p-2 rounded-md flex flex-col gap-2">
            <div class="font-bold flex items-center gap-1.5">
                <Icon name="hugeicons:sorting-05" class="w-6 h-6" style="color: #0e4664;"></Icon>
                Sorting:
            </div>
            <div class="flex items-center gap-1.5">
                <div class="flex items-center gap-2">
                    <Select v-model="selectedSorting" @update:modelValue="sortProducts">
                        <SelectTrigger class="w-[280px] ml-auto">
                            <SelectValue placeholder="Sort by..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="ID: High to Low">
                                    ID: High to Low
                                </SelectItem>
                                <SelectItem value="ID: Low to High">
                                    ID: Low to High
                                </SelectItem>
                                <SelectItem value="Price: High to Low">
                                    Price: High to Low
                                </SelectItem>
                                <SelectItem value="Price: Low to High">
                                    Price: Low to High
                                </SelectItem>
                                <SelectItem value="Title: A - Z">
                                    Title: A - Z
                                </SelectItem>
                                <SelectItem value="Title: Z - A">
                                    Title: Z - A
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Button class="cursor-pointer bg-red-600 transition hover:bg-red-800" @click="resetSorting">
                        <Icon name="carbon:reset-alt" class="w-4 h-4" style="color: white;"></Icon>
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>