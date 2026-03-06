import axios from 'axios';

// Create axios instance with base URL pointing to auth server
const API = axios.create({
    baseURL: 'http://localhost:3000/api',
});

// Set auth header on every request
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle token expiration or auth errors
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            // Clear token and redirect to login if token is invalid
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // Optional: redirect to login
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default API;
