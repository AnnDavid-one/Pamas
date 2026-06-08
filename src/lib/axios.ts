// src/lib/axios.ts
import axios from 'axios';
import { useAuthStore } from '../store/authStore'; 

const apiClient = axios.create({
  // baseURL: 'http://localhost:5000',
baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000',
  withCredentials: true, // CRITICAL: This allows cookies to be sent with requests
  headers: {
    'Content-Type': 'application/json',
    
  },
  timeout: 15000,
});

// If you are ONLY using Passport Sessions, you can remove the request 
// interceptor that looks for 'token' in localStorage.
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || useAuthStore.getState().token; // Get token from localStorage or Zustand
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the backend returns 401, the session cookie is likely missing or expired
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default apiClient;