import { useDispatch, useSelector } from 'react-redux';  // Redux hooks
import { registerUser, clearErrorsAndMessages } from '../../redux/auth/authSlice';  // Import register action
import { Formik, Form, Field } from 'formik';  // Formik for form handling
import { Button, Card, TextField, CircularProgress, Box, Typography, useTheme, InputAdornment } from '@mui/material';  // Material-UI components and useTheme hook
import { useNavigate } from 'react-router-dom';  // For navigation and redirecting
import * as Yup from 'yup';  // Yup for validation schema
import logo from '../../assets/logo.png';  // Replace with your logo
import { useEffect } from 'react';
import { Person, Email, Lock } from '@mui/icons-material';  // Material-UI icons


// Define the validation schema with Yup
const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, 'Username must be at least 4 characters')  // Username must have at least 4 characters
    .required('Username is required'),  // Username is required
  email: Yup.string()
    .email('Invalid email address')  // Email must be a valid email address
    .required('Email is required'),  // Email is required
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')  // Password must have at least 6 characters
    .required('Password is required'),  // Password is required
});

export default function Signup() {
  const dispatch = useDispatch();
  const { user, error, loading } = useSelector((state) => state.auth);  // Access user, error, and loading states from Redux
  const navigate = useNavigate();  // For navigation after signup
  const theme = useTheme();  // Access the theme object

  // Clear errors when component mounts
  useEffect(() => {
    dispatch(clearErrorsAndMessages());  // Clear any previous errors when the component loads
    if (user && !error) {
      navigate('/dashboard');
    }
  }, [dispatch, user, error, navigate]);

  // Separate function for form submission logic
  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(registerUser(values))
      .then((action) => {
        if (!action.error) {
          navigate('/dashboard');  // Registration successful, navigate to home page
        } else {
          setSubmitting(false);  // Handle error, remain on the signup page
        }
      })
      .catch(() => {
        setSubmitting(false);
      });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: theme.palette.background.default,  // Use theme background color
      }}
    >
      <Card
        sx={{
          padding: theme.spacing(4),
          maxWidth: 400,
          textAlign: 'center',
          borderRadius: theme.shape.borderRadius,  // Use theme border radius
          boxShadow: theme.shadows[2],  // Use theme shadow
          backgroundColor: theme.palette.background.paper,  // Use theme paper background
        }}
      >
        {/* Logo */}
        <img src={logo} alt="Logo" style={{ width: '80px', height: '80px', marginBottom: theme.spacing(3), borderRadius: '50%' }} />

        {/* Title */}
        <Typography variant="h4" sx={{ marginBottom: theme.spacing(3), fontWeight: 'bold' }}>
          Sign up
        </Typography>

        {error && <Typography color="error" sx={{ marginBottom: theme.spacing(2) }}>{error}</Typography>}  {/* Show error if signup fails */}
        {loading && <CircularProgress color="primary" />}  {/* Show loading spinner while signup is in progress */}

        {/* Formik to handle the form submission */}
        <Formik
          initialValues={{ username: '', email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              {/* Username field */}
              <Field name="username">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Username"
                    fullWidth
                    error={touched.username && Boolean(errors.username)}  
                    helperText={touched.username && errors.username}
                    sx={{
                      marginBottom: theme.spacing(2),
                      '& .MuiOutlinedInput-root': {
                        borderRadius: theme.shape.borderRadius,  // Use theme border radius
                        backgroundColor: theme.palette.background.default,  // Use theme background
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />  {/* Email icon */}
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              </Field>

              {/* Email field */}
              <Field name="email">
                {({ field }) => (
                  <TextField
                    {...field}
                    type="email"
                    label="Email"
                    fullWidth
                    error={touched.email && Boolean(errors.email)}  
                    helperText={touched.email && errors.email}
                    sx={{
                      marginBottom: theme.spacing(2),
                      '& .MuiOutlinedInput-root': {
                        borderRadius: theme.shape.borderRadius,  // Use theme border radius
                        backgroundColor: theme.palette.background.default,  // Use theme background
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />  {/* Lock icon for password */}
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              </Field>

              {/* Password field */}
              <Field name="password">
                {({ field }) => (
                  <TextField
                    {...field}
                    type="password"
                    label="Password"
                    fullWidth
                    error={touched.password && Boolean(errors.password)}  
                    helperText={touched.password && errors.password}
                    sx={{
                      marginBottom: theme.spacing(2),
                      '& .MuiOutlinedInput-root': {
                        borderRadius: theme.shape.borderRadius,  // Use theme border radius
                        backgroundColor: theme.palette.background.default,  // Use theme background
                      },
                    }}

                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />  {/* Lock icon for password */}
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              </Field>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',  // Spread the items out
                  alignItems: 'center',
                  marginTop: theme.spacing(2),
                }}
              >
                {/* Already have an account Link */}
                <Typography variant="body2"
                sx={{
                  color:'#787878',
                  fontSize:14
                }}
                >
                  Already have an account?{' '}
                  <Typography
                    
                    sx={{ 
                      color: '#4CAFF7',
                      fontSize:12,
                      '&:hover': {
                          color: '#3399cc', // Changes color on hover
                          textDecoration:"underline",
                          cursor: 'pointer'
                      }
                    }}
                    onClick={() => navigate('/login')}
                  >
                    Click here
                  </Typography>
                </Typography>

                {/* Signup Button */}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting || loading}  
                  sx={{
                    paddingY:theme.spacing(1),
                    paddingX: theme.spacing(4),
                    borderRadius: 3,  // Use theme border radius
                    textTransform: 'none',  // Ensure button text is not all caps
                    fontWeight: 'bold',
                    backgroundColor: '#4CAFF7',
                  }}
                >
                  Signup
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Card>
    </Box>
  );
}
