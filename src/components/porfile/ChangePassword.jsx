import { Box, InputAdornment, Button, Card, Typography, CircularProgress, TextField } from '@mui/material';
import { Field, Formik, Form } from 'formik';
import { Lock } from '@mui/icons-material';
import * as Yup from 'yup';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import PropTypes from 'prop-types';
import SnackbarExtended from '../ui/SnackBar';

function ChangePassword({ user }) {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const toggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Validation Schema
  const validationSchema = Yup.object().shape({
    'old-password': Yup.string().required('Old Password is required'),
    'new-password': Yup.string().min(6, 'New Password must be at least 6 characters').required('New Password is required'),
    'confirm-password': Yup.string().oneOf([Yup.ref('new-password'), null], 'Passwords must match').required('Confirm Password is required'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Form Values:', values);
    setTimeout(() => {
      setSnackbarMessage('Password Changed Successfully');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setSubmitting(false);
    }, 2000);
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'start',
        marginY: 2,
        marginLeft: 1,
        boxShadow: 2,
        borderRadius: 5,
        padding: 12,
        width: '50%',
        backgroundColor: '#ffffff',
      }}
    >
      {/* Title */}
      <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: 'bold', color:'#4CAFF7' }}>
        Change Password
      </Typography>

      <Box>
        {/* Formik to handle the form submission */}
        <Formik
          initialValues={{ 'old-password': '', 'new-password': '', 'confirm-password': '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched, isValid }) => (
            <Form>
              {/* Old Password field */}
              <Field name="old-password">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Old Password"
                    type={showOldPassword ? 'text' : 'password'} 
                    fullWidth
                    error={touched['old-password'] && Boolean(errors['old-password'])}
                    helperText={touched['old-password'] && errors['old-password']}
                    sx={{
                      marginBottom: 2,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 5,
                        backgroundColor: '#E6E6E6',
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={toggleOldPasswordVisibility}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showOldPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              </Field>

              {/* New Password field */}
              <Field name="new-password">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="New Password"
                    type={showNewPassword ? 'text' : 'password'}  
                    fullWidth
                    error={touched['new-password'] && Boolean(errors['new-password'])}
                    helperText={touched['new-password'] && errors['new-password']}
                    sx={{
                      marginBottom: 2,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 5,
                        backgroundColor: '#E6E6E6',
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={toggleNewPasswordVisibility}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showNewPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              </Field>

              {/* Confirm Password field */}
              <Field name="confirm-password">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}  
                    fullWidth
                    error={touched['confirm-password'] && Boolean(errors['confirm-password'])}
                    helperText={touched['confirm-password'] && errors['confirm-password']}
                    sx={{
                      marginBottom: 2,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 5,
                        backgroundColor: '#E6E6E6',
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={toggleConfirmPasswordVisibility}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              </Field>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'row-reverse',
                  alignItems: 'center',
                  marginTop: 2,
                }}
              >
                {/* Change Password Button */}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!isValid || isSubmitting}
                  sx={{
                    paddingY: 1,
                    paddingX: 4,
                    borderRadius: 3,
                    textTransform: 'none',
                    fontWeight: 'bold',
                    backgroundColor: '#4CAFF7',
                    position: 'relative',
                  }}
                >
                  {isSubmitting && (
                    <CircularProgress
                      size={24}
                      sx={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        marginLeft: '-12px',
                        marginTop: '-12px',
                      }}
                    />
                  )}
                  Change Password
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
        <SnackbarExtended
          open={openSnackbar}
          message={snackbarMessage}
          severity={snackbarSeverity}
          handleClose={handleCloseSnackbar}
        />
      </Box>
    </Card>
  );
}

ChangePassword.propTypes = {
  user: PropTypes.object.isRequired,
};

export default ChangePassword;
