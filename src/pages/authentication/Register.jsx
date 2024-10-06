import { useDispatch, useSelector } from 'react-redux';  // Redux hooks
import { registerUser, clearErrorsAndMessages } from '../../redux/auth/authSlice';  // Import register action
import { registerNewUser } from '../../redux/userSlice';  // Import register action
import { Formik, Form, Field } from 'formik';  // Formik for form handling
import { Button, Card, TextField, CircularProgress, Box, Typography, useTheme, InputAdornment, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, colors } from '@mui/material';  // Material-UI components and useTheme hook
import { useNavigate } from 'react-router-dom';  // For navigation and redirecting
import * as Yup from 'yup';  // Yup for validation schema
import logo from '../../assets/logo.png';  // Replace with your logo
import { useEffect, useState } from 'react';
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

// Define styles using theme
const useStyles = (theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: theme.palette.background.default,  // Use theme background color
  },
  card: {
    padding: theme.spacing(4),
    maxWidth: 400,
    textAlign: 'center',
    borderRadius: theme.shape.borderRadius,  // Use theme border radius
    boxShadow: theme.shadows[2],  // Use theme shadow
    backgroundColor: theme.palette.background.paper,  // Use theme paper background
  },
  logo: {
    width: '80px',
    height: '80px',
    marginBottom: theme.spacing(3),
    borderRadius: '50%',
  },
  title: {
    marginBottom: theme.spacing(3),
    fontWeight: 'bold',
  },
  textField: {
    marginBottom: theme.spacing(2),
    '& .MuiOutlinedInput-root': {
      borderRadius: theme.shape.borderRadius,  // Use theme border radius
      backgroundColor: theme.palette.background.default,  // Use theme background
    },
  },
  formHelperText: {
    color: 'error.main',
  },
  linkText: {
    color: '#4CAFF7',
    fontSize: 12,
    '&:hover': {
      color: '#3399cc',
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },
  alreadyAccount: {
    color: '#787878',
    fontSize: 14,
  },
  submitButton: {
    paddingY: theme.spacing(1),
    paddingX: theme.spacing(4),
    borderRadius: 3,  // Use theme border radius
    textTransform: 'none',  // Ensure button text is not all caps
    fontWeight: 'bold',
    backgroundColor: '#4CAFF7',
  },
  formFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
});

export default function Signup({ closeModal }) {
  const dispatch = useDispatch();
  const { user, error, loading } = useSelector((state) => state.auth);  // Access user, error, and loading states from Redux
  const navigate = useNavigate();  // For navigation after signup
  const theme = useTheme();  // Access the theme object
  const styles = useStyles(theme);  // Apply styles
  const [submitting, setSubmitting] = useState(false)
  const [role, setRole] = useState("EMPLOYEE")


  // Separate function for form submission logic
  const handleSubmit = (values) => {
    setSubmitting(true)
    const body = {
      username: values.username,
      email: values.email,
      password: values.password,
      role: role
    }

    dispatch(registerNewUser(body)).then((action) => {
      if (action.meta.requestStatus === 'fulfilled') {
        closeModal(); // Close the modal on successful registration
        navigate('/dashboard/manage-users');
      }
    });

    setSubmitting(false);
  };

  return (
    <Card sx={styles.card}>
      {/* Logo */}
      <img src={logo} alt="Logo" style={styles.logo} />

      {error && <Typography color="error" sx={{ marginBottom: theme.spacing(2) }}>{error}</Typography>}  {/* Show error if signup fails */}

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
                  sx={styles.textField}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />  {/* Username icon */}
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
                  sx={styles.textField}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />  {/* Email icon */}
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
                  sx={styles.textField}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />  {/* Lock icon */}
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            </Field>

            <Box sx={{display:'flex', flex:'start'}} >
              <FormControl component="fieldset" sx={{ mt: 2, textAlign:'start' , color:colors.blue[500] }}>
                <FormLabel sx={{fontWeight:'bold'}} component="legend">ROLE</FormLabel>
                <RadioGroup
                  aria-label="role"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  row
                >
                  <FormControlLabel value="EMPLOYEE" control={<Radio />} label="Employee" />
                  <FormControlLabel value="MANAGER" control={<Radio />} label="Manager" />
                  <FormControlLabel value="ADMIN" control={<Radio />} label="Admin" />

                </RadioGroup>
              </FormControl>

            </Box>

            <Box sx={styles.formFooter}>
              {/* Signup Button with CircularProgress */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={submitting}
                sx={styles.submitButton}
              >
                {submitting || loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Signup'
                )}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Card>
  );
}

