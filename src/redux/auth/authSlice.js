import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, registerUserAPI, forgotPasswordAPI, resetPasswordAPI } from '../../services/authService';  // Import necessary services

// -------------------- Async Thunks --------------------

// -------------------- Login User Thunk --------------------
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, thunkAPI) => {
    try {
      const response = await login(credentials);  // Call the login service
      localStorage.setItem('user', JSON.stringify(response.data));  // Save the user data in localStorage
      return response.data;
    } catch (error) {
      console.log(error.status)
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// -------------------- Register User Thunk --------------------
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (newUser, thunkAPI) => {
    try {
      const response = await registerUserAPI(newUser);  // Call the register service
      localStorage.setItem('user', JSON.stringify(response.data));  // Save the user data in localStorage
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

// -------------------- Forgot Password Thunk --------------------
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email, thunkAPI) => {
    try {
      const response = await forgotPasswordAPI(email);  // Call forgot password service
      return response.data;  // Return success message
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to send reset link');
    }
  }
);

// -------------------- Reset Password Thunk --------------------
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (data, thunkAPI) => {
    try {
      const response = await resetPasswordAPI(data);  // Call reset password service
      return response.data;  // Return success message
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Reset password failed');
    }
  }
);

// -------------------- Logout Action --------------------
const logoutUser = (state) => {
  state.user = null;  // Clear user state
  localStorage.removeItem('user');  // Remove user data from localStorage
};

// -------------------- Initial State --------------------
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,  // Rehydrate user state from localStorage
  loading: false,
  error: null,
  forgotPasswordMessage: null,  // Store the message from forgot password request
  resetPasswordMessage: null,   // Store the message from reset password request
};

// -------------------- Set User after Profile Update  --------------------
const setUserAfterProfileUpdate = (state, action) => {
  state.user = action.payload;
  localStorage.setItem('user', JSON.stringify(action.payload));  // Save the updated user data in localStorage
}

// -------------------- Auth Slice --------------------
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Logout reducer
    logout: logoutUser,
    setUser: setUserAfterProfileUpdate,

    // Clear errors and messages when moving between pages or after an action
    clearErrorsAndMessages: (state) => {
      state.error = null;
      state.forgotPasswordMessage = null;
      state.resetPasswordMessage = null;
    },
  },
  extraReducers: (builder) => {
    // Handle login async thunk
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;  // Clear previous errors
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;  // Store error message
        state.loading = false;
      });

    // Handle register async thunk
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;  // Clear previous errors
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;  // Store error message
        state.loading = false;
      });

    // Handle forgot password async thunk
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;  // Clear previous errors
        state.forgotPasswordMessage = null;  // Clear previous message
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.forgotPasswordMessage = action.payload;  // Store success message
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.error = action.payload;  // Store error message
        state.loading = false;
      });

    // Handle reset password async thunk
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;  // Clear previous errors
        state.resetPasswordMessage = null;  // Clear previous message
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.resetPasswordMessage = action.payload;  // Store success message
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.error = action.payload;  // Store error message
        state.loading = false;
      });
  },
});

// Export actions and reducer
export const { logout, clearErrorsAndMessages, setUser } = authSlice.actions;
export default authSlice.reducer;
