import { Box, MenuItem, TextField, FormControl, InputLabel, Select, Checkbox, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import { Formik, Field, FieldArray, Form } from 'formik';
import * as Yup from 'yup';
import CustomModal from '../ui/CustomModal';
import CustomButton from '../ui/CustomButton';
import { DatePicker } from '@mui/x-date-pickers';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { createPip } from '../../redux/pipSlice';

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
  
  userid: Yup.string().required('User is required'),
  title: Yup.string().required('Goal Name is required'),
  startDate: Yup.date().required('Date is required').nullable(),
  endDate: Yup.date().required('Date is required').nullable(),
  support: Yup.string().required('Support is required'),
  tasks: Yup.array().of(
    Yup.object({
      taskName: Yup.string().required('Task name is required'),
      completed: Yup.boolean(),
    })
  ),
});

const PipActions = () => {
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
      push({ taskName: newTaskName, completed: false });
      setNewTaskName(''); // Reset input field
      setShowTaskInput(false); // Hide the input field
    }
  };

  const handleSubmit = (values) => {
    setLoading(true);
    const body = {
      employeeId: values.userid,
      managerId: user.id,
      title: values.title,
      startDate: values.startDate,
      endDate: values.endDate,
      support: values.support,
      tasks: values.tasks,
    };
    console.log(body);
    dispatch(createPip(body)).then((res) => {
      if (res.payload) {
        setOpenGoalModal(false);
      }
      setLoading(false);
    }
    ).catch((err) => {
      console.log(err);
      setLoading(false);
    });
  
    
  }


  return (
    <>
      {/* Assign Goal Button */}
      
      <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
        <CustomButton onClick={handleAssignGoal} variant="contained" color="primary">
          Create PIP
        </CustomButton>
      </Box>

      {/* Modal for Assign Goal */}
      <CustomModal open={openGoalModal} onClose={handleCloseGoalModal} title="Assign Goal">
        <Box sx={styles.modalContent}>
          <Formik
            initialValues={{
              userid: '',
              title: '',
              startDate: null,
              endDate: null,
              support: '',
              tasks: [],
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleSubmit, setFieldValue, touched, errors }) => (
              <Form onSubmit={handleSubmit}>
                <Box sx={styles.horizontalGroup}>
                  {/* Select User */}
                  <FormControl sx={{...styles.fieldItem }}>
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
                  <Field name="title">
                    {({ field }) => (
                      <TextField
                        {...field}
                        sx={{ ...styles.fieldItem}}
                        id="title"
                        name="title"
                        label="title"
                        value={field.value}
                        onChange={field.onChange}
                        error={touched.title && Boolean(errors.title)}
                        helperText={touched.title && errors.title}
                      />
                    )}
                  </Field>
                </Box>

                {/* Date */}
                <DatePicker
                  label="StartDate"
                  value={values.startDate}
                  onChange={(value) => setFieldValue('startDate', value)}
                  sx={styles.textField}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={touched.startDate && Boolean(errors.startDate)}
                      helperText={touched.startDate && errors.startDate}
                    />
                  )}
                />

                {/* Date */}
                <DatePicker
                  label="End Date"
                  value={values.endDate}
                  onChange={(value) => setFieldValue('endDate', value)}
                  sx={styles.textField}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={touched.endDate && Boolean(errors.endDate)}
                      helperText={touched.endDate && errors.endDate}
                    />
                  )}
                />



                <Field name="support">
                  {({ field }) => (
                    <TextField
                      {...field}
                      sx={styles.textField}
                      id="support"
                      name="support"
                      label="Support"
                      value={field.value}
                      onChange={field.onChange}
                      error={touched.support && Boolean(errors.support)}
                      helperText={touched.support && errors.support}
                    />
                  )}
                </Field>

                {/* Tasks */}
                {/* Add Task Button */}
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
                      {/* Add Task Input Below the Add Task Button */}
                      {showTaskInput && (
                        <TextField
                          fullWidth
                          sx={styles.textField}
                          placeholder="Enter Task Name"
                          value={newTaskName}
                          onChange={(e) => setNewTaskName(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleAddTask(push);
                            }
                          }}
                        />
                      )}

                      {/* Tasks List */}
                      {values.tasks.map((task, index) => (
                        <Box key={index} sx={styles.taskField}>
                          <Typography>{task.taskName}</Typography>
                          <Box>
                            <Checkbox
                              checked={task.completed}
                              onChange={(e) => setFieldValue(`tasks[${index}].completed`, e.target.checked)}
                            />
                            <IconButton onClick={() => remove(index)}>
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
                  <CustomButton type="submit" variant="contained" color="primary">
                    Submit
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

export default PipActions;
