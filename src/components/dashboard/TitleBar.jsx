
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const TitleBar = ({ title }) => {
  return (
    <Box sx={{ 
      padding: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' ,
      backgroundColor:'#ffffff',
      borderRadius:5
      
      }}>
      {/* Main Title */}
      <Typography variant="h5" fontWeight="bold">
        {title}
      </Typography>
      <Typography variant="subtitle1">
        {new Date().toLocaleDateString()}
      </Typography>
    </Box>
  );
};
TitleBar.propTypes = {
  title: PropTypes.string.isRequired,
  
};

export default TitleBar;




