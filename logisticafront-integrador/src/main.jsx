import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import { OrdersProvider } from "./context/OrdersProvider.jsx";
import './index.css';

const theme = createTheme({
  palette: { mode: 'light', primary: { main: '#3975b1ff' }, secondary: { main: '#f50057' } },
  components: { MuiButton: { styleOverrides: { root: { textTransform: 'none' } } } }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* SnackbarProvider permite useSnackbar() en cualquier componente */}
      <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        {/* OrdersProvider expone ordenes, stats y acciones CRUD */}
        <OrdersProvider>
          <App />
        </OrdersProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>
);