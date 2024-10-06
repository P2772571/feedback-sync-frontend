import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
    getAllFeedbacksOfUserAPI,
    createFeedbackAPI,
    updateFeedbackAPI   
} from "../services/feedbackService";
import {
    createFeedbackRequestAPI,
    getAllFeedbackRequestsReceivedAPI,
    deleteFeedbackRequestAPI,
    updateFeedbackRequestAPI

} from "../services/feedbackRequestService";

// -------------------- Async Thunks -------------------------------

// Fetch all feedbacks of a user
export const fetchFeedbacks = createAsyncThunk(
    'feedback/fetchFeedbacks',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await getAllFeedbacksOfUserAPI(userId);
            return response;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch feedbacks');
        }
    }
);

// Create a new feedback
export const createFeedback = createAsyncThunk(
    'feedback/createFeedback',
    async (feedbackRequest, { rejectWithValue }) => {
        try {
            const response = await createFeedbackAPI(feedbackRequest);
            return response;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to create feedback');
        }
    }
);

// Update an existing feedback
export const updateFeedback = createAsyncThunk(
    'feedback/updateFeedback',
    async ({ feedbackId, feedbackRequest }, { rejectWithValue }) => {
        try {
            const response = await updateFeedbackAPI(feedbackId, feedbackRequest);
            return response;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to update feedback');
        }
    }
);

// Fetch all feedback requests received by a user
export const fetchFeedbackRequestsReceived = createAsyncThunk(
    'feedback/fetchFeedbackRequestsReceived',
    async (userId, thunkAPI) => {
        try {
            const response = await getAllFeedbackRequestsReceivedAPI(userId);
            return response;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch feedback requests');
        }
    }
);

// Create a new feedback request
export const createFeedbackRequest = createAsyncThunk(
    'feedback/createFeedbackRequest',
    async (feedbackRequestData, { rejectWithValue }) => {
        try {
            const response = await createFeedbackRequestAPI(feedbackRequestData);
            return response;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to create feedback request');
        }
    }
);

// Delete a feedback request
export const deleteFeedbackRequestThunk = createAsyncThunk(
    'feedback/deleteFeedbackRequest',
    async (id, { rejectWithValue }) => {
        try {
            await deleteFeedbackRequestAPI(id);
            return id; // Return the ID to remove it from the state
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to delete feedback request');
        }
    }
);

// Update a feedback request
export const updateFeedbackRequestThunk = createAsyncThunk(
    'feedback/updateFeedbackRequest',
    async (id, { rejectWithValue }) => {
        try {
            const response = await updateFeedbackRequestAPI(id);
            return response;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to update feedback request'); 
        }
    }
);


// -------------------- Initial State -------------------------------
const initialState = {
    feedbacks: [],
    feedbackRequests: [],
    loadingFeedbacks: false,
    loadingFeedbackRequests: false,
    errorFeedbacks: null,
    errorFeedbackRequests: null,
};

