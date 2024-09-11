<script lang="ts" setup>
import { Toaster as Sonner, type ToasterProps } from 'vue-sonner'

const props = defineProps<ToasterProps>()
</script>

<template>
  <Sonner
    class="toaster group"
    v-bind="props"
    :toast-options="{
      classes: {
        toast: 'group toast group-[.toaster]:bg-slate-900 group-[.toaster]:text-[#00dc82] group-[.toaster]:border-border-teal-300 group-[.toaster]:shadow-xl',
        description: 'group-[.toast]:text-teal-600',
        actionButton:
          'group-[.toast]:bg-[#00dc82] group-[.toast]:text-slate-900 font-medium',
        cancelButton:
          'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
      },
    }"
  />
</template>
