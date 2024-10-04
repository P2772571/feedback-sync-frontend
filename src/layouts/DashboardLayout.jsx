import { Box, CircularProgress } from '@mui/material';
import Sidebar from '../components/sidebar/Sidebar';  // Import Sidebar component
import { Outlet } from 'react-router-dom';  // To render nested routes
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../redux/profileSlice';
import { fetchAllUsers, fetchAllManagedUsers } from '../redux/userSlice';
import { fetchFeedbacks } from '../redux/feedbackSlice';
import { fetchGoalsAssignedByManager, fetchGoalsOfUser, fetchAssignedGoalsToUser } from '../redux/goalSlice';

const DashboardLayout = () => {
  const dispatch = useDispatch();
  
  // Get user and profile from Redux
  const user = useSelector((state) => state.auth.user);
  const profileLoading = useSelector((state) => state.profile.loading); // Profile loading state
  const usersLoading = useSelector((state) => state.users.loading); // Users loading state
  const profile = useSelector((state) => state.profile.profile);
  const goalsLoadig = useSelector((state) => state.goals.loading)
  const feedbackLoading = useSelector((state) => state.feedbacks.loading);
  const users = useSelector((state) => state.users.users);
  const feedbacks = useSelector((state) => state.feedbacks.feedbacks);

  
  // Derived loading state (when either profile or users are loading)
  const loading = profileLoading || usersLoading  || feedbackLoading  || goalsLoadig;


  useEffect(() => {
    // Fetch profile when the component mounts
    dispatch(fetchProfile());

    // If user data is available, fetch users based on role
    if (user && user.roles && user.id) {
      if (user.roles.includes('MANAGER')) {
        dispatch(fetchAllManagedUsers(user.id));
      } else if (user.roles.includes('EMPLOYEE')) {
        dispatch(fetchAllUsers());
      }

      if (user.id){
        // Fetch feedbacks
        dispatch(fetchFeedbacks(user.id));
        if (user?.roles[0] === "MANAGER"){
          dispatch(fetchGoalsAssignedByManager(user.id))
        }
        if (user?.roles[0] === "EMPLOYEE"){
          dispatch(fetchGoalsOfUser(user.id));
          console.log("User ID:", user.id, "Manager ID:", 3);
          dispatch(fetchAssignedGoalsToUser({ userId: user.id, managerId: 3 }))
        }
        
      }
      
    }
  }, [dispatch, user, user.id, user.roles]);

  // If still loading, show a spinner/loader
  if (loading || !profile || !users || !user || !feedbacks ) {

    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh' 
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Render the dashboard layout once loading is done
  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: "#EAEAEA" }}>
      {/* Sidebar (30% width) */}
      <Box sx={{
          width: '18%',
          backgroundColor: '#ffffff',
          borderRadius: 5,
          margin: 2,
        }}
      >
        <Sidebar />
      </Box>

      {/* Main content area (70% width) */}
      <Box sx={{
          width: '82%',
          padding: 3,
          borderRadius: 5,
          marginRight: 2,
          overflowY: 'auto',
        }}
      >
        <Outlet />  {/* Nested routes (Home, Profile, etc.) will be rendered here */}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
