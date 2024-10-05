import { Box, InputAdornment, Button, Card, Typography, CircularProgress, TextField } from '@mui/material';
import { Field, Formik, Form } from 'formik';
import PropTypes from 'prop-types';
import { Person, Email, Work } from '@mui/icons-material';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../redux/profileSlice';
import { logout, setUser } from '../../redux/auth/authSlice';
import SnackbarExtended from '../ui/SnackBar';
import { fetchProfile } from '../../redux/profileSlice';

function PersonalInformation({ user, profile }) {

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  console.log(useSelector((state) => state.feedbacks.feedbacks))


  const dispatch = useDispatch();

  // State to manage form initial values
  const [initialValues, setInitialValues] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    jobTitle: '',
    manager:"",
  });
  
  
  // Effect to update initialValues when user or profile changes
  useEffect(() => {
    if (user && profile) {
      setInitialValues({

        firstName: profile?.firstName || '',
        lastName: profile?.lastName || '',
        username: user?.username || '',
        email: user?.email || '',
        jobTitle: profile?.jobTitle || '',
        manager: profile?.manager?.firstName+" " + profile?.manager?.lastName || '',
      });

    }
  }, [user, profile]); // Dependencies on user and profile

  // Validation Schema
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('First Name is required'),
    lastName: Yup.string()
      .required('Last Name is required'),
    username: Yup.string()
      .required('Username is required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    jobTitle: Yup.string()
      .min(1, 'Job Title must be at least 1 character')
      .required('Job Title is required'),
  });

  // Handle Submission
  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Form Values:', values);
    dispatch(updateProfile(values)).then((action) => {
      
      if (!action.error) {
        
        // Re-login logic if username or email is updated
        if (values.username !== user.username || values.email !== user.email) {
          dispatch(logout());
          dispatch(setUser(action.payload.user));
        }

        dispatch(fetchProfile());
        setSnackbarMessage('Profile Updated Successfully');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);


        
      } else {
        setSnackbarMessage('Failed to Update Profile');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }


      setSubmitting(false);
    });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Return the JSX Component
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'start',
        marginY: 2,
        boxShadow: 2,
        borderRadius: 5,
        marginRight: 1,
        padding: 12,
        width: "50%",
        backgroundColor: '#ffffff',
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: 'bold' }}>
        Personal Information
      </Typography>

      <Formik
        initialValues={initialValues}
        enableReinitialize // Reinitialize the form when initialValues change
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting,dirty, errors, touched }) => (
          <Form>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
              <Field name="firstName">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="First Name"
                    fullWidth
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                    sx={{ marginBottom: 2, '& .MuiOutlinedInput-root': { borderRadius: 5, backgroundColor: '#E6E6E6' } }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              </Field>

              <Field name="lastName">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Last Name"
                    fullWidth
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                    sx={{ marginBottom: 2, '& .MuiOutlinedInput-root': { borderRadius: 5, backgroundColor: '#E6E6E6' } }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              </Field>
            </Box>

            <Field name="username">
              {({ field }) => (
                <TextField
                  {...field}
                  label="Username"
                  fullWidth
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                  sx={{ marginBottom: 2, '& .MuiOutlinedInput-root': { borderRadius: 5, backgroundColor: '#E6E6E6' } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            </Field>

            <Field name="email">
              {({ field }) => (
                <TextField
                  {...field}
                  type="email"
                  label="Email"
                  fullWidth
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ marginBottom: 2, '& .MuiOutlinedInput-root': { borderRadius: 5, backgroundColor: '#E6E6E6' } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            </Field>

            <Field name="jobTitle">
              {({ field }) => (
                <TextField
                  {...field}
                  label="Job Title"
                  fullWidth
                  error={touched.jobTitle && Boolean(errors.jobTitle)}
                  helperText={touched.jobTitle && errors.jobTitle}
                  sx={{ marginBottom: 2, '& .MuiOutlinedInput-root': { borderRadius: 5, backgroundColor: '#E6E6E6' } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Work />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            </Field>

            
            {user?.roles[0] === 'EMPLOYEE' && (
              <Field name="manager">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Manager Name"
                    fullWidth
                    disabled
                    sx={{ marginBottom: 2, '& .MuiOutlinedInput-root': { borderRadius: 5, backgroundColor: '#E6E6E6' } }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              </Field>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!dirty || isSubmitting}
              sx={{
                marginTop: 2,
                paddingY: 1,
                paddingX: 4,
                borderRadius: 3,
                textTransform: 'none',
                fontWeight: 'bold',
                backgroundColor: '#4CAFF7',
              }}
            >
              {isSubmitting && <CircularProgress size={24} sx={{ position: 'absolute', left: '50%', top: '50%', marginLeft: '-12px', marginTop: '-12px' }} />}
              Update Info
            </Button>
          </Form>
        )}
      </Formik>

      <SnackbarExtended
        open={openSnackbar}
        handleClose={handleCloseSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </Card>
  );
}

PersonalInformation.propTypes = {
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

export default PersonalInformation;