// -------------------- Feedback Slice -------------------------------
const feedbackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {
        // Clear errors
        clearErrorFeedbacks: (state) => {
            state.errorFeedbacks = null;
        },
        clearErrorFeedbackRequests: (state) => {
            state.errorFeedbackRequests = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Handle fetchFeedbacks
            .addCase(fetchFeedbacks.pending, (state) => {
                state.loadingFeedbacks = true;
                state.errorFeedbacks = null;
            })
            .addCase(fetchFeedbacks.fulfilled, (state, action) => {
                state.loadingFeedbacks = false;
                state.feedbacks = action.payload;
            })
            .addCase(fetchFeedbacks.rejected, (state, action) => {
                state.loadingFeedbacks = false;
                state.errorFeedbacks = action.payload;
                console.error(state.errorFeedbacks);
            })

            // Handle createFeedback
            .addCase(createFeedback.pending, (state) => {
                state.loadingFeedbacks = true;
                state.errorFeedbacks = null;
            })
            .addCase(createFeedback.fulfilled, (state, action) => {
                
                console.log(action.payload);
                state.feedbacks?.given?.push(action.payload);
                state.loadingFeedbacks = false;
            })
            .addCase(createFeedback.rejected, (state, action) => {
                state.loadingFeedbacks = false;
                state.errorFeedbacks = action.payload;
                console.error(state.errorFeedbacks);
            })

            // Handle updateFeedback
            .addCase(updateFeedback.pending, (state) => {
                state.loadingFeedbacks = true;
                state.errorFeedbacks = null;
            })
            .addCase(updateFeedback.fulfilled, (state, action) => {
                state.loadingFeedbacks = false;
                const index = state.feedbacks.findIndex(
                    (feedback) => feedback.id === action.payload.id
                );
                if (index !== -1) {
                    state.feedbacks[index] = action.payload;
                }
            })
            .addCase(updateFeedback.rejected, (state, action) => {
                state.loadingFeedbacks = false;
                state.errorFeedbacks = action.payload;
                console.error(state.errorFeedbacks);
            })

            // Handle fetchFeedbackRequestsReceived
            .addCase(fetchFeedbackRequestsReceived.pending, (state) => {
                state.loadingFeedbackRequests = true;
                state.errorFeedbackRequests = null;
            })
            .addCase(fetchFeedbackRequestsReceived.fulfilled, (state, action) => {
                state.loadingFeedbackRequests = false;
                state.feedbackRequests = action.payload;
            })
            .addCase(fetchFeedbackRequestsReceived.rejected, (state, action) => {
                state.loadingFeedbackRequests = false;
                state.errorFeedbackRequests = action.payload;
                console.error(state.errorFeedbackRequests);
            })

            // Handle updateFeedbackRequestThunk
            .addCase(updateFeedbackRequestThunk.pending, (state) => {
                state.loadingFeedbackRequests = true;
                state.errorFeedbackRequests = null;
            })
            .addCase(updateFeedbackRequestThunk.fulfilled, (state, action) => {
                console.log("Action Payload is :",action.payload);
                
                state.feedbackRequests = state.feedbackRequests.filter(
                    (request) => request.requestId !== action.payload.requestId
                  );
                state.loadingFeedbackRequests = false;
            })
            .addCase(updateFeedbackRequestThunk.rejected, (state, action) => {
                state.loadingFeedbackRequests = false;
                state.errorFeedbackRequests = action.payload;
                console.error(state.errorFeedbackRequests);
            }
            )

            // Handle createFeedbackRequest
            .addCase(createFeedbackRequest.pending, (state) => {
                state.loadingFeedbackRequests = true;
                state.errorFeedbackRequests = null;
            })
            .addCase(createFeedbackRequest.fulfilled, (state, action) => {
                state.loadingFeedbackRequests = false;
                state.feedbackRequests.push(action.payload);
            })
            .addCase(createFeedbackRequest.rejected, (state, action) => {
                state.loadingFeedbackRequests = false;
                state.errorFeedbackRequests = action.payload;
                console.error(state.errorFeedbackRequests);
            })

            // Handle deleteFeedbackRequestThunk
            .addCase(deleteFeedbackRequestThunk.pending, (state) => {
                state.loadingFeedbackRequests = true;
                state.errorFeedbackRequests = null;
            })
            .addCase(deleteFeedbackRequestThunk.fulfilled, (state, action) => {
                state.loadingFeedbackRequests = false;
                state.feedbackRequests = state.feedbackRequests.filter(
                    (request) => request.id !== action.payload
                );
            })
            .addCase(deleteFeedbackRequestThunk.rejected, (state, action) => {
                state.loadingFeedbackRequests = false;
                state.errorFeedbackRequests = action.payload;
                console.error(state.errorFeedbackRequests);
            });
    },
});

// Export actions and reducer
export const { clearErrorFeedbacks, clearErrorFeedbackRequests } = feedbackSlice.actions;
export default feedbackSlice.reducer;
