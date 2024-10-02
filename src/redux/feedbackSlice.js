import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllFeedbacksOfUser } from "../services/feedbackService";


// Async thunk to fetch all feedbacks of a user
export const fetchFeedbacks = createAsyncThunk(
    'feedback/fetchFeedbacks',
    async (id, { rejectWithValue }) => {
        try {
            const response = await getAllFeedbacksOfUser(id);
            return response;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

// Initial state of feedback slice
const initialState = {
    feedbacks: [],
    loading: false,
    error: null,
};

// Feedback slice
const feedbackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {
        // Clear error
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch all feedbacks of a user thunk
        builder
            .addCase(fetchFeedbacks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFeedbacks.fulfilled, (state, action) => {
                state.loading = false;
                state.feedbacks = action.payload;
            })
            .addCase(fetchFeedbacks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                console.log(state.error)
            });
    },
});

// Export actions and reducer
export const { clearError } = feedbackSlice.actions;
export default feedbackSlice.reducer;

