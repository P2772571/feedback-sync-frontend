import { Box, Typography, Avatar, Skeleton } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const Greeting = () => {
  const user = useSelector((state) => state.auth.user);
  const profile = useSelector((state) => state.profile.profile);
  const userLoading = useSelector((state) => state.auth.loading); // Fetch loading state for user
  const profileLoading = useSelector((state) => state.profile.loading); // Fetch loading state for profile
  const loading = userLoading || profileLoading; // Combined loading state

  return (
    <Box
      sx={{
        paddingX: 5,
        paddingY: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 5,
        marginY: 3,
      }}
    >
      {/* Greeting Text */}
      <Typography variant="h5" fontWeight="bold" display="inline">
        Welcome Back,{' '}
        {loading ? (
          <Skeleton width={100} height={30} sx={{ display: 'inline-block' }} />
        ) : (
          <Typography
            variant="h5"
            fontWeight="bold"
            display="inline"
            sx={{ color: '#4CAFF7' }}
          >
            {profile?.firstName + ' ' + profile?.lastName || user?.username || 'Guest'}
          </Typography>
        )}
      </Typography>

      {/* Profile Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Box
          sx={{
            paddingTop: 1,
            paddingRight: 2,
          }}
        >
          {loading ? (
            <>
              <Skeleton width={100} height={24} />
              <Skeleton width={80} height={16} />
            </>
          ) : (
            <>
              <Typography sx={{ fontSize: 15, fontWeight: 'bold' }}>
                {profile?.firstName || user?.username || 'Guest User'}
              </Typography>
              <Typography
                sx={{
                  textAlign: 'left',
                  color: '#4CAFF7',
                  fontSize: '12px',
                }}
              >
                {profile?.jobTitle || 'Guest'}
              </Typography>
            </>
          )}
        </Box>
        {loading ? (
          <Skeleton variant="circular" width={56} height={56} />
        ) : (
          <Avatar src={user?.profileImage} alt={user?.username} sx={{ width: 56, height: 56 }} />
        )}
      </Box>
    </Box>
  );
};

Greeting.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Greeting;
