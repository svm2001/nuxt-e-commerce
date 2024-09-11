<template>
    <div class="font-medium text-[#00dc82] flex flex-row-reverse items-center gap-1">
        {{ currentTime }} <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
        <path fill="#00dc82" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z" />
        <rect width="2" height="7" x="11" y="6" fill="#00dc82" rx="1">
            <animateTransform attributeName="transform" dur="14.4s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" />
        </rect>
        <rect width="2" height="9" x="11" y="11" fill="#00dc82" rx="1">
            <animateTransform attributeName="transform" dur="3.2s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" />
        </rect>
    </svg>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const currentTime = ref('');

const updateTime = () => {
    currentTime.value = new Date().toLocaleTimeString();
};

let intervalId;

onMounted(() => {
    updateTime();
    intervalId = setInterval(updateTime, 1000);
});

onUnmounted(() => {
    clearInterval(intervalId);
});
</script>
