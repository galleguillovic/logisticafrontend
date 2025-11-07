import React from 'react';
import { Box, Typography, TextField, IconButton, useTheme } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import '../styles/OrdersHeader.css';

export default function OrdersHeader({ title = 'Listado de Órdenes', query = '', setQuery, onOpenFilters }) {
  const theme = useTheme();
  const cssVars = {
    '--oh-bg': theme.palette.background.paper,
    '--oh-text': theme.palette.text.primary,
    '--oh-text-secondary': theme.palette.text.secondary,
    '--oh-input-bg': theme.palette.mode === 'light' ? '#fff' : '#497d9198',
    '--oh-border': theme.palette.divider
  };

  return (
    <Box
      className="orders-header-container"
      style={cssVars}
    >
      <Box className="orders-header-left">
        <Typography variant="h5" className="orders-header-title">{title}</Typography>

        <Box className="orders-header-search">
          <TextField
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por destino, contenido, repartidor, categoría, estado, etc."
            size="small"
            fullWidth
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'var(--oh-text-secondary)' }} />,
              sx: {
                backgroundColor: 'var(--oh-input-bg)',
                color: 'var(--oh-text)',
                borderRadius: 1, '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--oh-border)'
                }
              }
            }}
          />
        </Box>
      </Box>

      <Box className="orders-header-filters">
        <IconButton color="neutral" onClick={onOpenFilters} aria-label="Abrir filtros">
          <FilterListIcon />
        </IconButton>
      </Box>
    </Box>
  );
}