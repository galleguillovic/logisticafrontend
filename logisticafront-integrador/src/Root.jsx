import React, { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { OrdersProvider } from "./context/OrdersProvider.jsx";
import App from './App';
import { lightTheme, darkTheme } from './styles/themes';

export default function Root() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <OrdersProvider>
          <App toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        </OrdersProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}