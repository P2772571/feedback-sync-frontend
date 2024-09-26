import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';  // Import the auth slice

// Configure the Redux store with the auth reducer
const store = configureStore({
  reducer: {
    auth: authReducer,  // Add the auth slice to the store
  },
});

export default store;
