// src/slices/profileSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createProfileAPI, updateProfileAPI, getProfileAPI, deleteProfileAPI } from '../services/profileService';

// -------------------- Async Thunks --------------------

// -------------------- Fetch Profile Thunk --------------------
export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (_, thunkAPI) => {
    try {
      const response = await getProfileAPI(); // Call the get profile service
      return response; // Return the fetched profile data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to get profile');
    }
  }
);

// -------------------- Create Profile Thunk --------------------
export const createProfile = createAsyncThunk(
  'profile/createProfile',
  async (profileRequest, thunkAPI) => {
    try {
      const response = await createProfileAPI(profileRequest); // Call the create profile service
      return response; // Return the created profile data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to create profile');
    }
  }
);

// -------------------- Update Profile Thunk --------------------
export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (profileRequest, thunkAPI) => {
    try {

      const response = await updateProfileAPI(profileRequest); // Call the update profile service
      console.log("Response", response);
      return response; // Return the updated profile data
      
      
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to update profile');
    }
  }
);

// -------------------- Delete Profile Thunk --------------------
export const deleteProfile = createAsyncThunk(
  'profile/deleteProfile',
  async (_, thunkAPI) => {
    try {
      const response = await deleteProfileAPI(); // Call the delete profile service
      return response; // Return the response after deletion
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to delete profile');
    }
  }
);

// -------------------- Initial State --------------------
const initialState = {
  profile: [],  // Initially, profile is set to null
  loading: false,
  error: null,
};

// -------------------- Profile Slice --------------------
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null; // Clear error message
    },
  },
  extraReducers: (builder) => {
    // Handle fetch profile async thunk
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile = action.payload; // Store the fetched profile
        state.loading = false;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.error = action.payload; // Store error message
        state.loading = false;
      });

    // Handle create profile async thunk
    builder
      .addCase(createProfile.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.profile = action.payload; // Store the created profile
        state.loading = false;
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.error = action.payload; // Store error message
        state.loading = false;
      });

    // Handle update profile async thunk
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profile = action.payload.profile; // Update the profile in the state
        state.loading = false;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.payload; // Store error message
        state.loading = false;
      });

    // Handle delete profile async thunk
    builder
      .addCase(deleteProfile.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(deleteProfile.fulfilled, (state) => {
        state.profile = null; // Clear the profile from state
        state.loading = false;
      })
      .addCase(deleteProfile.rejected, (state, action) => {
        state.error = action.payload; // Store error message
        state.loading = false;
      });
  },
});

// Export actions and reducer
export const { clearErrors } = profileSlice.actions;
export default profileSlice.reducer;
