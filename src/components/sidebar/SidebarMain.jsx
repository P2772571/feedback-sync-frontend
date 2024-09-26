

import { List, ListItem, ListItemText, ListItemIcon, Box } from '@mui/material';
import { Dashboard, Feedback, Assignment, Person, People } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SidebarMain = () => {
  const user = useSelector((state) => state.auth.user);  // Fetch the user from Redux store
  const role = user?.roles[0]?.toLowerCase() || '';  // Extract the role and make it lowercase, handle undefined

  // Define the role-based menu structure
  const menuItems = {
    employee: [
      { name: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
      { name: 'Feedback', icon: <Feedback />, path: '/dashboard/feedback' },
      { name: 'My Goals', icon: <Assignment />, path: '/dashboard/goals' },
      { name: 'PIPs', icon: <Assignment />, path: '/dashboard/pips' },
      { name: 'Profile', icon: <Person />, path: '/dashboard/profile' },
    ],
    manager: [
      { name: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
      { name: 'Feedback', icon: <Feedback />, path: '/dashboard/feedback' },
      { name: 'Manage Goals', icon: <Assignment />, path: '/dashboard/manage-goals' },
      { name: 'Manage PIPs', icon: <Assignment />, path: '/dashboard/manage-pips' },
      { name: 'Profile', icon: <Person />, path: '/dashboard/profile' },
    ],
    admin: [
      { name: 'Manage Users', icon: <People />, path: '/dashboard/manage-users' },
      { name: 'Profile', icon: <Person />, path: '/dashboard/profile' },
    ]
  };

  const itemsToDisplay = menuItems[role] || [];

  return (
    <Box sx={{ padding: 5, textAlign: 'center', backgroundColor: "#f8f8f8", height: '100%', borderRadius: 5 }}>
      <List>
        {itemsToDisplay.map((item, index) => (
          <ListItem
            button
            component={NavLink}
            to={item.path}
            key={index}
            end
            sx={{
              color: '#878787',  // Default color
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: '#CECECE',  // Hover background
              },
              mb: 1,  // Adds margin between the items
              '&.active': {
                color: '#4CAFF7',  // Active color for text and icon
                // backgroundColor: '#f0f8ff',  // Active background color
              },
            }}
            // Using className to easily apply active styles based on NavLink's active state
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>  {/* Icon color will follow text */}
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SidebarMain;
