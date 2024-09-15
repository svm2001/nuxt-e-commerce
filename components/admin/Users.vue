<script setup lang="ts">
import { useUserStore } from "~/store/user";
import { toast } from "vue-sonner";

const userStore = useUserStore();
const isPwVisible = ref(false);

onMounted(async () => {
    await userStore.getUsers()
})

const removeUser = async (id: number) => {
    try {
        userStore.loading = true;
        const response = await fetch(`https://api.escuelajs.co/api/v1/users/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            userStore.users = userStore.users.filter(p => p.id !== p.id);
            toast.success('User deleted successfully');
        } else {
            const errorData = await response.json();
            toast.error(errorData.message || 'Failed to delete user');
        }
    } catch (err: any) {
        console.error(err);
        toast.error(err.message || 'An error occurred');
    } finally {
        userStore.getUsers();
        userStore.loading = false;
        userStore.resetFilters();
    }
};
</script>

<template>
    <div v-if="!userStore.loading">
        <Table>
            <TableHeader>
                <TableRow class="text-[18px]">
                    <TableHead class="min-w-[40px] max-w-[40px]">ID</TableHead>
                    <TableHead class="min-w-[70px] max-w-[70px]">Avatar</TableHead>
                    <TableHead class="min-w-[140px] max-w-[140px] w-[140px]">Name</TableHead>
                    <TableHead class="min-w-[260px] max-w-[260px] w-[260px]">Email</TableHead>
                    <TableHead class="w-[260px] min-w-[260px] max-w-[260px] flex items-center gap-2">Password
                        <button v-if="!isPwVisible" @click="isPwVisible = true" class="translate-y-[2px]" title="show passwords">
                            <Icon name="bxs:hide" style="color: #1d4ed8;" />
                        </button>
                        <button v-else @click="isPwVisible = false" class="translate-y-[2px]" title="show passwords">
                            <Icon name="bxs:show" style="color: #1d4ed8;" />
                        </button>
                    </TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead class="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody class="relative">
                <template v-if="userStore.filteredUsers.length > 0">
                    <TableRow v-for="user in userStore.filteredUsers" :key="user.name" v-bind="user">
                        <TableCell class="min-w-[40px] w-[40px] max-w-[40px]">{{ user.id }}</TableCell>
                        <TableCell class="min-w-[70px] w-[70px] max-w-[70px]">
                            <div class="flex items-center gap-1">
                                <img
                                    loading="lazy"
                                    :src="user.avatar"
                                    :alt="user.name"
                                    class="min-w-8 min-h-8 max-w-8 max-h-8 rounded-sm"
                                >
                            </div>
                        </TableCell>
                        <TableCell class="text-blue-600 font-bold text-md">{{ user.name }}</TableCell>
                        <TableCell class="font-bold whitespace-nowrap overflow-hidden text-ellipsis min-w-[260px] max-w-[260px] w-[260px]">{{ user.email }}</TableCell>
                        <TableCell class="text-slate-600 whitespace-nowrap min-w-[260px] max-w-[260px] w-[260px] overflow-hidden text-ellipsis">
                        <span v-if="!isPwVisible && user.role !== 'admin'">
                            <span v-for="(idx, symbol) in user.password" :key="idx" class="text-lg font-bold">*</span>
                        </span>
                            <span v-else-if="user.role === 'admin'">
                            <span v-for="(idx, symbol) in user.password" :key="idx" class="text-lg font-bold">*</span>
                        </span>
                            <span v-else>{{ user.password}}</span>
                        </TableCell>
                        <TableCell>{{ user.role.charAt(0).toUpperCase() + user.role.slice(1) }}</TableCell>
                        <TableCell class="text-right">
                            <div class="flex items-center justify-end gap-1" v-if="user.role !== 'admin'">
                                <Dialog>
                                    <DialogTrigger as-child>
                                        <Button class="h-8 w-8 p-0 flex items-center gap-2">
                                            <Icon name="uil:edit"></Icon>
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent class="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Edit mode</DialogTitle>
                                        </DialogHeader>

                                        <AdminFormsEditUser :user="user"/>
                                    </DialogContent>
                                </Dialog>

                                <Dialog>
                                    <DialogTrigger as-child>
                                        <Button class="h-8 w-8 p-0 bg-red-600 hover:bg-red-700">
                                            <Icon name="ant-design:delete-twotone"></Icon>
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent class="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Are you sure?</DialogTitle>
                                            <DialogDescription>
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DialogClose>
                                            <div class="flex items-center gap-3">
                                                <Button class='w-full bg-red-500 hover:bg-red-700' @click="removeUser(user.id)">Yes</Button>
                                                <Button class='w-full bg-slate-500 hover:bg-slate-700'>Cancel</Button>
                                            </div>
                                        </DialogClose>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </TableCell>
                    </TableRow>
                </template>
                <template v-else>
                    <div class="flex pt-5 text-blue-600 font-bold">No users found. ❌</div>
                </template>
            </TableBody>
        </Table>
    </div>
    <div class="flex justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" v-else>
        <LayoutLoader />
    </div>
</template>