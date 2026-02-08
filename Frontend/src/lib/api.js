import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://projectmanagment-a63q.onrender.com/api',

    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            // We can't use useAuthStore here easily without causing circular deps or being in a hook context
            // But removing from localStorage will cause isAuthenticated to be false on next reload or check
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;

