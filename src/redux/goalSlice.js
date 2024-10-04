import {
    createGoalAPI,
    getAllGoalOfUserAPI,
    getAllGoalsAssignedByManagerAPI,
    getAllAssignedGoalsToUserAPI,
    getGoalByIdAPI,
    updateGoalAPI
} from "../services/goalService";

import { updateTaskAPI, deleteTaskAPI, createTaskAPI } from "../services/taskService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//-------------------- Async Thunks -------------------------------

// Fetch User's Own Goals Thunk
export const fetchGoalsOfUser = createAsyncThunk(
    'goals/fetchGoalsOfUser',
    async (userId, thunkAPI) => {
        try {
            const response = await getAllGoalOfUserAPI(userId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to get User Goals');
        }
    }
);

// Fetch Goals Assigned to User Thunk
export const fetchAssignedGoalsToUser = createAsyncThunk(
    'goals/fetchAssignedGoalsToUser',
    async ({ userId, managerId }, thunkAPI) => {
        try {
            if (!userId || !managerId) {
                return thunkAPI.rejectWithValue("User ID or Manager ID is missing.");
            }
            console.log("User ID:", userId, "Manager ID:", managerId);

            const response = await getAllAssignedGoalsToUserAPI(userId, managerId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to get Assigned Goals');
        }
    }
);

// Fetch Goals Assigned by Manager Thunk
export const fetchGoalsAssignedByManager = createAsyncThunk(
    'goals/fetchGoalsAssignedByManager',
    async (managerId, thunkAPI) => {
        try {
            const response = await getAllGoalsAssignedByManagerAPI(managerId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.message || "Failed to get Manager Assigned Goals");
        }
    }
);

// Fetch a Single Goal by Goal ID Thunk
export const fetchGoalById = createAsyncThunk(
    'goals/fetchGoalById',
    async (goalId, thunkAPI) => {
        try {
            const response = await getGoalByIdAPI(goalId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.message || "Failed to get a Goal");
        }
    }
);

// Create a New Goal Thunk
export const createGoal = createAsyncThunk(
    'goals/createGoal',
    async (goalRequest, thunkAPI) => {
        try {
            const response = await createGoalAPI(goalRequest);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.message || "Failed to create a Goal");
        }
    }
);

// Update an Existing Goal Thunk
export const updateGoal = createAsyncThunk(
    'goals/updateGoal',
    async ({ goalId, goalRequest }, thunkAPI) => {
        try {

            console.log("Goal ID:", goalId, "Goal Request:", goalRequest);
            const response = await updateGoalAPI(goalId, goalRequest);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.message || "Failed to update a goal");
        }
    }
);

// Create a New Task Thunk
export const createTask = createAsyncThunk(
    'tasks/createTask',
    async (taskRequest, thunkAPI) => {
        try {
            const response = await createTaskAPI(taskRequest);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.message || "Failed to create a Task");
        }
    }
);

// Update an Existing Task Thunk
export const updateTask = createAsyncThunk(
    'tasks/updateTask',
    async ({ taskId, taskRequest }, thunkAPI) => {
        try {
            const response = await updateTaskAPI(taskId, taskRequest);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.message || "Failed to update a Task");
        }
    }
);

// Delete a Task Thunk
export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async (taskId, thunkAPI) => {
        try {
            const response = await deleteTaskAPI(taskId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.message || "Failed to delete a Task");
        }
    }
);


//-------------------- Initial State -------------------------------
const initialState = {
    userGoals: [],                // Stores user's own goals
    assignedGoals: [],            // Stores goals assigned to the user
    managerAssignedGoals: [],     // Stores goals assigned by the manager to other employees
    currentGoal: null,            // Stores the current goal being viewed or edited
    loading: false,               // Loading state for async actions
    error: null                   // Stores any error messages
};

