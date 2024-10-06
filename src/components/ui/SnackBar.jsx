
import { Snackbar, Alert } from '@mui/material';
import PropTypes from 'prop-types';

function SnackbarExtended({ open, handleClose, message, severity }) {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

SnackbarExtended.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  message: PropTypes.string,
  severity: PropTypes.oneOf(['error', 'warning', 'info', 'success']),
};

SnackbarExtended.defaultProps = {
  message: '',
  severity: 'info',
};

export default SnackbarExtended;
