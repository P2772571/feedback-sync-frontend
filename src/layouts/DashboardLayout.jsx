
import { Box } from '@mui/material';
import Sidebar from '../components/sidebar/Sidebar';  // Import Sidebar component
import { Outlet } from 'react-router-dom';  // To render nested routes
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProfile } from '../redux/profileSlice';

const DashboardLayout = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfile())
    document.title = "Feedback Sync";

  }
  , [dispatch]);


  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor:"#EAEAEA" }}>
      {/* Sidebar (30% width) */}
      <Box sx=
      {
        { 
          width: '18%', 
          backgroundColor: '#ffffff' ,
          borderRadius: 5,
          margin:2,
        }
      }>
        <Sidebar />
      </Box>

      {/* Main content area (70% width) */}
      <Box sx=
        {
          { 
            width: '82%', 
            padding: 3, 
            borderRadius: 5,
            marginRight:2,
            overflowY: 'auto',
            
          }
        }>
        <Outlet />  {/* Nested routes (Home, Profile, etc.) will be rendered here */}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