//-------------------- Goals Slice -------------------------------
const goalSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.error = null;
        },
        clearCurrentGoal: (state) => {
            state.currentGoal = null;  // Optionally, clear the current goal after viewing/updating
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch user's own goals
            .addCase(fetchGoalsOfUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGoalsOfUser.fulfilled, (state, action) => {
                state.userGoals = action.payload;
                state.managerAssignedGoals = null;
                state.loading = false;
            })
            .addCase(fetchGoalsOfUser.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })

            // Fetch goals assigned to the user by their manager
            .addCase(fetchAssignedGoalsToUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAssignedGoalsToUser.fulfilled, (state, action) => {
                state.assignedGoals = action.payload;
                state.loading = false;
            })
            .addCase(fetchAssignedGoalsToUser.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })

            // Fetch goals assigned by the manager to employees
            .addCase(fetchGoalsAssignedByManager.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGoalsAssignedByManager.fulfilled, (state, action) => {
                state.managerAssignedGoals = action.payload;
                state.userGoals = null;
                state.assignedGoals = null;
                state.loading = false;
            })
            .addCase(fetchGoalsAssignedByManager.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })

            // Fetch goal by ID
            .addCase(fetchGoalById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGoalById.fulfilled, (state, action) => {
                
                // Find the goal in userGoals, assignedGoals, and managerAssignedGoals
                const goal = action.payload;

                // Find and set the goal in userGoals
                if (state.userGoals) {
                    state.userGoals = state.userGoals.map((g) =>
                        g.goalId === goal.goalId ? goal : g
                    );
                }

                // Find and set the goal in assignedGoals
                if (state.assignedGoals) {
                    state.assignedGoals = state.assignedGoals.map((g) =>
                        g.goalId === goal.goalId ? goal : g
                    );
                }

                // Find and set the goal in managerAssignedGoals
                if (state.managerAssignedGoals) {
                    state.managerAssignedGoals = state.managerAssignedGoals.map((g) =>
                        g.goalId === goal.goalId ? goal : g
                    );
                }

                state.loading = false;
            })
            .addCase(fetchGoalById.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })

            // Create a new goal
            .addCase(createGoal.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                if (state.userGoals) {
                    state.userGoals.push(action.payload);
                }

                if (state.managerAssignedGoals) {
                    state.managerAssignedGoals.push(action.payload);
                }
                state.loading = false;
            })
            .addCase(createGoal.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })

            // Update an existing goal
            .addCase(updateGoal.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateGoal.fulfilled, (state, action) => {
                // Find and update the goal in userGoals, assignedGoals, and managerAssignedGoals if applicable
                const updatedGoal = action.payload;

                // Update in userGoals (if exists)
                if (state.userGoals) {
                    state.userGoals = state.userGoals.map((goal) =>
                        goal.goalId === updatedGoal.goalId ? updatedGoal : goal
                    );
                }

                // Update in assignedGoals (if exists)
                if (state.assignedGoals) {
                    state.assignedGoals = state.assignedGoals.map((goal) =>
                        goal.goalId === updatedGoal.goalId ? updatedGoal : goal
                    );
                }

                // Update in managerAssignedGoals (if exists)
                if (state.managerAssignedGoals) {
                    state.managerAssignedGoals = state.managerAssignedGoals.map((goal) =>
                        goal.goalId === updatedGoal.goalId ? updatedGoal : goal
                    );
                }

                state.currentGoal = updatedGoal;
                state.loading = false;
            })
            .addCase(updateGoal.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })


            // Create a new task
            .addCase(createTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                const newTask = action.payload;
                const goalId = newTask.goalId;

                // Find the goal that contains this task and add the task
                if (state.userGoals) {
                const goal = state.userGoals.find(goal => goal.goalId === goalId);
                if (goal) {
                    goal.tasks.push(newTask);
                }}

                // Find the goal that contains this task and add the task   
                if (state.assignedGoals) {
                const assignedGoal = state.assignedGoals.find(goal => goal.goalId === goalId);
                if (assignedGoal) {
                    assignedGoal.tasks.push(newTask);
                }}

                // Find the goal that contains this task and add the task
                if (state.managerAssignedGoals) {
                const managerAssignedGoal = state.managerAssignedGoals.find(goal => goal.goalId === goalId);
                if (managerAssignedGoal) {
                    managerAssignedGoal.tasks.push(newTask);
                }}


                state.loading = false;
            })
            .addCase(createTask.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })

            // Update an existing task
            .addCase(updateTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const updatedTask = action.payload;
                const goalId = updatedTask.goalId;

                if (state.userGoals) {
                    
                    const goal = state.userGoals.find(goal => goal.goalId === goalId);
                    if (goal) {
                        goal.tasks = goal.tasks.map(task =>
                            task.taskId === updatedTask.taskId ? updatedTask : task
                        );
                    }
                }

                if (state.assignedGoals) {
                    const assignedGoal = state.assignedGoals.find(goal => goal.goalId === goalId);
                    if (assignedGoal) {
                        assignedGoal.tasks = assignedGoal.tasks.map(task =>
                            task.taskId === updatedTask.taskId ? updatedTask : task
                        );
                    }
                }


                if (state.managerAssignedGoals) {
                    const managerAssignedGoal = state.managerAssignedGoals.find(goal => goal.goalId === goalId);
                    if (managerAssignedGoal) {
                        managerAssignedGoal.tasks = managerAssignedGoal.tasks.map(task =>
                            task.taskId === updatedTask.taskId ? updatedTask : task
                        );
                    }
                }
                state.loading = false;
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })

            // Delete a task
            .addCase(deleteTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                const deletedTaskId = action.payload;
                
                // Find and delete the task from userGoals
                if (state.userGoals) {
                    state.userGoals.forEach(goal => {
                        goal.tasks = goal.tasks.filter(task => task.taskId !== deletedTaskId);
                    });
                }

                // Find and delete the task from assignedGoals
                if (state.assignedGoals) {
                    state.assignedGoals.forEach(goal => {
                        goal.tasks = goal.tasks.filter(task => task.taskId !== deletedTaskId);
                    });
                }

                // Find and delete the task from managerAssignedGoals
                if (state.managerAssignedGoals) {
                    state.managerAssignedGoals.forEach(goal => {
                        goal.tasks = goal.tasks.filter(task => task.taskId !== deletedTaskId);
                    });
                }
                state.loading = false;
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })

    }
});

// Export actions and reducer
export const { clearErrors, clearCurrentGoal } = goalSlice.actions;
export default goalSlice.reducer;
