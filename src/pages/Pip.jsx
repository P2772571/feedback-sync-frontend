import React, { useState } from 'react';
import TitleBar from '../components/dashboard/TitleBar';
import { useLocation } from 'react-router-dom';
import {
  Box,
  IconButton,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  colors,
  CircularProgress,
  Checkbox,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Edit, RemoveRedEye, Delete, Add as AddIcon } from '@mui/icons-material';
import PipActions from '../components/pip/PIPActions';
import { useDispatch, useSelector } from 'react-redux';
import Pips from '../components/pip/PIPsSection';
import CustomModal from '../components/ui/CustomModal';
import CustomButton from '../components/ui/CustomButton';
import dayjs from 'dayjs';
import { updatePip, createTask, updateTask, deleteTask, deletePip, fetchPipById } from '../redux/pipSlice';

// Styles
const styles = {
  modalContent: {
    padding: 2,
    maxWidth: '500px',
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

function Pip() {
  const location = useLocation();
  const title = location.state?.title || 'No Title Provided';

  // GET AND PRINT PIPS
  const user = useSelector((state) => state.auth.user);
  const userId = user?.userId || user?.id; // Adjust according to your user object structure
  const role = user?.roles[0] || undefined;
  const pips = useSelector((state) => state.pips.pips);
  const loading = useSelector((state) => state.pips.loading);

  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedPip, setSelectedPip] = useState(null);
  const [tasksToBeUpdated, setTasksToBeUpdated] = useState([]);
  const [tasksToBeDeleted, setTasksToBeDeleted] = useState([]);
  const [newTasksToBeCreated, setNewTasksToBeCreated] = useState([]); // New tasks to be created
  const [remainingTasks, setRemainingTasks] = useState([]); // Holds the tasks not deleted
  const [loadingButton, setLoadingButton] = useState(false); // Loading state for task/PIP updates
  const [showTaskInput, setShowTaskInput] = useState(false); // State to control the task input visibility
  const [newTaskName, setNewTaskName] = useState(''); // State to store new task input

  const dispatch = useDispatch();

  /**
   *  Open the view modal and set the selected PIP
   * @param {*} pip
   */
  const handleOpenViewModal = (pip) => {
    setSelectedPip(pip);
    setRemainingTasks([...pip.tasks]); // Store the original tasks in a temporary list
    setOpenViewModal(true);
  };

  const handleCloseViewModal = () => {
    setTasksToBeUpdated([]);
    setTasksToBeDeleted([]);
    setNewTasksToBeCreated([]);
    setOpenViewModal(false);
  };

  /**
   * Open the edit modal and set the selected PIP
   * @param {*} pip
   */
  const handleOpenEditModal = (pip) => {
    setSelectedPip(pip);
    setRemainingTasks([...pip.tasks]); // Store original tasks
    setTasksToBeUpdated([]);
    setTasksToBeDeleted([]);
    setNewTasksToBeCreated([]);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {

    setTasksToBeUpdated([]);
    setTasksToBeDeleted([]);
    setNewTasksToBeCreated([]);
    setOpenEditModal(false);
  };

  const handleTaskCheckboxChange = (task) => {
    // Toggle the isCompleted value for the task
    const updatedTask = { ...task, isCompleted: !task.isCompleted };

    // Check if the task is already in tasksToBeUpdated
    const updatedTasks = tasksToBeUpdated.some((t) => t.taskId === task.taskId)
      ? tasksToBeUpdated.map((t) => (t.taskId === task.taskId ? updatedTask : t)) // Update the task
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
    setLoadingButton(true);
    console.log("Task to be deleted", task)
    dispatch(deleteTask(task.taskId)).then((response) => {
      console.log("Task Deleted", response)
      dispatch(fetchPipById(selectedPip.pipId)); // Fetch the updated PIP
    }
    );
    // Remove the task from the remainingTasks array
    const updatedRemainingTasks = remainingTasks.filter((t) => t.taskId !== task.taskId);
    setRemainingTasks(updatedRemainingTasks);

    // Check if the task is already in tasksToBeUpdated
    const updatedTasks = tasksToBeUpdated.filter((t) => t.taskId !== task.taskId);
    setTasksToBeUpdated(updatedTasks);

    setLoadingButton(false);
  };

  const handleUpdateTasks = () => {
    setLoadingButton(true);

    // Update existing tasks
    tasksToBeUpdated.forEach(async (task) => {
      console.log("Selected Pip is : ", selectedPip)
      const taskRequest = { ...task, pipId: selectedPip.pipId };
      dispatch(updateTask({ taskId: task.taskId, taskRequest })).then((response) => {
        console.log("Task Updated", response)
        dispatch(fetchPipById(selectedPip.pipId)); // Fetch the updated PIP
      });
    });
    // Reset the state after operations
    setLoadingButton(false);
    setOpenEditModal(false);
    setTasksToBeUpdated([]);
    setTasksToBeDeleted([]);
    setNewTasksToBeCreated([]);
  };

  // Handle adding new tasks
  const handleAddTask = () => {
    if (newTaskName.trim()) {
      const newTask = { taskName: newTaskName, isCompleted: false };
      setRemainingTasks([...remainingTasks, newTask]); // Add new task to remaining tasks
      setNewTasksToBeCreated([...newTasksToBeCreated, newTask]); // Add new task to newTasksToBeCreated
      setNewTaskName(''); // Reset task name input
      setShowTaskInput(false); // Hide task input field
    }
  };

  // Handle update PIP
  const handleUpdatePip = () => {
    setLoadingButton(true);
    const pipRequest = { ...selectedPip, userId };

    dispatch(updatePip({ pipId: selectedPip.pipId, pipRequest }));

    if (tasksToBeUpdated.length > 0 || tasksToBeDeleted.length > 0 || newTasksToBeCreated.length > 0) {
      handleUpdateTasks();
    }
    newTasksToBeCreated.forEach((task) => {
      const taskRequest = { ...task, pipId: selectedPip.pipId };
      dispatch(createTask(taskRequest));
    });

    dispatch(fetchPipById(selectedPip.pipId)); // Fetch the updated PIP

    // Reset the state after operation
    setLoadingButton(false);
    setOpenEditModal(false);
  };

  // Simulate handle delete PIP
  // Updated handleDeletePip function
  const handleDeletePip = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this PIP?');
    if (!confirmDelete) {
      return;
    }
    setLoadingButton(true);
    try {



      dispatch(deletePip(selectedPip.pipId));

      // Reset the state after operation
      setLoadingButton(false);
      setOpenViewModal(false);
      setOpenEditModal(false);
    } catch (error) {
      console.log('Error deleting PIP:', error);
      setLoadingButton(false); // Ensure loading state is reset in case of error
    }
  };


  // Handle task input change
  const handleTaskInputChange = (e) => setNewTaskName(e.target.value);

  // Handle task input key press
  const handleTaskInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  // Handle task input focus out
  const handleTaskInputFocusOut = () => {
    if (newTaskName.trim()) {
      handleAddTask();
    }
  };

  // Table Header Configuration
  const managerTableCol = [
    'SR',
    'Title',
    'Assigned To',
    'Start Date',
    'Due Date',
    'Progress',
    'Outcome',
    'Support',
    'Status',
    'Action',
  ];
  const employeeTableCol = [
    'SR',
    'Title',
    'Assigned By',
    'Start Date',
    'Due Date',
    'Progress',
    'Outcome',
    'Support',
    'Status',
    'Action',
  ];

  const pipsRows = Array.isArray(pips)
    ? pips.map((pip, index) => [
      index + 1, // SR
      pip.title?.length > 30 ? `${pip.title.substring(0, 15)}...` : pip.title, // Name
      role === 'EMPLOYEE' ? pip.managerName : pip.employeeName, // Assigned By / To
      pip.startDate, // Start Date
      pip.endDate, // Due Date
      `${pip.progress}%`, // Progress
      pip.outcome, // Outcome
      pip.support, // Support
      pip.status, // Status
      <Box
        key={`actions-${index}`}
        sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}
      >
        <IconButton
          color="primary"
          size="small"
          aria-label="view"
          onClick={() => handleOpenViewModal(pip)}
        >
          <RemoveRedEye />
        </IconButton>
        {role === 'MANAGER' && (
          <>
            <IconButton
              color="primary"
              size="small"
              aria-label="edit"
              onClick={() => handleOpenEditModal(pip)}
            >


              <Edit />
            </IconButton>

            <IconButton

              color="error"
              size="small"
              aria-label="delete"
              onClick={handleDeletePip}
            >
              <Delete />
            </IconButton>
          </>

        )}
      </Box>,
    ])
    : [];

  return (
    <>
      <TitleBar title={title} />

      <PipActions />
      <Pips
        title="Assigned PIPs"
        columns={role === 'EMPLOYEE' ? employeeTableCol : managerTableCol}
        rows={pipsRows}
      />

      {/* View Modal */}
      <CustomModal
        open={openViewModal}
        onClose={handleCloseViewModal}
        title="View PIP Details"
        showSearch={false}
      >
        {selectedPip ? (
          <Box sx={styles.modalContent}>
            <Typography variant="body1">
              <strong>PIP Title :</strong> {selectedPip.title}
            </Typography>
            <Typography variant="body1">
              <strong> {role === 'MANAGER' ? 'Assigned To' : 'Assigned By'} :</strong>{' '}
              {role === 'MANAGER' ? selectedPip.employeeName : selectedPip.managerName}
            </Typography>
            <Typography variant="body1">
              <strong>Status:</strong> {selectedPip.status}
            </Typography>
            <Typography variant="body1">
              <strong>Progress:</strong> {selectedPip.progress}%
            </Typography>
            <Typography variant="body1">
              <strong>Due Date:</strong> {selectedPip.endDate}
            </Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Tasks:
            </Typography>
            {remainingTasks?.map((task) => (
              <Box key={task?.taskId || task?.taskName} sx={styles.taskList}>
                <Box sx={{ paddingX: 3 }}>
                  <Typography variant="body1">{task?.taskName}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography
                    variant="body1"
                    sx={{ color: task?.isCompleted ? colors.green[400] : colors.red[400] }}
                  >
                    {task?.isCompleted ? 'Completed' : 'Pending'}
                  </Typography>
                  {/* Checkbox to toggle task completion for only employee */}
                  {role === 'EMPLOYEE' && (
                    <Checkbox
                      checked={task?.isCompleted}
                      onChange={() => handleTaskCheckboxChange(task)}
                      sx={{ color: '#4CAFF7' }}
                      size="small"
                    />
                  )}

                  {selectedPip.managerName === null && (
                    <IconButton
                      sx={{ color: colors.red[400] }}
                      size="small"
                      aria-label="delete"
                      onClick={() => handleTaskDelete(task)}
                    >
                      <Delete />
                    </IconButton>
                  )}
                </Box>
              </Box>
            ))}
            {(tasksToBeUpdated.length > 0 ||
              tasksToBeDeleted.length > 0 ||
              newTasksToBeCreated.length > 0) && (
                <Box sx={styles.buttonWrapper}>
                  <CustomButton
                    variant="contained"
                    onClick={handleUpdateTasks}
                    disabled={loadingButton}
                  >
                    {loadingButton ? <CircularProgress size={24} /> : 'Update Tasks'}
                  </CustomButton>
                </Box>
              )}
          </Box>
        ) : (
          <Typography variant="body2">No PIP selected.</Typography>
        )}
      </CustomModal>

      {/* Edit Modal */}
      <CustomModal
        open={openEditModal}
        onClose={handleCloseEditModal}
        title="Edit PIP"
        showSearch={false}
        color="primary"
      >
        {selectedPip ? (
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
              label="PIP Title"
              value={selectedPip.title}
              onChange={(e) => setSelectedPip({ ...selectedPip, title: e.target.value })}
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
              label="Support"
              value={selectedPip.support || ''}
              onChange={(e) => setSelectedPip({ ...selectedPip, support: e.target.value })}
              fullWidth
              margin="normal"
            />

            <FormControl component="fieldset" sx={{ mt: 2 }}>
              <FormLabel component="legend">Status</FormLabel>
              <RadioGroup
                aria-label="status"
                name="status"
                value={selectedPip.status}
                onChange={(e) => setSelectedPip({ ...selectedPip, status: e.target.value })}
                row
              >
                <FormControlLabel value="PENDING" control={<Radio />} label="Pending" />
                <FormControlLabel value="IN_PROGRESS" control={<Radio />} label="In Progress" />
                <FormControlLabel value="COMPLETED" control={<Radio />} label="Completed" />
              </RadioGroup>
            </FormControl>

            <FormControl component="fieldset" sx={{ mt: 2 }}>
              <FormLabel component="legend">Outcome</FormLabel>
              <RadioGroup
                aria-label="outcome"
                name="outcome"
                value={selectedPip.outcome}
                onChange={(e) => setSelectedPip({ ...selectedPip, outcome: e.target.value })}
                row
              >
                <FormControlLabel value="PENDING" control={<Radio />} label="Pending" />
                <FormControlLabel value="IMPROVEMENT" control={<Radio />} label="Improvement" />
                <FormControlLabel value="FAILURE" control={<Radio />} label="Failure" />
                <FormControlLabel value="SUCCESS" control={<Radio />} label="Success" />
              </RadioGroup>
            </FormControl>

            <DatePicker
              label="Start Date"
              sx={{
                mt: 2,
                minWidth: '100%',
                '& .MuiOutlinedInput-root': {
                  borderRadius: 5,
                  backgroundColor: '#E6E6E6',
                },
              }}
              value={dayjs(selectedPip.startDate)}
              onChange={(newValue) =>
                setSelectedPip({
                  ...selectedPip,
                  startDate: dayjs(newValue).format('YYYY-MM-DD'),
                })
              }
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
            />

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
              value={dayjs(selectedPip.endDate)}
              onChange={(newValue) =>
                setSelectedPip({
                  ...selectedPip,
                  endDate: dayjs(newValue).format('YYYY-MM-DD'),
                })
              }
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
                  onChange={handleTaskInputChange}
                  sx={{ flexGrow: 1 }}
                  onKeyPress={handleTaskInputKeyPress}
                  onBlur={handleTaskInputFocusOut}
                />
                {/* <IconButton sx={{ ml: 2, color: '#4CAFF7' }} onClick={handleAddTask}>
                  <AddIcon />
                </IconButton> */}
              </Box>
            )}

            {/* Render Existing Tasks */}
            {remainingTasks.map((task) => (
              <Box key={task.taskId || task.taskName} sx={styles.taskList}>
                <Box sx={{ paddingX: 3 }}>
                  <Typography variant="body1">{task.taskName}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography
                    variant="body1"
                    sx={{ color: task.isCompleted ? colors.green[400] : colors.red[400] }}
                  >
                    {task.isCompleted ? 'Completed' : 'Pending'}
                  </Typography>
                  {/* Checkbox to toggle task completion for only employee */}
                  {role === 'EMPLOYEE' && (
                    <Checkbox
                      checked={task.isCompleted}
                      onChange={() => handleTaskCheckboxChange(task)}
                      sx={{ color: '#4CAFF7' }}
                      size="small"
                    />
                  )}
                  <IconButton
                    sx={{ color: colors.red[400] }}
                    size="small"
                    aria-label="delete"
                    onClick={() => handleTaskDelete(task)}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </Box>
            ))}

            {/* Save PIP Button */}
            <Box sx={styles.buttonWrapper}>
              <CustomButton
                variant="contained"
                color="primary"
                onClick={handleUpdatePip}
                disabled={loadingButton}
              >
                {loadingButton ? <CircularProgress size={24} /> : 'Save PIP'}
              </CustomButton>
            </Box>
          </Box>
        ) : (
          <Typography variant="body2">No PIP selected for editing.</Typography>
        )}
      </CustomModal>
    </>
  );
}

export default Pip;
