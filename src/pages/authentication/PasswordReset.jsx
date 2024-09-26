
import { Formik, Form, Field } from 'formik';  // Formik for form handling
import { Button, Card, TextField, CircularProgress, Box, Typography } from '@mui/material';  // Material-UI components
import { useNavigate } from 'react-router-dom';  // For navigation
import logo from '../../assets/logo.png';  // Replace with your logo

export default function PasswordReset() {
  const navigate = useNavigate();  // For navigation after form submission

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#ffffff',  // White background
      }}
    >
      <Card
        sx={{
          padding: 4,
          maxWidth: 400,
          textAlign: 'center',
          borderRadius: 3,  // Rounded corners for the card
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  // Subtle shadow for the card
          backgroundColor: '#f6f6f6',  // Light gray background for the card
        }}
      >
        {/* Logo */}
        <img src={logo} alt="Logo" style={{ width: '80px', height: '80px', marginBottom: '20px', borderRadius: '50%' }} />

        {/* Title */}
        <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: 'bold' }}>Reset Password</Typography>

        {/* Formik to handle the form submission */}
        <Formik
          initialValues={{ newPassword: '', confirmPassword: '' }}
          onSubmit={(values, { setSubmitting }) => {
            // Add logic for handling password reset, e.g., calling an API
            console.log('New password:', values.newPassword);
            console.log('Confirm password:', values.confirmPassword);
            setSubmitting(false);
            navigate('/login');  // Redirect back to login after submission
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              {/* New Password field */}
              <Field name="newPassword">
                {({ field }) => (
                  <TextField
                    {...field}
                    type="password"
                    label="New Password"
                    fullWidth
                    sx={{
                      marginBottom: 2,
                      '& .MuiOutlinedInput-root': {
                        backgroundColor:'#ffffff',
                        borderRadius: 5,  // Rounded input field
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <Box
                          sx={{
                            marginRight: 1,
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          {/* <i className="material-icons">lock</i>  Example icon */}
                        </Box>
                      ),
                    }}
                  />
                )}
              </Field>

              {/* Confirm Password field */}
              <Field name="confirmPassword">
                {({ field }) => (
                  <TextField
                    {...field}
                    type="password"
                    label="Confirm Password"
                    fullWidth
                    sx={{
                      marginBottom: 2,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 5,  // Rounded input field
                        backgroundColor:'#ffffff'
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <Box
                          sx={{
                            marginRight: 1,
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          {/* <i className="material-icons">lock</i>  Example icon */}
                        </Box>
                      ),
                    }}
                  />
                )}
              </Field>

              {/* Reset Password Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}  // Disable button when submitting
                sx={{
                  marginTop: 2,
                  paddingY: 1.5,
                  borderRadius: 30,  // Rounded button
                  textTransform: 'none',  // Ensure button text is not all caps
                  fontWeight: 'bold',
                  backgroundColor:"#4CAFF7"
                }}
              >
                Reset Password
              </Button>
            </Form>
          )}
        </Formik>

        {/* Link to go back to login */}
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="body2">
            Remembered your password? <Button variant="text" color="primary" sx={{ textDecoration: 'underline', color:'#4CAFF7' }} onClick={() => navigate('/login')}>Login here</Button>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}
