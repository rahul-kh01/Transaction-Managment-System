import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Automatically add JWT token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle common errors globally
api.interceptors.response.use(
  (response) => {
    // If response is successful, just return it
    return response;
  },
  (error) => {
    // Handle common HTTP errors
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - Token expired or invalid
          console.error('❌ Authentication failed. Redirecting to login...');
          localStorage.removeItem('jwt');
          localStorage.removeItem('token');
          
          // Redirect to login page if not already there
          if (window.location.pathname !== '/auth/login') {
            window.location.href = '/auth/login';
          }
          break;
          
        case 403:
          // Forbidden - User doesn't have permission
          console.error('❌ Access denied. You do not have permission to perform this action.');
          break;
          
        case 404:
          // Not Found
          console.error('❌ Resource not found:', error.config.url);
          break;
          
        case 500:
          // Server Error
          console.error('❌ Server error. Please try again later.');
          break;
          
        default:
          console.error(`❌ Request failed with status ${status}:`, data?.message || 'Unknown error');
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('❌ No response from server. Please check your connection.');
    } else {
      // Something else happened
      console.error('❌ Request error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;
