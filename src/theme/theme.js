import { createTheme } from '@mui/material/styles';

// Define a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAFF7',  // Primary color (use for buttons, links, etc.)
      contrastText: '#fff',  // Text color on primary buttons
    },
    secondary: {
      main: '#FF4081',  // Secondary color
    },
    background: {
      default: '#f4f4f4',  // Default background color
      paper: '#ffffff',    // Background for paper-like components (cards, dialogs, etc.)
    },
    text: {
      primary: '#333333',  // Main text color
      secondary: '#888888',  // Secondary text color
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',  // Define a global font
    h4: {
      fontWeight: 'bold',
      fontSize: '2rem',
    },
    body1: {
      fontSize: '1rem',
    },
    button: {
      textTransform: 'none',  // Disable uppercase transformation for buttons
    },
  },
  shape: {
    borderRadius: 5,  // Default border radius for buttons, cards, etc.
  },
  spacing: 5,  // Default spacing unit (multiply this by values you want)
});

export default theme;
