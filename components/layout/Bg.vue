<script setup lang="ts">
import { onMounted, ref } from 'vue';
import MouseFollower from "~/components/layout/MouseFollower.vue";

const n_stars = 250;
const colors = ['#00dc82', '#5eead4'];
for (let i = 0; i < 250; i++) {
    colors.push('#5eead4');
}

const canvas = ref(null);
const c = ref(null);
const stars = ref([]);
let bg = null;

const randomInt = (max, min) => Math.floor(Math.random() * (max - min) + min);

function init() {
    canvas.value.width = window.innerWidth;
    canvas.value.height = window.innerHeight;
    canvas.value.style.background = '#000000';
    c.value = canvas.value.getContext('2d');

    bg = c.value.createRadialGradient(
        canvas.value.width / 2,
        canvas.value.height * 3,
        canvas.value.height,
        canvas.value.width / 2,
        canvas.value.height,
        canvas.value.height * 4
    );
    bg.addColorStop(0.1, "#00dc82");
    bg.addColorStop(.1, "#00112f");
    bg.addColorStop(.8, "#000000");
    bg.addColorStop(1, "#00dc82");

    for (let i = 0; i < n_stars; i++) {
        stars.value.push(new Star());
    }
}

class Star {
    constructor(x, y, radius, color) {
        this.x = x || randomInt(0, canvas.value.width);
        this.y = y || randomInt(0, canvas.value.height);
        this.radius = radius || Math.random() * 2;
        this.color = color || colors[randomInt(0, colors.length)];
        this.dy = -Math.random() * .4;
    }
    draw() {
        c.value.beginPath();
        c.value.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.value.shadowBlur = randomInt(3, 15);
        c.value.shadowColor = this.color;
        c.value.strokeStyle = this.color;
        c.value.fillStyle = '#00dc82';
        c.value.fill();
        c.value.stroke();
        c.value.closePath();
    }
    update(arrayStars = []) {
        if (this.y - this.radius < 0) this.createNewStar(arrayStars);

        this.y += this.dy;
        this.draw();
    }
    createNewStar(arrayStars = []) {
        let i = arrayStars.indexOf(this);
        arrayStars.splice(i, 1);
        arrayStars.push(new Star(false, canvas.value.height + 5));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.value.clearRect(0, 0, canvas.value.width, canvas.value.height);
    c.value.fillStyle = bg;
    c.value.fillRect(0, 0, canvas.value.width, canvas.value.height);
    stars.value.forEach(s => s.update(stars.value));
}

onMounted(() => {
    init();
    animate();

    window.addEventListener('resize', () => {
        canvas.value.width = window.innerWidth;
        canvas.value.height = window.innerHeight;
        stars.value = [];
        init();
    });
});
</script>

<template>

    <canvas ref="canvas"></canvas>

</template>

<style scoped>

canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

</style>