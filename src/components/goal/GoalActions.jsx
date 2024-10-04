import {
  CircularProgress,
  Box,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  IconButton,
  Typography,
  colors
} from '@mui/material';
import { useState } from 'react';
import { Formik, Field, FieldArray, Form } from 'formik';
import * as Yup from 'yup';
import CustomModal from '../ui/CustomModal';
import CustomButton from '../ui/CustomButton';
import { DatePicker } from '@mui/x-date-pickers';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs'; // Ensure you're using dayjs for date formatting
import { createGoal } from '../../redux/goalSlice';

// Styles
const styles = {
  modalContent: {
    maxWidth: '500px',
    width: '100%',
    margin: 'auto',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 2,
    mt: 2,
  },
  textField: {
    mt: 2,
    minWidth: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: 5,
      backgroundColor: '#E6E6E6',
    },
  },
  selectField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 5,
      backgroundColor: '#E6E6E6',
    },
  },
  taskField: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 1,
    mt: 2,
    minWidth: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: 5,
      backgroundColor: '#E6E6E6',
    },
  },
  taskLabel: {
    fontWeight: 'bold',
    mt: 1,
  },
  addButton: {
    alignSelf: 'flex-start',
    mt: 1,
  },
  addTaskWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 1,
  },
  horizontalGroup: {
    display: 'flex',
    gap: 2,
  },
  fieldItem: {
    flex: 1, // Ensures both fields take up equal space
    '& .MuiOutlinedInput-root': {
      borderRadius: 5,
      backgroundColor: '#E6E6E6',
    },
  },
};

// Validation Schema for Goal Form
const validationSchema = Yup.object({
  goalName: Yup.string().required('Goal Name is required'),
  description: Yup.string().required('Description is required'),
  dueDate: Yup.date().required('Due Date is required').nullable(),
  tasks: Yup.array().of(
    Yup.object({
      taskName: Yup.string().required('Task title is required'), // Updated validation for 'title'
      isCompleted: Yup.boolean(), // Updated validation for 'isCompleted'
    })
  ),
});

