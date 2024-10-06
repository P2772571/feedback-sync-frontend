import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createPipAPI,
  updatePipAPI,
  deletePipAPI,
  getPipByIdAPI,
  getAllPipsAssignedByManagerAPI,
  getAllPipsCreateByManagerAPI,
} from "../services/pipService";
import { createTaskAPI, updateTaskAPI, deleteTaskAPI } from "../services/taskService";

//-------------------- Async Thunks -------------------------------

// Fetch PIPs Assigned by Manager Thunk
export const fetchAllPipsAssignedByManager = createAsyncThunk(
  'pips/fetchAllPipsAssignedByManager',
  async (employeeId, thunkAPI) => {
    try {
      const response = await getAllPipsAssignedByManagerAPI(employeeId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to get User PIPs'
      );
    }
  }
);

// Fetch PIPs Created by Manager Thunk
export const fetchAllPipsCreateByManager = createAsyncThunk(
  'pips/fetchAllPipsCreateByManager',
  async (managerId, thunkAPI) => {
    try {
      if (!managerId) {
        return thunkAPI.rejectWithValue('Manager ID is missing.');
      }

      const response = await getAllPipsCreateByManagerAPI(managerId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to get Assigned PIPs'
      );
    }
  }
);

// Create PIP Thunk
export const createPip = createAsyncThunk(
  'pips/createPip',
  async (pipRequest, thunkAPI) => {
    try {
      const response = await createPipAPI(pipRequest);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || 'Failed to create PIP'
      );
    }
  }
);

// Fetch a Single PIP by ID Thunk
export const fetchPipById = createAsyncThunk(
  'pips/fetchPipById',
  async (pipId, thunkAPI) => {
    try {
      const response = await getPipByIdAPI(pipId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || 'Failed to get a PIP'
      );
    }
  }
);

// Update an Existing PIP Thunk
export const updatePip = createAsyncThunk(
  'pips/updatePip',
  async ({ pipId, pipRequest }, thunkAPI) => {
    try {
      const response = await updatePipAPI(pipId, pipRequest);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || 'Failed to update PIP'
      );
    }
  }
);

// Delete a PIP Thunk
export const deletePip = createAsyncThunk(
  'pips/deletePip',
  async (pipId, thunkAPI) => {
    try {
      const response = await deletePipAPI(pipId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || 'Failed to delete a PIP'
      );
    }
  }
);

// Create a New Task Thunk
export const createTask = createAsyncThunk(
  'pips/tasks/createTask',
  async (taskRequest, thunkAPI) => {
    try {
      console.log("Crate Task Request ", taskRequest)
      const response = await createTaskAPI(taskRequest);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || 'Failed to create a Task'
      );
    }
  }
);

// Update an Existing Task Thunk
export const updateTask = createAsyncThunk(
  'pips/tasks/updateTask',
  async ({ taskId, taskRequest }, thunkAPI) => {
    try {
      const response = await updateTaskAPI(taskId, taskRequest);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || 'Failed to update a Task'
      );
    }
  }
);

// Delete a Task Thunk
export const deleteTask = createAsyncThunk(
  'pips/tasks/deleteTask',
  async (taskId, thunkAPI) => {
    try {
      const response = await deleteTaskAPI(taskId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || 'Failed to delete a Task'
      );
    }
  }
);

//-------------------- Initial State -------------------------------
const initialState = {
  pips: [],
  currentPip: null, // Stores the current PIP being viewed or edited
  loading: false, // Loading state for async actions
  error: null, // Stores any error messages
};

const pipSlice = createSlice({
  name: 'pips',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All PIPs Created by Manager
      .addCase(fetchAllPipsCreateByManager.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPipsCreateByManager.fulfilled, (state, action) => {
        state.pips = action.payload;
        console.log('PIPs In Slice', state.pips);
        state.loading = false;
      })
      .addCase(fetchAllPipsCreateByManager.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Fetch All PIPs Assigned by Manager
      .addCase(fetchAllPipsAssignedByManager.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPipsAssignedByManager.fulfilled, (state, action) => {
        state.pips = action.payload;
        console.log('PIPs In Slice', state.pips);
        state.loading = false;
      })
      .addCase(fetchAllPipsAssignedByManager.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Create PIP
      .addCase(createPip.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPip.fulfilled, (state, action) => {
        state.pips.push(action.payload);
        state.loading = false;
      })
      .addCase(createPip.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Fetch PIP by ID
      .addCase(fetchPipById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPipById.fulfilled, (state, action) => {
        state.currentPip = action.payload;

        const index = state.pips.findIndex((pip) => pip.pipId === action.payload.pipId);
        if (index !== -1) {
          state.pips[index] = action.payload;
        } else {
          // If the pip isn't in the array, add it
          state.pips.push(action.payload);
        }
        state.loading = false;
      })
      .addCase(fetchPipById.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Update PIP
      .addCase(updatePip.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePip.fulfilled, (state, action) => {
        const index = state.pips.findIndex((pip) => pip.pipId === action.payload.pipId);
        if (index !== -1) {
          state.pips[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updatePip.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Delete PIP
      .addCase(deletePip.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePip.fulfilled, (state, action) => {
        state.pips = state.pips.filter((pip) => pip.pipId !== action.payload.pipId);
        state.loading = false;
      })

      .addCase(deletePip.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Create Task
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        const { pipId, task } = action.payload;
        const pipIndex = state.pips.findIndex((pip) => pip.pipId === pipId);
        if (pipIndex !== -1) {
          state.pips[pipIndex].tasks.push(task);
        }
        state.loading = false;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Update Task
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const response = action.payload
        const pipId = response.pipId
        const taskId = response.taskId
        const pipIndex = state.pips.findIndex((pip) => pip.pipId === pipId);
        if (pipIndex !== -1) {
          const taskIndex = state.pips[pipIndex].tasks.findIndex(
            (t) => t.taskId === taskId
          );
          if (taskIndex !== -1) {
            state.pips[pipIndex].tasks[taskIndex] = response;
          }
        }
        state.loading = false;


      })
      .addCase(updateTask.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Delete Task
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const taskId = action.payload;
        state.pips.forEach((pip) => {
          pip.tasks = pip.tasks.filter((task) => task.taskId !== taskId);
        });
        state.loading = false;
      })
      .addCase(deleteTask.rejected, (state, action) => {

        state.error = action.payload;
        state.loading = false;
        console.log("Error in Delete Task", action.payload)
      });
  },
});

export const { clearErrors } = pipSlice.actions;
export default pipSlice.reducer;
