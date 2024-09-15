import { defineStore } from 'pinia';
import axios from 'axios';
import type {User} from "~/components/admin/usersTypes";

const API_URL = 'https://api.escuelajs.co/api/v1';

export const useUserStore = defineStore('user', () => {
    const users = ref<User[]>([])
    const filteredUsers = ref<User[]>([]);
    const currentSortOption = ref('Role: All');
    const error = ref<string | null>(null)
    const loading = ref(false)
    let user = ref(null as any);
    let token = process.client ? localStorage.getItem('token') || '' : '';
    let role = process.client ? localStorage.getItem('role') || '' : '';
    let isError = false;

    const isAuthenticated = () => !!token;
    const getRole = () => role;

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                email,
                password,
            });
            token = response.data.access_token;
            if (process.client) localStorage.setItem('token', token)
            const userResponse = await axios.get(`${API_URL}/auth/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            user.value = userResponse.data;
            role = user.value.role
            if (process.client) localStorage.setItem('role', role)
            return true;
        } catch (error) {
            isError = true;
            return false;
        }
    };

    const logout = () => {
        user.value = null;
        token = '';
        if (process.client) {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
        }
    };

    const getUsers = async () => {
        try {
            const response = await fetch(`https://api.escuelajs.co/api/v1/users`);
            const data = await response.json();
            if (Array.isArray(data)) {
                users.value = data;
                filteredUsers.value = data;
            } else {
                throw new Error('Failed to fetch users');
            }
        } catch (err: any) {
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    };

    const resetFilters = () => {
        filteredUsers.value = users.value;
        console.log(56)
    };

    const filterUsers = (name?: string, email?: string) => {
        resetFilters();
        filteredUsers.value = filteredUsers.value.filter(user => {
            const nameMatch = name ? user.name.toLowerCase().includes(name.toLowerCase()) : true;
            const emailMatch = email ? user.email.toLowerCase().includes(email.toLowerCase()) : true;
            return nameMatch && emailMatch;
        });
    };

    const sortUsersBy = (sorting: string) => {
        resetFilters();
        currentSortOption.value = sorting;
        filteredUsers.value = sortUsers(filteredUsers.value, sorting)
    };

    return {
        user,
        users,
        filteredUsers,
        error,
        token,
        isError,
        isAuthenticated,
        getRole,
        login,
        logout,
        loading,
        getUsers,
        filterUsers,
        sortUsersBy,
        resetFilters,
        currentSortOption
    };
}, {
    persist: true
});