const GoalActions = () => {
  const [openGoalModal, setOpenGoalModal] = useState(false);
  const [showTaskInput, setShowTaskInput] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for submit button
  

  const users = useSelector((state) => state.users.users);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleAssignGoal = () => {
    setOpenGoalModal(true);
  };

  const handleCloseGoalModal = () => {
    setOpenGoalModal(false);
  };

  const handleAddTask = (push) => {
    if (newTaskName.trim()) {
      push({ taskName: newTaskName, isCompleted: false }); // Ensure 'title' and 'isCompleted' are used correctly
      setNewTaskName(''); // Reset input field
      setShowTaskInput(false); // Hide the input field
    }
  };

  const handleCreateGoal = () => {
    setOpenGoalModal(true);
  };



  const handleSubmit = (values) => {
    setLoading(true); // Show loading spinner when submitting the form

    // Format the date into 'YYYY-MM-DDTHH:mm:ss'
    const formattedDate = values.dueDate
      ? dayjs(values.dueDate).toISOString().split('.')[0] // Removes milliseconds
      : null;

    const body = {
      userId: user?.id,
      goalName: values.goalName,
      description: values.description,
      dueDate: formattedDate,
      assignedById: null,
      tasks: values.tasks,
    };

      if (user?.roles[0] === 'MANAGER') {
       
        body.userId = values.userid; // Assign the goal to the selected user
        body.assignedById = user?.id; // Assign the goal to the manager
        console.log('Assign Goal', body); // Formatted values sent to backend
        
      } else if (user?.roles[0] === 'EMPLOYEE') {
        console.log('Create Goal', body); // Formatted values sent to backend
        
      }
      dispatch(createGoal(body))
      .then(() => {
        setLoading(false);
        setOpenGoalModal(false); // Close the modal after success
      })
      .catch((error) => {
        console.error('Error creating goal:', error);
        setLoading(false); // Reset loading on error
      });
  };


  return (
    <>
      {/* Assign/Create Goal Button */}
      <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
        {user?.roles[0] === 'MANAGER' ? (
          <CustomButton onClick={handleAssignGoal} variant="contained" color="primary">
            Assign Goal
          </CustomButton>
        ) : (
          <CustomButton onClick={handleCreateGoal} variant="contained" color="primary">
            Create Goal
          </CustomButton>
        )}
      </Box>

      {/* Modal for Assign/Create Goal */}
      <CustomModal open={openGoalModal} onClose={handleCloseGoalModal}  title="Assign/Create Goal">
        <Box sx={styles.modalContent}>
          <Formik
            initialValues={{
              userid: '',
              goalName: '',
              description: '',
              dueDate: null,
              tasks: [],
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleSubmit, setFieldValue, touched, errors }) => (
              <Form onSubmit={handleSubmit}>
                {/* Manager-specific fields (Select User) */}
                {user?.roles[0] === 'MANAGER' ? (
                  <Box sx={styles.horizontalGroup}>
                    <FormControl sx={styles.fieldItem}>
                      <InputLabel id="user-select-label">Select User</InputLabel>
                      <Field
                        as={Select}
                        sx={styles.selectField}
                        labelId="user-select-label"
                        id="userid"
                        name="userid"
                        value={values.userid}
                        onChange={handleChange}
                        error={touched.userid && Boolean(errors.userid)}
                      >
                        {users.map((user) => (
                          <MenuItem key={user.userId} value={user.userId}>
                            {user.fullName}
                          </MenuItem>
                        ))}
                      </Field>
                    </FormControl>

                    {/* Goal Name */}
                    <Field name="goalName">
                      {({ field }) => (
                        <TextField
                          {...field}
                          sx={styles.fieldItem}
                          id="goalName"
                          name="goalName"
                          label="Goal Name"
                          error={touched.goalName && Boolean(errors.goalName)}
                          helperText={touched.goalName && errors.goalName}
                        />
                      )}
                    </Field>
                  </Box>
                ) : (
                  // Employee-specific field (Goal Name only)
                  <Field name="goalName">
                    {({ field }) => (
                      <TextField
                        {...field}
                        sx={styles.textField}
                        id="goalName"
                        name="goalName"
                        label="Goal Name"
                        error={touched.goalName && Boolean(errors.goalName)}
                        helperText={touched.goalName && errors.goalName}
                      />
                    )}
                  </Field>
                )}

                {/* Description Field */}
                <Field name="description">
                  {({ field }) => (
                    <TextField
                      {...field}
                      sx={styles.textField}
                      multiline
                      rows={2}
                      id="description"
                      name="description"
                      label="Goal Description"
                      error={touched.description && Boolean(errors.description)}
                      helperText={touched.description && errors.description}
                    />
                  )}
                </Field>

                {/* Date Picker */}
                <DatePicker
                  label="Due Date"
                  value={values.dueDate ? dayjs(values.dueDate) : null} // Use dayjs to parse the date
                  onChange={(value) => setFieldValue('dueDate', value ? dayjs(value).toISOString().split('.')[0] : null)}
                  sx={styles.textField}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      id="dueDate"
                      name="dueDate"
                      fullWidth
                      error={touched.dueDate && Boolean(errors.dueDate)}
                      helperText={touched.dueDate && errors.dueDate}
                    />
                  )}
                />

                {/* Task Management */}
                  <Box sx={styles.addTaskWrapper}>
                    <Typography sx={styles.taskLabel}>Tasks</Typography>
                    <IconButton
                      sx={styles.addButton}
                      onClick={() => setShowTaskInput(!showTaskInput)}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                <FieldArray name="tasks">
                  {({ push, remove }) => (
                    <Box sx={{ marginLeft: 4 }}>
                      {showTaskInput && (
                        <TextField
                          fullWidth
                          sx={styles.textField}
                          placeholder="Enter Task Title"
                          value={newTaskName}
                          onChange={(e) => setNewTaskName(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleAddTask(push);
                            }
                          }}
                        />
                      )}

                      {/* Task List */}
                      {values.tasks.map((task, index) => (
                        <Box key={index} sx={styles.taskField}>
                          <Typography>{task.taskName}</Typography>
                          <Box>
                            <Checkbox
                            sx={{color: '#4CAFF7'}}
                              checked={task.isCompleted}
                              onChange={(e) => setFieldValue(`tasks[${index}].isCompleted`, e.target.checked)} // Fix the name to 'isCompleted'
                            />
                            <IconButton sx={{color:colors.red[400]}} onClick={() => remove(index)}>
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  )}
                </FieldArray>

                {/* Submit Button */}
                <Box sx={styles.buttons}>
                  <CustomButton type="submit" variant="contained" color="primary" disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : 'Submit'}
                  </CustomButton>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </CustomModal>
    </>
  );
};

export default GoalActions;
