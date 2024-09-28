import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';  // Import the auth slice
import profileReducer from './profileSlice';  // Import the profile slice

// Configure the Redux store with the auth reducer
const store = configureStore({
  reducer: {
    auth: authReducer,  // Add the auth slice to the store
    profile: profileReducer,  // Add the profile slice to the store
  },
});

export default store;
