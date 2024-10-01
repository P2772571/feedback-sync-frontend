import React from 'react';
import PropTypes from 'prop-types';
import { Button, CircularProgress } from '@mui/material';

// Styles
const buttonStyles = {
  marginTop: 2,
  paddingY: 1,
  paddingX: 4,
  borderRadius: 3,
  textTransform: 'none',
  fontWeight: 'bold',
  backgroundColor: '#4CAFF7',
  position: 'relative',
};

const circularProgressStyles = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  marginLeft: '-12px',
  marginTop: '-12px',
};

// CustomButton component
function CustomButton({ type, variant, color, disabled, isSubmitting, onClick, children, ...rest }) {
  return (
    <Button
      type={type}
      variant={variant}
      color={color}
      disabled={disabled || isSubmitting}
      onClick={onClick}
      sx={buttonStyles}
      {...rest}
    >
      {isSubmitting && (
        <CircularProgress
          size={24}
          sx={circularProgressStyles}
        />
      )}
      {children}
    </Button>
  );
}

CustomButton.propTypes = {
  type: PropTypes.string,
  variant: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

CustomButton.defaultProps = {
  type: 'button',
  variant: 'contained',
  color: 'primary',
  disabled: false,
  isSubmitting: false,
  onClick: () => {},
};

export default CustomButton;
