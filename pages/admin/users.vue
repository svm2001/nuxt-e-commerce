<script setup lang="ts">
import {useUserStore} from "~/store/user";

definePageMeta({
    layout: 'admin'
})

useSeoMeta({
    title: 'Users / Dashboard | My e-commerce'
})

const userStore = useUserStore()

onMounted(async () => {
    await userStore.getUsers()
})

const handleSort = (sortOption: string) => {
    userStore.loading = true
    setTimeout(() => {
        userStore.sortUsersBy(sortOption)
        userStore.loading = false
    }, 1000)
};
</script>

<template>
    <div class="flex justify-stretch gap-12 overflow-hidden">
        <div class="max-w-[250px] min-w-[250px] w-full flex flex-col gap-5">
            <FiltersUserFilter />
            <SortingUserSort @sort="handleSort" />
            <div class="text-sm text-slate-400">First three users are untouchables. Protect from backend.</div>
            <div class="mt-auto">
                <Dialog>
                    <DialogTrigger as-child>
                        <Button class="bg-blue-700 w-full flex items-center gap-1">
                            New user
                            <Icon name="lets-icons:add-duotone" class="w-6 h-6" style="color: white;"></Icon>
                        </Button>
                    </DialogTrigger>
                    <DialogContent class="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Create new user</DialogTitle>
                        </DialogHeader>
                        <AdminFormsAddUser />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
        <div class="userContainer w-full overflow-auto">
            <AdminUsers />
        </div>
    </div>
</template>

<style scoped>
    .userContainer {
        min-height: calc(100dvh - 180px);
        max-height: calc(100dvh - 180px);
    }
</style>