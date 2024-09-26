import { List, ListItem, ListItemText, ListItemIcon, Box } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';  // Logout icon
import { useDispatch } from 'react-redux';  // Hooks for Redux state management
import { logout } from '../../redux/auth/authSlice';  // Import the logout action
import { useNavigate } from 'react-router-dom';  // For programmatic navigation

const SidebarBottom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());  // Dispatch the logout action
    navigate('/login');  // Redirect to login after logout
  };

  return (
    <Box sx={{ paddingLeft:5, paddingRight:5, textAlign: 'center', backgroundColor:"#f8f8f8", borderRadius:5, marginTop:1 }}>
      <List>
        <ListItem 
          button 
          onClick={handleLogout} 
        
          sx={{
            color: '#FF4081',  // Red color for the text
            '&:hover': {
              backgroundColor: '#FFEBEE',  // Light red background on hover
              color: '#FF1744',  // Darker red text on hover

            },
            borderRadius: '8px',
          }}
        >
          <ListItemIcon>
            <ExitToApp sx={{ color: '#FF4081' }} />  {/* Red icon for logout */}
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );
};

export default SidebarBottom;
