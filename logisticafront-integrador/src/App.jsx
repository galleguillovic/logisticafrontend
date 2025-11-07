import React from 'react';
import NavBar from './components/NavBar';
import { Toolbar, Container } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import OrderDetailPage from './pages/OrderDetailPage';
import OrderFormPage from './pages/OrderFormPage';

export default function App({ toggleTheme, isDarkMode }) {
  return (
    <BrowserRouter>
      <NavBar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <Toolbar sx={{ minHeight: { xs: 96, sm: 64 } }} />
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/ordenes/:id" element={<OrderDetailPage />} />
          <Route path="/crear" element={<OrderFormPage />} />
          <Route path="/editar/:id" element={<OrderFormPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}