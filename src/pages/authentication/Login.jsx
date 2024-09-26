import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';  // Redux hooks
import { loginUser, clearErrorsAndMessages } from '../../redux/auth/authSlice';  // Import login action
import { Formik, Form, Field } from 'formik';  // Formik for form handling
import { Button, Card, TextField, CircularProgress, Box, Typography, useTheme, InputAdornment } from '@mui/material';  // Material-UI components and useTheme hook
import { useNavigate } from 'react-router-dom';  // For navigation and redirecting
import logo from '../../assets/logo.png';  // Replace with your logo
import * as Yup from 'yup';
import { Person, Lock } from '@mui/icons-material';

// Define the validation schema with Yup
const validateSchema = Yup.object().shape({
  username: Yup.string()
    .test(
      'is-username-or-email',
      'Username must be a valid username or email',
      (value) => {
        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;  // Regex for valid email
        const usernameRegex = /^[a-zA-Z0-9_.-]*$/;  // Allow alphanumeric characters, underscores, and periods
        return emailRegex.test(value) || usernameRegex.test(value);  // Check if the value is either a valid email or a username
      }
    )
    .required('Username or email is required'),  // Make the field required
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')  // Password must have at least 6 characters
    .required('Password is required'),  // Password is required
});

export default function Login() {
  const dispatch = useDispatch();
  const { user, error, loading } = useSelector((state) => state.auth);  // Access user, error, and loading states from Redux
  const navigate = useNavigate();  // For navigation after login
  const theme = useTheme();  // Access the theme object



  // Clear errors when component mounts
  useEffect(() => {
    dispatch(clearErrorsAndMessages());  // Clear any previous errors when the component loads
    if (user && !error) {
      navigate('/dashboard');
    }
  }, []);



  // Handle Form Submission
  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(loginUser(values)).then((action) => {
      if (!action.error) {
        navigate('/dashboard');
      } else {
        setSubmitting(false);  // Re-enable the submit button after failure
      }
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
        <img src={logo} alt="Logo" style={{ width: '80px', height: '80px', marginBottom: theme.spacing(2.5), borderRadius: '50%' }} />

        {/* Title */}
        <Typography variant="h4" sx={{ marginBottom: theme.spacing(3), fontWeight: theme.typography.fontWeightBold }}>
          Login
        </Typography>

        {error && <Typography color="error" sx={{ marginBottom: theme.spacing(2) }}>{error}</Typography>}  {/* Show error if login fails */}
        
        {/* Formik to handle the form submission */}
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={validateSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              {/* Username field */}
              <Field name="username">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Username or Email"
                    fullWidth
                    error={touched.username && Boolean(errors.username)}  // Bind error and touched
                    helperText={touched.username && errors.username}  // Show error message
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
                          <Person />  {/* Person icon for username */}
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
                    error={touched.password && Boolean(errors.password)}  // Bind error and touched
                    helperText={touched.password && errors.password}  // Show error message
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

              {/* Horizontal Layout: Forgotten Password Link and Login Button */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',  // Spread the items out
                  alignItems: 'center',
                  marginTop: theme.spacing(2),
                }}
              >
                {/* Forgotten Password Link */}
                <Typography variant="body2"
                    color="primary"
                    sx={{ 
                        color: "#4CAFF7",
                        fontSize:14,
                        '&:hover': {
                          color: '#3399cc', // Changes color on hover
                          textDecoration:"underline",
                          cursor: 'pointer'
                        }
                     }}
                     onClick={() => navigate('/forgot-password')}
                  >
                    Forgotten password?
                </Typography>

                {/* Login Button */}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting || loading}  // Disable button when submitting or loading
                  sx={{
                
                    paddingY:theme.spacing(1),
                    paddingX: theme.spacing(4),
                    borderRadius: 3,  // Use theme border radius
                    textTransform: 'none',  // Ensure button text is not all caps
                    fontWeight: 'bold',
                    backgroundColor: '#4CAFF7',
                  }}
                >
                  {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Login'} {/* Show spinner if loading */}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>

        {/* Forgotten password and registration links */}
        <Box sx={{ marginTop: theme.spacing(4) }}>
          <Typography variant="body3"  sx={{
            color:'#787878',
            fontSize:14
          }}>
            Don’t have an account?{' '}
            <Typography
              variant="text"
              color="primary"
              sx={{ 
                
                color: '#4CAFF7',
                fontSize:14,
                '&:hover': {
                    color: '#3399cc', // Changes color on hover
                    textDecoration:"underline",
                    cursor: 'pointer'
                }
              }}
              onClick={() => navigate('/register')}
            
            >
              Click here
            </Typography>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}
