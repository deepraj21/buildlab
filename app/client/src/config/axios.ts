import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
})

export default axiosInstance;   