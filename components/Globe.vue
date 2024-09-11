<script setup>
import { ref, onMounted } from "vue"
import { useResizeObserver } from "@vueuse/core"
import { useSpring } from "vue-use-spring"
import createGlobe from "cobe"

const props = defineProps({
    scale: {
        type: Number,
        default: 1,
    },
    dark: {
        type: Boolean,
        default: true,
    },
    baseColor: {
        type: String,
        default: "#00421f",
    },
    glowColor: {
        type: String,
        default: "#00ffa6",
    },
    markerColor: {
        type: String,
        default: "#00ffa6",
    },
    offsetX: {
        type: Number,
        default: 0,
    },
    offsetY: {
        type: Number,
        default: 0,
    },
    speed: {
        type: Number,
        default: 0.0025,
    },
    opacity: {
        type: Number,
        default: 1,
    },
    brightness: {
        type: Number,
        default: 1,
    },
    markers: {
        type: Array,
        default: () => [
            { location: [40.7128, -74.006], size: 0.05 },
            { location: [34.052235, -118.243683], size: 0.05 },
            { location: [59.9375, 30.308611], size: 0.05 },
            { location: [37.773972, -122.431297], size: 0.05 },
            { location: [51.509865, -0.118092], size: 0.05 },
        ],
    },
})

function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)

    return [r / 255, g / 255, b / 255]
}

const canvasRef = ref(null)
let width = null

const pointerInteracting = ref(null)
const pointerInteractionMovement = ref(0)
const phi = ref(0)

const isGrabbing = ref(false)

const api = useSpring(
    { r: 0 },
    {
        mass: 1,
        tension: 80,
        friction: 10,
        precision: 0.001,
    },
)

function setWidth() {
    width = canvasRef.value.offsetWidth
}

onMounted(() => {
    window.addEventListener("resize", setWidth)

    setWidth()

    const globe = createGlobe(canvasRef.value, {
        devicePixelRatio: 2,
        width: width * 2,
        height: width * 2,
        scale: props.scale,
        mapBrightness: props.brightness,
        dark: props.dark,
        baseColor: hexToRgb(props.baseColor),
        markerColor: hexToRgb(props.markerColor),
        glowColor: hexToRgb(props.glowColor),
        opacity: props.opacity,
        offset: [props.offsetX, props.offsetY],
        markers: props.markers,
        phi: 0,
        theta: 0.3,
        diffuse: .4,
        mapSamples: 10000,
        onRender: (state) => {
            if (!pointerInteracting.value) {
                phi.value += props.speed
            }

            state.phi = phi.value + api.r
            state.width = width * 2
            state.height = width * 2
        },
    })
})

function onPointerDown(e) {
    pointerInteracting.value = e.clientX - pointerInteractionMovement.value
    isGrabbing.value = true
}

function onPointerUp(e) {
    pointerInteracting.value = null
    isGrabbing.value = false
}

function onPointerOut(e) {
    pointerInteracting.value = null
    isGrabbing.value = false
}

function onMouseMove(e) {
    if (pointerInteracting.value !== null) {
        const delta = e.clientX - pointerInteracting.value

        pointerInteractionMovement.value = delta
        api.r = delta / 200
    }
}

function onTouchMove(e) {
    if (pointerInteracting.value !== null && e.touches[0]) {
        const delta = e.touches[0].clientX - pointerInteracting.value

        pointerInteractionMovement.value = delta
        api.r = delta / 100
    }
}
</script>

<template>
    <div class="fixed inset-0 aspect-square">
        <canvas
            ref="canvasRef"
            class="h-full w-full"
            :class="[isGrabbing ? 'cursor-grabbing' : 'cursor-grab']"
            @pointerdown="onPointerDown"
            @pointerup="onPointerUp"
            @pointerout="onPointerOut"
            @mousemove="onMouseMove"
            @touchmove="onTouchMove" />
    </div>
</template>
