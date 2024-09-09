<script setup lang="ts">

interface Props {
    as: string
}

const props = defineProps<Props>()

</script>

<template>
    <div v-if="props.as === 'h1'">
        <h1 class="text-4xl font-bold text-slate-100 mb-10">
            <slot></slot>
        </h1>
    </div>
    <div v-if="props.as === 'h2'">
        <h2 class="text-3xl font-bold text-slate-100 mb-8">
            <slot></slot>
        </h2>
    </div>
    <div v-if="props.as === 'h3'">
        <h3 class="text-2xl font-bold text-slate-100 mb-6">
            <slot></slot>
        </h3>
    </div>
</template>
