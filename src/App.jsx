// import React from 'react';
// import { Provider } from 'react-redux';  // Redux Provider
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';  // React Router v6 uses Routes and Navigate
// import store from './redux/store';  // Redux store
// import Login from './components/auth/Login';  // Login Component
// import Signup from './components/auth/Register'; // Signup Component
// import Home from './components/Home';  // Home Component
// import ForgotPassword from './components/auth/ForgotPassword';
// import PasswordReset from './components/auth/PasswordReset';
// import DashboardLayout from './layouts/DashboardLayout';

// import Profile from './pages/Profile';
// import Goal from './pages/Goal';
// import Pip from './pages/Pip';
// import Feedback from './pages/Feedback';

// // Protect routes that require authentication
// const PrivateRoute = ({ component: Component }) => {
//   const isAuthenticated = store.getState().auth.user !== null;  // Check if user is logged in
//   return isAuthenticated ? <Component /> : <Navigate to="/login" />;  // Use Navigate instead of Redirect
// };

// function App() {
//   return (
//     <Provider store={store}>  {/* Wrap the app with Redux provider */}
//       <Router>
//         <Routes>
//           <Route path="/login" element={<Login />} />  {/* Login route */}
//           <Route path='/register' element={<Signup />}/>
//           <Route path='/forgot-password' element={ <ForgotPassword /> } />
//           <Route path='/reset-password' element={ <PasswordReset />} />
//           {/* Protected Routes (Dashboard) */}
//           <Route
//             path="/dashboard/*"
//             element={
//               <PrivateRoute>
//                 <DashboardLayout />  {/* Render the dashboard layout */}
//               </PrivateRoute>
//             }
//           >
//             {/* Nested routes under dashboard */}
//             <Route path="" element={<Home />} />  {/* Default dashboard home */}
//             <Route path="profile" element={<Profile />} />
//             <Route path="feedback" element={<Feedback />} />
//             <Route path="pip" element={<Pip />} />
//           </Route>

//           {/* Redirect unknown routes to login */}
//           <Route path="*" element={<Navigate to="/login" />} />
//         </Routes>
//       </Router>
//     </Provider>
//   );
// }

// export default App;





import { Provider } from 'react-redux';  // Redux Provider
import CssBaseline from '@mui/material/CssBaseline';  // CSS baseline for consistent global styles
import store from './redux/store';  // Redux store
import theme from './theme/theme';  // Import the custom theme
import { ThemeProvider } from '@emotion/react';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';  // Import AdapterDateFns
import AppRoutes from './routes/AppRoutes';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const App = () => {

  return (
    <Provider store={store}>  {/* Wrap the app with Redux provider */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
      </ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AppRoutes />
      </LocalizationProvider>
    </Provider>
  );
};

export default App;
