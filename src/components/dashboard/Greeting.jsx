
import { Box, Typography, Avatar } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const Greeeting = () => {

    const user = useSelector((state) => state.auth.user)
    const { profile } = useSelector((state) => state.profile);


    return (
        <Box sx={{
            padding: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            backgroundColor: '#ffffff',
            borderRadius: 5,
            marginY: 3

        }}>
            <Typography variant="h5" fontWeight="bold" display="inline">
                Welcome Back,{' '}
                <Typography 
                    variant="h5" 
                    fontWeight="bold" 
                    display="inline"
                    sx={{
                        color:'#4CAFF7'
                    }}
                >
                    
                    {profile?.firstName +" " +profile?.lastName || user?.username  ||'Guest'}
                </Typography>
            </Typography>
           

            {/* Profle Section */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'row'

            }} >

                <Box sx={{
                    paddingTop: 1,
                    paddingRight: 2
                }} >
                    <Typography sx={{ fontSize: 15, fontWeight: 'bold' }}>{profile?.firstName || user?.username || 'Guest User'}</Typography>
                    <Typography sx={{
                        textAlign: 'left',
                        color: '#4CAFF7', fontSize: '12px'
                    }}>
                        { profile?.jobTitle || 'Guest'}
                    </Typography>
                </Box>
                <Avatar src={user?.profileImage} alt={user?.username} sx={{ width: 56, height: 56 }} />

            </Box>
        </Box>
    );
};
Greeeting.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Greeeting;




