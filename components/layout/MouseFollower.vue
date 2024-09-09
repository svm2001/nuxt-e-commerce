<template>
    <div class="mouse-follower" :style="followerStyle">
<!--        <span class="bg-teal-900/50"></span>-->
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const followerStyle = ref({
    position: 'fixed',
    width: '600px',
    height: '600px',
    borderRadius: '50%',
    backgroundColor: 'transparent',
    pointerEvents: 'none',
    zIndex: 999999999999,
    left: '0px',
    top: '0px',
});

const updatePosition = (event) => {
    followerStyle.value.left = `${event.clientX - 300}px`;
    followerStyle.value.top = `${event.clientY - 300}px`;
};

onMounted(() => {
    window.addEventListener('mousemove', updatePosition);
});

onUnmounted(() => {
    window.removeEventListener('mousemove', updatePosition);
});
</script>

<style>
</style>

<style scoped>
.mouse-follower {
    display: flex;
    justify-content: center;
    align-items: center;
    background: radial-gradient(circle, rgba(129, 230, 217, 0.13) 0%, rgba(255, 255, 255, 0) 70%);

    span {
        border: 3px solid rgba(129, 230, 217, 1);
        display: block;
        width: 24px;
        height: 24px;
        border-radius: 999px;
    }
}
</style>