import axios from 'axios';
import Config from '../config';

// Create an Axios instance
const api = axios.create({
    baseURL: Config.API_URL,
    timeout: 5000
});

// Request Interceptor
api.interceptors.request.use(
    (config) => {
        const newConfig = { ...config };
        // Check if API key is available
        if (!process.env.NEXT_PUBLIC_API_KEY) {
            console.error('API key is not defined in environment variables');
        }
        newConfig.headers.Authorization = `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`;
        newConfig.headers.accept = 'application/json';
        return newConfig;
    },
    (error) => {
        console.error('Request error: ', error);
        return Promise.reject(error);
    }
);

// Response Interceptor
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error('Response error: ', error);
        return Promise.reject(error);
    }
);

export default api;