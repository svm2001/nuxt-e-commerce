<template>
    <div>
        <h1>Profile</h1>
        <p>Welcome, {{ authStore.user.name }}</p>
        <button @click="handleLogout">Logout</button>
    </div>
</template>

<script setup>
import {useAuthStore} from '~/stores/auth'

const authStore = useAuthStore()

const handleLogout = () => {
    authStore.logout()
}
</script>