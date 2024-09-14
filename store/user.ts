import { defineStore } from 'pinia';
import axios from 'axios';
import {useCartStore} from "~/store/cart";
import {useFavouriteStore} from "~/store/favourites";

const cartStore = useCartStore()
const favouriteStore = useFavouriteStore()
const API_URL = 'https://api.escuelajs.co/api/v1';

export const useUserStore = defineStore('user', () => {
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
        cartStore.cartItems = []
        favouriteStore.favouriteItems = []
        if (process.client) {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
        }
    };

    return {
        user,
        token,
        isError,
        isAuthenticated,
        getRole,
        login,
        logout,
    };
}, {
    persist: true
});