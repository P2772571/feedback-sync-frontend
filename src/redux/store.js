import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';  // Import the auth slice
import profileReducer from './profileSlice';  // Import the profile slice
import userReducer from './userSlice';  // Import the user slice
import feedbackReducer from './feedbackSlice';  // Import the feedback slice

// Configure the Redux store with the auth reducer
const store = configureStore({
  reducer: {
    auth: authReducer,  // Add the auth slice to the store
    profile: profileReducer,  // Add the profile slice to the store
    users: userReducer,  // Add the user slice
    feedbacks: feedbackReducer,  // Add the feedback slice
  },
});

export default store;
