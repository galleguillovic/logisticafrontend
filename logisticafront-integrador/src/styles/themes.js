import { createTheme } from '@mui/material/styles';

const lightBase = {
  primary: '#94B9BB',       
  primaryVariant: '#BCD5DB',
  surface: '#DFE7E7',       
  paper: '#FFFFFF',         
  background: '#F3EBDE',    
  neutral: '#C1C9D6',       
  textPrimary: '#0b2430',   
  textSecondary: '#536872' 
};

const darkBase = {
  primary: '#3A4F6E',       
  primaryVariant: '#7eaaecff',
  surface: '#6d67dfff',       
  paper: '#141922',        
  background: '#0b1218',  
  neutral: '#6d67dfff', 
  accent: '#d59cf7ff',  
  tertiary: '#497d91ff', 
  textPrimary: '#eaf2fb',
  textSecondary: '#c4d5e6'
};

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: lightBase.primary, light: lightBase.primaryVariant, contrastText: '#fff' },
    secondary: { main: '#f50057' }, 
    background: {
      default: lightBase.background, 
      paper: lightBase.paper         
    },
    text: {
      primary: lightBase.textPrimary,
      secondary: lightBase.textSecondary
    },
    divider: lightBase.neutral,
    action: {
      hover: '#e9f0f2', 
      selected: '#dbe9ea'
    },
    
    success: { main: '#4caf50' }, 
    warning: { main: '#ffb300' }, 
    info: { main: '#29b6f6' }  
  },
  components: {
    MuiButton: { styleOverrides: { root: { textTransform: 'none' } } }
  }
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: darkBase.primary,
      light: darkBase.primaryVariant,
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#f50057'
    },
   
    background: {
      default: darkBase.background,
      paper: darkBase.paper
    },
    text: {
      primary: darkBase.textPrimary,
      secondary: darkBase.textSecondary
    },
    divider: darkBase.neutral,
    action: {
      hover: 'rgba(138,162,198,0.08)',  
      selected: 'rgba(138,162,198,0.12)'
    },
    
    success: { main: '#4caf50' },
    warning: { main: '#ffb300' },
    info: { main: '#29b6f6' },
    tertiary: { main: darkBase.tertiary },
    accent: { main: darkBase.accent },
    neutralColor: { main: darkBase.neutral }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        },
        containedPrimary: {
          background: `linear-gradient(180deg, ${darkBase.primaryVariant}, ${darkBase.primary})`,
          boxShadow: '0 2px 8px rgba(10,20,30,0.4)'
        },
        outlined: {
          borderColor: darkBase.neutral
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: `1px solid ${darkBase.neutral}`
        }
      }
    }
  }
});