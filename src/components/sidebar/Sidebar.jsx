
import { Box } from '@mui/material';
import SidebarTop from './SidebarTop';
import SidebarMain from './SidebarMain';
import SidebarBottom from './SidebarBottom';

const Sidebar = () => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%',
      backgroundColor:'#EAEAEA'
       }}>
      {/* Sidebar top section */}
      <SidebarTop />

      {/* Sidebar main section with navigation */}
      <Box sx={{ flexGrow: 1 }}>
        <SidebarMain />
      </Box>

      {/* Sidebar bottom section (logout) */}
      <SidebarBottom />
    </Box>
  );
};

export default Sidebar;
