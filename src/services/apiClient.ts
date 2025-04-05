
import axios from 'axios';

// Base API client configuration
const apiClient = axios.create({
  baseURL: '/api', // Mock base URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // You could add authentication tokens here in a real app
    console.log('Request sent:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API Error:', error?.response?.status, error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
