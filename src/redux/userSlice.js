import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsersAPI, getAllManagedUsers, getAllUserForAdminAPI , registerUserAPI} from "../services/userService";

// -------------------- Async Thunks --------------------

// -------------------- Fetch All Users Thunk --------------------
export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async (_, thunkAPI) => {
    try {
      const response = await getAllUsersAPI(); // Call the get all users service
      return response; // Return the fetched users data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to get all users"
      );
    }
  }
);

// -------------------- Fetch All Managed Users Thunk --------------------
export const fetchAllManagedUsers = createAsyncThunk(
  "users/fetchAllManagedUsers",
  async (id, thunkAPI) => {
    try {
      const response = await getAllManagedUsers(id); // Call the get all managed users service
      return response; // Return the fetched managed users data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to get all managed users"
      );
    }
  }
);

export const fetchAllUserForAdmin = createAsyncThunk(
  "users/fetchAllUserForAdmin",
  async (_, thunkAPI) => {
    try {
      const response = await getAllUserForAdminAPI(); // Call the get all users service
      return response; // Return the fetched users data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to get all users"
      );
    }
  }
);

// -------------------- Register User Thunk --------------------
export const registerNewUser = createAsyncThunk(
  "users/registerNewUser",
  async (newUser, thunkAPI) => {
    try {
      const response = await registerUserAPI(newUser); // Call the register service
      return response.data; // Return the response
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

// -------------------- Initial State --------------------
const initialState = {
  users: [],
  loading: false,
  error: null,
};

// -------------------- User Slice --------------------
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // -------------------- Clear Error --------------------
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // -------------------- Fetch All Users Thunk --------------------
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // -------------------- Fetch All Managed Users Thunk --------------------
    builder
      .addCase(fetchAllManagedUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllManagedUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllManagedUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    
    builder
      .addCase(fetchAllUserForAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUserForAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUserForAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // -------------------- Register User Thunk --------------------
    builder
      .addCase(registerNewUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerNewUser.fulfilled, (state, action) => {
        // Correctly adding the new user to the users array
        state.users = [...state.users, action.payload]; 
        state.loading = false;
      })
      .addCase(registerNewUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;
