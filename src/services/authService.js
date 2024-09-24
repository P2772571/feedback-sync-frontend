import axiosInstance from '../config/axiosConfig';  // Import the Axios instance

// -------------------- Login API Call --------------------
export const login = async (credentials) => {
  const response = await axiosInstance.post('public/api/auth/login', credentials);
  return response;  // Return the response, which includes user data and token
};

// -------------------- Register API Call --------------------
export const registerUserAPI = async (newUser) => {
  const response = await axiosInstance.post('public/api/auth/register', newUser);
  return response;  // Return the response, which includes user data and token
};

// -------------------- Logout API Call ---------------------------
// You might not need an API for logging out, but here's an example if necessary.
export const logoutUserAPI = async () => {
  const response = await axiosInstance.post('private/api/auth/logout');
  return response;  // Optional, if you want to log out on the backend
};

// -------------------- Forgot-Password API Call ------------------------
// Service for forgot password (sending reset email)
export const forgotPasswordAPI = (email) => {
  return axios.post('public/api/auth/forgot-password', { email });  
};

// -------------------- Reset-Password API Call ------------------------
// Service for forgot password (sending reset email)
export const resetPasswordAPI = (data) => {
  return axios.post('public/api/auth/reset-password', data);
};