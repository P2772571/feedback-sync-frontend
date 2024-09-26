import { Box, Typography, Avatar } from '@mui/material';
import { useSelector } from 'react-redux';  // Import useSelector to access Redux state
import logo from '../../assets/logo.png';  // Replace with your actual logo

const SidebarTop = () => {
  const user = useSelector((state) => state.auth.user);  // Fetch user details from the Redux store
  const role = user?.roles[0]?.toLowerCase() || 'Guest'

  return (
    <Box sx={{ padding: 5, textAlign: 'center', borderBottom: '1px solid #e0e0e0', backgroundColor:'#fff', borderRadius:5, marginBottom:1 }}>
        <img src={logo} alt="App Logo" style={{ width: '60px', height: '60px', borderRadius: '50%' }} />
        <Typography variant="h6" sx={{ marginTop: 1, color: '#4CAFF7' }}>Feedback Sync</Typography>
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'row', 
            marginTop: 4 ,
          }}>
          <Avatar src={user?.profileImage} alt={user?.username} sx={{ width: 56, height: 56, marginBottom: 1 }} />
          <Box sx={{
             paddingTop:1,
             paddingLeft:2
          }} >
            <Typography sx={{ fontSize:14, fontWeight: 'bold' }}>{user?.username || 'Guest User'}</Typography>
            <Typography sx={{ 
              textAlign:'left',
              color: '#4CAFF7', fontSize: '12px' }}>{role.charAt(0).toUpperCase() + role.slice(1)}</Typography>
          </Box>
        </Box>
      </Box>
  );
};

export default SidebarTop;
