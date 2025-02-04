// lib/api.ts
import axios from 'axios';

const api = axios.create({
    baseURL: '', // still need to add the base url
    headers: {
        'Content-Type': 'application/json',
    },
});

// automatically add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Global error handling interceptor
api.interceptors.response.use(
    (response) => response, // Return response if successful
    (error) => {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                console.error('Server Error:', error.response.status, error.response.data);
            } else if (error.request) {
                console.error('No Response Received:', error.request);
            } else {
                console.error('Axios Error:', error.message);
            }
        } else {
            console.error('Unexpected Error:', error);
        }
        return Promise.reject(error); // Reject error so it can still be handled where called
    }
);

export default api;