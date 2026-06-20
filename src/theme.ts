import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    background: {
      default: '#FBF8F0',
      paper: '#EFE9DA',   
    },
    text: {
      primary: '#2A2E26',  
      secondary: '#6B6751', 
    },
    primary: {
      main: '#28374A',
    },
    secondary: {
      main: '#754437', 
    },
    divider: 'rgba(40, 55, 74, 0.18)',
  },
  typography: {
    fontFamily: "'Inter', system-ui, sans-serif",
    h1: { fontFamily: "'Fraunces', serif", fontWeight: 700 },
    h2: { fontFamily: "'Fraunces', serif", fontWeight: 600 },
    h6: { fontFamily: "'Fraunces', serif", fontWeight: 600 }, 
    subtitle1: { fontFamily: "'Source Serif 4', serif" },     
    body1: { fontFamily: "'Inter', sans-serif" },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        color: 'transparent',
      },
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(40, 55, 74, 0.18)',
          backgroundColor: '#FBF8F0',
        },
      },
    },
  },
});