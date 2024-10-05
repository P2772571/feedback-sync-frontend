import { Box, Typography, Avatar, Skeleton } from '@mui/material';
import { useSelector } from 'react-redux';  // Import useSelector to access Redux state
import logo from '../../assets/logo.png';  // Replace with your actual logo

const SidebarTop = () => {
  const user = useSelector((state) => state.auth.user);  // Fetch user details from the Redux store
  const userLoading = useSelector((state) => state.auth.loading);  // Fetch loading state from the Redux store
  const profile = useSelector((state) => state.profile.profile);  // Fetch profile details from the Redux store
  const profileLoading = useSelector((state) => state.profile.loading);  // Fetch loading state from the Redux store
  const loading = userLoading || profileLoading;  // Combined loading state for user and profile
  const role = user?.roles?.[0]?.toLowerCase() || 'Guest';

  console.log("User:", user);
  console.log("Profile:", profile);
  console.log("User loading:", userLoading);
  console.log("Profile loading:", profileLoading);

  return (
    <Box 
      sx={{ 
        paddingY: 2, 
        paddingX: 3,
        textAlign: 'center', 
        borderBottom: '1px solid #e0e0e0', 
        backgroundColor: '#fff', 
        borderRadius: 5, 
        marginBottom: 1 
      }}
    >
      <img src={logo} alt="App Logo" style={{ width: '60px', height: '60px', borderRadius: '50%' }} />
      <Typography variant="h6" sx={{ marginTop: 1, color: '#4CAFF7' }}>Feedback Sync</Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 4 }}>
        {loading ? (
          <Skeleton variant="circular" width={56} height={56} />
        ) : (
          <Avatar src={user?.profileImage} alt={user?.username} sx={{ width: 56, height: 56, marginBottom: 1 }} />
        )}

        <Box sx={{ paddingTop: 1, paddingLeft: 2 }}>
          {loading ? (
            <>
              <Skeleton width={100} height={24} />
              <Skeleton width={60} height={16} />
            </>
          ) : (
            <>
              <Typography sx={{ fontSize: 14, fontWeight: 'bold' }}>
                {profile?.firstName ? `${profile.firstName} ${profile.lastName}` : user?.username || 'Guest User'}
              </Typography>
              <Typography sx={{ textAlign: 'left', color: '#4CAFF7', fontSize: '12px' }}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </Typography>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SidebarTop;
