<!-- components/FiltersUserFilter.vue -->
<script setup lang="ts">
import { ref, watch } from 'vue';
import { useUserStore } from "~/store/user";
import debounce from 'lodash.debounce';

const userStore = useUserStore();
const nameQuery = ref('');
const emailQuery = ref('');

const debouncedFilterUsers = debounce(() => {
    userStore.loading = true
    setTimeout(() => {
        userStore.filterUsers(nameQuery.value, emailQuery.value);
        userStore.loading = false
    }, 1000)
}, 300);

watch([nameQuery, emailQuery], debouncedFilterUsers);
</script>

<template>
    <div class="bg-blue-100 p-3 rounded-md">
        <div class="text-xl text-[#1e40af] font-bold mb-3">Filters</div>
        <div class="flex flex-col gap-3">
            <div class="flex items-center gap-2">
                <div class="font-bold flex items-center gap-1.5">
                    <Icon name="lets-icons:search-duotone" class="w-6 h-6" style="color: #0e4664;"></Icon>
                </div>
                <div class="flex items-center gap-1.5">
                    <div class="flex gap-3 items-center relative">
                        <Input v-model="nameQuery" placeholder="By name" class="" />
                    </div>
                </div>
            </div>
            <div class="flex items-center gap-2">
                <div class="font-bold flex items-center gap-1.5">
                    <Icon name="mage:email" class="w-6 h-6" style="color: #0e4664;"></Icon>
                </div>
                <div class="flex items-center gap-1.5">
                    <div class="flex gap-3 items-center relative">
                        <Input v-model="emailQuery" placeholder="By e-mail" class="" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>