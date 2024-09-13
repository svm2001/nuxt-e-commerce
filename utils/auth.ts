import axios from 'axios'
const API_URL = 'https://api.escuelajs.co/api/v1'
export const loginUser = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, {
            email,
            password
        })
        // console.log(response.data)
        return response.data
    } catch (error) {
        throw error
    }
}