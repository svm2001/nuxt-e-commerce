<script setup lang="ts">
const selectedHours = ref('')
const emits = defineEmits<{
    (e: 'update:modelValue', payload: string): void
}>()

watch(selectedHours, (newValue) => {
    emits('update:modelValue', newValue)
})
</script>

<template>
    <RadioGroup v-model="selectedHours" class="grid grid-cols-2 gap-3">
        <div class="flex items-center space-x-2">
            <RadioGroupItem id="r1" value="8:00 - 11:00" />
            <Label for="r1">8:00 - 11:00</Label>
        </div>
        <div class="flex items-center space-x-2">
            <RadioGroupItem id="r2" value="11:00 - 14:00" />
            <Label for="r2">11:00 - 14:00</Label>
        </div>
        <div class="flex items-center space-x-2">
            <RadioGroupItem id="r3" value="14:00 - 17:00" />
            <Label for="r3">14:00 - 17:00</Label>
        </div>
        <div class="flex items-center space-x-2">
            <RadioGroupItem id="r4" value="17:00 - 20:00" />
            <Label for="r4">17:00 - 20:00</Label>
        </div>
    </RadioGroup>
</template>