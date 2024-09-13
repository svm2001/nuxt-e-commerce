<script setup>
import {useUserStore} from '~/store/user'

const userStore = useUserStore()

const handleLogout = () => {
    userStore.logout()
}
</script>

<template>
    <div>
        <h1>Profile</h1>
        <p>Welcome, {{ userStore.user.name }}</p>
        <button @click="handleLogout">Logout</button>
    </div>
</template>