import axios from 'axios';

// Create an Axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',  // Spring Boot Server's Address
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for setting Authorization header on requests
axiosInstance.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));  // Retrieve user data from localStorage
  
  if (user && user.accessToken) {
    
    config.headers['Authorization'] = `Bearer ${user.accessToken}`;  // Attach the token to the header
  }

  console.log("Request config: ", config);  // Log request config
  return config;
}, (error) => {
  console.error("Request error: ", error);  // Log request error
  return Promise.reject(error);
});

// Globally handle responses
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle response errors here (e.g., token expiration)
    if (error.response) {
      console.error("Response error: ", error.response.data);  // Log response error data
      
      if (error.response.status === 401) {
        // Handle unauthorized access (e.g., force logout)
        localStorage.removeItem('user');  // Clear the token if unauthorized
        window.location.href = '/login';  // Redirect to login
        console.log("Unauthorized access: Please log in to access this resource.");
      } else if (error.response.status === 403) {
        console.error("Forbidden access: You don't have permission to perform this action.");
        // Handle forbidden access accordingly
      } else if (error.response.status === 404) {
        console.error("Not found: The requested resource was not found.");
        // Handle not found error accordingly
      }
    } else {
      console.error("Network error: ", error);  // Log network error
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
