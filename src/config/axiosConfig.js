import axios from 'axios';

// Create an Axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',  // Spring Boot Server's Address
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for setting Authorization header on requests (if needed for authenticated routes)
axiosInstance.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));  // Retrieve user data from localStorage
  if (user && user.token) {
    config.headers['Authorization'] = `Bearer ${user.token}`;  // Attach the token to the header
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Globally handle responses
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle response errors here (e.g., token expiration)
    if (error.response && error.response.status === 401) {
      // Optional: handle unauthorized access (e.g., force logout)
      localStorage.removeItem('user');  // Clear the token if unauthorized
      window.location.href = '/login';  // Redirect to login
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
