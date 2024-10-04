import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, IconButton, Typography, TextField, Checkbox, FormControlLabel, colors } from '@mui/material';
import { Edit, RemoveRedEye, Delete, Add as AddIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import TitleBar from '../components/dashboard/TitleBar';
import GoalActions from '../components/goal/GoalActions';
import Goals from '../components/goal/GoalsSection';
import CustomModal from '../components/ui/CustomModal';
import CustomButton from '../components/ui/CustomButton';
import CircularProgress from '@mui/material/CircularProgress';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { updateGoal, createTask, updateTask, deleteTask, fetchGoalById } from '../redux/goalSlice';

// Styles
const styles = {
  modalContent: {
    padding: 2,
    maxwidth: '500px',
    width: '500px',
    margin: 'auto',
  },
  taskList: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 2,
  },
  addTaskWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mt: 2,
  },
  taskLabel: {
    fontWeight: 'bold',
  },
  addButton: {
    alignSelf: 'flex-start',
    mt: 1,
  },
};

function Goal() {
  const location = useLocation();
  const title = location.state?.title || 'No Title Provided';

  const user = useSelector((state) => state.auth.user);
  const userGoals = useSelector((state) => state.goals.userGoals); // Own goals
  const assignedGoals = useSelector((state) => state.goals.assignedGoals); // Assigned by manager
  const managerAssignedGoals = useSelector((state) => state.goals.managerAssignedGoals); // Manager's assigned goals

  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [tasksToBeUpdated, setTasksToBeUpdated] = useState([]);
  const [tasksToBeDeleted, setTasksToBeDeleted] = useState([]);
  const [remainingTasks, setRemainingTasks] = useState([]); // Holds the tasks not deleted
  const [loading, setLoading] = useState(false); // Loading state for task/goal updates
  const [showTaskInput, setShowTaskInput] = useState(false); // State to control the task input visibility
  const [newTaskName, setNewTaskName] = useState(''); // State to store new task input

  const dispatch = useDispatch();

  /**
   *  Open the view modal and set the selected goal
   * @param {*} goal 
   */
  const handleOpenViewModal = (goal) => {
    setSelectedGoal(goal);
    setRemainingTasks([...goal.tasks]); // Store the original tasks in a temporary list
    setOpenViewModal(true);
  };

  /**
   * Open the edit modal and set the selected goal
   * @param {*} goal
   */
  const handleOpenEditModal = (goal) => {
    setSelectedGoal(goal);
    setRemainingTasks([...goal.tasks]); // Store original tasks
    setOpenEditModal(true);
  };

  const handleCloseViewModal = () => {
    // Reset the remaining tasks list to the original tasks in case of cancel
    setRemainingTasks(selectedGoal?.tasks || []);
    setTasksToBeUpdated([]);
    setTasksToBeDeleted([]);
    setOpenViewModal(false);
  };

  const handleCloseEditModal = () => setOpenEditModal(false);

  // Handle checkbox selection for status
  const handleStatusChange = (status) => {
    const updatedStatus = selectedGoal.status === status ? '' : status;
    setSelectedGoal({ ...selectedGoal, status: updatedStatus });
  };

  const handleTaskCheckboxChange = (task) => {
    // Toggle the isCompleted value for the task
    const updatedTask = { ...task, isCompleted: !task.isCompleted };

    // Check if the task is already in tasksToBeUpdated
    const updatedTasks = tasksToBeUpdated.some((t) => t.taskId === task.taskId)
      ? tasksToBeUpdated.map((t) => t.taskId === task.taskId ? updatedTask : t) // Update the task
      : [...tasksToBeUpdated, updatedTask]; // Add the task with updated isCompleted value

    // Update the tasksToBeUpdated list
    setTasksToBeUpdated(updatedTasks);

    // Also update the remainingTasks array to reflect the updated isCompleted value
    const updatedRemainingTasks = remainingTasks.map((t) =>
      t.taskId === task.taskId ? updatedTask : t
    );
    setRemainingTasks(updatedRemainingTasks);
  };

  // Handle task deletion (only from UI)
  const handleTaskDelete = (task) => {
    setRemainingTasks(remainingTasks.filter((t) => t.taskId !== task.taskId)); // Remove task from displayed list (UI only)
    setTasksToBeDeleted([...tasksToBeDeleted, task]); // Add task to be deleted list
  };

  // Simulate task update submission
  const handleUpdateTasks = () => {
    setLoading(true);
    tasksToBeUpdated.forEach((task) => {
      dispatch(updateTask({ taskId: task.taskId, taskRequest: task })).then((res) => {
        console.log('Task updated successfully:', res);
        // fetchGoalById(selectedGoal.goalId);
        dispatch(fetchGoalById(selectedGoal.goalId)).then((res) => {
          console.log('Goal fetched successfully:', res);
        }).catch((err) => {
          console.error('Error fetching goal:', err);
        });
      }).catch((err) => {
        console.error('Error updating task:', err);
      });
    });

    tasksToBeDeleted.forEach((task) => {
      dispatch(deleteTask(task.taskId)).then((res) => {
        console.log('Task deleted successfully:', res);
        // fetchGoalById(selectedGoal.goalId);
        dispatch(fetchGoalById(selectedGoal.goalId)).then((res) => {
          console.log('Goal fetched successfully:', res);
        }).catch((err) => {
          console.error('Error fetching goal:', err);
        });
      }).catch((err) => {
        console.error('Error deleting task:', err);
      });
    });

    setLoading(false);
    setTasksToBeUpdated([]);
    setTasksToBeDeleted([]);
    setOpenViewModal(false);
  };

  // Handle adding new tasks
  const handleAddTask = () => {
    if (newTaskName.trim()) {
      const newTask = { taskName: newTaskName, isCompleted: false };
      setRemainingTasks([...remainingTasks, newTask]); // Add new task to remaining tasks
      setTasksToBeUpdated([...tasksToBeUpdated, newTask]); // Add new task to tasksToBeUpdated
      setNewTaskName(''); // Reset task name input
      setShowTaskInput(false); // Hide task input field
    }
  };

  // Simulate goal update submission
  const handleUpdateGoal = () => {
    setLoading(true);
    const body = {
      goalName: selectedGoal.goalName,
      description: selectedGoal.description,
      status: selectedGoal.status,
      dueDate: selectedGoal.dueDate,
      progress: selectedGoal.progress,
      tasks: remainingTasks, // Include updated tasks in goal
    };

    dispatch(updateGoal({ goalId: selectedGoal.goalId, goalRequest: body })).then((res) => {
      
      console.log('Goal updated successfully:', res);
    }).catch((err) => {
      console.error('Error updating goal:', err);
    });

    console.log('Tasks to be created:', tasksToBeUpdated);  
    // Make Api call to create tasks
    tasksToBeUpdated.forEach((task) => {
      task.goalId = selectedGoal.goalId;
      dispatch(createTask(task)).then((res) => {
        console.log('Task created successfully:', res);
      }).catch((err) => {
        console.error('Error creating task:', err);
      });
    });



    setLoading(false);
    setOpenEditModal(false);
  };





  // Table column configurations
  const userGoalsCol = ['SR', 'Name', 'Progress', 'Status', 'Date', 'Actions'];
  const assignedGoalsCol = ['SR', 'Name', 'Assigned By', 'Progress', 'Status', 'Date', 'Actions'];
  const managerAssignedGoalsCol = ['SR', 'Name', 'Assigned To', 'Progress', 'Status', 'Date', 'Actions'];

  // Rows for the user's own goals
  const userGoalsRows = Array.isArray(userGoals)
    ? userGoals.map((goal, index) => [
      index + 1, // SR
      goal.goalName?.length > 30 ? `${goal.goalName.substring(0, 15)}...` : goal.goalName, // Name
      `${goal.progress}%`, // Progress
      goal.status, // Status
      goal.dueDate, // Date
      <Box key={`actions-${index}`} sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
        <IconButton color="primary" size="small" aria-label="view" onClick={() => handleOpenViewModal(goal)}>
          <RemoveRedEye />
        </IconButton>
        <IconButton color="primary" size="small" aria-label="edit" onClick={() => handleOpenEditModal(goal)}>
          <Edit />
        </IconButton>
      </Box>,
    ])
    : [];

  // Rows for goals assigned by the manager to the employee
  const assignedGoalsRows = Array.isArray(assignedGoals)
    ? assignedGoals.map((goal, index) => [
      index + 1,
      goal?.goalName?.length > 30 ? `${goal?.goalName.substring(0, 15)}...` : goal?.goalName,
      goal?.mangerName,
      `${goal?.progress}%`,
      goal?.status,
      goal?.dueDate,
      <Box key={`actions-${index}`} sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
        <IconButton color="primary" size="small" aria-label="view" onClick={() => handleOpenViewModal(goal)}>
          <RemoveRedEye />
        </IconButton>
      </Box>,
    ])
    : [];

  // Rows for the manager's assigned goals (goals assigned to users)
  const managerRows = Array.isArray(managerAssignedGoals)
    ? managerAssignedGoals.map((goal, index) => [
      index + 1,
      goal?.goalName?.length > 30 ? `${goal?.goalName.substring(0, 15)}...` : goal?.goalName,
      goal?.employeeName,
      `${goal?.progress}%`,
      goal?.status,
      goal?.dueDate,
      <Box key={`actions-${index}`} sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
        <IconButton size="small" aria-label="edit" onClick={() => handleOpenEditModal(goal)}>
          <Edit />
        </IconButton>

        <IconButton sx={{ color: '#4CAFF7' }} size="small" aria-label="view" onClick={() => handleOpenViewModal(goal)}>
          <RemoveRedEye />
        </IconButton>
      </Box>,
    ])
    : [];

  return (
    <>
      <TitleBar title={title} />
      <GoalActions />

      {/* Conditional rendering based on user role */}
      {user?.roles[0] === 'EMPLOYEE' && (
        <>
          {/* Employee's own goals */}
          <Goals title="Your Goals" columns={userGoalsCol} rows={userGoalsRows} />

          {/* Goals assigned by manager */}
          <Goals title="Assigned by Manager" columns={assignedGoalsCol} rows={assignedGoalsRows} />
        </>
      )}

      {user?.roles[0] === 'MANAGER' && (
        <>
          {/* Goals assigned by manager to employees */}
          <Goals title="Assigned Goals to Users" columns={managerAssignedGoalsCol} rows={managerRows} />
        </>
      )}

      {/* View Modal */}
      <CustomModal open={openViewModal} onClose={handleCloseViewModal} title="View Goal Details" showSearch={false}>
        {selectedGoal ? (
          <Box sx={styles.modalContent}>
            <Typography variant="body1"><strong>Goal Name:</strong> {selectedGoal.goalName}</Typography>
            <Typography variant="body1"><strong>Status:</strong> {selectedGoal.status}</Typography>
            <Typography variant="body1"><strong>Progress:</strong> {selectedGoal.progress}%</Typography>
            <Typography variant="body1"><strong>Due Date:</strong> {selectedGoal.dueDate}</Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>Tasks:</Typography>
            {remainingTasks.map((task) => (
              <Box key={task.taskId} sx={styles.taskList}>
                <Box sx={{ paddingX: 3 }}>
                  <Typography variant="body1">
                    {task.taskName}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body1" sx={{ color: task.isCompleted ? colors.green[400] : colors.red[400] }}>
                    {task.isCompleted ? 'Completed' : 'Pending'}
                  </Typography>
                  <Checkbox
                    checked={task.isCompleted}
                    onChange={() => handleTaskCheckboxChange(task)}
                    sx={{ color: '#4CAFF7' }}
                    size="small"
                  />
                  {selectedGoal.mangerName === null && (
                    <IconButton sx={{ color: colors.red[400] }} size="small" aria-label="delete" onClick={() => handleTaskDelete(task)}>
                      <Delete />
                    </IconButton>
                  )}
                </Box>
              </Box>
            ))}
            {(tasksToBeUpdated.length > 0 || tasksToBeDeleted.length > 0) && (
              <Box sx={styles.buttonWrapper}>
                <CustomButton variant="contained" onClick={handleUpdateTasks} disabled={loading}>
                  {loading ? <CircularProgress size={24} /> : 'Update Tasks'}
                </CustomButton>
              </Box>
            )}
          </Box>
        ) : (
          <Typography variant="body2">No goal selected.</Typography>
        )}
      </CustomModal>

      {/* Edit Modal */}
      <CustomModal open={openEditModal} onClose={handleCloseEditModal} title="Edit Goal" showSearch={false} color='primary'>
        {selectedGoal ? (
          <Box sx={styles.modalContent}>
            <TextField
              sx={{
                mt: 2,
                minWidth: '100%',
                '& .MuiOutlinedInput-root': {
                  borderRadius: 5,
                  backgroundColor: '#E6E6E6',
                },
              }}
              label="Goal Name"
              value={selectedGoal.goalName}
              onChange={(e) => setSelectedGoal({ ...selectedGoal, goalName: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              sx={{
                mt: 2,
                minWidth: '100%',
                '& .MuiOutlinedInput-root': {
                  borderRadius: 5,
                  backgroundColor: '#E6E6E6',
                },
              }}
              label="Description"
              value={selectedGoal.description || ''}
              onChange={(e) => setSelectedGoal({ ...selectedGoal, description: e.target.value })}
              fullWidth
              margin="normal"
              multiline
              rows={3}
            />

            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 2,
              gap: 3,
            }} >
              <Typography variant="h6" sx={{ marginY: 2 }}>Status: </Typography>
              <Box sx={{
                display: 'flex',
                justifyContent: 'row-reverse',
                alignItems: 'center',
              }} >
                <FormControlLabel
                  control={<Checkbox sx={{ color: '#4CAFF7' }} checked={selectedGoal.status === 'PENDING'} onChange={() => handleStatusChange('PENDING')} />}
                  label="Pending"
                />
                <FormControlLabel
                  control={<Checkbox sx={{ color: '#4CAFF7' }} checked={selectedGoal.status === 'IN_PROGRESS'} onChange={() => handleStatusChange('IN_PROGRESS')} />}
                  label="In Progress"
                />
                <FormControlLabel
                  control={<Checkbox sx={{ color: '#4CAFF7', accentColor: colors.blue[400] }} checked={selectedGoal.status === 'COMPLETED'} onChange={() => handleStatusChange('COMPLETED')} />}
                  label="Completed"
                />
              </Box>
            </Box>

            <DatePicker
              label="Due Date"
              sx={{
                mt: 2,
                minWidth: '100%',
                '& .MuiOutlinedInput-root': {
                  borderRadius: 5,
                  backgroundColor: '#E6E6E6',
                },
              }}
              value={dayjs(selectedGoal.dueDate)}
              onChange={(newValue) => setSelectedGoal({ ...selectedGoal, dueDate: dayjs(newValue).format('YYYY-MM-DD') })}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
            />

            {/* Task Management */}
            <Box sx={styles.addTaskWrapper}>
              <Typography sx={styles.taskLabel}>Tasks</Typography>
              <IconButton
                sx={styles.addButton}
                onClick={() => setShowTaskInput(!showTaskInput)} // Toggle input field visibility
              >
                <AddIcon />
              </IconButton>
            </Box>

            {/* Conditionally Render Input Field for Adding New Task */}
            {showTaskInput && (
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <TextField
                  placeholder="New Task"
                  value={newTaskName}
                  onChange={(e) => setNewTaskName(e.target.value)}
                  sx={{ flexGrow: 1 }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddTask(); // Add task when Enter is pressed
                    }
                  }}
                />
                <IconButton sx={{ ml: 2, color: '#4CAFF7' }} onClick={handleAddTask}>
                  <AddIcon />
                </IconButton>
              </Box>
            )}

            {/* Render Existing Tasks */}
            {remainingTasks.map((task) => (
              <Box key={task.taskId} sx={styles.taskList}>
                <Box sx={{ paddingX: 3 }}>
                  <Typography variant="body1">
                    {task.taskName}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body1" sx={{ color: task.isCompleted ? colors.green[400] : colors.red[400] }}>
                    {task.isCompleted ? 'Completed' : 'Pending'}
                  </Typography>
                  {/* <Checkbox
                    checked={task.isCompleted}
                    onChange={() => handleTaskCheckboxChange(task)}
                    sx={{ color: '#4CAFF7' }}
                    size="small"
                  />
                  <IconButton sx={{ color: colors.red[400] }} size="small" aria-label="delete" onClick={() => handleTaskDelete(task)}>
                    <Delete />
                  </IconButton> */}
                </Box>
              </Box>
            ))}

            {/* Save Goal Button */}
            <Box sx={styles.buttonWrapper}>
              <CustomButton variant="contained" color="primary" onClick={handleUpdateGoal} disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Save Goal'}
              </CustomButton>
            </Box>
          </Box>
        ) : (
          <Typography variant="body2">No goal selected for editing.</Typography>
        )}
      </CustomModal>
    </>
  );
}

export default Goal;
